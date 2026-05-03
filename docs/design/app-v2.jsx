/* global React, ReactDOM, PROJECTS, COPY */
const { useState, useEffect, useMemo, useRef } = React;

// Isotipo modular SVG (sistema de planos del manual)
function Isotipo({ size = 36, mono = false }) {
  const c1 = mono ? "currentColor" : "#0F0F10";
  const c2 = mono ? "currentColor" : "#E24F05";
  const c3 = mono ? "currentColor" : "#949491";
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="14" height="20" fill={c1}/>
      <rect x="14" y="10" width="20" height="16" fill={c2}/>
      <rect x="6" y="22" width="10" height="12" fill={c3}/>
      <rect x="22" y="2" width="12" height="6" fill={c1}/>
    </svg>
  );
}

function UtilityBar({ lang, setLang, t }) {
  const now = new Date();
  const time = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });
  return (
    <div className="utility">
      <div className="breadcrumbs">
        <span>BARDA / 2026</span>
        <span className="sep">·</span>
        <span>S 34.6° W 58.4°</span>
        <span className="sep">·</span>
        <span>BUENOS AIRES</span>
      </div>
      <div></div>
      <div className="now"><span>{time} ART</span></div>
      <div className="lang">
        <button className={lang==="es" ? "on" : ""} onClick={()=>setLang("es")}>ES</button>
        <span className="sep">/</span>
        <button className={lang==="en" ? "on" : ""} onClick={()=>setLang("en")}>EN</button>
      </div>
    </div>
  );
}

function TopBar({ route, setRoute, t, lang }) {
  return (
    <header className="topbar">
      <a className="brand" onClick={()=>setRoute("index")} style={{cursor:"pointer"}}>
        <Isotipo size={36} />
        <div className="wordmark">
          Barda
          <span className="sub">Arquitectura</span>
        </div>
      </a>
      <div></div>
      <nav className="nav">
        <a className={`item ${route==="index"?"active":""}`} onClick={()=>setRoute("index")}>{lang==="es"?"Obras":"Works"}</a>
        <a className={`item ${route==="studio"?"active":""}`} onClick={()=>setRoute("studio")}>{lang==="es"?"Estudio":"Studio"}</a>
        <a className={`item ${route==="process"?"active":""}`} onClick={()=>setRoute("process")}>{lang==="es"?"Proceso":"Process"}</a>
        <a className={`item ${route==="contact"?"active":""}`} onClick={()=>setRoute("contact")}>{lang==="es"?"Contacto":"Contact"}</a>
        <a className="cta" onClick={()=>setRoute("contact")}>{lang==="es"?"Iniciar proyecto":"Start project"} ↗</a>
      </nav>
    </header>
  );
}

function Hero({ lang }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div>
            <div className="top">
              <span className="tag"><span className="dot"></span>{lang==="es"?"Estudio activo · 2018 — presente":"Active studio · 2018 — present"}</span>
              <span className="tag">001 / {lang==="es"?"MANIFIESTO":"MANIFESTO"}</span>
            </div>
            <h1>
              <span className="em-line">{lang==="es"?"El espacio":"Space"}</span>
              <span className="em-line">{lang==="es"?"como":"as"} <span className="accent">{lang==="es"?"límite":"limit"}</span></span>
              <span className="em-line">{lang==="es"?"y como decisión.":"and decision."}</span>
            </h1>
          </div>
          <div className="meta-block">
            <div>
              <div className="label">{lang==="es"?"Enfoque":"Focus"}</div>
              {lang==="es"?"Vivienda · Refacción · Comercial · Cultural":"Housing · Renovation · Commercial · Cultural"}
            </div>
            <div>
              <div className="label">{lang==="es"?"Territorio":"Territory"}</div>
              CABA · GBA Norte · Río Negro · Neuquén · Misiones
            </div>
            <div>
              <div className="label">{lang==="es"?"Director":"Principal"}</div>
              Joaquín Licera Vidal
            </div>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="grid-bg" />
          <div className="planes">
            <div className="plane iron p1" />
            <div className="plane brick p2" />
            <div className="plane stone p3" />
            <div className="plane brick-d p4" />
            <div className="plane outline p5" />
          </div>
          <span className="corner-meta" style={{top:14, left:14}}>SISTEMA / PLANOS · MÓDULO 12</span>
          <span className="corner-meta" style={{bottom:14, right:14}}>FIG. 01 — COMPOSICIÓN BASE</span>
          <span className="corner-meta" style={{top:14, right:14, color:"#E24F05"}}>● 01</span>
        </div>
      </div>
    </section>
  );
}

