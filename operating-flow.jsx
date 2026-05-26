// Cocoa Empire — Operating flow + Risk & Control journey.
// OperatingFlow stays as the 4-card teaser on the Overview.
// ControlLayers becomes a step-by-step "time travel" journey through the
// 11 checkpoints — each step is its own scene with the problem on one side
// and what we control on the other. At step 07 a celebration overlay
// fires (payment released — the core risk-control moment of the model).

function OperatingFlow({ go }) {
  return (
    <section className="section dark operating-flow" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pod-corner tl"><PodGlyph size={460} /></div>
      <div className="container">
        <div className="of-head" style={{ textAlign: "left" }}>
          <div className="eyebrow"><span style={{ lineHeight: "1.45" }}>What we control</span></div>
          <h2 className="display" style={{ marginTop: 20 }}>
            Every Bag. Every Step. <strong style={{ fontWeight: "800" }}><span style={{ color: "#4b8e1e" }} className="wave-text">{"Controlled.".split("").map((ch, i) => <span key={i} className="wave-letter" style={{ animationDelay: `${i * 0.06}s` }}>{ch}</span>)}</span></strong>
          </h2>
          <p className="of-subhead">
            A disciplined origin protocol designed to turn farmer-linked
            cocoa into quality-approved, EUDR-ready, shipment-ready supply.
          </p>
          <p className="of-intro">
            <span className="ce-name">Cocoa Empire</span> controls the
            operational flow from farmer delivery to buyer settlement.
            Every lot is received, weighed, checked, documented and approved
            before payment is released.
          </p>
        </div>

        <div className="flow-cards">
          {FLOW_CARDS.map((c, i) =>
          <Reveal key={c.n} className="flow-card" data-num={c.n} delay={i * 80}>
              <div className="flow-rule" />
              <div className="flow-num">{c.n}</div>
              <div className="flow-k">{c.k}</div>
              <h3 className="flow-t">{c.t}</h3>
              <p>{c.body}</p>
            </Reveal>
          )}
        </div>

        <div className="of-cta">
          <button type="button" className="btn primary of-cta-btn"
          onClick={() => go && go("control")}>
            <span>Explore our Risk &amp; Control, step by step</span>
            <Arrow />
          </button>
          <p className="of-cta-sub">
            A guided journey through 11 control checkpoints — from farmer
            pre-screening to capital recycling.
          </p>
        </div>
      </div>
    </section>);

}

// ─── Risk & Control Journey ───────────────────────────────────────────────
// One step rendered at a time, transition slide-in. Step 7 fires a
// celebration overlay (only once per session).

