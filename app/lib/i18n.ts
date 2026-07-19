import type { Project } from '@/sanity/types'

export type Lang = 'es' | 'en'

export const LANG_COOKIE = 'lang'
export const DEFAULT_LANG: Lang = 'es'

export function isLang(value: unknown): value is Lang {
  return value === 'es' || value === 'en'
}

/* ─── Type labels (EN) ────────────────────────────────────────────
   Spanish labels live in proyecto-utils (TIPO_LABELS). The `tipo`
   enum has no English data in Sanity, so we translate via this map. */
export const TIPO_LABELS_EN: Record<NonNullable<Project['tipo']>, string> = {
  casa: 'House',
  departamento: 'Apartment',
  refaccion: 'Refurbishment',
  local: 'Retail',
  trabajo: 'Workspace',
  cultural: 'Cultural',
  otro: 'Project',
}

/* ─── Localized project field pickers ─────────────────────────────
   Return the EN field when present, else fall back to ES. `ciudad`
   is free-text with no EN twin, so it always returns ES. */
export function pickTitulo(p: Project, lang: Lang): string {
  return (lang === 'en' && p.titulo_en) ? p.titulo_en : p.titulo
}

export function pickDescCorta(p: Project, lang: Lang): string {
  return (lang === 'en' && p.descripcionCorta_en)
    ? p.descripcionCorta_en
    : (p.descripcionCorta ?? '')
}

/* ─── Static UI copy ──────────────────────────────────────────────
   Every hard-coded string in the UI, keyed and bilingual. */
export const COPY = {
  nav: {
    obras:    { es: 'Obras',    en: 'Works' },
    estudio:  { es: 'Estudio',  en: 'Studio' },
    proceso:  { es: 'Proceso',  en: 'Process' },
    contacto: { es: 'Contacto', en: 'Contact' },
  },
  intro: {
    manifesto: {
      es: ['Arquitectura clara, funcional y ', 'honesta', '. Buenos Aires, desde 2018.'] as const,
      en: ['Clear, functional, ', 'honest', ' architecture. Buenos Aires, since 2018.'] as const,
    },
    titulo: { es: 'Obras', en: 'Works' },
  },
  toolbar: {
    todos:   { es: 'Todos', en: 'All' },
    yearAsc: { es: 'Año ↑', en: 'Year ↑' },
    yearDesc:{ es: 'Año ↓', en: 'Year ↓' },
    grid:    { es: 'Grilla', en: 'Grid' },
    gridBig: { es: 'Grilla grande', en: 'Large grid' },
    list:    { es: 'Lista', en: 'List' },
    empty:   { es: 'Sin obras en esta categoría', en: 'No works in this category' },
  },
  detail: {
    back:    { es: 'Obras', en: 'Works' },
    next:    { es: 'Siguiente', en: 'Next' },
    nextWork:{ es: 'Siguiente obra', en: 'Next work' },
    year:    { es: 'Año', en: 'Year' },
    type:    { es: 'Tipo', en: 'Type' },
    place:   { es: 'Lugar', en: 'Place' },
    role:    { es: 'Rol', en: 'Role' },
    roleValue:{ es: 'Proyecto y dirección', en: 'Design & supervision' },
  },
  studio: {
    kicker: { es: 'Estudio — Buenos Aires', en: 'Studio — Buenos Aires' },
    title:  {
      es: ['El espacio como límite y como ', 'decisión', '.'] as const,
      en: ['Space as limit and as ', 'decision', '.'] as const,
    },
    lede1: {
      es: 'Barda desarrolla proyectos pensados desde la forma real en que las personas viven, trabajan y usan los espacios. Diseño, viabilidad y una mirada sensible sobre el contexto, la escala y el tiempo.',
      en: 'Barda develops projects rooted in the way people actually live, work and use space. Design, feasibility, and a sensitive reading of context, scale and time.',
    },
    lede2: {
      es: 'Dirigido por Joaquín Licera Vidal, arquitecto (UNLP), Maestría en Desarrollo Territorial y Urbano (UNQ).',
      en: 'Led by Joaquín Licera Vidal, architect (UNLP), MA in Territorial & Urban Development (UNQ).',
    },
    values: {
      es: ['Claridad', 'Coherencia', 'Precisión técnica', 'Adaptación', 'Compromiso con el proceso', 'Idea = ejecución'],
      en: ['Clarity', 'Coherence', 'Technical precision', 'Adaptation', 'Process commitment', 'Idea = execution'],
    },
  },
  process: {
    kicker: { es: 'Proceso — 04 fases', en: 'Process — 04 phases' },
    title:  { es: 'Proceso de proyecto', en: 'Project process' },
    steps: {
      es: [
        ['Escucha', 'Lectura del cliente, programa y contexto. Estimación temprana de viabilidad.'],
        ['Anteproyecto', 'Volumetría, partido y materialidad. Sistema de planos en planta y corte.'],
        ['Proyecto', 'Documentación técnica, especificaciones, cómputos y plan de obra.'],
        ['Obra', 'Dirección, control de calidad, ajustes y entrega final.'],
      ],
      en: [
        ['Listen', 'Reading client, program and context. Early feasibility check.'],
        ['Schematic', 'Volumetry, parti and materiality. Plane system in plan and section.'],
        ['Project', 'Technical documentation, specs, costing and construction plan.'],
        ['Build', 'Site supervision, QC, adjustments and handover.'],
      ],
    },
  },
  contact: {
    kicker: { es: 'Contacto', en: 'Contact' },
    title:  {
      es: ['Iniciemos un ', 'proyecto', ' juntos.'] as const,
      en: ["Let's start a ", 'project', ' together.'] as const,
    },
    lede: {
      es: 'Trabajamos con una primera conversación abierta para entender el programa, el contexto y los plazos antes de presupuestar.',
      en: 'We start with an open conversation to understand program, context and timing before quoting.',
    },
    email:     { es: 'Email', en: 'Email' },
    phone:     { es: 'Teléfono', en: 'Phone' },
    instagram: { es: 'Instagram', en: 'Instagram' },
    base:      { es: 'Sede', en: 'Base' },
  },
  footer: {
    location: { es: 'Buenos Aires', en: 'Buenos Aires' },
  },
} as const

/** Convenience: pick a `{es, en}` pair by lang. Branches may have distinct
 *  literal types (e.g. `as const` tuples), so they're allowed to differ. */
export function t<E, S>(pair: { es: S; en: E }, lang: Lang): S | E {
  return lang === 'en' ? pair.en : pair.es
}