function Stats({ lang }) {
  const s = lang === "es"
    ? [
        { v: "47", sup: "+", l: "Proyectos · 2018 — 2026" },
        { v: "8", sup: "yr", l: "Trayectoria" },
        { v: "12", l: "Ciudades intervenidas" },
        { v: "6.4", sup: "k m²", l: "Superficie proyectada" },
      ]
    : [
        { v: "47", sup: "+", l: "Projects · 2018 — 2026" },
        { v: "8", sup: "yr", l: "Years of practice" },
        { v: "12", l: "Cities" },
        { v: "6.4", sup: "k m²", l: "Designed area" },
      ];
  return (
    <div className="stats">
      {s.map((x,i)=>(
        <div className="stat" key={i}>
          <div className="v">{x.v}{x.sup && <sup>{x.sup}</sup>}</div>
          <div className="l">{x.l}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHead({ num, title, meta }) {
  return (
    <div className="section-head">
      <div className="num"><strong>{num}</strong>SECCIÓN</div>
      <h2>{title}</h2>
      <div className="h-meta">{meta}</div>
    </div>
  );
}

const TYPES_ES = ["Todos","Residencial","Refacción","Comercial","Cultural","Concurso","Ampliación","Remodelación"];
const TYPES_EN = ["All","Residential","Refurbishment","Commercial","Cultural","Competition","Extension","Remodel"];

function Toolbar({ lang, filter, setFilter, view, setView, total, shown }) {
  const types = lang === "es" ? TYPES_ES : TYPES_EN;
  return (
    <div className="toolbar">
      <div className="filters">
        {types.map((tp,i)=>{
          const value = i===0 ? "all" : (lang==="es"?tp:TYPES_ES[i]);
          return <button key={tp} className={filter===value?"on":""} onClick={()=>setFilter(value)}>{tp}</button>;
        })}
      </div>
      <div className="right">
        <span>[ {String(shown).padStart(2,"0")} / {String(total).padStart(2,"0")} ] {lang==="es"?"obras":"works"}</span>
        <div className="view-switch">
          <button className={view==="grid"?"on":""} onClick={()=>setView("grid")} title="Grid">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1"><rect x="0.5" y="0.5" width="4.5" height="4.5"/><rect x="7" y="0.5" width="4.5" height="4.5"/><rect x="0.5" y="7" width="4.5" height="4.5"/><rect x="7" y="7" width="4.5" height="4.5"/></svg>
          </button>
          <button className={view==="list"?"on":""} onClick={()=>setView("list")} title="List">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1"><line x1="0" y1="2.5" x2="12" y2="2.5"/><line x1="0" y1="6" x2="12" y2="6"/><line x1="0" y1="9.5" x2="12" y2="9.5"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ p, idx, lang, onOpen }) {
  const name = lang==="es"?p.name:p.nameEn;
  const type = lang==="es"?p.type:p.typeEn;
  const status = lang==="es"?p.status:p.statusEn;
  return (
    <div className="card" style={{ "--card-bg": p.bg }} onClick={()=>onOpen(p)}>
      <div className="card-meta-top">
        <span><span className="idx">{String(idx+1).padStart(3,"0")}</span> · {p.year}</span>
        <span>{p.location}</span>
      </div>
      <div className="frame">
        <div className="image" />
        <span className="corner">{type.toUpperCase()}</span>
        <span className="pin" />
      </div>
      <div className="body">
        <h3 className="name">{name}<span className="arrow">→</span></h3>
        <div className="sub">
          <span>{p.surface}</span>
          <span className="dot"></span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}

function ListRow({ p, idx, lang, onOpen }) {
  const name = lang==="es"?p.name:p.nameEn;
  const type = lang==="es"?p.type:p.typeEn;
  const status = lang==="es"?p.status:p.statusEn;
  return (
    <div className="list-row" onClick={()=>onOpen(p)}>
      <div className="num">{String(idx+1).padStart(3,"0")}</div>
      <div className="name">{name}</div>
      <div className="meta-cell">{type} — {p.location}</div>
      <div className="meta-cell">{p.surface}</div>
      <div className="meta-cell">{p.year} · {status}</div>
      <div className="arrow">→</div>
    </div>
  );
}

function Modular({ lang }) {
  return (
    <section className="modular">
      <div className="text">
        <h3>
          {lang==="es"?"Un sistema modular: ":"A modular system: "}
          <span className="accent">{lang==="es"?"planos, desplazamientos y apoyos.":"planes, shifts and supports."}</span>
        </h3>
        <p>
          {lang==="es"
            ? "Cada proyecto responde a una lógica clara, donde forma y función se construyen en simultáneo. Se evita la representación literal y se prioriza una lógica constructiva."
            : "Each project follows a clear logic, where form and function are built simultaneously. We avoid literal representation in favor of constructive logic."}
        </p>
        <p>
          {lang==="es"
            ? "Diseñar es tomar posición frente al espacio. Cada decisión construye un límite, cada plano responde a un sistema."
            : "To design is to take a position toward space. Every decision builds a limit, every plane answers to a system."}
        </p>
        <div className="values">
          <div>{lang==="es"?"Claridad":"Clarity"}</div>
          <div>{lang==="es"?"Coherencia":"Coherence"}</div>
          <div>{lang==="es"?"Precisión técnica":"Technical precision"}</div>
          <div>{lang==="es"?"Adaptación":"Adaptation"}</div>
          <div>{lang==="es"?"Compromiso con el proceso":"Process commitment"}</div>
          <div>{lang==="es"?"Idea = ejecución":"Idea = execution"}</div>
        </div>
      </div>
      <div className="diagram">
        <div className="grid-bg"/>
        <div className="plane b1"/>
        <div className="plane b2"/>
        <div className="plane b3"/>
        <div className="plane b4"/>
        <div className="plane b5"/>
        <span className="label-tick" style={{top:8,left:8}}>FIG. 02</span>
        <span className="label-tick" style={{top:8,right:8,color:"#E24F05"}}>● PLANO</span>
        <span className="label-tick" style={{bottom:8,left:8}}>MÓDULO 12 × 12</span>
        <span className="label-tick" style={{bottom:8,right:8}}>SISTEMA / 03</span>
      </div>
    </section>
  );
}

function Detail({ p, lang, onClose, onNext }) {
  useEffect(()=>{
    const k = (e)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return ()=>{ window.removeEventListener("keydown", k); document.body.style.overflow=""; };
  },[onClose]);
  if (!p) return null;
  const name = lang==="es"?p.name:p.nameEn;
  const type = lang==="es"?p.type:p.typeEn;
  const status = lang==="es"?p.status:p.statusEn;
  const desc = lang==="es"?p.desc:p.descEn;
  return (
    <div className="detail-overlay" style={{ "--card-bg": p.bg }}>
      <div className="detail-bar">
        <button onClick={onClose}>← {lang==="es"?"Índice":"Index"}</button>
        <div className="center">{name} / {p.year}</div>
        <button onClick={onNext}>{lang==="es"?"Siguiente":"Next"} →</button>
      </div>
      <div className="hero">
        <div className="image"/>
        <div className="corner-tags">
          <span>● {type.toUpperCase()}</span>
          <span>{p.location} · {p.year}</span>
        </div>
      </div>
      <div className="body">
        <div>
          <div className="label" style={{marginBottom:18}}>—— {String(PROJECTS.findIndex(x=>x.id===p.id)+1).padStart(3,"0")} / {p.year}</div>
          <h2>{name.split(" ")[0]} <span className="accent">{name.split(" ").slice(1).join(" ")}</span></h2>
          <p className="lede">{desc}</p>
        </div>
        <div className="specs">
          <div><div className="label">{lang==="es"?"Año":"Year"}</div>{p.year}</div>
          <div><div className="label">{lang==="es"?"Tipo":"Type"}</div>{type}</div>
          <div><div className="label">{lang==="es"?"Lugar":"Place"}</div>{p.location}</div>
          <div><div className="label">{lang==="es"?"Superficie":"Area"}</div>{p.surface}</div>
          <div><div className="label">{lang==="es"?"Estado":"Status"}</div>{status}</div>
          <div><div className="label">{lang==="es"?"Rol":"Role"}</div>{lang==="es"?"Proyecto y dirección":"Design & supervision"}</div>
        </div>
      </div>
      <div className="gallery">
        <div className="tile span-3"/>
        <div className="tile span-3"/>
        <div className="tile span-2"/>
        <div className="tile span-4"/>
        <div className="tile span-3"/>
        <div className="tile span-3"/>
      </div>
      <div className="next-bar">
        <span>BARDA / 2026 · ARQUITECTURA</span>
        <span></span>
        <a className="next" onClick={onNext}>{lang==="es"?"Siguiente obra":"Next work"} <span className="accent">↗</span></a>
      </div>
    </div>
  );
}

function Footer({ lang }) {
  return (
    <footer className="footer">
      <div style={{gridColumn:"1 / 2"}}>
        <h4>—— {lang==="es"?"Iniciemos":"Begin"}</h4>
        <p className="big">
          {lang==="es"?"Entender, ":"Understand, "}<br/>
          {lang==="es"?"ordenar y ":"order and "}<span className="accent">{lang==="es"?"materializar.":"materialize."}</span>
        </p>
      </div>
      <div>
        <h4>{lang==="es"?"Contacto":"Contact"}</h4>
        <ul>
          <li>hola@estudiobarda.ar</li>
          <li>+54 9 11 0000-0000</li>
          <li>@estudiobarda</li>
        </ul>
      </div>
      <div>
        <h4>{lang==="es"?"Estudio":"Studio"}</h4>
        <ul>
          <li>Buenos Aires, AR</li>
          <li>{lang==="es"?"Joaquín Licera Vidal":"Joaquín Licera Vidal"}</li>
          <li>{lang==="es"?"Director":"Principal"}</li>
        </ul>
      </div>
      <div>
        <h4>{lang==="es"?"Sistema":"System"}</h4>
        <ul>
          <li>Inter / IBM Plex Mono</li>
          <li>Ladrillo #E24F05</li>
          <li>Identidad / 2026</li>
        </ul>
      </div>
      <div className="baseline">
        <span>© BARDA · 2018 — 2026</span>
        <span className="center">● {lang==="es"?"ESTUDIO ACTIVO":"ACTIVE STUDIO"}</span>
        <span style={{textAlign:"right"}}>{lang==="es"?"HECHO EN BUENOS AIRES":"MADE IN BUENOS AIRES"}</span>
      </div>
    </footer>
  );
}

// Process / Studio mini-pages
function StudioPage({ lang }) {
  return (
    <>
      <SectionHead num="00" title={lang==="es"?"Estudio":"Studio"} meta="MANIFIESTO / 2026" />
      <Modular lang={lang} />
      <SectionHead num="01" title={lang==="es"?"Servicios":"Services"} meta="06 ÁREAS" />
      <div className="grid cols-3" style={{padding:0}}>
        {(lang==="es"
          ? ["Vivienda","Refacción y ampliación","Comercial y oficinas","Cultural / Instalaciones","Concursos","Propuestas urbanas"]
          : ["Housing","Renovation & extension","Commercial & office","Cultural / installations","Competitions","Urban proposals"]
        ).map((s,i)=>(
          <div key={i} className="card" style={{cursor:"default", "--card-bg": "#F1E6D5"}}>
            <div className="card-meta-top"><span><span className="idx">{String(i+1).padStart(3,"0")}</span></span><span>SERVICIO</span></div>
            <div className="body" style={{padding: "32px 16px 40px"}}>
              <h3 className="name" style={{fontSize:28}}>{s}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ProcessPage({ lang }) {
  const steps = lang==="es"
    ? [["Escucha","Lectura del cliente, programa y contexto. Estimación temprana de viabilidad."],
       ["Anteproyecto","Volumetría, partido y materialidad. Sistema de planos en planta y corte."],
       ["Proyecto","Documentación técnica, especificaciones, cómputos y plan de obra."],
       ["Obra","Dirección, control de calidad, ajustes y entrega final."]]
    : [["Listen","Reading client, program and context. Early feasibility check."],
       ["Schematic","Volumetry, parti and materiality. Plane system in plan and section."],
       ["Project","Technical documentation, specs, costing and construction plan."],
       ["Build","Site supervision, QC, adjustments and handover."]];
  return (
    <>
      <SectionHead num="02" title={lang==="es"?"Proceso de proyecto":"Project process"} meta="04 FASES" />
      <div className="grid cols-4">
        {steps.map(([t,d],i)=>(
          <div key={i} className="card" style={{cursor:"default","--card-bg":"#F1E6D5"}}>
            <div className="card-meta-top"><span><span className="idx">FASE {String(i+1).padStart(2,"0")}</span></span><span>· · ·</span></div>
            <div className="body" style={{padding:"24px 16px 32px"}}>
              <h3 className="name" style={{fontSize:32, marginBottom:14}}>{t}</h3>
              <p style={{margin:0, color:"var(--ink-soft)", fontSize:13.5, lineHeight:1.55}}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ContactPage({ lang }) {
  return (
    <>
      <SectionHead num="04" title={lang==="es"?"Contacto":"Contact"} meta="ESTUDIO ACTIVO · 2026" />
      <section style={{padding: "56px var(--pad-x)", display:"grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, borderBottom: "1px solid var(--rule)"}}>
        <div>
          <h2 style={{fontFamily:"var(--sans)", fontWeight:500, fontSize:"clamp(40px, 5.4vw, 88px)", letterSpacing:"-0.045em", lineHeight:0.96, margin:0}}>
            {lang==="es"?"Iniciemos un":"Let's start a"}<br/>
            <span style={{color:"var(--ladrillo)"}}>{lang==="es"?"proyecto juntos.":"project together."}</span>
          </h2>
          <p style={{maxWidth:540, marginTop:28, color:"var(--ink-soft)", fontSize:15, lineHeight:1.55}}>
            {lang==="es"
              ? "Trabajamos con una primera conversación abierta para entender el programa, el contexto y los plazos antes de presupuestar."
              : "We start with an open conversation to understand program, context and timing before quoting."}
          </p>
        </div>
        <div className="specs" style={{display:"grid", gridTemplateColumns:"1fr 1fr", border:"1px solid var(--rule)", alignSelf:"start"}}>
          <div style={{padding:"18px 18px", borderRight:"1px solid var(--rule)", borderBottom:"1px solid var(--rule)"}}>
            <div className="label" style={{marginBottom:6}}>Email</div>hola@estudiobarda.ar
          </div>
          <div style={{padding:"18px 18px", borderBottom:"1px solid var(--rule)"}}>
            <div className="label" style={{marginBottom:6}}>{lang==="es"?"Teléfono":"Phone"}</div>+54 9 11 0000-0000
          </div>
          <div style={{padding:"18px 18px", borderRight:"1px solid var(--rule)"}}>
            <div className="label" style={{marginBottom:6}}>Instagram</div>@estudiobarda
          </div>
          <div style={{padding:"18px 18px"}}>
            <div className="label" style={{marginBottom:6}}>{lang==="es"?"Sede":"Base"}</div>Buenos Aires, AR
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [lang, setLang] = useState("es");
  const [route, setRoute] = useState("index");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [theme, setTheme] = useState("light"); // light / stone / dark
  const [cols, setCols] = useState(3);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    document.body.classList.remove("theme-dark","theme-stone");
    if (theme==="dark") document.body.classList.add("theme-dark");
    if (theme==="stone") document.body.classList.add("theme-stone");
  }, [theme]);

  const filtered = useMemo(()=> filter==="all" ? PROJECTS : PROJECTS.filter(p=>p.type===filter), [filter]);
  const onOpen = (p)=>setSelected(p);
  const onNext = ()=>{
    if (!selected) return;
    const i = PROJECTS.findIndex(x=>x.id===selected.id);
    setSelected(PROJECTS[(i+1)%PROJECTS.length]);
    window.scrollTo({top:0});
  };

  // cards usan colores del manual + variaciones (más arena/gris/ladrillo, menos colores random)
  const palette = ["#F1E6D5", "#DD7845", "#949491", "#6B6B6E", "#E24F05", "#F1E6D5"];
  const projectsTinted = PROJECTS.map((p, i) => ({ ...p, bg: palette[i % palette.length] }));
  const featured = filter === "all" ? projectsTinted : projectsTinted.filter(p=>p.type===filter);

  return (
    <div className="app">
      <UtilityBar lang={lang} setLang={setLang} t={null}/>
      <TopBar route={route} setRoute={setRoute} lang={lang}/>

      {route === "index" && (
        <main>
          <Hero lang={lang} />
          <Stats lang={lang} />
          <SectionHead
            num="03"
            title={lang==="es"?"Obras seleccionadas":"Selected works"}
            meta={`${String(featured.length).padStart(2,"0")} / ${String(PROJECTS.length).padStart(2,"0")} · 2018 — 2026`} />
          <Toolbar lang={lang} filter={filter} setFilter={setFilter} view={view} setView={setView} total={PROJECTS.length} shown={featured.length} />
          {view === "grid" ? (
            <div className={`grid cols-${cols}`}>
              {featured.map((p,i)=> <Card key={p.id} p={p} idx={i} lang={lang} onOpen={onOpen} />)}
            </div>
          ) : (
            <div className="list-view">
              {featured.map((p,i)=> <ListRow key={p.id} p={p} idx={i} lang={lang} onOpen={onOpen} />)}
            </div>
          )}
          <Modular lang={lang} />
        </main>
      )}
      {route === "studio" && <main><StudioPage lang={lang}/></main>}
      {route === "process" && <main><ProcessPage lang={lang}/></main>}
      {route === "contact" && <main><ContactPage lang={lang}/></main>}

      <Footer lang={lang}/>
      {selected && <Detail p={selected} lang={lang} onClose={()=>setSelected(null)} onNext={onNext}/>}

      {/* Theme switcher (esquina) */}
      <div style={{
        position:"fixed", bottom: 16, left: 16, zIndex: 60,
        display:"flex", gap: 1, border:"1px solid var(--rule)", background:"var(--bg)",
        fontFamily:"var(--mono)", fontSize: 10, letterSpacing:"0.08em", textTransform:"uppercase"
      }}>
        {[
          ["light", lang==="es"?"Arena":"Sand"],
          ["stone", lang==="es"?"Piedra":"Stone"],
          ["dark",  lang==="es"?"Hierro":"Iron"]
        ].map(([k, label])=>(
          <button key={k} onClick={()=>setTheme(k)}
            style={{
              padding:"8px 12px",
              borderLeft: k!=="light" ? "1px solid var(--rule)" : 0,
              color: theme===k ? "var(--ladrillo)" : "var(--ink-mute)"
            }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
