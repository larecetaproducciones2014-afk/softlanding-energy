// Guarda la atribución de primer contacto (UTM + referrer) para adjuntarla al lead.
try {
  const KEY = 'sl_attr';
  const p = new URLSearchParams(location.search);
  const hasUtm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].some((k) => p.get(k));
  if (!sessionStorage.getItem(KEY) || hasUtm) {
    const trim = (v: string | null) => (v ? v.slice(0, 100) : undefined);
    sessionStorage.setItem(KEY, JSON.stringify({
      utm_source: trim(p.get('utm_source')), utm_medium: trim(p.get('utm_medium')),
      utm_campaign: trim(p.get('utm_campaign')), utm_content: trim(p.get('utm_content')),
      referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
      first_path: location.pathname,
    }));
  }
} catch { /* sin almacenamiento: seguimos sin atribución */ }
