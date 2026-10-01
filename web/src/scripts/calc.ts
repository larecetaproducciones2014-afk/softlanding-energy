import './utm';

interface Cfg { hsp: number; pr: number; panelW: number; dod: number; pricing: null | {
  kwp: { min: number; max: number }; bateriaKwh: { min: number; max: number }; fijo: { min: number; max: number }; msi: number[] } }

const root = document.getElementById('calc')!;
const cfg: Cfg = JSON.parse(root.dataset.cfg!);
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const fmtMxn = (n: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(Math.round(n / 1000) * 1000);
const num = (n: number, d = 1) => new Intl.NumberFormat('es-MX', { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);

const inputs = {
  tipo: () => (root.querySelector<HTMLInputElement>('input[name=tipo]:checked')!.value as 'casa' | 'negocio'),
  consumo: $<HTMLInputElement>('c-consumo'), periodo: $<HTMLSelectElement>('c-periodo'), cob: $<HTMLSelectElement>('c-cob'),
  objetivo: () => root.querySelector<HTMLInputElement>('input[name=objetivo]:checked')!.value,
  horas: $<HTMLSelectElement>('c-horas'),
};

let last: Record<string, unknown> | null = null;

function compute() {
  const kwh = parseFloat(inputs.consumo.value);
  const tipo = inputs.tipo();
  $('cargas-casa').hidden = tipo !== 'casa';
  $('cargas-negocio').hidden = tipo !== 'negocio';
  const obj = inputs.objetivo();
  const wantsBackup = obj === 'respaldo' || obj === 'ambos';
  $('resp-box').hidden = !wantsBackup;
  $('k-bat').hidden = !wantsBackup;

  if (!(kwh > 0)) { $('kpis').hidden = true; $('empty').hidden = false; last = null; return; }
  $('empty').hidden = true; $('kpis').hidden = false;

  const kwhMes = inputs.periodo.value === 'bimestral' ? kwh / 2 : kwh;
  const cob = parseFloat(inputs.cob.value);
  // Con "solo respaldo" se dimensiona una planta mínima para recargar las baterías, no para el consumo total
  const objetivoKwhMes = obj === 'respaldo' ? 0 : kwhMes * cob;

  const checked = [...root.querySelectorAll<HTMLInputElement>(`#cargas-${tipo} input[name=carga]:checked`)];
  const kwhDia = checked.reduce((s, c) => s + parseFloat(c.dataset.kwh!), 0);
  const horas = parseFloat(inputs.horas.value);
  const bat = wantsBackup ? (kwhDia * horas / 24) / cfg.dod : 0;

  // Energía solar: consumo a cubrir + recarga diaria de baterías si hay respaldo
  const recargaMes = wantsBackup ? kwhDia * (horas / 24) * 30 : 0;
  const kwp = Math.max(0.5, (objetivoKwhMes + (obj === 'respaldo' ? recargaMes : 0)) / (cfg.hsp * 30 * cfg.pr));
  const kwpR = Math.ceil(kwp * 10) / 10;
  const paneles = Math.ceil((kwpR * 1000) / cfg.panelW);
  const kwpReal = (paneles * cfg.panelW) / 1000;
  const gen = kwpReal * cfg.hsp * 30 * cfg.pr;
  const area = paneles * 2.8;

  $('r-kwp').textContent = num(kwpReal, 2);
  $('r-pan').textContent = String(paneles); $('r-w').textContent = String(cfg.panelW);
  $('r-area').textContent = `≈ ${Math.round(area)} m²`;
  $('r-gen').textContent = num(gen, 0);
  $('r-bat').textContent = bat > 0 ? num(Math.ceil(bat * 10) / 10, 1) : '—';
  $('r-hsp').textContent = String(cfg.hsp); $('r-pr').textContent = String(Math.round(cfg.pr * 100)); $('r-dod').textContent = String(Math.round(cfg.dod * 100));

  // Costo y meses sin intereses: SOLO si Softlanding configuró precios reales (calc.pricing)
  if (cfg.pricing) {
    const p = cfg.pricing;
    const min = kwpReal * p.kwp.min + bat * p.bateriaKwh.min + p.fijo.min;
    const max = kwpReal * p.kwp.max + bat * p.bateriaKwh.max + p.fijo.max;
    $('k-cost').hidden = false; $('cost-note').hidden = true;
    $('r-cost').textContent = `${fmtMxn(min)} – ${fmtMxn(max)}`;
    $('r-cost-sub').textContent = 'Rango aproximado de inversión (IVA incluido). Precio final tras visita técnica.' +
      (p.msi.length ? ` Desde ${fmtMxn(min / Math.max(...p.msi))} al mes a ${Math.max(...p.msi)} meses sin intereses con tarjetas participantes.` : '');
  } else { $('k-cost').hidden = true; $('cost-note').hidden = false; }

  last = {
    tipo, consumo_kwh: kwh, periodo: inputs.periodo.value, cobertura: cob, objetivo: obj,
    cargas: wantsBackup ? checked.map((c) => c.dataset.t) : [], horas_respaldo: wantsBackup ? horas : null,
    resultado: { kwp: +kwpReal.toFixed(2), paneles, bateria_kwh: bat ? +(Math.ceil(bat * 10) / 10).toFixed(1) : 0, generacion_kwh_mes: Math.round(gen), area_m2: Math.round(area) },
    supuestos: { hsp: cfg.hsp, pr: cfg.pr, dod: cfg.dod, panel_w: cfg.panelW },
  };
}

root.addEventListener('input', compute);
root.addEventListener('change', compute);
window.__slCalc = { snapshot: () => last };

// Valores iniciales según ?rubro=
const q = new URLSearchParams(location.search).get('rubro');
if (q === 'comercial') { (root.querySelector('input[name=tipo][value=negocio]') as HTMLInputElement).checked = true; inputs.periodo.value = 'mensual'; }
if (q === 'industrial') { ($('ind-note') as HTMLElement).hidden = false; }
root.querySelectorAll('input[name=tipo]').forEach((r) => r.addEventListener('change', () => {
  inputs.periodo.value = inputs.tipo() === 'negocio' ? 'mensual' : 'bimestral';
}));
// El formulario de cotización reporta el rubro correcto
document.querySelector<HTMLFormElement>('form.lead-form')?.addEventListener('submit', () => {
  const f = document.querySelector<HTMLFormElement>('form.lead-form')!;
  f.dataset.rubro = inputs.tipo() === 'negocio' ? 'comercial' : 'residencial';
}, true);
compute();
