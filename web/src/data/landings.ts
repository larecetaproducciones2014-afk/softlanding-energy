import type { ImageMetadata } from 'astro';
import type { RubroKey } from './rubros';
import resFamilia from '../assets/img/res-familia.png';
import resRed from '../assets/img/res-red.png';
import resInseguridad from '../assets/img/res-inseguridad.png';
import diagrama from '../assets/img/diagrama.png';
import producto from '../assets/img/producto.png';
import comRestaurante from '../assets/img/com-restaurante.png';
import comHotel from '../assets/img/com-hotel.png';
import comClinica from '../assets/img/com-clinica.png';
import comOficinas from '../assets/img/com-oficinas.png';
import comMerma from '../assets/img/com-merma.png';
import indHero from '../assets/img/ind-hero.png';
import indPlanta from '../assets/img/ind-planta.png';
import indManufactura from '../assets/img/ind-manufactura.png';
import indParo from '../assets/img/ind-paro.png';
import indDatacenter from '../assets/img/ind-datacenter.png';
import indAgro from '../assets/img/ind-agro.png';
import indSistema from '../assets/img/ind-sistema.png';

export interface Item { icono: string; t: string; d?: string }
export interface Landing {
  rubro: RubroKey; slug: string; nombre: string; icono: string;
  meta: string; h1: string; sub: string; imagen: ImageMetadata; imagenLista: ImageMetadata;
  dolorTitulo: string; dolor: Item[];
  cargasTitulo?: string; cargas: Item[];
  enfoque: { titulo: string; texto: string; puntos: string[] };
  experiencia?: string;
  notas?: string[];
  faq: { q: string; a: string }[];
  calc?: boolean;
}

const c = (icono: string, t: string): Item => ({ icono, t });

