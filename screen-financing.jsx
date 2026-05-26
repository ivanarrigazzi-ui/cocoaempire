// Cocoa Empire — Invest with us screen.
// Clean institutional design: typographic hero, structured cycle, principles,
// sample lot flow, single CTA. No photo headers, restrained palette.

function FinancingScreen({ go }) {
  return (
    <div className="view" data-screen-label="03 Invest with us">

      {/* HERO · clean cream band, no photo */}
      <section className="section invest-hero" id="capital-partners">
        <div className="container">
          <div className="invest-hero-grid">
            <div className="invest-hero-l">
              <div className="eyebrow"><span>Invest with us</span></div>
              <h1 className="invest-h1">
                Strategic working capital<br />
                for <strong>controlled origin execution.</strong>
              </h1>
              <p className="invest-sub">
                <span className="ce-name invest-cename">Cocoa Empire</span> works with strategic capital
                partners to expand warehouse-controlled cocoa procurement. Capital
                supports product flows that are received, inspected, documented
                and approved before payment is released.
              </p>
              <div className="invest-cta-row">
                <button type="button" className="btn invest-btn-ghost" onClick={() => go("control")}>
                  <span>View control protocol</span><Arrow />
                </button>
                <button type="button" className="btn primary invest-btn-primary">
                  <span>Request data room</span><Arrow />
                </button>
                <button type="button" className="btn invest-btn-ghost" onClick={() => go("origin")}>
                  <span>Live & past cycles</span><Arrow />
                </button>
                <button type="button" className="btn primary invest-btn-primary invest-btn-calc" onClick={() => go("calc")}>
                  <span>Capital simulator</span><Arrow />
                </button>
              </div>
            </div>
            <div className="invest-hero-r">
              <div className="invest-stat-card">
                <div className="invest-stat-row is-cycle">
                  <div className="k">Cycle length</div>
                  <div className="v">30–45 <span className="unit">days</span></div>
                </div>
                <div className="invest-stat-row">
                  <div className="k">Payment trigger</div>
                  <div className="v small">Acceptance + QC</div>
                </div>

                <div className="invest-stat-row">
                  <div className="k">Capital structure</div>
                  <div className="v small">Bespoke · private</div>
                </div>
                <div className="invest-stat-row">
                  <div className="k">Documentation</div>
                  <div className="v small">Under NDA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE CYCLE WORKS · photo background */}
      <section className="section cycle-how" style={{ position: "relative", overflow: "hidden" }}>
        <image-slot id="cycle-how-bg" shape="rect"
                    src={window.__images.imgCycleHow}
                    placeholder="Drop photo · cocoa pods on tree"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="cycle-how-veil" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "end" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}><span>How the cycle works</span></div>
              <h2 className="display invest-h2 cycle-how-h2">
                One cycle, <strong>30–45 days.</strong><br />
                Capital deployed at the<br />
                point of <strong>control.</strong>
              </h2>
            </div>
            <p className="lede invest-lede cycle-how-lede">
              Capital enters. We source and accept cocoa under our protocol.
              The moment our quality department approves a lot, we pay the
              farmer and the cocoa ships to the matched buyer. The buyer
              settles in <strong style={{ color: "#4B8E1E" }}>30–45 days</strong> — and capital is recycled into the next cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Cycle animation · dark, contained */}
      <section className="section tight dark-deep" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container">
          <CycleAnimation />
        </div>
      </section>

      {/* PRINCIPLES · 3 clean text columns, no boxes */}
      <section className="section">
        <div className="container">
          <div className="eyebrow"><span>Capital partnership principles</span></div>
          <h2 className="display invest-h2" style={{ marginTop: 18, marginBottom: 48 }}>
            Working capital,<br /><strong>tied to controlled inventory.</strong>
          </h2>
          <div className="invest-principles">
            {[
              { n: "01", t: "Capital at the point of control",
                body: "Funds support cocoa that has been physically received, inspected and approved — not crops in the field." },
              { n: "02", t: "Warehouse-controlled flows",
                body: "Inventory remains under operating custody until matched, loaded and dispatched against documentation." },
              { n: "03", t: "Documented operating cycles",
                body: "Each cycle has clear receipts, QC records, buyer paperwork and settlement traceability." },
            ].map((c) => (
              <Reveal key={c.n} className="invest-principle">
                <div className="invest-principle-n">{c.n}</div>
                <h3>{c.t}</h3>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      

      {/* WE DO / WE DO NOT · full-bleed dark band */}
      <section className="section invest-discipline-band" style={{ position: "relative", overflow: "hidden" }}>
        <image-slot id="discipline-bg" shape="rect"
                    src={window.__images.imgDiscipline}
                    placeholder="Drop photo · cocoa pods harvest pile"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="invest-discipline-veil" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow"><span>Operating discipline</span></div>
          <h2 className="invest-disc-band-h2">
            Disciplined <strong>capital deployment.</strong>
          </h2>
          <div className="invest-disc-band-grid">
            <div className="invest-disc-band-col not">
              <div className="invest-disc-band-h">We don't</div>
              <ul>
                {[
                  "Finance cocoa in the field against estimated yields",
                  "Pre-fund supply without warehouse control",
                  "Deploy capital against unverified lots",
                  "Take open exposure without buyer visibility",
                ].map((t) => (
                  <li key={t}>
                    <svg className="disc-mark" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                      <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="invest-disc-band-col do">
              <div className="invest-disc-band-h">We do</div>
              <ul>
                {[
                  "Finance accepted cocoa under our control",
                  "Verify quality, weight and documentation before payment",
                  "Match accepted lots to buyer demand",
                  "Track every lot through shipment and settlement",
                  "Recycle capital through controlled operating cycles",
                ].map((t) => (
                  <li key={t}>
                    <svg className="disc-mark" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 7.5L5.5 10.5L11.5 4" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA · single tight block */}
      <section className="section invest-final-cta">
        <div className="container">
          <div className="invest-final-grid">
            <div>
              <h2 className="invest-h1" style={{ maxWidth: "22ch" }}>
                Open the data room.<br />
                <strong>Start a strategic conversation.</strong>
              </h2>
            </div>
            <div>
              <p className="invest-lede">
                Operating documentation, sample lot flow, infrastructure
                records and the working capital framework are available under
                NDA in the data room.
              </p>
              <div className="invest-cta-row">
                <button type="button" className="btn invest-btn-ghost" onClick={() => go("control")}>
                  <span>View control protocol</span><Arrow />
                </button>
                <button type="button" className="btn primary invest-btn-primary">
                  <span>Request data room</span><Arrow />
                </button>
                <button type="button" className="btn invest-btn-ghost" onClick={() => go("origin")}>
                  <span>Live & past cycles</span><Arrow />
                </button>
                <button type="button" className="btn primary invest-btn-primary invest-btn-calc" onClick={() => go("calc")}>
                  <span>Capital simulator</span><Arrow />
                </button>
              </div>
              <p className="disclaimer" style={{ marginTop: 24, maxWidth: "60ch" }}>
                Any capital partnership is subject to due diligence, KYC/AML,
                legal documentation, risk assessment and applicable laws.
                This is not an offer of securities or a guaranteed return.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { FinancingScreen });
