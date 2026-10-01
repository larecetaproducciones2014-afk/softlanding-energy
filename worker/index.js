// Worker de Softlanding: sirve el sitio estático y recibe los formularios (POST /api/lead).
// Los leads se guardan en Supabase (tabla public.leads) del tenant TENANT_SLUG usando la service key.
// Secretos: SUPABASE_SERVICE_KEY (wrangler secret). Variables: SUPABASE_URL, TENANT_SLUG, ALLOWED_ORIGINS.

const RUBROS = new Set(['residencial', 'comercial', 'industrial']);
const FORM_SOURCE = { contacto: 'web_formulario', diagnostico: 'web_formulario', calculadora: 'web_calculadora', mantenimiento: 'web_mantenimiento' };
// Orígenes de campaña que se registran tal cual como "origen" del lead (valores del enum lead_source)
const CAMPAIGN_SOURCES = new Set(['whatsapp', 'linkedin', 'facebook', 'instagram', 'tiktok', 'google_business', 'outbound_email', 'outbound_llamada', 'evento', 'referido_aliado', 'referido_cliente', 'licitacion']);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '') || null;

let tenantCache = { slug: null, id: null };

async function tenantId(env) {
  if (tenantCache.slug === env.TENANT_SLUG && tenantCache.id) return tenantCache.id;
  const r = await fetch(`${env.SUPABASE_URL}/rest/v1/tenants?slug=eq.${encodeURIComponent(env.TENANT_SLUG)}&select=id`, {
    headers: { apikey: env.SUPABASE_SERVICE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}` },
  });
  if (!r.ok) throw new Error(`tenant lookup ${r.status}`);
  const [row] = await r.json();
  if (!row) throw new Error('tenant not found');
  tenantCache = { slug: env.TENANT_SLUG, id: row.id };
  return row.id;
}

async function handleLead(request, env) {
  if (request.method !== 'POST') return json({ error: 'method' }, 405);

  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = request.headers.get('Origin');
  if (origin && allowed.length && !allowed.includes(origin)) return json({ error: 'origin' }, 403);

  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > 20000) return json({ error: 'size' }, 413);
  let b;
  try { b = await request.json(); } catch { return json({ error: 'json' }, 400); }
  if (!b || typeof b !== 'object') return json({ error: 'json' }, 400);

  // Trampa para bots: campo oculto lleno o envío demasiado rápido → responde OK sin guardar
  if (b.website || (typeof b.t === 'number' && b.t < 2500)) return json({ ok: true });

  const nombre = clean(b.nombre, 120);
  const telefono = clean(b.telefono, 25);
  const correo = clean(b.correo, 160);
  if (!nombre || nombre.length < 2) return json({ error: 'nombre' }, 400);
  if (!telefono && !correo) return json({ error: 'contacto' }, 400);
  if (telefono && telefono.replace(/\D/g, '').length < 8) return json({ error: 'telefono' }, 400);
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return json({ error: 'correo' }, 400);
  if (b.consentimiento !== true) return json({ error: 'consentimiento' }, 400);

  const tipo = FORM_SOURCE[b.tipo] ? b.tipo : 'contacto';
  const utmSource = (clean(b.utm_source, 100) || '').toLowerCase() || null;
  const source = utmSource && CAMPAIGN_SOURCES.has(utmSource) ? utmSource : FORM_SOURCE[tipo];
  const rubro = RUBROS.has(b.rubro) ? b.rubro : null;
  const sector = typeof b.sector === 'string' && /^[a-z0-9-]{1,60}$/.test(b.sector) ? b.sector : null;
  const path = typeof b.landing_path === 'string' && b.landing_path.startsWith('/') ? b.landing_path.slice(0, 200) : null;

  const snap = {
    form_type: tipo,
    consentimiento_privacidad_en: new Date().toISOString(),
    referrer: clean(b.referrer, 100), first_path: clean(b.first_path, 200),
    ...(b.detalle && typeof b.detalle === 'object' && !Array.isArray(b.detalle) ? { detalle: b.detalle } : {}),
  };
  if (JSON.stringify(snap).length > 6000) return json({ error: 'size' }, 413);

  const row = {
    tenant_id: await tenantId(env),
    nombre, telefono, correo, empresa: clean(b.empresa, 160),
    rubro, sector, source,
    utm_source: utmSource, utm_medium: clean(b.utm_medium, 100), utm_campaign: clean(b.utm_campaign, 100), utm_content: clean(b.utm_content, 100),
    landing_path: path, calc_snapshot: snap, notas: clean(b.mensaje, 800),
  };

  const r = await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: { apikey: env.SUPABASE_SERVICE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  });
  if (!r.ok) {
    console.error('lead insert failed', r.status, (await r.text()).slice(0, 300));
    return json({ error: 'server' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/lead') {
      try { return await handleLead(request, env); }
      catch (e) { console.error('lead error', e && e.message); return json({ error: 'server' }, 500); }
    }
    return env.ASSETS.fetch(request);
  },
};
