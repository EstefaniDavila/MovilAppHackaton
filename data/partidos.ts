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
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Logo_Acci%C3%B3n_Popular.svg/1200px-Logo_Acci%C3%B3n_Popular.svg.png" },
    "propuestas": ["Doctrina constitucional", "Institucionalidad democrática", "Tradición republicana"],
    "planes": ["Plan Doctrina Constitucional", "Institucionalidad Democrática", "Tradición Republicana"]
  },
  {
    "name": "ADELANTE PUEBLO UNIDO",
    "president": "Andrés Ruiz",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/322/322.jpg" },
    "propuestas": ["Poder popular organizado", "Democracia directa", "Control comunitario"],
    "planes": ["Plan Poder Popular Organizado", "Democracia Directa", "Control Comunitario"]
  },
  {
    "name": "AHORA NACION - AN",
    "president": "Freddy Ronald Chiroque Vigo",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/348/348.jpg" },
    "propuestas": ["Urgencia climática", "Generación renovable", "Adaptación ambiental"],
    "planes": ["Plan Urgencia Climática", "Generación Renovable", "Adaptación Ambiental"]
  },
  {
    "name": "ALIANZA PARA EL PROGRESO",
    "president": "Cesar Acuña Peralta",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Logo_Alianza_para_el_Progreso.svg/1200px-Logo_Alianza_para_el_Progreso.svg.png" },
    "propuestas": ["Educación superior masiva", "Ciencia e investigación", "Innovación productiva"],
    "planes": ["Plan Educación Superior Masiva", "Ciencia e Investigación", "Innovación Productiva"]
  },
  {
    "name": "AVANZA PAIS",
    "president": "Juan Alberto Sanchez Perez",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Logo_Avanza_Pa%C3%ADs.svg/1200px-Logo_Avanza_Pa%C3%ADs.svg.png" },
    "propuestas": ["Integración social productiva", "Alianzas público-privadas", "Desarrollo territorial"],
    "planes": ["Plan Integración Social Productiva", "Alianzas Público-Privadas", "Desarrollo Territorial"]
  },
  {
    "name": "PARTIDO APRISTA PERUANO",
    "president": "Enrique Torres",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Partido_Aprista_Peruano_logo.svg/1200px-Partido_Aprista_Peruano_logo.svg.png" },
    "propuestas": ["Justicia social histórica", "Desarrollo con dignidad", "Doctrina humanista"],
    "planes": ["Plan Justicia Social", "Desarrollo con Dignidad", "Doctrina Humanista"]
  },
  {
    "name": "BATALLA PERU",
    "president": "Andrés Flores",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/323/323.jpg" },
    "propuestas": ["Lucha contra pobreza", "Combate desigualdad", "Guerra a corrupción"],
    "planes": ["Plan Lucha contra Pobreza", "Combate Desigualdad", "Guerra a Corrupción"]
  },
  {
    "name": "PARTIDO CIUDADANOS POR EL PERU",
    "president": "Carlos Flores",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/325/325.jpg" },
    "propuestas": ["Ciudadanía activa", "Control vecinal", "Espacios públicos dignos"],
    "planes": ["Plan Ciudadanía Activa", "Control Vecinal", "Espacios Públicos Dignos"]
  },
  {
    "name": "COMUNIDAD POLITICA INKA PERU",
    "president": "Jorge Vargas",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/327/327.jpg" },
    "propuestas": ["Cosmovisión andina", "Saberes ancestrales", "Estado plurinacional"],
    "planes": ["Plan Cosmovisión Andina", "Saberes Ancestrales", "Estado Plurinacional"]
  },
  {
    "name": "FE EN EL PERU",
    "president": "Rosa Navarro",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fe_en_el_Per%C3%BA_logo.svg/1200px-Fe_en_el_Per%C3%BA_logo.svg.png" },
    "propuestas": ["Valores espirituales", "Ética pública", "Fe como motor social"],
    "planes": ["Plan Valores Espirituales", "Ética Pública", "Fe como Motor Social"]
  },
  {
    "name": "FRENTE POPULAR AGRICOLA",
    "president": "Mario López",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/329/329.jpg" },
    "propuestas": ["Revolución agropecuaria", "Seguridad alimentaria", "Agricultura familiar tecnificada"],
    "planes": ["Plan Revolución Agropecuaria", "Seguridad Alimentaria", "Agricultura Familiar Tecnificada"]
  },
  {
    "name": "PARTIDO POLITICO FUERZA MODERNA",
    "president": "Jorge Ramírez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/331/331.jpg" },
    "propuestas": ["Infraestructura de calidad", "Logística nacional integrada", "Conectividad multimodal"],
    "planes": ["Plan Infraestructura de Calidad", "Logística Nacional Integrada", "Conectividad Multimodal"]
  },
  {
    "name": "FUERZA POPULAR",
    "president": "Mario Chávez",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Fuerza_Popular_logo.svg/1200px-Fuerza_Popular_logo.svg.png" },
    "propuestas": ["Orden y seguridad", "Inversión privada protegida", "Crecimiento económico estable"],
    "planes": ["Plan Orden y Seguridad", "Inversión Privada Protegida", "Crecimiento Económico Estable"]
  },
  {
    "name": "PARTIDO POLITICO INTEGRIDAD DEMOCRATICA",
    "president": "Daniela Rodríguez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/333/333.jpg" },
    "propuestas": ["Transparencia total", "Fiscalización ciudadana", "Elecciones internas abiertas"],
    "planes": ["Plan Transparencia Total", "Fiscalización Ciudadana", "Elecciones Internas Abiertas"]
  },
  {
    "name": "JUNTOS POR EL PERU",
    "president": "Pedro Rojas",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Juntos_por_el_Per%C3%BA_logo.svg/1200px-Juntos_por_el_Per%C3%BA_logo.svg.png" },
    "propuestas": ["Unidad nacional", "Concertación plural", "Soluciones pactadas"],
    "planes": ["Plan Unidad Nacional", "Concertación Plural", "Soluciones Pactadas"]
  },
  {
    "name": "LIBERTAD POPULAR",
    "president": "Enrique Díaz",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/335/335.jpg" },
    "propuestas": ["Libertades individuales", "Mercado regulado inteligente", "Emprendimiento libre"],
    "planes": ["Plan Libertades Individuales", "Mercado Regulado Inteligente", "Emprendimiento Libre"]
  },
  {
    "name": "NUEVO PERU POR EL BUEN VIVIR",
    "president": "Maria Rodríguez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/337/337.jpg" },
    "propuestas": ["Buen vivir constitucional", "Desarrollo alternativo", "Armonía con naturaleza"],
    "planes": ["Plan Buen Vivir Constitucional", "Desarrollo Alternativo", "Armonía con Naturaleza"]
  },
  {
    "name": "PARTIDO PAIS PARA TODOS",
    "president": "Enrique Pérez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/339/339.jpg" },
    "propuestas": ["Inclusión social integral", "Discapacidad atendida", "Diversidad respetada"],
    "planes": ["Plan Inclusión Social Integral", "Discapacidad Atendida", "Diversidad Respetada"]
  },
  {
    "name": "PARTIDO CIVICO OBRAS",
    "president": "Patricia López",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/341/341.jpg" },
    "propuestas": ["Infraestructura pública calidad", "Mantenimiento preventivo", "Inversión técnica"],
    "planes": ["Plan Infraestructura Pública", "Mantenimiento Preventivo", "Inversión Técnica"]
  },
  {
    "name": "PARTIDO DEL BUEN GOBIERNO",
    "president": "Jorge Díaz",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/343/343.jpg" },
    "propuestas": ["Gestión eficiente", "Servicio civil meritocrático", "Evaluación de políticas"],
    "planes": ["Plan Gestión Eficiente", "Servicio Civil Meritocrático", "Evaluación de Políticas"]
  },
  {
    "name": "PARTIDO DEMOCRATICO SOMOS PERU",
    "president": "Ana Ramírez",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Democr%C3%A1tico_Somos_Per%C3%BA_logo.svg/1200px-Democr%C3%A1tico_Somos_Per%C3%BA_logo.svg.png" },
    "propuestas": ["Desarrollo humano integral", "Capital social", "Tejido asociativo"],
    "planes": ["Plan Desarrollo Humano Integral", "Capital Social", "Tejido Asociativo"]
  },
  {
    "name": "PARTIDO FRENTE DE LA ESPERANZA 2021",
    "president": "Enrique Rodríguez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/345/345.jpg" },
    "propuestas": ["Oportunidades para jóvenes", "Reinserción social", "Segunda oportunidades laborales"],
    "planes": ["Plan Oportunidades Jóvenes", "Reinserción Social", "Segundas Oportunidades Laborales"]
  },
  {
    "name": "PARTIDO MORADO",
    "president": "Sofia Gonzales",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Partido_Morado_logo.svg/1200px-Partido_Morado_logo.svg.png" },
    "propuestas": ["Legalización cannabis medicinal", "Matrimonio igualitario", "Estado laico fortalecido"],
    "planes": ["Plan Cannabis Medicinal", "Matrimonio Igualitario", "Estado Laico Fortalecido"]
  },
  {
    "name": "PARTIDO PATRIOTICO DEL PERU",
    "president": "Lucia Díaz",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/347/347.jpg" },
    "propuestas": ["Defensa de símbolos patrios", "Historia nacional en currícula", "Heroísmo civil reconocido"],
    "planes": ["Plan Símbolos Patrios", "Historia Nacional en Educación", "Reconocimiento al Heroísmo Civil"]
  },
  {
    "name": "PARTIDO POLITICO TODO CON EL PUEBLO",
    "president": "Daniel Gonzales",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/349/349.jpg" },
    "propuestas": ["Consulta popular vinculante", "Presupuestos participativos", "Rendición de cuentas"],
    "planes": ["Plan Democracia Participativa", "Presupuestos Participativos", "Rendición de Cuentas Permanente"]
  },
  {
    "name": "PARTIDO POLITICO PUEBLO CONSCIENTE",
    "president": "Manuel Salazar",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/351/351.jpg" },
    "propuestas": ["Educación crítica ciudadana", "Consumo responsable", "Participación vecinal"],
    "planes": ["Plan Educación Ciudadana", "Consumo Responsable Nacional", "Participación Vecinal Activa"]
  },
  {
    "name": "PARTIDO POLITICO NACIONAL PERU LIBRE",
    "president": "Jorge Morales",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Per%C3%BA_Libre_logo.svg/1200px-Per%C3%BA_Libre_logo.svg.png" },
    "propuestas": ["Economía planificada social", "Nacionalización minera", "Reforma agraria integral"],
    "planes": ["Plan Economía Social", "Nacionalización Minera Estratégica", "Reforma Agraria Integral"]
  },
  {
    "name": "PARTIDO POLITICO PERU PRIMERO",
    "president": "Jorge Castillo",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/353/353.jpg" },
    "propuestas": ["Interés nacional en relaciones internacionales", "Defensa de soberanía", "Desarrollo autónomo"],
    "planes": ["Plan Soberanía Nacional", "Relaciones Internacionales Estratégicas", "Desarrollo Autónomo"]
  },
  {
    "name": "PARTIDO POLITICO POPULAR VOCES DEL PUEBLO",
    "president": "Miguel Sánchez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/355/355.jpg" },
    "propuestas": ["Cabildos abiertos mensuales", "Iniciativa legislativa popular", "Revocatoria facilitada"],
    "planes": ["Plan Cabildos Abiertos", "Iniciativa Legislativa Popular", "Revocatoria Facilitada"]
  },
  {
    "name": "PARTIDO POLITICO PRIN",
    "president": "Daniel Pérez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/357/357.jpg" },
    "propuestas": ["Innovación pública", "Gestión por resultados", "Simplificación administrativa"],
    "planes": ["Plan Innovación Pública", "Gestión por Resultados", "Simplificación Administrativa"]
  },
  {
    "name": "PARTIDO POLITICO PERUANOS UNIDOS",
    "president": "Lucia Rojas",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/359/359.jpg" },
    "propuestas": ["Identidad nacional fortalecida", "Integración regional", "Patriotismo constructivo"],
    "planes": ["Plan Identidad Nacional", "Integración Regional", "Patriotismo Constructivo"]
  },
  {
    "name": "PARTIDO POPULAR CRISTIANO - PPC",
    "president": "Daniela Mendoza",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Partido_Popular_Cristiano_logo.svg/1200px-Partido_Popular_Cristiano_logo.svg.png" },
    "propuestas": ["Familia como base social", "Economía social de mercado", "Valores éticos públicos"],
    "planes": ["Plan Fortalecimiento Familiar", "Economía Social de Mercado", "Valores Éticos Públicos"]
  },
  {
    "name": "PARTIDO POR EL ENTENDIMIENTO NACIONAL",
    "president": "Enrique Castillo",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/361/361.jpg" },
    "propuestas": ["Reconciliación nacional", "Memoria histórica", "Unidad en la diversidad"],
    "planes": ["Plan Reconciliación Nacional", "Museo de la Memoria", "Unidad en Diversidad"]
  },
  {
    "name": "PARTIDO SICREO",
    "president": "Enrique Paredes",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/363/363.jpg" },
    "propuestas": ["Crédito agropecuario seguro", "Riego tecnificado", "Comercio justo rural"],
    "planes": ["Plan Agropecuario Nacional", "Riego Tecnificado Masivo", "Comercio Justo Rural"]
  },
  {
    "name": "PARTIDO UNIDAD Y PAZ",
    "president": "Lucia Navarro",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/365/365.jpg" },
    "propuestas": ["Mediación de conflictos sociales", "Cultura de paz educativa", "Diálogo nacional permanente"],
    "planes": ["Plan Nacional de Diálogo", "Educación para la Paz", "Mediación Comunitaria"]
  },
  {
    "name": "PARTIDO DEMOCRATA VERDE",
    "president": "Daniel Salazar",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/367/367.jpg" },
    "propuestas": ["Transición ecológica justa", "Impuesto carbono", "Protección biodiversidad"],
    "planes": ["Plan Transición Ecológica", "Impuesto Carbono", "Protección Biodiversidad"]
  },
  {
    "name": "PARTIDO POLITICO ADP",
    "president": "Ricardo Flores",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/369/369.jpg" },
    "propuestas": ["Descentralización real", "Autonomía regional", "Financiamiento territorial"],
    "planes": ["Plan Descentralización Real", "Autonomía Regional", "Financiamiento Territorial"]
  },
  {
    "name": "PARTIDO DEMOCRATICO FEDERAL",
    "president": "Ricardo Navarro",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/371/371.jpg" },
    "propuestas": ["Federalismo progresivo", "Regiones autogobernadas", "Pacto fiscal regional"],
    "planes": ["Plan Federalismo Progresivo", "Regiones Autogobernadas", "Pacto Fiscal Regional"]
  },
  {
    "name": "PERU MODERNO",
    "president": "Pedro Pérez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/373/373.jpg" },
    "propuestas": ["Transformación digital estatal", "Ciudades 5G", "Inteligencia artificial pública"],
    "planes": ["Plan Transformación Digital", "Red 5G Nacional", "IA para Desarrollo Nacional"]
  },
  {
    "name": "PODEMOS PERU",
    "president": "Miguel Ramírez",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Podemos_Per%C3%BA_logo.svg/1200px-Podemos_Per%C3%BA_logo.svg.png" },
    "propuestas": ["Empleo juvenil garantizado", "Internet gratuito nacional", "Deporte masivo escolar"],
    "planes": ["Plan Primer Empleo Joven", "Internet Nacional Gratuito", "Deporte Escolar Masivo"]
  },
  {
    "name": "PRIMERO LA GENTE",
    "president": "Carmen Pérez",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/375/375.jpg" },
    "propuestas": ["Economía circular", "Agricultura orgánica", "Conservación de bosques"],
    "planes": ["Plan Nacional de Economía Circular", "Agricultura Orgánica Sostenible", "Conservación de Bosques Nativos"]
  },
  {
    "name": "PROGRESEMOS",
    "president": "Rosa Morales",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/377/377.jpg" },
    "propuestas": ["Energías renovables masivas", "Transporte eléctrico público", "Ciudades inteligentes"],
    "planes": ["Plan Energía Limpia 2030", "Transporte Eléctrico Nacional", "Ciudades Inteligentes Perú"]
  },
  {
    "name": "PARTIDO DE LOS TRABAJADORES",
    "president": "Mario Vargas",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/379/379.jpg" },
    "propuestas": ["Salario digno universal", "Derechos laborales ampliados", "Economía del cuidado"],
    "planes": ["Plan Salario Digno Universal", "Derechos Laborales Ampliados", "Economía del Cuidado"]
  },
  {
    "name": "RENOVACION POPULAR",
    "president": "Rosa Pérez",
    "logo": { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Renovaci%C3%B3n_Popular_logo.svg/1200px-Renovaci%C3%B3n_Popular_logo.svg.png" },
    "propuestas": ["Pensión universal adulto mayor", "Créditos educativos blandos", "Infraestructura deportiva nacional"],
    "planes": ["Plan Dignidad Adulto Mayor", "Crédito Educativo Nacional", "Deporte para Todos"]
  },
  {
    "name": "RESURGIMIENTO UNIDO NACIONAL - RUNA",
    "president": "Carmen Ruiz",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/381/381.jpg" },
    "propuestas": ["Revaloración cultural indígena", "Turismo comunitario", "Medicina tradicional integrativa"],
    "planes": ["Plan Nacional de Cultura Viva", "Rutas Turísticas Comunitarias", "Salud Intercultural"]
  },
  {
    "name": "SALVEMOS AL PERU",
    "president": "Andrés Gonzales",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/383/383.jpg" },
    "propuestas": ["Mano dura contra la corrupción", "Fortalecimiento de las FFAA", "Protección de fronteras"],
    "planes": ["Plan Seguridad Nacional", "Fortalecimiento Fronterizo", "Ley Anticorrupción Estricta"]
  },
  {
    "name": "UN CAMINO DIFERENTE",
    "president": "Pedro Mendoza",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/385/385.jpg" },
    "propuestas": ["Reforma política integral", "Gobierno digital transparente", "Incentivos a pymes"],
    "planes": ["Plan Anticorrupción Total", "Gobierno Digital 100%", "Ley PYME Nacional"]
  },
  {
    "name": "UP UNIDAD POPULAR",
    "president": "Miguel Vargas",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/387/387.jpg" },
    "propuestas": ["Reducción de la jornada laboral", "Nacionalización de recursos estratégicos", "Vivienda social gratuita"],
    "planes": ["Programa Nacional de Vivienda Social", "Reforma Laboral Progresista", "Ley de Soberanía Nacional"]
  },
  {
    "name": "VISION PERU",
    "president": "Luis Gonzales",
    "logo": { uri: "https://partidospoliticos.onpe.gob.pe/Archivos/Listas/389/389.jpg" },
    "propuestas": ["Inversión en tecnología educativa", "Modernización del sector salud", "Fomento a startups nacionales"],
    "planes": ["Plan Digital Nacional 2025", "Modernización Hospitalaria Integral", "Ley de Innovación Tecnológica"]
  }
];

export default partidosPoliticos;