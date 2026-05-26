// Cocoa Empire — Impact screen.
// Split layout: dark cocoa panel + photo on right (hero band),
// then cream "WHERE THE 10% LANDS" mid band with quote + 6 columned areas,
// then the closing "One team, one origin" photo band.

const IMPACT_AREAS_DESC = [
  { label: "Education",         desc: "Schools, materials and scholarships." },
  { label: "Clean water",       desc: "Access to safe drinking water for families." },
  { label: "Healthcare support", desc: "Community health initiatives and supplies." },
  { label: "Agronomy training", desc: "Technical training for better, sustainable yields." },
  { label: "Fair income support", desc: "Programs that strengthen financial stability." },
  { label: "Community projects", desc: "Local infrastructure and social development." },
];

function ImpactScreen() {
  return (
    <div className="view" data-screen-label="09 Impact">

      {/* HERO BAND — split: cocoa panel + photo */}
      <section className="section impact-split">
        <div className="impact-split-grid">

          {/* LEFT · solid cocoa panel */}
          <div className="impact-panel">
            <div className="impact-panel-inner">
              <div className="eyebrow"><span>Impact</span></div>
              <h1 className="impact-headline impact-panel-h1">
                <span className="pct">10<span className="sym">%</span></span>
                <span className="line">reinvested</span>
                <span className="line">into the <em>communities</em></span>
                <span className="line">behind the supply.</span>
              </h1>
              <p className="impact-panel-lede">
                <span className="ce-name impact-panel-ce" ref={(el) => el && el.style.setProperty("color", "#FFFFFF", "important")}>Cocoa Empire</span> intends to allocate
                <strong className="impact-panel-strong"> up to 10% of annual profits</strong> to community and farmer development projects.
              </p>
            </div>
          </div>

          {/* RIGHT · photo with floating quote overlay */}
          <div className="impact-photo-r">
            <image-slot id="impact-bg" shape="rect"
                        src={window.__images.impactKids}
                        placeholder="Drop photo · farmer / community"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
            </image-slot>
            <div className="impact-photo-overlay">
              <p>
                <strong>Impact is not decoration.</strong><br />
                It strengthens farmer loyalty, quality and long-term supply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MID BAND · cream, no photo */}
      <section className="section impact-mid">
        <div className="container">
          <div className="impact-mid-head">
            <div>
              <div className="eyebrow"><span>Where the 10% lands</span></div>
              <h2 className="display impact-mid-h2">
                Real{" "}
                <span className="wave-letters is-green">
                  {"investment".split("").map((c, i) => (
                    <span key={i} className="wave-letter" style={{ animationDelay: `${i * 0.05}s` }}>{c}</span>
                  ))}
                </span>{" "}
                into the<br />
                <span className="wave-letters is-green">
                  {"communities".split("").map((c, i) => (
                    <span key={i} className="wave-letter" style={{ animationDelay: `${i * 0.05}s` }}>{c}</span>
                  ))}
                </span>{" "}
                we work with.
              </h2>
            </div>
            <div className="impact-mid-quote">
              <span className="impact-mark">“</span>
              <p>
                The communities that grow our cocoa are the same ones that{" "}<strong style={{ fontWeight: 900, fontStyle: "normal", color: "var(--cocoa)" }}>guarantee its quality</strong>. Protecting them is not a side project —
                it is part of the operating model.
              </p>
            </div>
          </div>

          {/* 6 column area grid */}
          <div className="impact-cols">
            {IMPACT_AREAS_DESC.map((it, i) => (
              <Reveal key={it.label} className="impact-col" delay={i * 50}>
                <div className="impact-col-n">{String(i + 1).padStart(2, "0")}</div>
                <div className="impact-col-rule" />
                <div className="impact-col-lbl">{it.label}</div>
                <p>{it.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT FUND · roadmap section */}
      <section className="section impact-fund">
        <div className="container">

          <div className="fund-head">
            <div className="eyebrow"><span>Empire Impact Fund</span></div>
            <h2 className="fund-h2">
              <span className="fund-h2-line bold">Launching July 2026.</span>
            </h2>
            <p className="fund-sub">
              Below are the community programmes financed by Cocoa Empire across different impact areas in Bundibugyo. Each one is selected with local cooperatives and reported publicly.
            </p>
          </div>

          <div className="fund-projects">
            <div className="fund-projects-grid">

              <article className="fund-pcard is-open">
                <div className="fund-pcard-hero">
                  <img className="fund-pcard-hero-img" src={window.__images.imgProjectBundi} alt="" />
                  <div className="fund-pcard-hero-veil" />
                  <div className="fund-pcard-status open">
                    <span className="fund-pcard-status-dot" />
                    <span>Opening July 2026</span>
                  </div>
                  <div className="fund-pcard-ribbon"><span>1st Programme</span></div>
                  <div className="fund-pcard-hero-meta">
                    
                    <div className="fund-pcard-hero-loc">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2c-3 0-5 2-5 5 0 4 5 7 5 7s5-3 5-7c0-3-2-5-5-5z" /><circle cx="8" cy="7" r="1.6" /></svg>
                      <span>Bundibugyo, Uganda</span>
                    </div>
                  </div>
                </div>
                <div className="fund-pcard-strip">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13h12M3 13V6l5-3 5 3v7M6 13V9h4v4" /></svg>
                  <span>Tools &amp; equipment for growers</span>
                </div>
                <div className="fund-pcard-body">
                  <div className="fund-pcard-target">
                    <div className="v">$ 90.000</div>
                    <div className="k">Funding target</div>
                  </div>
                  <div className="fund-pcard-cycle">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="12" height="11" rx="1.5" /><path d="M2 6h12M5 1.5v3M11 1.5v3" /></svg>
                    <span>Programme duration <strong>12 months</strong></span>
                  </div>
                  <div className="fund-pcard-bar">
                    <div className="fund-pcard-bar-meta">
                      <span><strong>0%</strong> funded</span>
                      <span>$ 0</span>
                    </div>
                    <div className="fund-pcard-bar-track">
                      <div className="fund-pcard-bar-fill" style={{ width: "0%" }} />
                    </div>
                    <div className="fund-pcard-bar-scale">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="fund-pcard is-study">
                <div className="fund-pcard-hero plain">
                  <div className="fund-pcard-status study">
                    <span className="fund-pcard-status-dot" />
                    <span>Under study</span>
                  </div>
                  <div className="fund-pcard-hero-meta">
                    <h3 className="fund-pcard-hero-name">Cocoa Origin School</h3>
                    <div className="fund-pcard-hero-loc">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2c-3 0-5 2-5 5 0 4 5 7 5 7s5-3 5-7c0-3-2-5-5-5z" /><circle cx="8" cy="7" r="1.6" /></svg>
                      <span>Bundibugyo &amp; Semuliki area</span>
                    </div>
                  </div>
                </div>
                <div className="fund-pcard-strip">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l6-3 6 3-6 3-6-3z" /><path d="M4 7v3c0 1 1.8 2 4 2s4-1 4-2V7" /></svg>
                  <span>Schools, materials & scholarships</span>
                </div>
                <div className="fund-pcard-body">
                  <div className="fund-pcard-target">
                    <div className="v">$ 78.000</div>
                    <div className="k">Estimated target</div>
                  </div>
                  <p className="fund-pcard-foot">
                    Disclosed after community validation in Q4 2026.
                  </p>
                </div>
              </article>

              <article className="fund-pcard is-study">
                <div className="fund-pcard-hero plain">
                  <div className="fund-pcard-status study">
                    <span className="fund-pcard-status-dot" />
                    <span>Under study</span>
                  </div>
                  <div className="fund-pcard-hero-meta">
                    <h3 className="fund-pcard-hero-name">Clean Water Initiative</h3>
                    <div className="fund-pcard-hero-loc">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2c-3 0-5 2-5 5 0 4 5 7 5 7s5-3 5-7c0-3-2-5-5-5z" /><circle cx="8" cy="7" r="1.6" /></svg>
                      <span>Bundibugyo cooperatives</span>
                    </div>
                  </div>
                </div>
                <div className="fund-pcard-strip">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2s-4 4.5-4 8a4 4 0 008 0c0-3.5-4-8-4-8z" /></svg>
                  <span>Safe drinking water for families</span>
                </div>
                <div className="fund-pcard-body">
                  <div className="fund-pcard-target">
                    <div className="v">$ 75.000</div>
                    <div className="k">Estimated target</div>
                  </div>
                  <p className="fund-pcard-foot">
                    To be declassified after on-site assessment.
                  </p>
                </div>
              </article>
            </div>
          </div>

          {/* Bottom numbered timeline removed — milestones live on the bar */}

          <div className="fund-cta-row">
            <p className="fund-cta-text">
              <strong>Are you an association or cooperative</strong> with a project in Bundibugyo and want to participate?
            </p>
            <a className="fund-cta"
               href="mailto:hello@cocoaempire.com?subject=Bundibugyo%20community%20project%20submission">
              <span>Contact us</span>
              <span className="fund-cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 14 10" fill="none"><path d="M0 5 H 12 M 8 1 L 12 5 L 8 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* "One team, one origin" closing band */}
      <section className="section dark-deep team-closing" style={{ position: "relative", overflow: "hidden" }}>
        <image-slot id="team-closing-bg" shape="rect"
                    src={window.__images.imgTeamClosing}
                    placeholder="Drop photo · cocoa powder & beans"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="team-closing-veil" />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ justifyContent: "center", color: "var(--gold)" }}>
            <span>One team, one origin</span>
          </div>
          <h2 className="display" style={{ marginTop: 18, maxWidth: "26ch", margin: "18px auto 0" }}>
            We <strong>live where we operate</strong> — and we
            operate where the supply begins.
          </h2>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ImpactScreen, IMPACT_AREAS_DESC });