export const landings: Landing[] = [
  /* ───────────── RESIDENCIAL ───────────── */
  {
    rubro: 'residencial', slug: 'respaldo-apagones', nombre: 'Respaldo ante apagones', icono: 'bolt', calc: true,
    meta: 'Sistema solar con baterías de respaldo para tu casa: que el Wi‑Fi, el refrigerador, las cámaras y la iluminación sigan funcionando cuando se va la luz. Querétaro y centro del país.',
    h1: 'Que se vaya la luz no significa que tu casa se apague',
    sub: 'Paneles solares con baterías de respaldo para mantener lo importante funcionando: Wi‑Fi, refrigerador, cámaras e iluminación.',
    imagen: resFamilia, imagenLista: resRed,
    dolorTitulo: 'Un apagón no solo te deja a oscuras',
    dolor: [
      { icono: 'wifi', t: 'Comunicación', d: 'Sin módem, Wi‑Fi ni dispositivos cargados, trabajar y estudiar se detiene.' },
      { icono: 'shield', t: 'Seguridad', d: 'Cámaras, accesos y puertas eléctricas dejan de funcionar justo cuando más los necesitas.' },
      { icono: 'snow', t: 'Alimentos', d: 'Un refrigerador sin energía pone en riesgo la comida de toda la semana.' },
      { icono: 'home', t: 'Confort', d: 'Sin ventiladores, televisión ni cargadores, la rutina de la familia se complica.' },
    ],
    cargasTitulo: 'Lo que puedes mantener encendido',
    cargas: [c('wifi', 'Wi‑Fi y módem'), c('snow', 'Refrigerador'), c('bulb', 'Iluminación LED'), c('camera', 'Cámaras de seguridad'), c('shield', 'Acceso y portón eléctrico'), c('droplet', 'Bomba de agua (uso moderado)'), c('monitor', 'Laptops y celulares'), c('tv', 'TV y ventiladores')],
    enfoque: {
      titulo: 'Solar con respaldo, no solo paneles',
      texto: 'Un sistema solar conectado a la red y sin baterías se desconecta cuando CFE falla, por seguridad de la red. Lo que mantiene tu casa encendida es el almacenamiento: las baterías guardan la energía de tus paneles y la entregan cuando la necesitas.',
      puntos: ['Paneles solares bifaciales', 'Inversor híbrido (referencia: 3 kW)', 'Baterías de litio LiFePO4', 'Estructura de aluminio, protecciones, cableado e instalación profesional', 'Configuración, puesta en marcha y monitoreo desde tu celular'],
    },
    notas: ['La autonomía depende de las cargas conectadas y del tiempo de uso. Tu asesor diseña la capacidad según lo que quieras proteger.'],
    faq: [
      { q: '¿Puedo conectar toda mi casa al respaldo?', a: 'Lo más habitual es respaldar las cargas prioritarias. Respaldar toda la casa, incluyendo aire acondicionado o equipos de alto consumo, requiere más capacidad de inversor y baterías; lo evaluamos contigo.' },
      { q: '¿Qué pasa en días nublados o de lluvia?', a: 'Los paneles siguen generando con luz difusa, aunque menos, y las baterías conservan la energía acumulada. Según el diseño, el sistema también puede apoyarse en la red de CFE.' },
    ],
  },
  {
    rubro: 'residencial', slug: 'ahorro-recibo-cfe', nombre: 'Ahorro en tu recibo de luz', icono: 'coins', calc: true,
    meta: 'Reduce tu recibo de CFE con un sistema solar dimensionado a tu consumo real, con opción de baterías de respaldo. Calcula qué sistema necesitarías.',
    h1: 'Genera tu propia energía y reduce tu recibo de luz',
    sub: 'Un sistema solar dimensionado a tu consumo real, con la opción de sumar baterías para respaldo. Calcula en dos minutos qué sistema necesitarías.',
    imagen: diagrama, imagenLista: producto,
    dolorTitulo: 'Cuando el consumo sube, el recibo también',
    dolor: [
      { icono: 'coins', t: 'Tarifa de alto consumo', d: 'Si tu consumo rebasa el límite de tu zona, tu tarifa cambia y cada kWh cuesta más (tarifa DAC).' },
      { icono: 'plug', t: 'Dependencia de la red', d: 'Pagas lo que CFE cobre; no controlas el costo de tu energía.' },
      { icono: 'sun', t: 'Clima y vida en casa', d: 'Climatización, familia y trabajo desde casa elevan el consumo mes a mes.' },
      { icono: 'chart', t: 'Un gasto que puede ser inversión', d: 'La energía solar convierte un pago mensual en un activo que genera ahorro durante años.' },
    ],
    cargasTitulo: 'Qué puedes alimentar con tu sistema',
    cargas: [c('snow', 'Minisplit y climatización'), c('snow', 'Refrigerador'), c('bulb', 'Iluminación LED'), c('droplet', 'Bomba de agua'), c('home', 'Lavadora y electrodomésticos'), c('monitor', 'Oficina en casa')],
    enfoque: {
      titulo: 'Dimensionado con tu recibo',
      texto: 'Partimos de tu consumo en kWh, que ves en tu recibo, y de la radiación solar de tu zona para proponer la cantidad de paneles. Tras una visita técnica recibes una propuesta clara, sin sorpresas.',
      puntos: ['Análisis de tu recibo de CFE', 'Dimensionamiento solar a tu consumo', 'Opción con baterías si también quieres respaldo', 'Instalación, configuración y monitoreo desde tu celular'],
    },
    notas: ['El ahorro real depende de tu consumo, de tu tarifa y del tamaño del sistema. Se calcula con tu recibo.'],
    faq: [
      { q: '¿Cuánto me voy a ahorrar?', a: 'Depende de tu consumo, tu tarifa y el tamaño del sistema. Con tu recibo en mano hacemos el cálculo personalizado; nuestra calculadora te da una primera aproximación.' },
      { q: '¿Puedo dejar de depender de CFE?', a: 'Depende del esquema. Con un sistema interconectado sigues conectado a la red; con un sistema con baterías puedes depender mucho menos de ella. Te explicamos cuál conviene a tu caso.' },
    ],
  },
  {
    rubro: 'residencial', slug: 'fraccionamientos', nombre: 'Fraccionamientos y desarrollos', icono: 'building',
    meta: 'Energía solar con respaldo para áreas comunes de fraccionamientos y para desarrolladores inmobiliarios: accesos, bombeo, alumbrado y seguridad.',
    h1: 'Energía con respaldo para tu fraccionamiento o desarrollo',
    sub: 'Soluciones para áreas comunes, bombeo, accesos y seguridad, pensadas para comités, administradores y desarrolladores inmobiliarios.',
    imagen: resRed, imagenLista: resInseguridad,
    dolorTitulo: 'Las áreas comunes también dependen de la red',
    dolor: [
      { icono: 'shield', t: 'Accesos y casetas', d: 'Plumas, portones y cámaras fuera de servicio comprometen la seguridad de todos los vecinos.' },
      { icono: 'droplet', t: 'Bombeo de agua', d: 'Sin energía se detiene el suministro de agua de la comunidad.' },
      { icono: 'bulb', t: 'Iluminación', d: 'Calles y áreas comunes a oscuras elevan la sensación de inseguridad.' },
      { icono: 'coins', t: 'Cuotas de mantenimiento', d: 'El consumo eléctrico de las áreas comunes pesa en las cuotas de los vecinos.' },
    ],
    cargasTitulo: 'Cargas típicas de un fraccionamiento',
    cargas: [c('shield', 'Casetas y plumas de acceso'), c('camera', 'Cámaras CCTV'), c('bulb', 'Alumbrado de áreas comunes'), c('droplet', 'Bombas y cisterna'), c('shield', 'Portones y barreras'), c('users', 'Club house y áreas deportivas')],
    enfoque: {
      titulo: 'Para comités y para desarrolladores',
      texto: 'Para comités y administradores preparamos una propuesta clara que se pueda presentar en asamblea y ejecutar por etapas. Para desarrolladores, casas y fraccionamientos "con respaldo de energía" son un diferenciador de venta.',
      puntos: ['Diagnóstico de cargas de áreas comunes', 'Propuesta técnica y económica para asamblea', 'Instalación por etapas según prioridades', 'Paquetes por vivienda para desarrolladores'],
    },
    faq: [
      { q: '¿Cómo se aprueba un proyecto en un fraccionamiento?', a: 'Preparamos una propuesta clara para presentar en asamblea; la decisión corresponde al comité y a los vecinos conforme a su reglamento.' },
      { q: '¿Se puede hacer por etapas?', a: 'Sí. Podemos empezar por lo más crítico, como accesos y bombeo, y crecer después.' },
    ],
  },

  /* ───────────── COMERCIAL ───────────── */
  {
    rubro: 'comercial', slug: 'restaurantes', nombre: 'Restaurantes', icono: 'utensils', calc: true,
    meta: 'Respaldo con baterías y energía solar para restaurantes: protege tu cámara de frío, tu cocina y tu punto de venta, y reduce tu recibo de luz.',
    h1: 'Tu cocina y tu cámara de frío no pueden depender de la suerte',
    sub: 'Respaldo con baterías y energía solar para proteger tu inventario, tu servicio y tu recibo de luz.',
    imagen: comRestaurante, imagenLista: comMerma,
    dolorTitulo: 'Un apagón en pleno servicio',
    dolor: [
      { icono: 'snow', t: 'Cadena de frío', d: 'Una cámara de refrigeración sin energía puede significar merma de inventario en pocas horas.' },
      { icono: 'utensils', t: 'Servicio detenido', d: 'Cocina, iluminación y punto de venta fuera de servicio en plena operación.' },
      { icono: 'alert', t: 'Equipos dañados', d: 'Cortes bruscos y variaciones de voltaje dañan compresores y equipo electrónico.' },
      { icono: 'coins', t: 'Recibo de luz', d: 'La cocina y la refrigeración consumen energía durante casi todo el día.' },
    ],
    cargas: [c('snow', 'Cámaras de refrigeración y congelación'), c('snow', 'Refrigeradores y neveras'), c('utensils', 'Cocina y extracción'), c('bulb', 'Iluminación'), c('monitor', 'Punto de venta y red'), c('snow', 'Aire acondicionado de comedor'), c('camera', 'Cámaras de seguridad')],
    enfoque: {
      titulo: 'Respaldo para lo que no puede apagarse',
      texto: 'Priorizamos tus cargas críticas, normalmente refrigeración, punto de venta e iluminación, y dimensionamos energía solar para bajar tu consumo general.',
      puntos: ['Análisis de tu recibo y de tus equipos', 'Respaldo automático de cargas críticas', 'Energía solar para reducir tu consumo', 'Monitoreo y mantenimiento'],
    },
    experiencia: undefined,
    faq: [
      { q: '¿Puedo respaldar solo la refrigeración?', a: 'Sí. Podemos respaldar únicamente las cargas críticas y crecer después.' },
      { q: '¿Funciona con compresores y motores?', a: 'Sí. Dimensionamos el inversor considerando la corriente de arranque de motores y compresores, y lo validamos en el diagnóstico.' },
    ],
  },
  {
    rubro: 'comercial', slug: 'hoteles', nombre: 'Hoteles', icono: 'bed', calc: true,
    meta: 'Energía solar con respaldo para hoteles: iluminación, climatización, accesos, elevadores y cocina. Experiencia en cadena hotelera en Quintana Roo.',
    h1: 'Que el huésped no note un apagón',
    sub: 'Energía solar con respaldo para iluminación, climatización, accesos, elevadores y cocina, con experiencia en proyectos hoteleros.',
    imagen: comHotel, imagenLista: comOficinas,
    dolorTitulo: 'En hotelería, la energía es parte del servicio',
    dolor: [
      { icono: 'bed', t: 'Experiencia del huésped', d: 'Un corte afecta habitaciones, recepción y áreas públicas, y se refleja en la reputación del hotel.' },
      { icono: 'shield', t: 'Seguridad y accesos', d: 'Cerraduras electrónicas, cámaras y control de acceso necesitan energía continua.' },
      { icono: 'snow', t: 'Climatización', d: 'El aire acondicionado es una de las cargas más grandes y constantes de un hotel.' },
      { icono: 'coins', t: 'Costo de energía', d: 'La operación 24 horas hace que el consumo eléctrico sea uno de los costos más relevantes.' },
    ],
    cargas: [c('bulb', 'Iluminación de lobby y pasillos'), c('snow', 'Climatización (HVAC)'), c('shield', 'Cerraduras y control de acceso'), c('building', 'Elevadores'), c('utensils', 'Cocina y refrigeración'), c('monitor', 'Recepción y sistemas de TI'), c('droplet', 'Bombeo de agua'), c('camera', 'Cámaras de seguridad')],
    enfoque: {
      titulo: 'Energía a la medida del hotel',
      texto: 'Analizamos el perfil de consumo del hotel y proponemos generación solar y almacenamiento para reducir costo y proteger las cargas que sostienen la experiencia del huésped.',
      puntos: ['Análisis de recibo y perfil de carga', 'Respaldo de cargas críticas', 'Generación solar dimensionada al consumo', 'Monitoreo y soporte'],
    },
    experiencia: 'Entre nuestros proyectos: una cadena hotelera en Quintana Roo.',
    faq: [
      { q: '¿Se puede instalar sin afectar la operación del hotel?', a: 'Planeamos la obra por etapas y coordinamos con el equipo de mantenimiento los cortes necesarios para minimizar el impacto.' },
      { q: '¿Atienden cadenas con varias propiedades?', a: 'Sí. Podemos hacer un diagnóstico por propiedad y un plan de implementación por etapas.' },
    ],
  },
  {
    rubro: 'comercial', slug: 'clinicas-hospitales', nombre: 'Clínicas y hospitales', icono: 'heart',
    meta: 'Respaldo de energía y ahorro solar para clínicas y hospitales: equipos médicos, refrigeración de medicamentos, iluminación y áreas críticas.',
    h1: 'Continuidad de atención aunque falle la red',
    sub: 'Respaldo de energía para equipos médicos, refrigeración de medicamentos e iluminación, con generación solar para reducir el costo de operación.',
    imagen: comClinica, imagenLista: comOficinas,
    dolorTitulo: 'En salud, la continuidad es parte de la atención',
    dolor: [
      { icono: 'heart', t: 'Equipos médicos', d: 'Monitores, equipos de diagnóstico y de soporte requieren energía estable y continua.' },
      { icono: 'snow', t: 'Medicamentos y muestras', d: 'La refrigeración de medicamentos, vacunas y muestras no puede interrumpirse.' },
      { icono: 'bulb', t: 'Áreas críticas', d: 'Iluminación y climatización de quirófanos y áreas críticas deben mantenerse.' },
      { icono: 'coins', t: 'Costo de operación', d: 'Una unidad médica opera todo el día, y su consumo eléctrico es constante.' },
    ],
    cargas: [c('heart', 'Equipos de diagnóstico y monitoreo'), c('snow', 'Refrigeración de medicamentos y muestras'), c('bulb', 'Iluminación clínica'), c('monitor', 'Cómputo y expediente electrónico'), c('snow', 'Climatización de áreas críticas'), c('droplet', 'Bombas de agua'), c('camera', 'Cámaras y accesos'), c('wifi', 'Comunicaciones')],
    enfoque: {
      titulo: 'Respaldo diseñado con tu equipo de ingeniería',
      texto: 'Definimos contigo qué cargas son críticas y diseñamos el respaldo y la generación solar para ellas, coordinándonos con tu área de mantenimiento o ingeniería biomédica.',
      puntos: ['Identificación de cargas críticas', 'Respaldo con baterías', 'Generación solar para reducir consumo', 'Monitoreo continuo'],
    },
    notas: ['Los requisitos específicos para áreas críticas se validan con tu equipo de ingeniería biomédica y con la normativa aplicable.'],
    faq: [
      { q: '¿Pueden respaldar un quirófano o terapia intensiva?', a: 'Se evalúa caso por caso, coordinándonos con tu equipo de ingeniería biomédica y verificando los requisitos normativos aplicables.' },
      { q: '¿Atienden consultorios y clínicas pequeñas?', a: 'Sí. Para cargas menores usamos nuestra línea comercial; para hospitales con demandas altas evaluamos una microred.' },
    ],
  },
  {
    rubro: 'comercial', slug: 'plazas-comerciales', nombre: 'Plazas comerciales', icono: 'store',
    meta: 'Reduce el costo de energía de áreas comunes de plazas comerciales y asegura la operación: iluminación, elevadores, climatización y seguridad.',
    h1: 'Menos costo de energía en áreas comunes, operación asegurada',
    sub: 'Generación solar y almacenamiento para pasillos, estacionamientos, elevadores y servicios compartidos de plazas y centros comerciales.',
    imagen: comOficinas, imagenLista: comHotel,
    dolorTitulo: 'Las áreas comunes consumen todo el día',
    dolor: [
      { icono: 'bulb', t: 'Muchas horas encendido', d: 'Pasillos, estacionamiento y fachadas operan durante todo el horario comercial.' },
      { icono: 'chart', t: 'Demanda en horario punta', d: 'Si tu plaza opera en tarifa de media tensión (GDMTH), el pico en horario punta encarece la factura.' },
      { icono: 'building', t: 'Servicios que no pueden parar', d: 'Elevadores, escaleras eléctricas y seguridad dependen de energía continua.' },
      { icono: 'users', t: 'Cuotas de los locatarios', d: 'El costo de energía de áreas comunes se traslada a las cuotas de mantenimiento.' },
    ],
    cargas: [c('bulb', 'Iluminación de pasillos y estacionamiento'), c('building', 'Elevadores y escaleras eléctricas'), c('snow', 'Climatización de áreas comunes'), c('camera', 'Cámaras y control de acceso'), c('droplet', 'Bombeo'), c('monitor', 'Pantallas y señalización')],
    enfoque: {
      titulo: 'Solar y almacenamiento para áreas comunes',
      texto: 'Con el análisis de tu recibo identificamos cuánto consume la plaza y cuándo. Si aplica, el almacenamiento reduce el pico en horario punta (peak shaving).',
      puntos: ['Análisis de recibo y demanda', 'Generación solar en techos y estacionamientos', 'Almacenamiento para reducir demanda punta', 'Monitoreo de consumo'],
    },
    faq: [
      { q: '¿Se puede instalar sobre estacionamientos?', a: 'Sí, en techos y, cuando aplica, en estructuras sobre estacionamientos. Lo evaluamos en la visita técnica.' },
      { q: '¿Qué tarifa necesito para aprovechar el almacenamiento?', a: 'En tarifas con horarios como la GDMTH el almacenamiento permite mover consumo del horario punta al base. Revisamos tu recibo para confirmarlo.' },
    ],
  },
  {
    rubro: 'comercial', slug: 'oficinas-corporativos', nombre: 'Oficinas y corporativos', icono: 'building', calc: true,
    meta: 'Energía solar con respaldo para oficinas y corporativos: continuidad de servidores y telecomunicaciones, ahorro y apoyo en huella de carbono.',
    h1: 'Continuidad de trabajo y menor huella de carbono',
    sub: 'Respaldo para servidores, telecomunicaciones y equipos, más energía solar para reducir consumo y apoyar tus metas de sustentabilidad.',
    imagen: comOficinas, imagenLista: comHotel,
    dolorTitulo: 'Cuando se cae la energía, se detiene el trabajo',
    dolor: [
      { icono: 'server', t: 'Servidores y telecom', d: 'Un corte afecta servicios, datos y comunicación con clientes.' },
      { icono: 'monitor', t: 'Productividad', d: 'Sin energía y sin red, todo el equipo deja de trabajar.' },
      { icono: 'leaf', t: 'Metas de sustentabilidad', d: 'Cada vez más empresas necesitan reducir y reportar su huella de carbono.' },
      { icono: 'coins', t: 'Recibo de luz', d: 'Climatización, iluminación y equipo consumen energía todos los días.' },
    ],
    cargas: [c('server', 'Site de servidores'), c('monitor', 'Equipos de cómputo'), c('wifi', 'Telecomunicaciones y Wi‑Fi'), c('snow', 'Aire acondicionado'), c('bulb', 'Iluminación'), c('building', 'Elevadores'), c('shield', 'Control de acceso')],
    enfoque: {
      titulo: 'Energía y sustentabilidad en un mismo proyecto',
      texto: 'Además de respaldo y ahorro, ofrecemos consultoría de huella de carbono para evaluar si tu proyecto puede acceder a créditos de emisión reducida, previa verificación de requisitos técnicos, legales y ambientales.',
      puntos: ['Respaldo de cargas críticas', 'Generación solar para reducir consumo', 'Monitoreo de energía', 'Consultoría de huella de carbono'],
    },
    faq: [
      { q: '¿Pueden ayudarnos a reportar emisiones?', a: 'Ofrecemos consultoría de huella de carbono y asesoría para evaluar si el proyecto puede inscribirse en mecanismos de mitigación, siempre sujeto a verificar requisitos técnicos, legales y ambientales.' },
      { q: '¿Y si somos inquilinos?', a: 'Necesitamos la autorización del propietario o administrador del inmueble para instalar. Podemos apoyarte con una propuesta para presentarles.' },
    ],
  },
  {
    rubro: 'comercial', slug: 'escuelas-universidades', nombre: 'Escuelas y universidades', icono: 'school',
    meta: 'Energía solar para escuelas y universidades: reduce el costo de energía del campus, asegura laboratorios y cómputo, y fortalece tu compromiso de sustentabilidad.',
    h1: 'Energía para campus: ahorro, continuidad y ejemplo de sustentabilidad',
    sub: 'Generación solar y respaldo para aulas, laboratorios, cómputo y bombeo, con proyectos por etapas que se adaptan al presupuesto institucional.',
    imagen: comOficinas, imagenLista: comHotel,
    dolorTitulo: 'Un campus consume mucho y tiene presupuesto limitado',
    dolor: [
      { icono: 'coins', t: 'Presupuesto institucional', d: 'El gasto en energía compite con recursos para la actividad académica.' },
      { icono: 'flask', t: 'Laboratorios y cómputo', d: 'Equipos sensibles y centros de datos necesitan energía estable.' },
      { icono: 'droplet', t: 'Bombeo de agua', d: 'Sin energía, el suministro de agua del plantel se interrumpe.' },
      { icono: 'leaf', t: 'Imagen institucional', d: 'Un campus con energía limpia es un ejemplo para estudiantes y comunidad.' },
    ],
    cargas: [c('bulb', 'Aulas: iluminación y ventilación'), c('flask', 'Laboratorios'), c('monitor', 'Centros de cómputo'), c('server', 'Servidores y biblioteca digital'), c('droplet', 'Bombeo de agua'), c('camera', 'Cámaras y accesos'), c('utensils', 'Cafetería y refrigeración')],
    enfoque: {
      titulo: 'Proyectos por etapas',
      texto: 'Empezamos por los edificios de mayor consumo o por las cargas más críticas, y escalamos conforme el presupuesto lo permite.',
      puntos: ['Diagnóstico por edificio', 'Generación solar en techos', 'Respaldo para laboratorios y cómputo', 'Monitoreo y material didáctico de energía'],
    },
    faq: [
      { q: '¿Atienden escuelas públicas y privadas?', a: 'Sí. En el caso de instituciones públicas trabajamos bajo los esquemas de contratación que correspondan.' },
      { q: '¿Se puede hacer por edificios?', a: 'Sí, y suele ser lo recomendable: se empieza por los de mayor consumo.' },
    ],
  },
  {
    rubro: 'comercial', slug: 'pymes', nombre: 'PyMEs y negocios', icono: 'store', calc: true,
    meta: 'Energía solar con respaldo para PyMEs, comercios, talleres y bodegas: protege tus equipos, no pierdas ventas por un apagón y reduce tu recibo de luz.',
    h1: 'Tu negocio no se detiene: energía solar con respaldo para PyMEs',
    sub: 'Protege tus equipos, no pierdas ventas por un apagón y reduce tu recibo de luz con un sistema dimensionado a tu consumo.',
    imagen: comRestaurante, imagenLista: comMerma,
    dolorTitulo: 'Cada hora sin luz es una hora sin vender',
    dolor: [
      { icono: 'store', t: 'Ventas perdidas', d: 'Sin punto de venta, iluminación y refrigeración, el negocio se detiene.' },
      { icono: 'alert', t: 'Equipos dañados', d: 'Los cortes y variaciones de voltaje reducen la vida de tus equipos.' },
      { icono: 'coins', t: 'Recibo de luz', d: 'Para un negocio pequeño, la energía es un costo fijo difícil de bajar.' },
      { icono: 'plug', t: 'Dependencia de la red', d: 'No controlas ni la tarifa ni los cortes.' },
    ],
    cargas: [c('snow', 'Refrigeración y vitrinas'), c('monitor', 'Punto de venta y red'), c('bulb', 'Iluminación'), c('wrench', 'Herramientas y maquinaria ligera'), c('snow', 'Aire acondicionado'), c('camera', 'Cámaras'), c('droplet', 'Bomba de agua'), c('plug', 'Cargadores y equipo')],
    enfoque: {
      titulo: 'A la medida de tu negocio',
      texto: 'Revisamos tu recibo y tus cargas críticas y proponemos un sistema con el tamaño justo: ni de más ni de menos.',
      puntos: ['Análisis de recibo y cargas', 'Generación solar dimensionada a tu consumo', 'Respaldo con baterías para lo esencial', 'Mantenimiento y soporte'],
    },
    faq: [
      { q: '¿Cuál es el sistema más pequeño que instalan?', a: 'Tenemos sistemas desde la escala residencial. Con tu recibo y tus cargas definimos el tamaño adecuado.' },
      { q: '¿Qué pasa si rento el local?', a: 'Necesitamos la autorización del propietario. Podemos prepararte una propuesta para presentarle.' },
    ],
  },

  /* ───────────── INDUSTRIAL ───────────── */
  {
    rubro: 'industrial', slug: 'automotriz', nombre: 'Automotriz y autopartes', icono: 'car',
    meta: 'Microredes con solar y almacenamiento BESS para plantas automotrices y de autopartes: menos costo por demanda, energía estable y cumplimiento del Código de Red.',
    h1: 'Energía estable para tu línea y menos costo por demanda',
    sub: 'Microredes con generación solar y almacenamiento BESS para plantas automotrices y de autopartes. Medición, diseño y operación con inteligencia artificial.',
    imagen: indManufactura, imagenLista: indParo,
    dolorTitulo: 'Un microcorte puede detener toda la línea',
    dolor: [
      { icono: 'cog', t: 'Paros de línea', d: 'Un corte detiene robots, PLC y ensamble, y compromete las entregas justo a tiempo.' },
      { icono: 'coins', t: 'Cargo por demanda', d: 'En tarifa GDMTH el pico de demanda en horario punta encarece toda la factura.' },
      { icono: 'gauge', t: 'Calidad de la energía', d: 'Armónicos, ruido y distorsión afectan los equipos de control y el cumplimiento normativo.' },
      { icono: 'alert', t: 'Red saturada', d: 'En varias zonas industriales la red ya no puede recibir más carga ni garantizar continuidad.' },
    ],
    cargas: [c('cog', 'Líneas de ensamble y robots'), c('factory', 'Prensas y soldadura'), c('plug', 'Compresores de aire'), c('factory', 'Pintura y hornos de curado'), c('bulb', 'Iluminación de planta'), c('server', 'Cuartos de control y TI'), c('snow', 'Climatización de áreas críticas'), c('battery', 'Cargadores de montacargas')],
    enfoque: {
      titulo: 'Qué hacemos en una planta automotriz',
      texto: 'Medimos tu red, dimensionamos el almacenamiento con tu perfil real de carga y operamos la microred para recortar picos de demanda y sostener la producción.',
      puntos: ['Medición de picos, horarios y calidad de energía', 'Microred con solar y BESS integrada a tu sistema actual', 'Peak shaving y time shifting en tarifa GDMTH', 'Asesoría de cumplimiento del Código de Red'],
    },
    experiencia: 'Entre nuestros proyectos: una planta de autopartes en Tamaulipas.',
    faq: [
      { q: '¿Se integra a mi subestación y a mi sistema actual?', a: 'Sí. La microred se integra al sistema eléctrico existente con un módulo de control inteligente, y el proyecto puede implementarse por etapas.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'metalmecanica', nombre: 'Metalmecánica y metalurgia', icono: 'factory',
    meta: 'Controla los picos de demanda de hornos, soldadura y maquinaria con microredes solares y almacenamiento BESS para plantas metalmecánicas y metalúrgicas.',
    h1: 'Controla los picos de demanda de hornos, soldadura y maquinaria',
    sub: 'Almacenamiento BESS y generación solar para plantas metalmecánicas y metalúrgicas: menos cargo por demanda y más continuidad.',
    imagen: indManufactura, imagenLista: indParo,
    dolorTitulo: 'Equipos de alta potencia, picos de alto costo',
    dolor: [
      { icono: 'coins', t: 'Demanda máxima alta', d: 'Hornos, soldadura y maquinado generan picos que encarecen el cargo por demanda.' },
      { icono: 'cog', t: 'Arranque de motores', d: 'Los arranques bruscos presionan la red interna y provocan caídas de tensión.' },
      { icono: 'alert', t: 'Paros por cortes', d: 'Un corte puede arruinar piezas en proceso y detener la producción.' },
      { icono: 'gauge', t: 'Calidad de energía', d: 'Cargas no lineales generan armónicos y ruido eléctrico.' },
    ],
    cargas: [c('factory', 'Hornos'), c('bolt', 'Equipo de soldadura'), c('cog', 'Centros de maquinado'), c('plug', 'Compresores'), c('factory', 'Prensas'), c('building', 'Puentes grúa'), c('snow', 'Sistemas de enfriamiento'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Recortar el pico, no la producción',
      texto: 'El almacenamiento entrega energía en los momentos de mayor demanda y se carga cuando la tarifa es más baja, reduciendo el costo sin frenar la planta.',
      puntos: ['Medición de picos y horarios', 'BESS dimensionado al perfil real', 'Peak shaving y time shifting', 'Evaluación del contrato y la tarifa eléctrica'],
    },
    experiencia: 'Entre nuestros proyectos: una planta de manufactura en Guanajuato.',
    faq: [
      { q: '¿Sirve si mi consumo es muy variable?', a: 'Sí: justamente el perfil real de carga, medido durante un periodo representativo, es lo que define el dimensionamiento del almacenamiento.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'plasticos', nombre: 'Plásticos', icono: 'layers',
    meta: 'Energía estable y menor cargo por demanda para plantas de plásticos: inyectoras, extrusoras y chillers con microredes solares y BESS.',
    h1: 'Energía estable para inyectoras, extrusoras y chillers',
    sub: 'Microredes con solar y almacenamiento BESS para plantas de plásticos: menos picos de demanda y menos riesgo por interrupciones.',
    imagen: indManufactura, imagenLista: indParo,
    dolorTitulo: 'Si la línea se detiene, el proceso se pierde',
    dolor: [
      { icono: 'cog', t: 'Picos de arranque', d: 'Inyectoras, extrusoras y chillers generan picos de demanda al arrancar y operar.' },
      { icono: 'alert', t: 'Material en proceso', d: 'Una interrupción puede dejar material atrapado en máquina y obligar a purgar o reprocesar.' },
      { icono: 'snow', t: 'Enfriamiento continuo', d: 'Chillers y torres deben mantenerse operando para sostener la calidad.' },
      { icono: 'coins', t: 'Costo energético', d: 'La energía es uno de los principales costos variables del proceso.' },
    ],
    cargas: [c('cog', 'Inyectoras'), c('layers', 'Extrusoras'), c('snow', 'Chillers y torres de enfriamiento'), c('factory', 'Atemperadores de molde'), c('plug', 'Compresores'), c('factory', 'Secadores de resina'), c('building', 'Montacargas'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Proteger el proceso y bajar el costo',
      texto: 'Medimos tu consumo real, definimos qué cargas deben respaldarse y dimensionamos almacenamiento y generación para reducir demanda y sostener la operación.',
      puntos: ['Medición de picos, horarios y calidad de energía', 'Respaldo de cargas críticas del proceso', 'Peak shaving en tarifa GDMTH', 'Reportes predictivos de energía'],
    },
    faq: [
      { q: '¿Puede el almacenamiento arrancar motores grandes?', a: 'Se dimensiona considerando la corriente de arranque de tus equipos. Lo validamos con la medición de tu red.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'alimentos', nombre: 'Alimentos y bebidas', icono: 'snow',
    meta: 'Protege la cadena de frío y la producción de plantas de alimentos con microredes solares y almacenamiento BESS: continuidad y menor costo de energía.',
    h1: 'Protege tu cadena de frío y tu producción',
    sub: 'Microredes con solar y almacenamiento BESS para plantas de alimentos y bebidas: continuidad en refrigeración y menor costo de energía.',
    imagen: comMerma, imagenLista: indSistema,
    dolorTitulo: 'La energía es parte de la inocuidad',
    dolor: [
      { icono: 'snow', t: 'Cadena de frío', d: 'Una falla de energía pone en riesgo producto terminado y materia prima.' },
      { icono: 'alert', t: 'Merma', d: 'Cada interrupción puede traducirse en producto fuera de temperatura y pérdidas.' },
      { icono: 'file', t: 'Auditorías y registros', d: 'La continuidad en temperatura es parte de lo que auditan tus clientes y certificaciones.' },
      { icono: 'coins', t: 'Consumo constante', d: 'La refrigeración industrial opera todo el día y pesa en la factura.' },
    ],
    cargas: [c('snow', 'Cámaras de frío y congelación'), c('factory', 'Líneas de proceso y empaque'), c('snow', 'Sistemas de refrigeración industrial'), c('droplet', 'Bombeo'), c('plug', 'Compresores'), c('server', 'Cuartos de control'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Continuidad donde más importa',
      texto: 'Definimos contigo las cargas que no pueden detenerse y diseñamos almacenamiento y generación para sostenerlas y reducir el costo.',
      puntos: ['Medición de consumo y calidad de energía', 'Respaldo de refrigeración y proceso', 'Peak shaving y time shifting', 'Monitoreo y reportes'],
    },
    notas: ['Los requisitos de inocuidad de tus clientes y certificaciones se revisan caso por caso.'],
    faq: [
      { q: '¿Puede respaldar refrigeración industrial completa?', a: 'Depende de la carga total y de la autonomía deseada. El diagnóstico define la capacidad necesaria y el alcance por etapas.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'aeroespacial', nombre: 'Aeroespacial', icono: 'plane',
    meta: 'Calidad y continuidad de energía para plantas aeroespaciales: procesos largos, equipos de precisión y apoyo en huella de carbono.',
    h1: 'Energía de calidad para procesos de precisión',
    sub: 'Medición de calidad de energía, almacenamiento BESS y generación solar para plantas aeroespaciales con procesos largos y equipos de precisión.',
    imagen: indManufactura, imagenLista: indSistema,
    dolorTitulo: 'La precisión depende de la energía',
    dolor: [
      { icono: 'gauge', t: 'Calidad de energía', d: 'Armónicos y distorsión pueden afectar equipos de precisión y metrología.' },
      { icono: 'cog', t: 'Procesos largos', d: 'Maquinados y tratamientos térmicos no admiten interrupciones a la mitad.' },
      { icono: 'leaf', t: 'Cadena de suministro', d: 'Cada vez más clientes piden evidencia de energía limpia y huella de carbono.' },
      { icono: 'coins', t: 'Costo por demanda', d: 'Equipos de alta potencia elevan el cargo por demanda.' },
    ],
    cargas: [c('cog', 'Centros de maquinado CNC'), c('factory', 'Hornos de tratamiento térmico'), c('flask', 'Salas limpias y climatización'), c('gauge', 'Metrología y laboratorio'), c('plug', 'Compresores'), c('server', 'Cuartos de TI'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Medir primero, decidir con datos',
      texto: 'Empezamos con medición avanzada de tu red para identificar problemas de calidad y picos, y con esa información dimensionamos la solución.',
      puntos: ['Detección de armónicos, ruido y distorsión', 'Almacenamiento que mejora la calidad de energía', 'Generación solar y consultoría de huella de carbono', 'Asesoría de cumplimiento del Código de Red'],
    },
    faq: [
      { q: '¿Pueden medir la calidad de energía de mi planta?', a: 'Sí. La medición y monitoreo avanzado identifica picos, horarios, armónicos, ruido y consumos atípicos o fugas.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'electronica-semiconductores', nombre: 'Electrónica y semiconductores', icono: 'cpu',
    meta: 'Calidad de energía y respaldo para plantas de electrónica y semiconductores: microcortes, armónicos y climatización de salas limpias.',
    h1: 'Calidad de energía para procesos que no toleran microcortes',
    sub: 'Medición, almacenamiento BESS y control inteligente para plantas de electrónica y semiconductores.',
    imagen: indSistema, imagenLista: indManufactura,
    dolorTitulo: 'Un microcorte basta para afectar un lote',
    dolor: [
      { icono: 'bolt', t: 'Microcortes y caídas de tensión', d: 'Eventos de milisegundos pueden detener líneas sensibles y afectar la calidad.' },
      { icono: 'gauge', t: 'Armónicos y ruido', d: 'La distorsión de onda afecta equipos electrónicos y el cumplimiento normativo.' },
      { icono: 'snow', t: 'Salas limpias', d: 'La climatización y el control ambiental no pueden interrumpirse.' },
      { icono: 'coins', t: 'Costo de energía', d: 'Procesos continuos y climatización elevan el consumo.' },
    ],
    cargas: [c('cpu', 'Líneas SMT'), c('factory', 'Hornos de reflujo'), c('flask', 'Salas limpias y HVAC'), c('gauge', 'Equipos de prueba'), c('server', 'Servidores'), c('snow', 'Chillers'), c('plug', 'Compresores'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Diagnóstico de calidad de energía primero',
      texto: 'Medimos tu red para ubicar eventos, armónicos y picos, y después definimos qué combinación de almacenamiento y control los atiende.',
      puntos: ['Medición avanzada de calidad de energía', 'Almacenamiento BESS que mejora la calidad', 'Microred con control inteligente', 'Asesoría del Código de Red'],
    },
    faq: [
      { q: '¿El almacenamiento puede cubrir microcortes?', a: 'Depende de la arquitectura del sistema. Lo definimos con la medición de tu red y los requisitos de tus equipos.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'farmaceutica', nombre: 'Farmacéutica', icono: 'flask',
    meta: 'Continuidad y calidad de energía para plantas farmacéuticas: salas limpias, cadena de frío y procesos regulados, con microredes solares y BESS.',
    h1: 'Continuidad de energía para procesos regulados',
    sub: 'Respaldo, calidad de energía y generación solar para plantas farmacéuticas, coordinados con tu área de calidad y validación.',
    imagen: indSistema, imagenLista: indManufactura,
    dolorTitulo: 'En procesos regulados, una interrupción cuesta más',
    dolor: [
      { icono: 'snow', t: 'Cadena de frío', d: 'Producto y materia prima requieren temperatura controlada de forma continua.' },
      { icono: 'flask', t: 'Salas limpias', d: 'La climatización y la presión diferencial deben mantenerse operando.' },
      { icono: 'file', t: 'Registros y validación', d: 'Los eventos de energía pueden convertirse en desviaciones que hay que documentar.' },
      { icono: 'coins', t: 'Costo de energía', d: 'HVAC y refrigeración operan todo el día y pesan en la factura.' },
    ],
    cargas: [c('flask', 'HVAC de salas limpias'), c('snow', 'Cámaras de refrigeración'), c('factory', 'Líneas de producción y llenado'), c('gauge', 'Laboratorio'), c('droplet', 'Agua purificada'), c('plug', 'Compresores'), c('server', 'TI y automatización'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Diseño coordinado con calidad y validación',
      texto: 'Las soluciones se integran respetando los requisitos de tu planta, y se coordinan con las áreas de calidad y validación.',
      puntos: ['Medición y diagnóstico energético', 'Respaldo de cargas críticas', 'Generación solar y almacenamiento', 'Evaluación de contrato y tarifa'],
    },
    notas: ['Los requisitos de buenas prácticas de manufactura y validación se coordinan con tu área de calidad.'],
    faq: [
      { q: '¿Participan en la validación del sistema?', a: 'Nos coordinamos con tu área de calidad y validación para documentar lo que corresponda a la integración del sistema.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'data-centers', nombre: 'Centros de datos', icono: 'server',
    meta: 'Energía firme para centros de datos en zonas con red saturada: microredes con solar y almacenamiento BESS, calidad de energía y control con IA. Socios de la Asociación Mexicana de Data Centers.',
    h1: 'Energía firme para centros de datos, aun con la red saturada',
    sub: 'Microredes con almacenamiento BESS, generación solar y control con inteligencia artificial para centros de datos.',
    imagen: indDatacenter, imagenLista: indSistema,
    dolorTitulo: 'La demanda de energía crece más rápido que la red',
    dolor: [
      { icono: 'alert', t: 'Red saturada', d: 'En varias zonas industriales la energía es insuficiente o inestable, y no se pueden recibir más cargas.' },
      { icono: 'server', t: 'Continuidad', d: 'Cualquier falla de energía afecta disponibilidad y compromisos de servicio.' },
      { icono: 'gauge', t: 'Calidad de energía', d: 'La distorsión y los eventos de red afectan equipos críticos.' },
      { icono: 'coins', t: 'Costo de energía', d: 'Un centro de datos opera 24/7 y su consumo es uno de sus mayores costos.' },
    ],
    cargas: [c('server', 'Salas de servidores'), c('snow', 'Climatización de precisión'), c('battery', 'UPS y respaldo'), c('wifi', 'Redes y telecomunicaciones'), c('shield', 'Seguridad física'), c('bulb', 'Iluminación')],
    enfoque: {
      titulo: 'Microred para capacidad, calidad y costo',
      texto: 'Combinamos almacenamiento BESS y generación solar con control inteligente para sostener la disponibilidad de energía, mejorar su calidad y administrar el costo.',
      puntos: ['Medición y dimensionamiento del almacenamiento', 'Microred integrada con control inteligente', 'Reportes predictivos con IA', 'Asesoría jurídico‑regulatoria con CNE, CENACE y CFE'],
    },
    experiencia: 'Somos socios comerciales de la Asociación Mexicana de Data Centers.',
    faq: [
      { q: '¿Pueden operar sin depender de la red?', a: 'Según el diseño, las microredes pueden operar como sistemas de autoconsumo con alta autonomía. El alcance se define con tu perfil de carga y con el marco regulatorio aplicable.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'parques-industriales', nombre: 'Parques industriales', icono: 'building',
    meta: 'Energía como ventaja competitiva para parques industriales: diagnóstico a inquilinos, microredes por etapas y energía firme para atraer y retener empresas.',
    h1: 'Energía como ventaja competitiva para tu parque industrial',
    sub: 'Un programa de energía para operadores y desarrolladores de parques: diagnóstico a inquilinos y microredes por etapas.',
    imagen: indHero, imagenLista: indPlanta,
    dolorTitulo: 'Los inquilinos eligen parques con energía confiable',
    dolor: [
      { icono: 'alert', t: 'Energía firme', d: 'Las empresas buscan certeza de suministro antes de instalarse o ampliar.' },
      { icono: 'plug', t: 'Infraestructura saturada', d: 'La capacidad disponible de la red limita nuevas naves y ampliaciones.' },
      { icono: 'coins', t: 'Costo de áreas comunes', d: 'Alumbrado, bombeo y seguridad del parque pesan en las cuotas.' },
      { icono: 'building', t: 'Diferenciación', d: 'Ofrecer energía eficiente y limpia distingue a tu parque frente a otros.' },
    ],
    cargas: [c('bulb', 'Alumbrado de vialidades'), c('shield', 'Casetas y seguridad'), c('droplet', 'Bombeo'), c('factory', 'Techos de naves'), c('building', 'Áreas administrativas')],
    enfoque: {
      titulo: 'Un acuerdo, acceso a muchos inquilinos',
      texto: 'Con un esquema de diagnóstico para los inquilinos del parque y soluciones por etapas, la energía se convierte en parte de la oferta del parque.',
      puntos: ['Diagnóstico energético a inquilinos', 'Microredes por etapas, de 0.5 MW en adelante', 'Energía en áreas comunes', 'Asesoría jurídico‑regulatoria'],
    },
    faq: [
      { q: '¿Cómo se estructura un programa para el parque?', a: 'Se define contigo según el tipo de parque y de inquilinos: diagnóstico, acuerdos con los inquilinos interesados y proyectos por etapas.' },
    ],
  },
  {
    rubro: 'industrial', slug: 'agua-y-gobierno', nombre: 'Sistemas de agua y gobierno', icono: 'droplet',
    meta: 'Reduce el costo de energía de sistemas de agua, municipios y edificios públicos con generación solar y almacenamiento. Experiencia con una Comisión Estatal de Agua.',
    h1: 'Menos costo de energía para sistemas de agua y edificios públicos',
    sub: 'Bombeo, alumbrado y edificios administrativos de organismos operadores, municipios y gobiernos estatales.',
    imagen: indAgro, imagenLista: indSistema,
    dolorTitulo: 'La energía es de los mayores costos de operar agua',
    dolor: [
      { icono: 'droplet', t: 'Bombeo', d: 'Pozos y rebombeos concentran gran parte del gasto eléctrico de un organismo operador.' },
      { icono: 'alert', t: 'Servicio continuo', d: 'Una falla de energía interrumpe el suministro a la población.' },
      { icono: 'coins', t: 'Presupuesto público', d: 'El gasto en energía compite con inversión en infraestructura.' },
      { icono: 'file', t: 'Esquemas de contratación', d: 'Los proyectos públicos requieren esquemas claros de adjudicación o licitación.' },
    ],
    cargas: [c('droplet', 'Pozos y bombeo'), c('flask', 'Plantas de tratamiento'), c('droplet', 'Cárcamos y rebombeos'), c('bulb', 'Alumbrado público'), c('building', 'Edificios administrativos'), c('wifi', 'Telemetría y control')],
    enfoque: {
      titulo: 'Proyectos para el sector público',
      texto: 'Evaluamos el costo real de energía, proponemos generación y almacenamiento donde convenga y apoyamos la integración del expediente técnico.',
      puntos: ['Evaluación de contrato y tarifa eléctrica', 'Generación solar y almacenamiento', 'Asesoría jurídico‑regulatoria', 'Apoyo con expediente técnico'],
    },
    experiencia: 'Entre nuestros proyectos: una Comisión Estatal de Agua en Sonora.',
    notas: ['Para entidades públicas trabajamos bajo los esquemas de contratación que correspondan: adjudicación, invitación o licitación.'],
    faq: [
      { q: '¿Atienden municipios y alumbrado público?', a: 'Sí: evaluamos edificios públicos, alumbrado y sistemas de bombeo. El esquema de contratación depende de cada entidad.' },
    ],
  },
];

export const landingsBy = (rubro: RubroKey) => landings.filter((l) => l.rubro === rubro);
export const findLanding = (rubro: RubroKey, slug: string) => landings.find((l) => l.rubro === rubro && l.slug === slug);
