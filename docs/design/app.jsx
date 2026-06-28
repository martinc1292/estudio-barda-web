/* global React, ReactDOM, PROJECTS, COPY, TopBar, Ticker, Toolbar, Card, ListRow, IndexStrip, Detail, StudioPage, ContactPage, Footer, CustomCursor, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSlider, TweakSelect, TweakToggle */
const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "editorial",
  "palette": "warm-earth",
  "cols": 3,
  "density": "regular",
  "hero": "manifesto",
  "cursor": true,
  "typePair": "instrument-inter"
}/*EDITMODE-END*/;

const TYPE_PAIRS = {
  "instrument-inter": {
    label: "Instrument Serif + Inter",
    sub: "Editorial cálido",
    serif: '"Instrument Serif", Georgia, serif',
    sans:  '"Inter", "Helvetica Neue", Arial, sans-serif',
    mono:  '"JetBrains Mono", ui-monospace, monospace',
    serifTrack: "-0.025em",
    serifWeight: "400"
  },
  "fraunces-ibm": {
    label: "Fraunces + IBM Plex",
    sub: "Editorial contemporáneo",
    serif: '"Fraunces", "Tiempos Headline", Georgia, serif',
    sans:  '"IBM Plex Sans", "Inter", sans-serif',
    mono:  '"IBM Plex Mono", ui-monospace, monospace',
    serifTrack: "-0.022em",
    serifWeight: "400"
  },
  "ptserif-ptsans": {
    label: "PT Serif + PT Sans",
    sub: "Clásico, libro de arquitectura",
    serif: '"PT Serif", "Times New Roman", serif',
    sans:  '"PT Sans", "Helvetica Neue", sans-serif',
    mono:  '"PT Mono", ui-monospace, monospace',
    serifTrack: "-0.012em",
    serifWeight: "400"
  },
  "playfair-spectral": {
    label: "Playfair + Spectral",
    sub: "Alto contraste, didone",
    serif: '"Playfair Display", "Bodoni Moda", serif',
    sans:  '"Spectral", "Source Sans Pro", sans-serif',
    mono:  '"JetBrains Mono", ui-monospace, monospace',
    serifTrack: "-0.02em",
    serifWeight: "500"
  },
  "spectral-worksans": {
    label: "Spectral + Work Sans",
    sub: "Cálido, tono editorial",
    serif: '"Spectral", "Tiempos", Georgia, serif',
    sans:  '"Work Sans", "Inter", sans-serif',
    mono:  '"JetBrains Mono", ui-monospace, monospace',
    serifTrack: "-0.015em",
    serifWeight: "500"
  },
  "ibmmono-ibm": {
    label: "IBM Plex Mono + IBM Plex Sans",
    sub: "Mono / arquitectónico",
    serif: '"IBM Plex Mono", ui-monospace, monospace',
    sans:  '"IBM Plex Sans", "Inter", sans-serif',
    mono:  '"IBM Plex Mono", ui-monospace, monospace',
    serifTrack: "-0.02em",
    serifWeight: "500"
  },
  "syne-archivo": {
    label: "Syne + Archivo",
    sub: "Geométrico, contemporáneo",
    serif: '"Syne", "Inter", sans-serif',
    sans:  '"Archivo", "Inter", sans-serif',
    mono:  '"JetBrains Mono", ui-monospace, monospace',
    serifTrack: "-0.03em",
    serifWeight: "500"
  }
};

