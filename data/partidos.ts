// partidos.ts
import { ImageSourcePropType } from 'react-native';

export interface PartidoPolitico {
  name: string;
  president: string;
  logo: ImageSourcePropType;
  propuestas: string[];
  planes: string[];
}

const partidosPoliticos: PartidoPolitico[] = [
  {
    "name": "ACCION POPULAR",
    "president": "JULIO ABRAHAM CHAVEZ CHIONG",
    "logo": require('../assets/AccionPopular.webp'),
    "propuestas": [
      "Fortalecimiento del sistema de justicia y lucha contra la corrupción",
      "Reactivación económica con enfoque en pymes y emprendedores",
      "Reforma del sistema de salud pública y universalización del seguro"
    ],
    "planes": [
      "Plan Nacional de Integridad y Transparencia 2025",
      "Programa de Reactivación Productiva Sostenible",
      "Sistema Nacional de Salud Universal"
    ]
  },
  {
    "name": "ADELANTE PUEBLO UNIDO",
    "president": "Andrés Ruiz",
    "logo": require('../assets/adelantepuebloandino.webp'),
    "propuestas": [
      "Democracia participativa con presupuestos participativos en todos los niveles",
      "Economía social y solidaria con apoyo a cooperativas",
      "Defensa de los derechos laborales y sindicales"
    ],
    "planes": [
      "Ley de Democracia Participativa y Control Social",
      "Programa Nacional de Economía Social y Solidaria",
      "Estatuto del Trabajador y Trabajadora"
    ]
  },
  {
    "name": "AHORA NACION - AN",
    "president": "Freddy Ronald Chiroque Vigo",
    "logo": require('../assets/ahoranacion.webp'),
    "propuestas": [
      "Transición energética hacia fuentes 100% renovables para 2040",
      "Protección y conservación de la biodiversidad amazónica",
      "Agricultura sostenible y seguridad alimentaria"
    ],
    "planes": [
      "Plan Nacional de Transición Energética 2040",
      "Programa de Conservación de la Amazonía Peruana",
      "Estrategia Nacional de Seguridad Alimentaria"
    ]
  },
  {
    "name": "ALIANZA PARA EL PROGRESO",
    "president": "Cesar Acuña Peralta",
    "logo": require('../assets/alianzaparaelprogreso.webp'),
    "propuestas": [
      "Educación superior gratuita y de calidad para todos",
      "Ciencia, tecnología e innovación como motor del desarrollo",
      "Infraestructura educativa y tecnológica a nivel nacional"
    ],
    "planes": [
      "Programa Nacional de Becas Universitarias Integrales",
      "Plan Nacional de Ciencia, Tecnología e Innovación 2030",
      "Infraestructura Educativa del Siglo XXI"
    ]
  },
  {
    "name": "AVANZA PAIS",
    "president": "Juan Alberto Sanchez Perez",
    "logo": require('../assets/avanzapais.webp'),
    "propuestas": [
      "Integración productiva de cadenas de valor nacionales",
      "Alianzas público-privadas para el desarrollo territorial",
      "Competitividad y productividad con inclusión social"
    ],
    "planes": [
      "Plan Nacional de Competitividad y Productividad",
      "Programa de Desarrollo Territorial Integrado",
      "Estrategia de Alianzas Público-Privadas Sostenibles"
    ]
  },
  {
    "name": "PARTIDO APRISTA PERUANO",
    "president": "Enrique Torres",
    "logo": require('../assets/apra.webp'),
    "propuestas": [
      "Justicia social con redistribución equitativa de la riqueza",
      "Desarrollo con dignidad y respeto a los derechos humanos",
      "Estado garante de servicios sociales universales"
    ],
    "planes": [
      "Programa Nacional de Inclusión y Equidad Social",
      "Plan de Desarrollo Humano Integral",
      "Sistema Nacional de Protección Social"
    ]
  },
  {
    "name": "BATALLA PERU",
    "president": "Andrés Flores",
    "logo": require('../assets/batallaperu.webp'),
    "propuestas": [
      "Combate frontal a la pobreza y desigualdad extrema",
      "Lucha anticorrupción con tolerancia cero",
      "Seguridad ciudadana y justicia rápida"
    ],
    "planes": [
      "Plan Nacional de Lucha contra la Pobreza Extrema",
      "Sistema Integral Anticorrupción",
      "Estrategia Nacional de Seguridad Ciudadana"
    ]
  },
  {
    "name": "PARTIDO CIUDADANOS POR EL PERU",
    "president": "Carlos Flores",
    "logo": require('../assets/partidopoliticoaccionperu.webp'),
    "propuestas": [
      "Participación ciudadana en la gestión pública",
      "Transparencia y rendición de cuentas permanente",
      "Espacios públicos dignos y ciudades sostenibles"
    ],
    "planes": [
      "Ley de Participación Ciudadana y Control Social",
      "Sistema Nacional de Transparencia y Datos Abiertos",
      "Plan Nacional de Desarrollo Urbano Sostenible"
    ]
  },
  {
    "name": "COMUNIDAD POLITICA INKA PERU",
    "president": "Jorge Vargas",
    "logo": require('../assets/comunidadpoliticainkaperu.webp'),
    "propuestas": [
      "Reconocimiento y valoración de la cosmovisión andina",
      "Estado plurinacional con autonomías regionales",
      "Saberes ancestrales en educación y salud"
    ],
    "planes": [
      "Plan Nacional de Interculturalidad",
      "Estatuto de Autonomías Regionales",
      "Programa de Medicina Tradicional Integrativa"
    ]
  },
  {
    "name": "FE EN EL PERU",
    "president": "Rosa Navarro",
    "logo": require('../assets/feenelperu.webp'),
    "propuestas": [
      "Valores éticos y espirituales en la gestión pública",
      "Fortalecimiento de la familia como núcleo social",
      "Economía con rostro humano y solidaridad"
    ],
    "planes": [
      "Programa Nacional de Valores y Ética Pública",
      "Plan Integral de Fortalecimiento Familiar",
      "Estrategia de Economía Solidaria y Comunitaria"
    ]
  },
  {
    "name": "FRENTE POPULAR AGRICOLA",
    "president": "Mario López",
    "logo": require('../assets/frepap.webp'),
    "propuestas": [
      "Revolución agropecuaria con tecnología e innovación",
      "Soberanía y seguridad alimentaria nacional",
      "Agricultura familiar competitiva y sostenible"
    ],
    "planes": [
      "Plan Nacional de Desarrollo Agropecuario",
      "Programa de Soberanía y Seguridad Alimentaria",
      "Estrategia de Agricultura Familiar Tecnificada"
    ]
  },
  {
    "name": "PARTIDO POLITICO FUERZA MODERNA",
    "president": "Jorge Ramírez",
    "logo": require('../assets/fuerzamoderna.webp'),
    "propuestas": [
      "Infraestructura de calidad para la competitividad",
      "Logística nacional integrada y eficiente",
      "Conectividad multimodal territorial"
    ],
    "planes": [
      "Plan Nacional de Infraestructura 2030",
      "Sistema Logístico Nacional Integrado",
      "Programa de Conectividad Multimodal"
    ]
  },
  {
    "name": "FUERZA POPULAR",
    "president": "Mario Chávez",
    "logo": require('../assets/keiko.webp'),
    "propuestas": [
      "Orden y seguridad para el desarrollo nacional",
      "Protección a la inversión privada productiva",
      "Crecimiento económico estable y sostenible"
    ],
    "planes": [
      "Plan Nacional de Seguridad y Orden Público",
      "Programa de Promoción de Inversiones",
      "Estrategia de Crecimiento Económico Sostenible"
    ]
  },
  {
    "name": "PARTIDO POLITICO INTEGRIDAD DEMOCRATICA",
    "president": "Daniela Rodríguez",
    "logo": require('../assets/integridaddemocratica.webp'),
    "propuestas": [
      "Transparencia total en la gestión pública",
      "Fiscalización ciudadana permanente",
      "Elecciones internas democráticas en todos los partidos"
    ],
    "planes": [
      "Sistema Nacional de Transparencia y Integridad",
      "Programa de Control Social y Ciudadano",
      "Ley de Democratización de los Partidos Políticos"
    ]
  },
  {
    "name": "JUNTOS POR EL PERU",
    "president": "Pedro Rojas",
    "logo": require('../assets/juntosporelperu.webp'),
    "propuestas": [
      "Unidad nacional y diálogo permanente",
      "Concertación plural para grandes acuerdos",
      "Soluciones pactadas con legitimidad social"
    ],
    "planes": [
      "Plan Nacional de Diálogo y Concertación",
      "Programa de Grandes Acuerdos Nacionales",
      "Estrategia de Gobernabilidad Democrática"
    ]
  },
  {
    "name": "LIBERTAD POPULAR",
    "president": "Enrique Díaz",
    "logo": require('../assets/libertadpopular.webp'),
    "propuestas": [
      "Libertades individuales y derechos fundamentales",
      "Mercado regulado con competencia y transparencia",
      "Emprendimiento libre y reducción de burocracia"
    ],
    "planes": [
      "Programa de Fortalecimiento de Libertades Individuales",
      "Plan de Competencia y Transparencia de Mercados",
      "Estrategia Nacional de Emprendimiento"
    ]
  },
  {
    "name": "NUEVO PERU POR EL BUEN VIVIR",
    "president": "Maria Rodríguez",
    "logo": require('../assets/nuevoperu.webp'),
    "propuestas": [
      "Buen vivir como principio constitucional",
      "Desarrollo alternativo en armonía con la naturaleza",
      "Economía del cuidado y bienestar colectivo"
    ],
    "planes": [
      "Plan Nacional del Buen Vivir",
      "Programa de Desarrollo en Armonía con la Naturaleza",
      "Sistema Nacional de Cuidados"
    ]
  },
  {
    "name": "PARTIDO PAIS PARA TODOS",
    "president": "Enrique Pérez",
    "logo": require('../assets/paisparatodos.webp'),
    "propuestas": [
      "Inclusión social integral sin discriminación",
      "Atención prioritaria a personas con discapacidad",
      "Respeto y valoración de la diversidad"
    ],
    "planes": [
      "Plan Nacional de Inclusión Social Integral",
      "Programa de Atención Integral a la Discapacidad",
      "Estrategia Nacional de Valoración de la Diversidad"
    ]
  },
  {
    "name": "PARTIDO CIVICO OBRAS",
    "president": "Patricia López",
    "logo": require('../assets/partidocivicoobras.webp'),
    "propuestas": [
      "Infraestructura pública de calidad y durabilidad",
      "Mantenimiento preventivo de obras existentes",
      "Inversión técnica con altos estándares"
    ],
    "planes": [
      "Plan Nacional de Infraestructura Pública",
      "Programa de Mantenimiento Preventivo Nacional",
      "Sistema de Inversión Técnica y Calidad"
    ]
  },
  {
    "name": "PARTIDO DEL BUEN GOBIERNO",
    "president": "Jorge Díaz",
    "logo": require('../assets/partidodelbuengobierno.webp'),
    "propuestas": [
      "Gestión pública eficiente y por resultados",
      "Servicio civil meritocrático y profesional",
      "Evaluación permanente de políticas públicas"
    ],
    "planes": [
      "Plan Nacional de Modernización del Estado",
      "Programa de Profesionalización del Servicio Civil",
      "Sistema Nacional de Evaluación de Políticas Públicas"
    ]
  },
  {
    "name": "PARTIDO DEMOCRATICO SOMOS PERU",
    "president": "Ana Ramírez",
    "logo": require('../assets/partidodemocraticosomosperu.webp'),
    "propuestas": [
      "Desarrollo humano integral con capacidades",
      "Capital social y redes comunitarias",
      "Tejido asociativo para el desarrollo local"
    ],
    "planes": [
      "Plan Nacional de Desarrollo Humano Integral",
      "Programa de Fortalecimiento del Capital Social",
      "Estrategia de Asociatividad para el Desarrollo Local"
    ]
  },
  {
    "name": "PARTIDO FRENTE DE LA ESPERANZA 2021",
    "president": "Enrique Rodríguez",
    "logo": require('../assets/partidofrentelaesperanza.webp'),
    "propuestas": [
      "Oportunidades para jóvenes en educación y empleo",
      "Reinserción social para poblaciones vulnerables",
      "Segundas oportunidades laborales y educativas"
    ],
    "planes": [
      "Plan Nacional de Oportunidades para Jóvenes",
      "Programa de Reinserción Social Integral",
      "Estrategia de Segundas Oportunidades"
    ]
  },
  {
    "name": "PARTIDO MORADO",
    "president": "Sofia Gonzales",
    "logo": require('../assets/partidomorado.webp'),
    "propuestas": [
      "Legalización del cannabis medicinal y uso terapéutico",
      "Matrimonio igualitario y derechos LGTBIQ+",
      "Estado laico fortalecido y pluralismo religioso"
    ],
    "planes": [
      "Programa Nacional de Cannabis Medicinal",
      "Ley de Matrimonio Igualitario y Uniones Civiles",
      "Plan de Fortalecimiento del Estado Laico"
    ]
  },
  {
    "name": "PARTIDO PATRIOTICO DEL PERU",
    "president": "Lucia Díaz",
    "logo": require('../assets/partidopatrioticoperu.webp'),
    "propuestas": [
      "Defensa y valoración de los símbolos patrios",
      "Historia nacional en el currículo educativo",
      "Reconocimiento al heroísmo civil y militar"
    ],
    "planes": [
      "Programa Nacional de Identidad y Simbolismo Patrio",
      "Plan de Fortalecimiento de la Educación Histórica",
      "Sistema de Reconocimientos al Heroísmo Nacional"
    ]
  },
  {
    "name": "PARTIDO POLITICO TODO CON EL PUEBLO",
    "president": "Daniel Gonzales",
    "logo": require('../assets/partidopoliticotodoconelpueblo.webp'),
    "propuestas": [
      "Consulta popular vinculante para decisiones nacionales",
      "Presupuestos participativos en todos los gobiernos locales",
      "Rendición de cuentas permanente y accesible"
    ],
    "planes": [
      "Ley de Consultas Populares Vinculantes",
      "Programa Nacional de Presupuestos Participativos",
      "Sistema de Rendición de Cuentas Permanente"
    ]
  },
  {
    "name": "PARTIDO POLITICO PUEBLO CONSCIENTE",
    "president": "Manuel Salazar",
    "logo": require('../assets/partidopoliticopopularvocesdelpueblo.webp'),
    "propuestas": [
      "Educación crítica para ciudadanía activa",
      "Consumo responsable y economía circular",
      "Participación vecinal en la gestión local"
    ],
    "planes": [
      "Plan Nacional de Educación Ciudadana",
      "Programa de Consumo Responsable y Economía Circular",
      "Estrategia de Participación Vecinal Activa"
    ]
  },
  {
    "name": "PARTIDO POLITICO NACIONAL PERU LIBRE",
    "president": "Jorge Morales",
    "logo": require('../assets/partidopoliticonacionalperulibre.webp'),
    "propuestas": [
      "Economía planificada con participación social",
      "Nacionalización de recursos estratégicos mineros",
      "Reforma agraria integral con soberanía alimentaria"
    ],
    "planes": [
      "Plan Nacional de Economía Planificada",
      "Programa de Nacionalización de Recursos Estratégicos",
      "Ley de Reforma Agraria Integral"
    ]
  },
  {
    "name": "PARTIDO POLITICO PERU PRIMERO",
    "president": "Jorge Castillo",
    "logo": require('../assets/partidopoliticoperuprimero.webp'),
    "propuestas": [
      "Interés nacional en relaciones internacionales",
      "Defensa de la soberanía y integridad territorial",
      "Desarrollo autónomo con cooperación internacional"
    ],
    "planes": [
      "Plan de Política Exterior de Interés Nacional",
      "Programa de Defensa de la Soberanía Nacional",
      "Estrategia de Desarrollo Autónomo con Cooperación"
    ]
  },
  {
    "name": "PARTIDO POLITICO POPULAR VOCES DEL PUEBLO",
    "president": "Miguel Sánchez",
    "logo": require('../assets/partidopoliticopopularvocesdelpueblo.webp'),
    "propuestas": [
      "Cabildos abiertos mensuales con autoridades",
      "Iniciativa legislativa popular efectiva",
      "Revocatoria de mandato facilitada y transparente"
    ],
    "planes": [
      "Programa Nacional de Cabildos Abiertos",
      "Ley de Iniciativa Legislativa Popular Efectiva",
      "Sistema de Revocatoria Transparente y Accesible"
    ]
  },
  {
    "name": "PARTIDO POLITICO PRIN",
    "president": "Daniel Pérez",
    "logo": require('../assets/partidopoliticoprin.webp'),
    "propuestas": [
      "Innovación pública con tecnología de punta",
      "Gestión por resultados en toda la administración",
      "Simplificación administrativa radical"
    ],
    "planes": [
      "Plan Nacional de Innovación Pública",
      "Programa de Gestión por Resultados",
      "Estrategia de Simplificación Administrativa"
    ]
  },
  {
    "name": "PARTIDO POLITICO PERUANOS UNIDOS",
    "president": "Lucia Rojas",
    "logo": require('../assets/partidoporelentendimientoyunificacion.webp'),
    "propuestas": [
      "Identidad nacional fortalecida en la diversidad",
      "Integración regional con desarrollo equilibrado",
      "Patriotismo constructivo y ciudadanía global"
    ],
    "planes": [
      "Programa de Fortalecimiento de la Identidad Nacional",
      "Plan de Integración y Desarrollo Regional Equilibrado",
      "Estrategia de Patriotismo Constructivo"
    ]
  },
  {
    "name": "PARTIDO POPULAR CRISTIANO - PPC",
    "president": "Daniela Mendoza",
    "logo": require('../assets/partidopopularcristiano.webp'),
    "propuestas": [
      "Familia como base del desarrollo social",
      "Economía social de mercado con responsabilidad",
      "Valores éticos en la función pública"
    ],
    "planes": [
      "Plan Integral de Fortalecimiento Familiar",
      "Programa de Economía Social de Mercado",
      "Código de Ética y Valores Públicos"
    ]
  },
  {
    "name": "PARTIDO POR EL ENTENDIMIENTO NACIONAL",
    "president": "Enrique Castillo",
    "logo": require('../assets/partidoporelentendimientoyunificacion.webp'),
    "propuestas": [
      "Reconciliación nacional y justicia transicional",
      "Memoria histórica para no repetición",
      "Unidad en la diversidad cultural"
    ],
    "planes": [
      "Plan Nacional de Reconciliación",
      "Programa de Memoria Histórica y Verdad",
      "Estrategia de Unidad en la Diversidad"
    ]
  },
  {
    "name": "PARTIDO SICREO",
    "president": "Enrique Paredes",
    "logo": require('../assets/partidosicreo.webp'),
    "propuestas": [
      "Crédito agropecuario accesible y oportuno",
      "Riego tecnificado para pequeños agricultores",
      "Comercio justo para productos rurales"
    ],
    "planes": [
      "Programa Nacional de Crédito Agropecuario",
      "Plan de Riego Tecnificado Masivo",
      "Estrategia de Comercio Justo Rural"
    ]
  },
  {
    "name": "PARTIDO UNIDAD Y PAZ",
    "president": "Lucia Navarro",
    "logo": require('../assets/partidounidoypaz.webp'),
    "propuestas": [
      "Mediación de conflictos sociales preventiva",
      "Cultura de paz en el sistema educativo",
      "Diálogo nacional permanente e inclusivo"
    ],
    "planes": [
      "Plan Nacional de Mediación de Conflictos",
      "Programa de Educación para la Paz",
      "Sistema de Diálogo Nacional Permanente"
    ]
  },
  {
    "name": "PARTIDO DEMOCRATA VERDE",
    "president": "Daniel Salazar",
    "logo": require('../assets/visionperu.webp'),
    "propuestas": [
      "Transición ecológica justa y progresiva",
      "Impuesto al carbono para financiar sostenibilidad",
      "Protección de la biodiversidad y ecosistemas"
    ],
    "planes": [
      "Plan Nacional de Transición Ecológica",
      "Programa de Impuestos Verdes y Sostenibilidad",
      "Estrategia de Protección de la Biodiversidad"
    ]
  },
  {
    "name": "PARTIDO POLITICO ADP",
    "president": "Ricardo Flores",
    "logo": require('../assets/partidopoliticoadp.webp'),
    "propuestas": [
      "Descentralización real con autonomía fiscal",
      "Autonomía regional con competencias claras",
      "Financiamiento territorial equitativo"
    ],
    "planes": [
      "Plan Nacional de Descentralización Real",
      "Programa de Autonomías Regionales",
      "Sistema de Financiamiento Territorial Equitativo"
    ]
  },
  {
    "name": "PARTIDO DEMOCRATICO FEDERAL",
    "president": "Ricardo Navarro",
    "logo": require('../assets/partidodemocraticosomosperu.webp'),
    "propuestas": [
      "Federalismo progresivo y ordenado",
      "Regiones autogobernadas con autosostenibilidad",
      "Pacto fiscal regional con solidaridad"
    ],
    "planes": [
      "Plan de Federalismo Progresivo",
      "Programa de Regiones Autogobernadas",
      "Pacto Fiscal Regional Solidario"
    ]
  },
  {
    "name": "PERU MODERNO",
    "president": "Pedro Pérez",
    "logo": require('../assets/perumoderno.webp'),
    "propuestas": [
      "Transformación digital del Estado peruano",
      "Ciudades inteligentes con conectividad 5G",
      "Inteligencia artificial para desarrollo nacional"
    ],
    "planes": [
      "Plan Nacional de Transformación Digital",
      "Programa de Ciudades Inteligentes y 5G",
      "Estrategia de Inteligencia Artificial Nacional"
    ]
  },
  {
    "name": "PODEMOS PERU",
    "president": "Miguel Ramírez",
    "logo": require('../assets/podemosperu.webp'),
    "propuestas": [
      "Empleo juvenil garantizado con capacitación",
      "Internet gratuito nacional de alta velocidad",
      "Deporte masivo escolar y comunitario"
    ],
    "planes": [
      "Plan Nacional de Primer Empleo Joven",
      "Programa de Internet Nacional Gratuito",
      "Estrategia de Deporte Masivo Escolar"
    ]
  },
  {
    "name": "PRIMERO LA GENTE",
    "president": "Carmen Pérez",
    "logo": require('../assets/primerolagente.webp'),
    "propuestas": [
      "Economía circular con valorización de residuos",
      "Agricultura orgánica y agroecología",
      "Conservación de bosques y reforestación"
    ],
    "planes": [
      "Plan Nacional de Economía Circular",
      "Programa de Agricultura Orgánica Sostenible",
      "Estrategia de Conservación y Reforestación"
    ]
  },
  {
    "name": "PROGRESEMOS",
    "president": "Rosa Morales",
    "logo": require('../assets/progresemos.webp'),
    "propuestas": [
      "Energías renovables masivas y descentralizadas",
      "Transporte eléctrico público accesible",
      "Ciudades inteligentes y sostenibles"
    ],
    "planes": [
      "Plan Nacional de Energías Renovables 2030",
      "Programa de Transporte Eléctrico Nacional",
      "Estrategia de Ciudades Inteligentes Perú"
    ]
  },
  {
    "name": "PARTIDO DE LOS TRABAJADORES",
    "president": "Mario Vargas",
    "logo": require('../assets/partidopatrioticoperu.webp'),
    "propuestas": [
      "Salario digno universal y negociación colectiva",
      "Derechos laborales ampliados y protegidos",
      "Economía del cuidado reconocida y remunerada"
    ],
    "planes": [
      "Plan Nacional de Salario Digno Universal",
      "Programa de Derechos Laborales Ampliados",
      "Ley de Economía del Cuidado"
    ]
  },
  {
    "name": "RENOVACION POPULAR",
    "president": "Rosa Pérez",
    "logo": require('../assets/renovacionpopular.webp'),
    "propuestas": [
      "Pensión universal para adultos mayores",
      "Créditos educativos blandos y accesibles",
      "Infraestructura deportiva nacional de calidad"
    ],
    "planes": [
      "Plan Nacional de Dignidad del Adulto Mayor",
      "Programa de Crédito Educativo Nacional",
      "Estrategia de Infraestructura Deportiva"
    ]
  },
  {
    "name": "RESURGIMIENTO UNIDO NACIONAL - RUNA",
    "president": "Carmen Ruiz",
    "logo": require('../assets/resurgimientounidonacional.webp'),
    "propuestas": [
      "Revaloración cultural indígena y afroperuana",
      "Turismo comunitario sostenible",
      "Medicina tradicional integrada al sistema de salud"
    ],
    "planes": [
      "Plan Nacional de Cultura Viva Comunitaria",
      "Programa de Turismo Comunitario Sostenible",
      "Estrategia de Salud Intercultural"
    ]
  },
  {
    "name": "SALVEMOS AL PERU",
    "president": "Andrés Gonzales",
    "logo": require('../assets/salvemosperu.webp'),
    "propuestas": [
      "Mano dura contra la corrupción organizada",
      "Fortalecimiento de las FFAA modernas",
      "Protección integral de fronteras nacionales"
    ],
    "planes": [
      "Plan Nacional de Seguridad y Lucha Anticorrupción",
      "Programa de Modernización de las FFAA",
      "Estrategia de Protección Fronteriza Integral"
    ]
  },
  {
    "name": "UN CAMINO DIFERENTE",
    "president": "Pedro Mendoza",
    "logo": require('../assets/uncaminodiferente.webp'),
    "propuestas": [
      "Reforma política integral y transparente",
      "Gobierno digital 100% accesible",
      "Incentivos a pymes y emprendedores"
    ],
    "planes": [
      "Plan Nacional Anticorrupción Total",
      "Programa de Gobierno Digital 100%",
      "Ley PYME Nacional de Fomento"
    ]
  },
  {
    "name": "UP UNIDAD POPULAR",
    "president": "Miguel Vargas",
    "logo": require('../assets/unidadpopular.webp'),
    "propuestas": [
      "Reducción de la jornada laboral a 40 horas",
      "Nacionalización de recursos estratégicos",
      "Vivienda social gratuita para familias vulnerables"
    ],
    "planes": [
      "Programa Nacional de Vivienda Social",
      "Ley de Reforma Laboral Progresista",
      "Plan de Soberanía Nacional sobre Recursos"
    ]
  },
  {
    "name": "VISION PERU",
    "president": "Luis Gonzales",
    "logo": require('../assets/visionperu.webp'),
    "propuestas": [
      "Inversión en tecnología educativa digital",
      "Modernización del sector salud con telemedicina",
      "Fomento a startups y emprendimiento tecnológico"
    ],
    "planes": [
      "Plan Digital Nacional Educación 2025",
      "Programa de Modernización Hospitalaria Integral",
      "Ley de Innovación y Emprendimiento Tecnológico"
    ]
  }
];

export default partidosPoliticos;