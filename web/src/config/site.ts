// Única fuente de verdad de datos de contacto y marca. Cambiar aquí cambia todo el sitio.
export const site = {
  name: 'Softlanding',
  tagline: 'Your Trusted Partner',
  url: 'https://softlanding-energy.com',
  empresa: 'ACISSA — Almacenamiento y Eficiencia de Energía',
  whatsapp: '524461398144',
  telefono: '+52 446 139 8144',
  ciudad: 'Querétaro, Qro.',
  cobertura: 'Base en Querétaro, cobertura en el centro del país',
  // Pendientes de confirmar por Softlanding (aparecen en el Aviso de Privacidad)
  razonSocial: 'Softlanding',
  domicilio: '[Domicilio fiscal por confirmar]',
} as const;

export const wa = (mensaje: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;

// Parámetros de la calculadora. `pricing: null` = no se muestra costo hasta que Softlanding
// entregue precios reales (nunca se inventan). Para activarlo, llenar los rangos en MXN.
export const calc = {
  hspBajio: 5.2,        // horas sol pico/día típicas del Bajío (supuesto de ingeniería, se afina en visita)
  performanceRatio: 0.78,
  panelWatts: 625,      // panel bifacial de referencia (material de Softlanding)
  dod: 0.9,             // profundidad de descarga LiFePO4
  pricing: null as null | {
    kwp: { min: number; max: number };         // MXN por kWp instalado
    bateriaKwh: { min: number; max: number };  // MXN por kWh de batería
    fijo: { min: number; max: number };        // MXN costo fijo de instalación
    msi: number[];                             // plazos MSI disponibles, ej. [3, 6, 12]
  },
};