const PALETTES = {
  "warm-earth": {
    "--bg":"oklch(0.965 0.012 80)","--bg-2":"oklch(0.93 0.018 75)",
    "--ink":"oklch(0.22 0.018 55)","--ink-soft":"oklch(0.42 0.022 55)","--ink-mute":"oklch(0.62 0.02 60)",
    "--rule":"oklch(0.82 0.018 70)","--rule-soft":"oklch(0.88 0.015 75)",
    "--accent":"oklch(0.50 0.085 45)","--clay":"oklch(0.62 0.06 55)","--sand":"oklch(0.86 0.025 80)"
  },
  "bone": {
    "--bg":"oklch(0.97 0.008 90)","--bg-2":"oklch(0.94 0.012 85)",
    "--ink":"oklch(0.20 0.012 60)","--ink-soft":"oklch(0.42 0.012 60)","--ink-mute":"oklch(0.62 0.012 65)",
    "--rule":"oklch(0.82 0.01 75)","--rule-soft":"oklch(0.89 0.008 80)",
    "--accent":"oklch(0.45 0.04 50)","--clay":"oklch(0.62 0.025 60)","--sand":"oklch(0.88 0.015 85)"
  },
  "terracotta": {
    "--bg":"oklch(0.95 0.018 60)","--bg-2":"oklch(0.91 0.025 55)",
    "--ink":"oklch(0.24 0.04 35)","--ink-soft":"oklch(0.42 0.04 40)","--ink-mute":"oklch(0.60 0.035 45)",
    "--rule":"oklch(0.80 0.025 55)","--rule-soft":"oklch(0.87 0.02 60)",
    "--accent":"oklch(0.48 0.13 35)","--clay":"oklch(0.60 0.10 40)","--sand":"oklch(0.84 0.04 60)"
  },
  "ink": {
    "--bg":"oklch(0.16 0.012 60)","--bg-2":"oklch(0.22 0.015 60)",
    "--ink":"oklch(0.94 0.012 80)","--ink-soft":"oklch(0.78 0.012 75)","--ink-mute":"oklch(0.58 0.015 70)",
    "--rule":"oklch(0.32 0.012 65)","--rule-soft":"oklch(0.26 0.012 65)",
    "--accent":"oklch(0.72 0.10 55)","--clay":"oklch(0.60 0.06 50)","--sand":"oklch(0.30 0.02 65)"
  }
};

const DENSITIES = {
  compact:  { "--pad-x":"clamp(16px, 2.2vw, 36px)", "--pad-y":"clamp(14px,1.8vw,28px)", "--gutter":"14px" },
  regular:  { "--pad-x":"clamp(20px, 3vw, 56px)",   "--pad-y":"clamp(20px,2.4vw,40px)", "--gutter":"24px" },
  spacious: { "--pad-x":"clamp(28px, 4.4vw, 88px)", "--pad-y":"clamp(28px,3vw,56px)",   "--gutter":"40px" }
};

function applyTokens(tweaks) {
  const root = document.documentElement;
  const pal = PALETTES[tweaks.palette] || PALETTES["warm-earth"];
  Object.entries(pal).forEach(([k,v]) => root.style.setProperty(k, v));
  const den = DENSITIES[tweaks.density] || DENSITIES.regular;
  Object.entries(den).forEach(([k,v]) => root.style.setProperty(k, v));
  const tp = TYPE_PAIRS[tweaks.typePair] || TYPE_PAIRS["instrument-inter"];
  root.style.setProperty("--serif", tp.serif);
  root.style.setProperty("--sans", tp.sans);
  root.style.setProperty("--mono", tp.mono);
  root.style.setProperty("--serif-track", tp.serifTrack);
  root.style.setProperty("--serif-weight", tp.serifWeight);
  document.body.classList.toggle("no-custom-cursor", !tweaks.cursor);
  document.body.classList.toggle("gallery-mode", tweaks.variant === "gallery");
}

