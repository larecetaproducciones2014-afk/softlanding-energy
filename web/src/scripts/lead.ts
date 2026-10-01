import './utm';

declare global { interface Window { __slCalc?: { snapshot: () => Record<string, unknown> | null } } }

const attr = (): Record<string, string | undefined> => {
  try { return JSON.parse(sessionStorage.getItem('sl_attr') || '{}'); } catch { return {}; }
};

document.querySelectorAll<HTMLFormElement>('form.lead-form').forEach((form) => {
  const started = Date.now();
  const msg = form.querySelector<HTMLElement>('.msg')!;
  const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const fail = (t: string) => { msg.textContent = t; msg.className = 'msg err'; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'msg';
    const fd = new FormData(form);
    const nombre = String(fd.get('nombre') || '').trim();
    const telefono = String(fd.get('telefono') || '').trim();
    const correo = String(fd.get('correo') || '').trim();
    if (nombre.length < 2) return fail('Escribe tu nombre.');
    if (telefono.replace(/\D/g, '').length < 8 && !correo) return fail('Escribe un teléfono válido (o un correo).');
    if (correo && !/^\S+@\S+\.\S+$/.test(correo)) return fail('Revisa tu correo electrónico.');
    if (!(form.elements.namedItem('consentimiento') as HTMLInputElement).checked) return fail('Para continuar, acepta el Aviso de Privacidad.');

    // Campos extra (data-snap) + snapshot de la calculadora
    const snap: Record<string, unknown> = {};
    form.querySelectorAll<HTMLInputElement>('[data-snap]').forEach((el) => {
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      if (el.value) snap[el.name] = snap[el.name] ? `${snap[el.name]}, ${el.value}` : el.value;
    });
    const calc = window.__slCalc?.snapshot?.();
    if (calc) Object.assign(snap, { calculadora: calc });

    const a = attr();
    const payload = {
      tipo: form.dataset.tipo, rubro: form.dataset.rubro || undefined, sector: form.dataset.sector || undefined,
      nombre, telefono: telefono || undefined, correo: correo || undefined,
      empresa: String(fd.get('empresa') || '').trim() || undefined,
      mensaje: String(fd.get('mensaje') || '').trim() || undefined,
      consentimiento: true,
      landing_path: location.pathname,
      utm_source: a.utm_source, utm_medium: a.utm_medium, utm_campaign: a.utm_campaign, utm_content: a.utm_content,
      referrer: a.referrer, first_path: a.first_path,
      detalle: Object.keys(snap).length ? snap : undefined,
      website: String(fd.get('website') || ''), t: Date.now() - started,
    };

    btn.disabled = true; const old = btn.textContent; btn.textContent = 'Enviando…';
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(String(r.status));
      location.href = `/gracias/?t=${encodeURIComponent(form.dataset.tipo || 'contacto')}`;
    } catch {
      fail('No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.');
      btn.disabled = false; btn.textContent = old;
    }
  });
});