function ControlLayers({ go, goBack }) {
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState("next");

  const total = FLOW_ITEMS.length;
  const item = FLOW_ITEMS[step];

  const goStep = (i, dir) => {
    if (i < 0 || i >= total) return;
    setDirection(dir);
    setStep(i);
  };

  // Keyboard nav
  React.useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {goStep(step + 1, "next");} else
      if (e.key === "ArrowLeft") {goStep(step - 1, "prev");}
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [step]);

  return (
    <div className="view" data-screen-label="05 Control">
      <section className="journey-stage">
        {/* Back link */}
        {(goBack || go) && (
          <button type="button" className="journey-back" onClick={() => goBack ? goBack() : go("overview")}>
            <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Arrow /></span>
            <span>Back</span>
          </button>
        )}

        {/* Top header */}
        <div className="journey-header container">
          <div className="eyebrow"><span>Risk &amp; control · the full protocol</span></div>
          <h1 className="display" style={{ marginTop: 14 }}>
            A journey through<br /><strong>eleven checkpoints.</strong>
          </h1>
        </div>

        {/* Stepper bar */}
        <div className="journey-stepper container">
          <div className="journey-rail">
            <div className="journey-rail-fill"
            style={{ width: `${step / (total - 1) * 100}%` }} />
            <div className="journey-rail-stops">
              {FLOW_ITEMS.map((_, i) =>
              <button key={i} type="button"
              className={`journey-stop ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""} ${i === 6 ? "is-payment" : ""}`}
              onClick={() => goStep(i, i > step ? "next" : "prev")}
              aria-label={`Checkpoint ${i + 1}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scene */}
        <div className="container">
          <div key={step}
          className={`journey-scene journey-scene-${direction}`}>
            <ControlScene item={item} stepIdx={step} total={total} />
          </div>

          {/* Nav */}
          <div className="journey-nav">
            <button type="button" className="journey-btn ghost"
            onClick={() => goStep(step - 1, "prev")}
            disabled={step === 0}>
              <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Arrow /></span>
              <span>Previous</span>
            </button>
            <div className="journey-counter">
              <span className="now">{String(step + 1).padStart(2, "0")}</span>
              <span className="sep">/</span>
              <span className="total">{String(total).padStart(2, "0")}</span>
            </div>
            <button type="button" className="journey-btn primary"
            onClick={() => {
              if (step === total - 1) {goBack ? goBack() : go && go("overview");} else
              {goStep(step + 1, "next");}
            }}>
              <span>{step === total - 1 ? "Finish" : "Next checkpoint"}</span>
              <Arrow />
            </button>
          </div>
        </div>

        {/* Closing strong lines · photo background with dark left → translucent right */}
        <div className="of-strong-wrap">
          <img src={window.__images.imgControlClosing} alt="" className="of-strong-bg" aria-hidden="true" />
          <div className="of-strong-veil" />
          <div className="container of-strong-inner">
            <div className="of-strong">
              <p className="of-strong-1">
                Every <strong>kilo</strong> is documented.<br />
                Every <strong>lot</strong> is checked.<br />
                Every <strong>payment</strong> follows control.
              </p>
              <p className="of-strong-2">
                Warehouse-controlled cocoa finance —<br />
                <strong>not unsecured crop finance.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Celebration overlay removed */}
      </section>
    </div>);

}

function ControlScene({ item, stepIdx, total }) {
  const isPayment = stepIdx === 6;
  return (
    <div className={`scene ${isPayment ? "is-payment-scene" : ""}`}>
      {/* Stage rail */}
      <div className="scene-rail">
        <div className="scene-num-stack">
          <div className="scene-mega">{item.n}</div>
          <div className="scene-mega-shadow">{item.n}</div>
        </div>
        <div className="scene-rail-meta">
          <div className="kicker">Checkpoint {stepIdx + 1} of {total}</div>
          <div className="scene-header">{item.header}</div>
        </div>
      </div>

      {/* Story panels */}
      <div className="scene-panels">
        <div className="scene-headline">
          {(() => {
            const t = item.title;
            const parts = t.split(/[,]/);
            const renderHighlighted = (text) => {
              const words = text.trim().split(/\s+/);
              if (words.length < 2) return <span className="t-bold">{text}</span>;
              return <>
                <span className="t-bold">{words.slice(0, -1).join(" ")} </span>
                <span className="t-bold" style={{ color: "#4B8E1E" }}>{words[words.length - 1]}</span>
              </>;
            };
            if (parts.length > 1) {
              return <>
                <span className="t-light">{parts[0]},</span><br />
                {renderHighlighted(parts.slice(1).join(",").trim())}
              </>;
            }
            return renderHighlighted(t);
          })()}
        </div>
        <p className="scene-explain">{(() => {
          const txt = item.explain;
          const terms = ["Cocoa Empire", "warehouse", "QC", "EUDR", "quality", "approved", "documented", "verified", "buyer", "settlement", "controlled", "control"];
          const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const re = new RegExp("(" + terms.map(escape).join("|") + ")", "gi");
          const parts = txt.split(re);
          return parts.map((p, i) => {
            if (terms.some((t) => t.toLowerCase() === p.toLowerCase())) {
              return <strong key={i} style={{ fontWeight: 700, color: "var(--cocoa)" }}>{p}</strong>;
            }
            return <React.Fragment key={i}>{p}</React.Fragment>;
          });
        })()}</p>

        {item.pull &&
        <div className="scene-pull">
            We do not pay for cocoa in the field.{" "}<strong>We pay only for cocoa accepted under our control.</strong>
          </div>
        }

        <div className="scene-combo">
          {/* RISK side */}
          <div className="scene-combo-risk">
            <div className="scene-combo-head">
              <span className="scene-combo-icon risk" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L29 27H3L16 4z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M16 12.5v6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  <circle cx="16" cy="22.5" r="1.4" fill="currentColor" />
                </svg>
              </span>
              <div>
                <div className="scene-combo-lbl">The risk without us</div>
                <div className="scene-combo-sub">What goes wrong elsewhere</div>
              </div>
            </div>
            <p>{item.risks}</p>
          </div>

          <div className="scene-combo-divider" aria-hidden="true" />

          {/* CONTROL side */}
          <div className="scene-combo-control">
            <div className="scene-combo-head">
              <span className="scene-combo-icon control" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 3L5 7v8.5c0 6.4 4.5 11 11 13 6.5-2 11-6.6 11-13V7L16 3z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M11 16L14.5 19.5L21.5 12.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <div className="scene-combo-lbl">How we control it</div>
                <div className="scene-combo-sub">{item.controls.length} active checkpoints</div>
              </div>
            </div>
            <ul>
              {item.controls.map((c) => (
                <li key={c}>
                  <span className="scene-combo-tick" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8.5L6.5 12L13 5" />
                    </svg>
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>);

}

function PaymentCelebration({ onClose }) {
  // Auto-dismiss after 6 seconds.
  React.useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 6000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="celebration" role="dialog" aria-modal="true">
      <button type="button" className="celebration-close" onClick={onClose} aria-label="Close">×</button>

      {/* Confetti */}
      <div className="confetti pod-rain">
        {Array.from({ length: 32 }).map((_, i) => {
          const colors = ["#3D1C08", "#7A3D14", "#B8945A", "#C9A14B", "#A5392E", "#D46A2C", "#5A7B36"];
          const c = colors[i % colors.length];
          return (
            <svg key={i} viewBox="0 0 32 56" aria-hidden="true"
            style={{
              "--x": `${(Math.random() * 100).toFixed(1)}%`,
              "--d": `${(0.2 + Math.random() * 1.8).toFixed(2)}s`,
              "--r": `${(Math.random() * 360).toFixed(0)}deg`,
              "--w": `${14 + Math.round(Math.random() * 16)}px`,
              "--dur": `${(2.4 + Math.random() * 1.6).toFixed(2)}s`
            }}>
              <g>
                {/* Stem */}
                <path d="M14.5 4 Q 16 0, 17.5 4 L 17.5 8 L 14.5 8 Z" fill={c} />
                {/* Body */}
                <path d="M16 6 C 24 6, 28 14, 28 28 C 28 42, 22 52, 16 52 C 10 52, 4 42, 4 28 C 4 14, 8 6, 16 6 Z" fill={c} />
                {/* Ridges */}
                <g stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" strokeLinecap="round">
                  <path d="M16 8 L 16 50" />
                  <path d="M10 12 C 12 22, 12 38, 10 48" />
                  <path d="M22 12 C 20 22, 20 38, 22 48" />
                </g>
              </g>
            </svg>);

        })}
      </div>

      <div className="celebration-card">
        <div className="celebration-burst" />
        <div className="celebration-ring r1" />
        <div className="celebration-ring r2" />
        <div className="celebration-ring r3" />

        <div className="celebration-stamp">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#72BD2D" strokeWidth="3" fill="rgba(114,189,45,0.10)" />
            <path d="M22 41L34 53L60 27" stroke="#72BD2D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <div className="celebration-meta">Checkpoint 07 · Cleared</div>
        <h2 className="celebration-title">
          Payment <span className="hl">released.</span>
        </h2>
        <p className="celebration-sub">
          Cocoa received. Quality verified. Documentation complete.<br />
          <strong>This is the moment capital meets controlled supply.</strong>
        </p>

        <div className="celebration-stats">
          <div>
            <div className="k">Lots cleared</div>
            <div className="v">06</div>
          </div>
          <div>
            <div className="k">Risks mitigated</div>
            <div className="v">24+</div>
          </div>
          <div>
            <div className="k">Capital secured</div>
            <div className="v">100%</div>
          </div>
        </div>

        <button type="button" className="btn primary" onClick={onClose}>
          <span>Continue the journey</span><Arrow />
        </button>
      </div>
    </div>);

}

Object.assign(window, { OperatingFlow, ControlLayers, ControlScene, PaymentCelebration });