// Inyecta @import dinámico de Google Fonts según el par seleccionado
function ensureFontsLoaded(typePair) {
  const families = {
    "instrument-inter": "family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600",
    "fraunces-ibm":     "family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500",
    "ptserif-ptsans":   "family=PT+Serif:ital,wght@0,400;0,700;1,400&family=PT+Sans:wght@400;700&family=PT+Mono",
    "playfair-spectral":"family=Playfair+Display:wght@400;500;700&family=Spectral:wght@300;400;500",
    "spectral-worksans":"family=Spectral:wght@300;400;500;600&family=Work+Sans:wght@300;400;500;600",
    "ibmmono-ibm":      "family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600",
    "syne-archivo":     "family=Syne:wght@500;600;700;800&family=Archivo:wght@300;400;500;600"
  };
  const fam = families[typePair];
  if (!fam) return;
  const id = `font-${typePair}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${fam}&family=JetBrains+Mono:wght@400;500&display=swap`;
  document.head.appendChild(link);
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState("es");
  const [route, setRoute] = useState("index");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);

  useEffect(() => { ensureFontsLoaded(tweaks.typePair); applyTokens(tweaks); }, [tweaks]);

  const t = COPY[lang];

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter(p => p.type === filter);
  }, [filter]);

  const onOpen = (p) => setSelected(p);
  const onNext = () => {
    if (!selected) return;
    const idx = PROJECTS.findIndex(x => x.id === selected.id);
    setSelected(PROJECTS[(idx + 1) % PROJECTS.length]);
    window.scrollTo({ top: 0 });
  };

  // Variant-driven layout
  const cols = tweaks.cols || 3;
  const hero = tweaks.hero || "manifesto";
  const isGallery = tweaks.variant === "gallery";

  // Asymmetric ratios for visual rhythm in editorial mode
  const ratioFor = (i) => {
    if (isGallery) return "square";
    if (cols === 2) return i % 3 === 0 ? "wide" : "";
    if (cols === 3) return i % 5 === 1 ? "tall" : i % 7 === 4 ? "wide" : "";
    return "";
  };

  const featured = PROJECTS[0];

  const tickerItems = lang === "es"
    ? ["Vivienda","Refacción","Oficinas","Concursos","Cultural","Buenos Aires","Río Negro","Neuquén","Misiones","Desde 2018"]
    : ["Housing","Renovation","Office","Competitions","Cultural","Buenos Aires","Río Negro","Neuquén","Misiones","Since 2018"];

  return (
    <div className="app">
      <CustomCursor enabled={tweaks.cursor} />
      <TopBar lang={lang} setLang={setLang} route={route} setRoute={setRoute} t={t} />
      {route === "index" && <Ticker items={tickerItems} />}

      {route === "index" && (
        <main>
          <IndexStrip t={t} lang={lang}
            mode={hero === "feature" ? "feature" : "manifesto"}
            featured={featured} />

          <Toolbar lang={lang} t={t}
            filter={filter} setFilter={setFilter}
            view={view} setView={setView}
            total={PROJECTS.length} shown={filtered.length} />

          {view === "grid" ? (
            <div className={`grid cols-${cols}`}>
              {filtered.map((p, i) => (
                <Card key={p.id} p={p} idx={i} lang={lang}
                  ratio={ratioFor(i)} onOpen={onOpen} />
              ))}
            </div>
          ) : (
            <div className="list-view">
              {filtered.map((p, i) => (
                <ListRow key={p.id} p={p} idx={i} lang={lang} onOpen={onOpen} />
              ))}
            </div>
          )}

          <section className="section">
            <div className="h-side">{lang==="es"?"Estudio":"Studio"} — 01</div>
            <div>
              <p className="body-text">{t.manifesto}</p>
              <p className="body-text">{t.director}</p>
            </div>
          </section>
        </main>
      )}

      {route === "studio" && <main><StudioPage t={t} lang={lang} /></main>}
      {route === "contact" && <main><ContactPage t={t} lang={lang} /></main>}

      <Footer t={t} lang={lang} />

      {selected && (
        <Detail p={selected} lang={lang} t={t}
          onClose={() => setSelected(null)} onNext={onNext} />
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection title={lang==="es"?"Variación":"Variant"}>
          <TweakRadio
            value={tweaks.variant}
            onChange={(v) => setTweak("variant", v)}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "gallery", label: lang==="es"?"Galería":"Gallery" }
            ]} />
        </TweakSection>

        <TweakSection title={lang==="es"?"Tipografía":"Typography"}>
          <TweakSelect
            value={tweaks.typePair}
            onChange={(v) => setTweak("typePair", v)}
            options={Object.entries(TYPE_PAIRS).map(([k,v]) => ({ value: k, label: v.label }))} />
        </TweakSection>

        <TweakSection title={lang==="es"?"Paleta":"Palette"}>
          <TweakSelect
            value={tweaks.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              { value: "warm-earth", label: lang==="es"?"Tierra cálida":"Warm earth" },
              { value: "bone", label: lang==="es"?"Hueso":"Bone" },
              { value: "terracotta", label: "Terracotta" },
              { value: "ink", label: lang==="es"?"Tinta (oscuro)":"Ink (dark)" }
            ]} />
        </TweakSection>

        <TweakSection title={lang==="es"?"Columnas":"Columns"}>
          <TweakRadio
            value={String(tweaks.cols)}
            onChange={(v) => setTweak("cols", Number(v))}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" }
            ]} />
        </TweakSection>

        <TweakSection title={lang==="es"?"Densidad":"Density"}>
          <TweakRadio
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "compact", label: lang==="es"?"Compacta":"Compact" },
              { value: "regular", label: lang==="es"?"Regular":"Regular" },
              { value: "spacious", label: lang==="es"?"Amplia":"Spacious" }
            ]} />
        </TweakSection>

        <TweakSection title={lang==="es"?"Encabezado":"Hero"}>
          <TweakRadio
            value={tweaks.hero}
            onChange={(v) => setTweak("hero", v)}
            options={[
              { value: "manifesto", label: lang==="es"?"Manifiesto":"Manifesto" },
              { value: "feature", label: lang==="es"?"Pieza":"Feature" }
            ]} />
        </TweakSection>

        <TweakSection title={lang==="es"?"Cursor custom":"Custom cursor"}>
          <TweakToggle
            value={tweaks.cursor}
            onChange={(v) => setTweak("cursor", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
