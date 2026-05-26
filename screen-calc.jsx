// Cocoa Empire — Capital Partner Simulator (private investor area).
// Fresh, modern calculator: ticket slider + 3 cycle-speed scenarios
// (60d / 45d / 30d). Indicative only — 3% per completed cycle.
//
// Class prefix `cc-` to avoid collision with the legacy .calc-* styles
// still living in styles.css.

function CalcScreen({ go }) {
  const MIN = 100000;
  const MAX = 1000000;
  const STEP = 50000;

  const [amount, setAmount] = React.useState(500000);

  // Three cycle-length scenarios; 3% gross return per completed cycle.
  const SCENARIOS = [
    {
      key: "cons",
      label: "Conservative",
      days: 60,
      sub: "Slower rotation · longer buyer payment terms",
    },
    {
      key: "base",
      label: "Base case",
      days: 45,
      sub: "Average cycle observed in past 5 months",
      featured: true,
    },
    {
      key: "strong",
      label: "Strong",
      days: 30,
      sub: "Pre-sold lots · fastest accept-to-pay",
    },
  ];

  const dots = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const fmtTicket = (n) => {
    if (n >= 1000000) {
      const m = n / 1000000;
      const s = m % 1 === 0 ? m.toFixed(0) : m.toFixed(1);
      return `$${s}M`;
    }
    return `$${dots(n / 1000)}K`;
  };
  const fmtUsd = (n) => `$ ${dots(n)}`;

  const bump = (d) =>
    setAmount((a) => Math.max(MIN, Math.min(MAX, a + d * STEP)));

  const compute = (days) => {
    const cycles = Math.round((365 / days) * 10) / 10; // 1-decimal
    const cyclesInt = Math.floor(365 / days);          // completed cycles
    const grossPct = cyclesInt * 3;                    // 3% per completed cycle
    const grossAmt = (amount * grossPct) / 100;
    const rotated = amount * cyclesInt;                // capital deployed N times
    // Indicative MT controlled: assume ~$3,800 avg lot cost.
    const mt = Math.round(rotated / 3800);
    return { cycles, cyclesInt, grossPct, grossAmt, rotated, mt };
  };

  return (
    <div className="view cc-view" data-screen-label="04 Capital Simulator">
      {/* HEADER */}
      <section className="section tight cc-header">
        <div className="container">
          <div className="cc-eyebrow">
            <span className="cc-lock" aria-hidden="true">●</span>
            Private investor area · indicative simulator
          </div>
          <h1 className="cc-h1">
            See how your ticket <span className="cc-h1-accent">may rotate.</span>
          </h1>
          <p className="cc-sub">
            What we offer capital partners on request: <strong>3% gross return per
            completed cycle</strong>, paid as the buyer settles. Average cycle observed
            in the last 5 months is <strong>45 days</strong> — the simulator shows three
            scenarios around that benchmark.
          </p>
        </div>
      </section>

      {/* TICKET INPUT */}
      <section className="section tight cc-ticket-section">
        <div className="container">
          <div className="cc-ticket-card">
            <div className="cc-ticket-l">
              <div className="cc-ticket-k">Capital ticket</div>
              <div className="cc-ticket-v">{fmtTicket(amount)}</div>
              <div className="cc-ticket-sub">USD · adjustable in $50K steps</div>
            </div>
            <div className="cc-ticket-r">
              <div className="cc-stepper-row">
                <button type="button" className="cc-stepper" onClick={() => bump(-1)} aria-label="Decrease">−</button>
                <input
                  type="range"
                  className="cc-slider"
                  min={MIN} max={MAX} step={STEP} value={amount}
                  style={{ "--pct": ((amount - MIN) / (MAX - MIN)) * 100 + "%" }}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button type="button" className="cc-stepper" onClick={() => bump(1)} aria-label="Increase">+</button>
              </div>
              <div className="cc-scale">
                <span>{fmtTicket(MIN)}</span>
                <span>{fmtTicket((MIN + MAX) / 2)}</span>
                <span>{fmtTicket(MAX)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="section cc-scen-section">
        <div className="container">
          <div className="cc-scen-grid">
            {SCENARIOS.map((s) => {
              const r = compute(s.days);
              return (
                <article key={s.key} className={`cc-scen ${s.featured ? "is-featured" : ""}`}>
                  {s.featured && <div className="cc-scen-flag">Most likely</div>}

                  <header className="cc-scen-head">
                    <div className="cc-scen-kicker">{s.label}</div>
                    <div className="cc-scen-days">{s.days}<span> days / cycle</span></div>
                  </header>

                  <div className="cc-scen-hero">
                    <div className="cc-scen-pct">
                      {r.grossPct}<span>%</span>
                    </div>
                    <div className="cc-scen-pct-lbl">indicative gross return / year</div>
                    <div className="cc-scen-amt">+ {fmtUsd(Math.round(r.grossAmt))}</div>
                  </div>

                  <p className="cc-scen-explain">{s.sub}</p>

                  <div className="cc-scen-stats">
                    <div>
                      <div className="cc-stat-k">Completed cycles / yr</div>
                      <div className="cc-stat-v">{r.cyclesInt}</div>
                    </div>
                    <div>
                      <div className="cc-stat-k">Capital rotated</div>
                      <div className="cc-stat-v">{fmtUsd(r.rotated)}</div>
                    </div>
                  </div>

                  <div className="cc-scen-math">
                    <span>{r.cyclesInt} cycles × 3% = {r.grossPct}%</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MECHANICS */}
      <section className="section tight cc-mech-section">
        <div className="container">
          <div className="cc-mech-card">
            <h3 className="cc-mech-title">How a cycle is paid</h3>
            <ol className="cc-mech-steps">
              <li>
                <span className="cc-mech-n">01</span>
                <div>
                  <div className="cc-mech-h">Capital deployed against an accepted lot</div>
                  <div className="cc-mech-p">Funds only release after intake, QC and buyer-acceptance milestones.</div>
                </div>
              </li>
              <li>
                <span className="cc-mech-n">02</span>
                <div>
                  <div className="cc-mech-h">Buyer settles on the agreed milestone</div>
                  <div className="cc-mech-p">Typically loading-advance + CAD against shipping documents, or at destination.</div>
                </div>
              </li>
              <li>
                <span className="cc-mech-n">03</span>
                <div>
                  <div className="cc-mech-h">Partner receives capital + 3% per completed cycle</div>
                  <div className="cc-mech-p">Paid from buyer settlement. Recycled into the next pipeline at partner option.</div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section tight cc-cta-section">
        <div className="container">
          <div className="cc-cta-card">
            <div className="cc-cta-l">
              <div className="cc-cta-eyebrow">Next step</div>
              <div className="cc-cta-h">Request the data room.</div>
              <p className="cc-cta-p">
                Live pipeline, buyer references, operating metrics and
                signed-NDA documentation. Sent within 48 hours.
              </p>
            </div>
            <div className="cc-cta-r">
              <a className="cc-btn primary" href="mailto:ivan@cocoaempire.com?subject=Data%20room%20access">
                Request data room
              </a>
              <a className="cc-btn ghost" onClick={() => go("origin")}>
                See past cycles
              </a>
            </div>
          </div>

          <div className="cc-disclaimer">
            <span className="cc-disclaimer-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3 L22 21 L2 21 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <path d="M12 10 V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="18" r="1.2" fill="currentColor" />
              </svg>
            </span>
            <p>
              <strong>Indicative only.</strong> Nothing on this page is an offer
              of securities, investment advice or a guaranteed return. Actual
              returns depend on cocoa availability, buyer payment timing,
              currency and risk controls. Any capital partnership is subject to
              due diligence, KYC/AML, legal documentation and applicable law.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

window.CalcScreen = CalcScreen;
