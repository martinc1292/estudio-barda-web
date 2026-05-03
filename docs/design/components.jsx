/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ====== Cursor custom ======
function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState(""); // "", "card", "link"

  useEffect(() => {
    if (!enabled) return;
    let rafId;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    const onOver = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setMode(t.dataset.cursor);
        setLabel(t.dataset.cursorLabel || "");
      } else {
        setMode("");
        setLabel("");
      }
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cc dot" />
      <div
        ref={ringRef}
        className={`cc ring ${mode === "card" ? "hover-card" : mode === "link" ? "hover-link" : ""}`}
      >
        {mode === "card" ? label : ""}
      </div>
    </>
  );
}

// ====== Top bar ======
function TopBar({ lang, setLang, route, setRoute, t }) {
  return (
    <header className="topbar">
      <div className="left">
        <a className="nav-link" data-cursor="link" onClick={() => setRoute("index")} style={{cursor:"none"}}>
          <span className={route==="index" ? "active nav-link" : "nav-link"}>{t.nav.index}</span>
        </a>
        <a className="nav-link" data-cursor="link" onClick={() => setRoute("studio")} style={{cursor:"none"}}>
          <span className={route==="studio" ? "active nav-link" : "nav-link"}>{t.nav.studio}</span>
        </a>
        <a className="nav-link" data-cursor="link" onClick={() => setRoute("contact")} style={{cursor:"none"}}>
          <span className={route==="contact" ? "active nav-link" : "nav-link"}>{t.nav.contact}</span>
        </a>
      </div>
      <div className="brand" data-cursor="link" onClick={() => setRoute("index")}>
        <span className="b-mark">Barda</span>
        <span className="b-sub">{t.nav.studio}</span>
      </div>
      <div className="right">
        <span className="mono" style={{color:"var(--ink-mute)"}}>BA · AR · {t.since}</span>
        <div className="lang-toggle">
          <button data-cursor="link" className={lang==="es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          <span className="sep">/</span>
          <button data-cursor="link" className={lang==="en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </header>
  );
}

// ====== Ticker ======
function Ticker({ items }) {
  const seg = (
    <span className="seg">
      {items.map((it, i) => <span key={i}>{it}</span>)}
    </span>
  );
  return (
    <div className="ticker" aria-hidden="true">
      {seg}{seg}
    </div>
  );
}

// ====== Filtros + view switch ======
const TYPES_ES = ["Todos","Residencial","Refacción","Comercial","Cultural","Concurso","Ampliación","Remodelación"];
const TYPES_EN = ["All","Residential","Refurbishment","Commercial","Cultural","Competition","Extension","Remodel"];

function Toolbar({ lang, t, filter, setFilter, view, setView, total, shown }) {
  const types = lang === "es" ? TYPES_ES : TYPES_EN;
  return (
    <div className="toolbar">
      <div className="filters">
        {types.map((tp, i) => {
          const value = i === 0 ? "all" : (lang === "es" ? tp : TYPES_ES[i]);
          return (
            <button key={tp} data-cursor="link"
              className={filter === value ? "on" : ""}
              onClick={() => setFilter(value)}>{tp}</button>
          );
        })}
      </div>
      <div className="right">
        <span className="mono" style={{color:"var(--ink-mute)"}}>{String(shown).padStart(2,"0")} / {String(total).padStart(2,"0")} {t.works.toLowerCase()}</span>
        <div className="view-switch">
          <button data-cursor="link" className={view === "grid" ? "on" : ""} onClick={() => setView("grid")} title="Grid">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1"><rect x="1" y="1" width="5" height="5"/><rect x="8" y="1" width="5" height="5"/><rect x="1" y="8" width="5" height="5"/><rect x="8" y="8" width="5" height="5"/></svg>
          </button>
          <button data-cursor="link" className={view === "list" ? "on" : ""} onClick={() => setView("list")} title="List">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1"><line x1="1" y1="3" x2="13" y2="3"/><line x1="1" y1="7" x2="13" y2="7"/><line x1="1" y1="11" x2="13" y2="11"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ====== Card ======
function Card({ p, idx, lang, onOpen, ratio }) {
  const name = lang === "es" ? p.name : p.nameEn;
  const type = lang === "es" ? p.type : p.typeEn;
  const status = lang === "es" ? p.status : p.statusEn;
  const cls = `card ${ratio || ""}`;
  return (
    <div className={cls}
      style={{ "--card-bg": p.bg, "--card-accent": p.accent }}
      data-cursor="card"
      data-cursor-label={(lang==="es"?"Ver":"View")+" →"}
      onClick={() => onOpen(p)}>
      <div className="frame">
        <div className="image" />
        <div className="corner">{String(idx + 1).padStart(2, "0")} / {p.year}</div>
        <div className="hover-meta">
          <div className="name">{name}</div>
          <div className="meta-r">{type} · {p.location}</div>
        </div>
      </div>
      <div className="meta">
        <div className="name">{name}</div>
        <div className="yr">{p.year}</div>
        <div className="sub">
          <span>{type}</span>
          <span className="dot"></span>
          <span>{p.location}</span>
          <span className="dot"></span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}

// ====== List row ======
function ListRow({ p, idx, lang, onOpen }) {
  const name = lang === "es" ? p.name : p.nameEn;
  const type = lang === "es" ? p.type : p.typeEn;
  const status = lang === "es" ? p.status : p.statusEn;
  return (
    <div className="list-row" data-cursor="link" onClick={() => onOpen(p)}>
      <div className="num">{String(idx + 1).padStart(2,"0")}</div>
      <div className="name">{name}</div>
      <div className="meta-cell">{type} — {p.location}</div>
      <div className="meta-cell">{p.surface}</div>
      <div className="meta-cell">{p.year} · {status}</div>
      <div className="arrow">→</div>
    </div>
  );
}

// ====== Index strip ======
function IndexStrip({ t, lang, mode, featured }) {
  if (mode === "feature" && featured) {
    const name = lang === "es" ? featured.name : featured.nameEn;
    const type = lang === "es" ? featured.type : featured.typeEn;
    const status = lang === "es" ? featured.status : featured.statusEn;
    return (
      <section className="feature-hero" style={{ "--card-bg": featured.bg, "--card-accent": featured.accent }}>
        <div className="pic"><div className="image" /></div>
        <div className="text">
          <div>
            <div className="label" style={{marginBottom: 24}}>{lang==="es" ? "Obra reciente" : "Recent work"} — 01</div>
            <h1>{t.tagline.split(",")[0]}, <em>{(t.tagline.split(",")[1]||"").trim().replace(".","")}</em>.</h1>
          </div>
          <div>
            <div className="specs">
              <div><div className="label">{t.year}</div>{featured.year}</div>
              <div><div className="label">{t.type}</div>{type}</div>
              <div><div className="label">{t.place}</div>{featured.location}</div>
              <div><div className="label">{t.status}</div>{status}</div>
            </div>
            <div className="name-line">
              <span>{lang==="es"?"Pieza destacada":"Featured piece"}</span>
              <span className="pname">{name}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="index-strip">
      <h1>
        {t.tagline.split(",")[0]},<br/>
        <em>{(t.tagline.split(",")[1]||"").trim().replace(".","")}</em>.
      </h1>
      <div className="meta">
        <div className="row">
          <div className="label">{t.studio}</div>
          {t.manifesto}
        </div>
        <div className="row">
          <div className="label">{t.place}</div>
          {t.location}
          <br/><br/>
          <div className="label">{lang==="es"?"Servicios":"Services"}</div>
          {t.services.slice(0,3).join(" · ")}
        </div>
      </div>
    </section>
  );
}

// ====== Detail overlay ======
function Detail({ p, lang, t, onClose, onNext }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!p) return null;
  const name = lang === "es" ? p.name : p.nameEn;
  const type = lang === "es" ? p.type : p.typeEn;
  const status = lang === "es" ? p.status : p.statusEn;
  const desc = lang === "es" ? p.desc : p.descEn;

  return (
    <div className="detail-overlay" style={{ "--card-bg": p.bg, "--card-accent": p.accent }}>
      <button className="close" data-cursor="link" onClick={onClose}>{t.backToIndex} ↗</button>
      <div className="hero"><div className="image" /></div>
      <div className="body">
        <div>
          <div className="label" style={{marginBottom: 18}}>—— {p.year}</div>
          <h2>{name}</h2>
          <p className="lede">{desc}</p>
        </div>
        <div className="specs">
          <div><div className="label">{t.year}</div>{p.year}</div>
          <div><div className="label">{t.type}</div>{type}</div>
          <div><div className="label">{t.place}</div>{p.location}</div>
          <div><div className="label">{t.surface}</div>{p.surface}</div>
          <div><div className="label">{t.status}</div>{status}</div>
          <div><div className="label">{lang==="es"?"Rol":"Role"}</div>{lang==="es"?"Proyecto y dirección":"Design & supervision"}</div>
        </div>
      </div>
      <div className="gallery">
        <div className="tile span-3" />
        <div className="tile span-3" />
        <div className="tile span-2" />
        <div className="tile span-4" />
        <div className="tile span-3" />
        <div className="tile span-3" />
      </div>
      <div className="next-bar">
        <span>{t.cap}</span>
        <span></span>
        <a className="next" data-cursor="link" onClick={onNext}>{t.next} ↗</a>
      </div>
    </div>
  );
}

// ====== Studio page ======
function StudioPage({ t, lang }) {
  return (
    <>
      <section className="index-strip">
        <h1>{lang==="es"?"Un estudio chico,":"A small studio,"}<br/><em>{lang==="es"?"un enfoque preciso":"a precise approach"}</em>.</h1>
        <div className="meta">
          <div className="row">
            <div className="label">{lang==="es"?"Director":"Principal"}</div>
            {t.director}
          </div>
          <div className="row">
            <div className="label">{lang==="es"?"Sede":"Base"}</div>
            {t.location}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="h-side">{lang==="es"?"01 — Enfoque":"01 — Approach"}</div>
        <div>
          <p className="body-text">{t.manifesto}</p>
          <p className="body-text">
            {lang==="es"
              ? "Cada proyecto se aborda desde la escucha al cliente, la lectura del lugar y una estimación temprana de viabilidad. Trabajamos sobre vivienda, refacción, oficinas y propuestas urbanas, con énfasis en proyectos construibles que sostengan su intención inicial hasta el final de obra."
              : "Each project starts by listening to the client, reading the site, and assessing feasibility early. We work on housing, refurbishment, offices and urban proposals — focused on buildable projects that hold their original intention through to completion."}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="h-side">{lang==="es"?"02 — Servicios":"02 — Services"}</div>
        <div>
          <ul style={{listStyle:"none",padding:0,margin:0,fontFamily:"var(--serif)",fontSize:"clamp(22px,2.4vw,32px)",lineHeight:1.4}}>
            {t.services.map((s,i)=>(
              <li key={i} style={{display:"flex",gap:24,padding:"14px 0",borderBottom:"1px solid var(--rule-soft)"}}>
                <span className="num" style={{minWidth:36,paddingTop:14}}>0{i+1}</span>
                <span style={{flex:1}}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ContactPage({ t, lang }) {
  return (
    <section className="index-strip" style={{minHeight:"60vh", borderBottom:"1px solid var(--rule-soft)"}}>
      <h1>{lang==="es"?"Hagamos algo,":"Let's make something,"}<br/><em>{lang==="es"?"hablemos":"let's talk"}</em>.</h1>
      <div className="meta">
        <div className="row">
          <div className="label">Email</div>
          <a data-cursor="link" href={`mailto:${t.email}`}>{t.email}</a>
        </div>
        <div className="row">
          <div className="label">{lang==="es"?"Teléfono":"Phone"}</div>
          {t.phone}
          <br/><br/>
          <div className="label">Instagram</div>
          @estudiobarda
        </div>
      </div>
    </section>
  );
}

// ====== Footer ======
function Footer({ t, lang }) {
  return (
    <footer className="footer">
      <div className="col">
        <h4>{lang==="es"?"Estudio":"Studio"}</h4>
        <ul>
          <li>Estudio Barda</li>
          <li>{t.location}</li>
          <li>{t.since}</li>
        </ul>
      </div>
      <div className="col">
        <h4>{lang==="es"?"Contacto":"Contact"}</h4>
        <ul>
          <li><a data-cursor="link" href={`mailto:${t.email}`}>{t.email}</a></li>
          <li>{t.phone}</li>
          <li><a data-cursor="link">@estudiobarda</a></li>
        </ul>
      </div>
      <div className="col">
        <h4>{lang==="es"?"Colofón":"Colophon"}</h4>
        <ul>
          <li>Instrument Serif · Inter</li>
          <li>{lang==="es"?"Tierras + off-whites":"Earth + off-whites"}</li>
          <li>2026</li>
        </ul>
      </div>
      <div className="baseline">
        <span>© 2026 Estudio Barda</span>
        <span>{lang==="es"?"Hecho en Buenos Aires":"Made in Buenos Aires"}</span>
      </div>
    </footer>
  );
}

Object.assign(window, { TopBar, Ticker, Toolbar, Card, ListRow, IndexStrip, Detail, StudioPage, ContactPage, Footer, CustomCursor });
