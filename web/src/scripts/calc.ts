import './utm';
interface Cfg { hsp: number; pr: number; panelW: number }
const root = document.getElementById('calc')!;
const cfg: Cfg = JSON.parse(root.dataset.cfg!);
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const consumo = $<HTMLInputElement>('c-consumo');
const periodo = $<HTMLSelectElement>('c-periodo');
const ciudad = $<HTMLInputElement>('c-ciudad');
const respaldo = $<HTMLInputElement>('c-respaldo');
const horas = $<HTMLSelectElement>('c-horas');
const whatsapp = $<HTMLAnchorElement>('calc-whatsapp');
const defaultWhatsApp = whatsapp.href;
const tipo = () => root.querySelector<HTMLInputElement>('input[name=tipo]:checked')!.value;
let last: Record<string, unknown> | null = null;
function compute() {
  const sector = tipo();
  const industrial = sector === 'industrial';
  const backup = respaldo.checked && !industrial;
  $('resp-box').hidden = !backup;
  $('backup-note').hidden = !backup;
  $('cargas-casa').hidden = sector !== 'casa';
  $('cargas-negocio').hidden = sector !== 'negocio';
  $('industrial-result').hidden = !industrial;
  $('ind-note').hidden = !industrial;
  const kwh = Number(consumo.value);
  const location = ciudad.value.trim();
  const valid = consumo.value !== '' && consumo.validity.valid && Number.isFinite(kwh) && kwh > 0 && location.length > 0;
  $('empty').hidden = industrial || valid;
  $('empty').textContent = consumo.value && !consumo.validity.valid ? 'Revisa el consumo: escribe entre 1 y 200,000 kWh del periodo.' : 'Escribe tu consumo y ciudad para ver una primera orientación.';
  $('kpis').hidden = industrial || !valid;
  whatsapp.href = defaultWhatsApp;
  last = null;
  if (!valid && !industrial) return;
  const selected = [...root.querySelectorAll<HTMLInputElement>(`#cargas-${sector === 'casa' ? 'casa' : 'negocio'} input[name=carga]:checked`)].map(c => c.dataset.t!);
  const monthly = valid ? kwh / (periodo.value === 'bimestral' ? 2 : 1) : null;
  const panels = monthly === null || industrial ? null : monthly / (cfg.hsp * 30 * cfg.pr * cfg.panelW / 1000);
  const min = panels === null ? null : Math.max(1, Math.ceil(panels * 0.8));
  const max = panels === null ? null : Math.max(min!, Math.ceil(panels * 1.2));
  if (min !== null && max !== null) {
    $('r-pan').textContent = min === max ? `≈ ${min}` : `${min}–${max}`;
    $('r-area').textContent = `≈ ${Math.ceil(min * 2.8)}–${Math.ceil(max * 2.8)} m²`;
  }
  last = { tipo: sector, ciudad: location || null, consumo_kwh: valid ? kwh : null, periodo: periodo.value,
    objetivo: backup ? 'solar_y_respaldo' : 'solar', cargas: backup ? selected : [], horas_respaldo: backup ? Number(horas.value) : null,
    resultado: industrial ? { requiere_diagnostico: true } : { paneles_min: min, paneles_max: max },
    supuestos: { hsp: cfg.hsp, pr: cfg.pr, panel_w: cfg.panelW, margen_ilustrativo: 0.2, referencia: 'Bajío; sin ajuste por ciudad' } };
  const message = ['Hola Softlanding, quiero revisar mi recibo.', `Proyecto: ${sector === 'casa' ? 'casa' : sector === 'negocio' ? 'negocio' : 'industria'}.`, location ? `Ciudad: ${location}.` : '', valid ? `Consumo: ${kwh} kWh, periodo ${periodo.value}.` : '', min !== null ? `Orientación inicial: ${min}–${max} paneles, pendiente de revisión técnica.` : '', backup ? `Me interesa respaldo por ${horas.value} horas. Equipos: ${selected.join(', ') || 'por definir'}.` : ''].filter(Boolean).join('\n');
  const url = new URL(defaultWhatsApp); url.searchParams.set('text', message); whatsapp.href = url.toString();
}
root.addEventListener('input', compute);
root.addEventListener('change', compute);
window.__slCalc = { snapshot: () => last };
const rubro = new URLSearchParams(location.search).get('rubro');
if (rubro === 'comercial' || rubro === 'industrial') {
  root.querySelector<HTMLInputElement>(`input[name=tipo][value=${rubro === 'industrial' ? 'industrial' : 'negocio'}]`)!.checked = true;
  periodo.value = 'mensual';
}
root.querySelectorAll('input[name=tipo]').forEach(r => r.addEventListener('change', () => {
  periodo.value = tipo() === 'casa' ? 'bimestral' : 'mensual'; compute();
}));
document.querySelector<HTMLFormElement>('form.lead-form')?.addEventListener('submit', () => {
  document.querySelector<HTMLFormElement>('form.lead-form')!.dataset.rubro = tipo() === 'casa' ? 'residencial' : tipo() === 'industrial' ? 'industrial' : 'comercial';
}, true);
compute();
