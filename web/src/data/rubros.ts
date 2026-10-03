import type { ImageMetadata } from 'astro';
import { generatedImages } from './generated-images';

export type RubroKey = 'residencial' | 'comercial' | 'industrial';

export interface Rubro {
  key: RubroKey;
  nombre: string;
  theme: 'res' | 'com' | 'ind';
  quien: string;            // "Para tu hogar"
  h1: string;
  sub: string;
  card: string;             // texto en la tarjeta de la home
  imagen: ImageMetadata;
  cardImagen: ImageMetadata;
  cta: string;              // texto del botón principal
  waMsg: string;
  pasosTitulo: string;
  pasos: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  // Qué mide el proceso comercial
  proceso: { t: string; d: string }[];
}

export const rubros: Record<RubroKey, Rubro> = {
  residencial: {
    key: 'residencial', nombre: 'Residencial', theme: 'res', quien: 'Para tu hogar',
    h1: 'Tu casa, siempre con energía',
    sub: 'Sistemas de energía solar con respaldo de baterías para que tu familia no se quede sin luz, Wi‑Fi, seguridad ni confort.',
    card: 'Energía solar con baterías para que tu familia no se quede sin luz ni Wi‑Fi, y para pagar menos de luz.',
    imagen: generatedImages['hub-residencial'], cardImagen: generatedImages['home-residencial'],
    cta: 'Cotiza tu sistema', waMsg: 'Hola Softlanding, quiero información de un sistema solar con respaldo para mi casa.',
    pasosTitulo: 'Genera, almacena y protege',
    pasos: [
      { t: 'Genera', d: 'Paneles solares bifaciales producen energía limpia durante el día.' },
      { t: 'Almacena', d: 'Baterías de litio LiFePO4 guardan la energía para la noche y los apagones.' },
      { t: 'Protege', d: 'Tus cargas prioritarias siguen funcionando aunque falle la red.' },
    ],
    proceso: [
      { t: 'Asesoría personalizada', d: 'Revisamos tu recibo y lo que quieres proteger.' },
      { t: 'Propuesta a tu medida', d: 'Un plan claro con el sistema, el costo y los tiempos.' },
      { t: 'Instalación profesional', d: 'Equipo especializado, sin que tengas que desconectar tu casa.' },
      { t: 'Monitoreo y soporte', d: 'Ves cuánto generas, consumes y almacenas desde tu celular.' },
    ],
    faq: [
      { q: '¿El sistema funciona cuando no hay luz de CFE?', a: 'Sí, siempre que incluya baterías. Un sistema solar conectado a la red y sin baterías se desconecta cuando CFE falla, por seguridad de la red eléctrica. Las baterías son las que mantienen tu casa encendida durante el corte.' },
      { q: '¿Cuánto dura el respaldo durante un apagón?', a: 'Depende de las cargas que conectes y de la capacidad de las baterías. Con cargas básicas como iluminación, Wi‑Fi, refrigerador y cámaras, tu asesor diseña la capacidad para la autonomía que necesitas.' },
      { q: '¿Necesito algún permiso?', a: 'Depende del tipo de sistema y de tu municipio. Tu asesor te indica si aplica algún trámite en tu caso.' },
      { q: '¿Cuánto tarda la instalación?', a: 'Una instalación residencial estándar suele completarse en uno o dos días hábiles. Te confirmamos el tiempo en tu propuesta.' },
      { q: '¿Qué mantenimiento requiere?', a: 'Muy poco: limpieza periódica de paneles y una revisión anual del sistema. También damos mantenimiento y reparación a sistemas instalados por otras empresas.' },
      { q: '¿Puedo monitorear el sistema desde mi celular?', a: 'Sí. El sistema incluye conectividad para una app donde ves generación, consumo y estado de las baterías.' },
    ],
  },
  comercial: {
    key: 'comercial', nombre: 'Comercial', theme: 'com', quien: 'Para tu negocio',
    h1: 'Tu negocio no se detiene',
    sub: 'Energía solar con baterías de respaldo para restaurantes, hoteles, clínicas, plazas, oficinas, escuelas y PyMEs: menos recibo y operación continua.',
    card: 'Restaurantes, hoteles, clínicas, plazas, oficinas, escuelas y PyMEs: menos recibo y operación continua.',
    imagen: generatedImages['hub-comercial'], cardImagen: generatedImages['home-comercial'],
    cta: 'Cotiza tu sistema', waMsg: 'Hola Softlanding, quiero información de energía solar con respaldo para mi negocio.',
    pasosTitulo: 'Un sistema pensado para cargas de negocio',
    pasos: [
      { t: 'Genera', d: 'Paneles dimensionados a tu consumo real, no a una talla única.' },
      { t: 'Almacena', d: 'Baterías para respaldar lo que no puede apagarse en tu operación.' },
      { t: 'Protege', d: 'Respaldo automático de tus cargas críticas: refrigeración, punto de venta, equipo médico, servidores.' },
    ],
    proceso: [
      { t: 'Análisis de recibo y cargas', d: 'Identificamos tu consumo, tu tarifa y las cargas críticas.' },
      { t: 'Ingeniería y propuesta', d: 'Sistema dimensionado, inversión, ahorro estimado y tiempos.' },
      { t: 'Instalación sin frenar tu operación', d: 'Planeamos la obra para interferir lo mínimo con tu negocio.' },
      { t: 'Monitoreo y mantenimiento', d: 'Seguimiento de generación y consumo, con soporte técnico.' },
    ],
    faq: [
      { q: '¿Puedo respaldar solo algunas cargas de mi negocio?', a: 'Sí. Lo habitual es respaldar las cargas críticas (refrigeración, punto de venta, equipo médico, servidores, iluminación esencial) y reducir el consumo general con energía solar.' },
      { q: '¿Cómo sé cuánto necesito?', a: 'Con tu recibo de CFE y la lista de cargas críticas. Puedes usar nuestra calculadora para una primera aproximación; la propuesta final se define tras una visita técnica.' },
      { q: '¿La instalación interrumpe mi operación?', a: 'Planeamos la instalación para interferir lo menos posible con tu operación y coordinamos los cortes necesarios con tu equipo.' },
      { q: '¿Ofrecen mantenimiento?', a: 'Sí: limpieza de paneles, revisión preventiva y reparación, incluso de sistemas instalados por otras empresas.' },
    ],
  },
  industrial: {
    key: 'industrial', nombre: 'Industrial', theme: 'ind', quien: 'Para tu planta o empresa',
    h1: 'Energía firme y más barata para tu planta',
    sub: 'Microredes con generación solar y almacenamiento BESS para industria, parques, centros de datos y gobierno: medición, diseño y operación con inteligencia artificial.',
    card: 'Microredes con solar y almacenamiento BESS para industria, centros de datos, parques y organismos públicos.',
    imagen: generatedImages['hub-industrial'], cardImagen: generatedImages['home-industrial'],
    cta: 'Solicita tu diagnóstico energético', waMsg: 'Hola Softlanding, quiero solicitar un diagnóstico energético para mi planta o empresa.',
    pasosTitulo: 'Mide, diseña y opera tu microred',
    pasos: [
      { t: 'Mide', d: 'Medición y monitoreo avanzado de tu red eléctrica: picos de consumo, horarios, calidad de la energía, armónicos y fugas.' },
      { t: 'Diseña', d: 'Microred integrada a tu sistema actual, con generación solar, almacenamiento BESS y control inteligente, dimensionada con tu perfil de carga real.' },
      { t: 'Opera', d: 'Un sistema de administración con IA decide qué fuente usar en cada momento y entrega reportes predictivos de tu energía.' },
    ],
    proceso: [
      { t: 'Diagnóstico energético', d: 'Analizamos tu recibo, tu demanda máxima y tus cargas críticas.' },
      { t: 'Ingeniería personalizada', d: 'Diseñamos la microred para tu consumo y tus objetivos.' },
      { t: 'Propuesta transparente', d: 'Inversión, ahorro estimado, tiempo de recuperación y alcance por etapas.' },
      { t: 'Implementación y operación', d: 'Instalación por etapas, monitoreo y soporte continuo.' },
    ],
    faq: [
      { q: '¿Qué es el peak shaving?', a: 'Es bajar o eliminar el pico de demanda en horario punta, que es el más caro en tarifas como la GDMTH. Se logra cargando las baterías en horario barato y usando esa energía almacenada cuando la tarifa es más alta.' },
      { q: '¿Qué es el time shifting?', a: 'Es cargar las baterías cuando la energía es barata (horario base) y descargarlas en horario punta. Las tarifas GDMTH tienen tres horarios (base, intermedia y punta) y el punta es el más caro por kWh.' },
      { q: '¿Desde qué tamaño de proyecto trabajan?', a: 'Nuestras microredes de autoconsumo están disponibles desde 0.5 MW hasta 20 MW, y se pueden implementar por etapas. Para cargas menores, consulta nuestra línea comercial.' },
      { q: '¿Qué incluye el diagnóstico energético?', a: 'Una radiografía del estado de tu sistema eléctrico: picos y horarios de consumo, calidad de la energía y dimensionamiento del almacenamiento. Con eso definimos la capacidad real que necesitas.' },
      { q: '¿Además de la microred, qué otros servicios ofrecen?', a: 'Asesoría de cumplimiento del Código de Red, asesoría jurídico‑regulatoria, evaluación del contrato y la tarifa eléctrica, y consultoría de huella de carbono.' },
      { q: '¿En qué zonas atienden?', a: 'Tenemos base en Querétaro y cobertura en el centro del país. Cuéntanos dónde está tu planta y te confirmamos.' },
    ],
  },
};

export const rubroList = [rubros.residencial, rubros.comercial, rubros.industrial];
