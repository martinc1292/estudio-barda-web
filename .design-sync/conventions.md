# Barda Design System — how to build with it

Barda is the identity of an architecture studio: **brutalist-editorial**. Sand
paper, iron ink, a single brick-orange accent, hairline rules, oversized Archivo
display type against IBM Plex Mono UI chrome. The whole look is a **grid drawn in
1px hairlines** — restraint is the aesthetic. Use the accent sparingly (a dot, a
single word, one CTA per view). Nothing has rounded corners.

## Components live on `window.BardaDS`

Render the compiled components from the global — do not reimplement them:

```jsx
const { Navbar, Hero, Button, StatBlock, SectionHeader, ProjectCard,
        SpecGrid, Footer, Label, Tag, Rule, Isotipo } = window.BardaDS;
```

They depend only on a global `React` and on `styles.css` being loaded. There is
**no provider to wrap** — tokens live on `:root`. To switch theme, put a theme
class on any ancestor (default is the light "arena" theme):

```jsx
<div className="theme-dark"> …dark (iron) surface… </div>
```

Themes: default (arena/light), `theme-dark` (iron), `theme-stone` (concrete).

## The styling idiom: CSS variables + `bd-*` classes

Barda is **not** a utility-class system. Style with the **design tokens** (CSS
custom properties) for your own layout glue, and use the components' own `bd-*`
classes when composing them. Never hard-code hex — always `var(--…)`.

**Semantic tokens (theme-aware — use these first):**
`--bg` `--bg-alt` `--ink` `--ink-soft` `--ink-mute` `--accent`
`--rule` `--rule-soft` `--card-bg`

**Raw palette:** `--ladrillo` (#E24F05, the accent) `--ladrillo-d` `--arena`
`--arena-alt` `--piedra` `--hormigon` `--hierro`

**Type & rhythm:** `--font-sans` (Archivo — display/body, headings weight 500,
tracking -0.035em) · `--font-mono` (IBM Plex Mono — every label/eyebrow/meta,
always UPPERCASE, tracking 0.06–0.16em) · scale `--fs-display` `--fs-h2`
`--fs-stat` `--fs-h3` `--fs-body` `--fs-label` · `--pad-x` (page padding)
`--maxw` (1400px) `--navbar-h`.

**Reusable classes** you can apply to your own markup: `label` (mono uppercase
caption), `mono`, `hairline` / `bd-rule` (1px divider), `bd-accent` (color a word
brick). Structure is built from `border: 1px solid var(--rule)` on layout
elements — lean on hairline borders, not shadows or radii.

## Where the truth lives

Read these bound files before styling: **`styles.css`** (imports
`tokens/colors.css`, `tokens/typography.css`, `_ds_bundle.css` — the full token
and class vocabulary) and each component's **`components/<Group>/<Name>/<Name>.prompt.md`**
(props, examples) and **`.d.ts`** (the API contract).

## One idiomatic build

```jsx
const { Navbar, Hero, StatBlock, SectionHeader, ProjectCard, Footer } = window.BardaDS;

function Landing() {
  return (
    <>
      <Navbar
        active="/proyectos"
        links={[
          { href: '/proyectos', label: 'Obras' },
          { href: '/sobre-nosotros', label: 'Estudio' },
          { href: '/proceso', label: 'Proceso' },
        ]}
        cta={{ href: '/contacto', label: 'Iniciar proyecto' }}
      />

      <Hero
        titleHtml='El espacio como <span class="bd-accent">límite</span><br/>y como decisión.'
        meta={[
          { label: 'Enfoque', value: 'Vivienda · Refacción · Comercial' },
          { label: 'Territorio', value: 'CABA · GBA · Patagonia' },
          { label: 'Director', value: 'Joaquín Licera Vidal' },
        ]}
      />

      <StatBlock items={[
        { value: '47', unit: '+', label: 'Proyectos · 2018 — 2026' },
        { value: '8', unit: 'yr', label: 'Trayectoria' },
        { value: '12', label: 'Ciudades intervenidas' },
        { value: '6.4', unit: 'k m²', label: 'Superficie proyectada' },
      ]} />

      <SectionHeader index="03" title="Obras seleccionadas"
        link={{ href: '/proyectos', label: '06 / 2018 — 2026 →' }} />

      {/* Cards in a 3-up grid sharing hairline borders; cycle the warm palette */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} href={p.href} index={String(i + 1).padStart(3, '0')}
            year={p.year} location={p.city} type={p.type} title={p.title}
            image={p.image} background={['#F1E6D5','#DD7845','#949491'][i % 3]} />
        ))}
      </div>

      <Footer
        leadHtml='Entender,<br/>ordenar y <span class="bd-accent">materializar.</span>'
        columns={[
          { title: 'Contacto', items: [{ label: 'hola@barda.com', href: 'mailto:hola@barda.com' }] },
          { title: 'Estudio', items: [{ label: 'Buenos Aires, AR' }] },
          { title: 'Sistema', items: [{ label: 'Archivo / IBM Plex Mono' }] },
        ]}
      />
    </>
  );
}
```
