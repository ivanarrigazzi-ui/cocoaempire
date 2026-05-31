// Cocoa Empire — Overview screen.

// Inline SVG icons for the Impact tiles. Minimal 1.6 stroke, currentColor.
const _icon = (path, vb = "0 0 24 24") =>
<svg viewBox={vb} width="22" height="22" fill="none"
stroke="currentColor" strokeWidth="1.6"
strokeLinecap="round" strokeLinejoin="round">{path}</svg>;

// Filled-style impact icons — chunkier shapes, more iconic recognition.
const _ficon = (path, vb = "0 0 24 24") =>
<svg viewBox={vb} width="24" height="24" fill="currentColor" aria-hidden="true">{path}</svg>;

const IMPACT_AREAS = [
{ label: "Education",
  icon: _ficon(<><path d="M12 2L1 8l11 6 9-4.9V17h2V8L12 2z"/><path d="M5 13.2V18c0 1.66 3.13 3 7 3s7-1.34 7-3v-4.8l-7 3.8-7-3.8z"/></>) },
{ label: "Clean water",
  icon: _ficon(<><path d="M12 2.5S5 11 5 16a7 7 0 0014 0c0-5-7-13.5-7-13.5z"/><path d="M10 16a2 2 0 002 2v-2h-2z" fill="#FFFFFF" opacity="0.6"/></>) },
{ label: "Healthcare support",
  icon: _ficon(<><path d="M16.5 3A5.5 5.5 0 0012 5.09 5.5 5.5 0 007.5 3 5.5 5.5 0 002 8.5c0 5.5 10 12.5 10 12.5s10-7 10-12.5A5.5 5.5 0 0016.5 3z"/><path d="M11 8h2v3h3v2h-3v3h-2v-3H8v-2h3V8z" fill="#FFFFFF"/></>) },
{ label: "Agronomy training",
  icon: _ficon(<><path d="M12 22V12"/><path d="M12 12c-4 0-7-2.5-7-7 4 0 7 2.5 7 7z"/><path d="M12 12c4 0 7-2.5 7-7-4 0-7 2.5-7 7z"/><circle cx="12" cy="22" r="1.5"/></>) },
{ label: "Organic farming practices",
  icon: _ficon(<><path d="M3 21c0-9 6-16 18-16 0 10-7 16-18 16z"/><path d="M3 21c2-5 5-9 10-12" stroke="#FFFFFF" strokeWidth="1.4" fill="none" strokeLinecap="round"/></>) },
{ label: "Cooperative support",
  icon: _ficon(<><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9.5" r="2.8"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6v1H2v-1z"/><path d="M16 20.5c.3-3 2-5 5-5s4 2 4 5v1h-9v-1z"/></>) },
{ label: "Farmer productivity",
  icon: _ficon(<><path d="M3 21h18v-2H3v2z"/><path d="M5 17V9l3 2v6H5zm5 0v-5l3 2v3h-3zm5 0V6l3 2v9h-3z"/><path d="M3 9l5-4 4 3 4-2 6 3v2L16 8l-4 2-4-3-5 4z" fill="#FFFFFF" opacity="0.5"/></>) }];


function OverviewScreen({ go, openForm }) {
  return (
    <div className="view" data-screen-label="01 Overview">

      {/* HERO */}
      <section className="hero" id="platform">
        <image-slot id="hero-bg" shape="rect"
        src={window.__images.imgHero}
        placeholder="Drop hero photo · cocoa beans / origin"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="hero-veil" />
        <div className="hero-inner">
          <div className="eyebrow" style={{ color: "var(--gold)" }}>
            <span><span className="ce-name">Cocoa Empire</span> · Origin Execution Platform</span>
          </div>
          <h1>
            Control the <span className="gold">Origin.</span>
            <strong>Own the Supply.</strong>
          </h1>
          <p className="lede" style={{ marginTop: 36, color: "rgba(248,245,241,.86)", fontSize: 20, maxWidth: "52ch" }}>
            <span className="ce-name">Cocoa Empire</span> is an origin-control platform — we operate the layer where farmer-linked cocoa becomes quality-approved, EUDR-ready, buyer-matched supply.
          </p>
          <p className="lede" style={{ marginTop: 18, color: "rgba(248,245,241,.7)", fontSize: 15, maxWidth: "56ch" }}>
            Proven operators. Proven origin playbook. Established buyer
            channels. <span className="ce-name">Cocoa Empire</span> turns months of live cocoa
            execution into a <strong>dedicated platform engineered to scale.</strong>
          </p>

          <div className="trust-row">
            <div className="hero-trust">
              <span>Organic</span>
              <span className="sep">·</span>
              <span>Fairtrade</span>
              <span className="sep">·</span>
              <span>EUDR-ready</span>
              <span className="sep">·</span>
              <span>Farmer-linked supply</span>
            </div>
          </div>

          <div className="button-row">
            <button className="btn primary" onClick={() => go("control")}>
              <span>View origin protocol</span><Arrow />
            </button>
          </div>

          <div className="hero-meta">
            <div className="cell">
              <div className="kicker">Cooperative network</div>
              <div className="figure"><strong><Counter target={4370} /></strong></div>
              <div className="note">Farmers across the partnership network</div>
            </div>
            <div className="cell">
              <div className="kicker">Certified farmers</div>
              <div className="figure"><strong><Counter target={890} /></strong></div>
              <div className="note">Organic + Fairtrade base</div>
            </div>
            <div className="cell">
              <div className="kicker">Operational volume</div>
              <div className="figure"><strong><Counter target={5120} /></strong> <span style={{ fontSize: 22, opacity: 0.7 }}>MT</span></div>
              <div className="note">Sourced through the Cocoa Empire platform</div>
            </div>
            <div className="cell">
              <div className="kicker">Cooperative volume</div>
              <div className="figure"><strong><Counter target={4600} /></strong> <span style={{ fontSize: 22, opacity: 0.7 }}>MT</span></div>
              <div className="note">Through cooperative associations</div>
            </div>
            <div className="cell">
              <div className="kicker">Operational capacity</div>
              <div className="figure"><strong><Counter target={800} /></strong> <span style={{ fontSize: 22, opacity: 0.7 }}>MT/mo</span></div>
              <div className="note">200 MT/wk rotation throughput</div>
            </div>
            <div className="cell">
              <div className="kicker">Community commitment</div>
              <div className="figure"><strong>10</strong><span style={{ fontSize: 32, opacity: 0.85 }}>%</span></div>
              <div className="note">Of annual profit to farmer programmes</div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TICKER */}
      <LiveTicker />

      {/* SECTION 2 — WHAT WE REALLY DO */}
      <section className="section really-do">
        <div className="really-do-pod" aria-hidden="true" />
        <div className="container">
          <Reveal>
            <div className="eyebrow"><span>What we really do</span></div>
            <h2 className="display" style={{ marginTop: 20, maxWidth: "22ch" }}>
              We control the layer where<br /><strong>cocoa becomes <span style={{ color: "#4B8E1E" }}>supply.</span></strong>
            </h2>
            <p className="lede" style={{ marginTop: 32, maxWidth: "70ch" }}>
              <span className="ce-name">Cocoa Empire</span> operates at the origin layer of the cocoa chain — where farmer supply becomes quality-approved, traceable and buyer-ready inventory. We control sourcing, warehouse intake, quality verification, EUDR documentation and shipment execution, so global cocoa buyers access African cocoa without building the full origin infrastructure themselves.
            </p>
          </Reveal>

          <div className="capability-grid">
            {[
            { n: "01", t: "Control origin", body: "Farmer-linked supply, approved sourcing zones and local execution." },
            { n: "02", t: "Verify quality", body: "Moisture, grade, weight, documentation and batch-level checks before payment." },
            { n: "03", t: "Secure compliance", body: "Organic, Fairtrade and EUDR-ready documentation pathways." },
            { n: "04", t: "Move buyer-ready cocoa", body: "Approved lots are matched, loaded, documented and shipped." },
            { n: "05", t: "Settle & recycle", body: "Buyer settlement closes the loop; working capital rotates into the next controlled cycle." }].
            map((c, i) =>
            <Reveal key={c.n} className="cap-card" delay={i * 70}>
                <div className="cap-num">{c.n}</div>
                <h3>{c.t}</h3>
                <p>{c.body}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3 — BUILT NEW. PROVEN IN EXECUTION. */}
      <section className="section dark builtnew-photo" style={{ position: "relative", overflow: "hidden" }}>
        <image-slot id="builtnew-bg" shape="rect"
        src={window.__images.imgBuiltNew}
        placeholder="Drop photo · farmer with cocoa pods"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="builtnew-veil" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "end" }}>
            <Reveal>
              <div className="eyebrow"><span>Built new · proven in execution</span></div>
              <h2 className="display" style={{ marginTop: 20 }}>
                A new dedicated platform<br />
                <strong>on proven origin execution.</strong>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">
                <span className="ce-name">Cocoa Empire</span> consolidates a proven operating playbook
                into one platform: established farmer relationships, an
                active warehouse, working quality protocols and documentation
                — already serving tier-1 international buyers. Not a slide
                deck. <strong>A platform built for scale.</strong>
              </p>
            </Reveal>
          </div>

          <div className="proven-grid">
            {[
            { t: "Proven buyer access",  body: "Established buyer channels into tier-1 international traders, processors and chocolate manufacturers." },
            { t: "Cooperative network", body: "Cooperative partnership network of farmer groups across Bundibugyo and allied districts." },
            { t: "Operating protocols",  body: "Warehouse intake, QC, documentation, loading and buyer settlement discipline engineered and operating." },
            { t: "Dedicated platform",   body: "Cocoa Empire stands as an independent, dedicated origin-control company built for scale." }].
            map((c, i) =>
            <Reveal key={c.t} className="proven-tile" delay={i * 80}>
                <h3>{c.t}</h3>
                <p>{c.body}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* THESIS */}
      <section className="section">
        <div className="container">
          <div className="thesis">
            <Reveal className="left">
              <div className="eyebrow"><span>The thesis</span></div>
              <h2 className="display" style={{ marginTop: 24 }}>
                Demand is abundant.<br />
                <strong>Controlled <span style={{ color: "#4B8E1E" }}>origin</span> is scarce.</strong>
              </h2>
              <p className="lede" style={{ marginTop: 32 }}>
                The bottleneck in cocoa is not demand. The bottleneck is the
                ability to source, receive, grade, document and warehouse
                origin under verifiable operating control.
              </p>
            </Reveal>
            <div className="right">
              <Reveal className="item" delay={100}>
                <div className="num">01</div>
                <h3>Global buyers need reliable origin access</h3>
                <p>Traders, processors and chocolate manufacturers compete
                for verifiable, farmer-linked supply — origin reliability is
                the new battleground.</p>
              </Reveal>
              <Reveal className="item" delay={180}>
                <div className="num">02</div>
                <h3>Certified and traceable supply is increasingly scarce</h3>
                <p>Organic, Fairtrade and chain-of-custody-clean cocoa is
                under-supplied relative to growing buyer mandates and
                consumer demand.</p>
              </Reveal>
              <Reveal className="item" delay={260}>
                <div className="num">03</div>
                <h3>EUDR makes origin control a competitive advantage</h3>
                <p>European deforestation regulation places origin
                documentation at the centre of the buyer&apos;s decision —
                origin platforms that can document deliver, those that
                can&apos;t are excluded.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* (Origin control in numbers carousel removed — KPIs already live in the hero) */}

      {/* FULL-BLEED ORIGIN STORY — photo background */}
      <section className="origin-story">
        <image-slot id="origin-story-bg" shape="rect"
        src={window.__images.imgOriginStory}
        placeholder="Drop full-bleed photo · Bundibugyo warehouse · staff in branded uniform"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        </image-slot>
        <div className="origin-story-veil" />
        <div className="container origin-story-inner">
          <div className="origin-story-kicker">Bundibugyo · Operating Base</div>
          <h2 className="origin-story-headline">
            Where cocoa stops being a <strong>promise</strong><br />
            and becomes <em>controlled supply</em>.
          </h2>
          <div className="origin-story-meta">
            <div className="cell">
              <div className="k" style={{ fontSize: "14px" }}>Warehouse</div>
              <div className="v">800 MT/mo</div>
            </div>
            <div className="cell">
              <div className="k" style={{ fontSize: "14px" }}>Throughput</div>
              <div className="v">200 MT/wk</div>
            </div>
            <div className="cell">
              <div className="k" style={{ fontSize: "14px" }}>Direct farmers</div>
              <div className="v">4.370</div>
            </div>
            <div className="cell">
              <div className="k" style={{ fontSize: "14px" }}>Certified</div>
              <div className="v">890</div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATING FLOW — What we control */}
      <div id="control-protocol">
        <OperatingFlow go={go} />
      </div>

      {/* QUOTE — with photo background (cocoa beans) */}
      <section className="section dark-deep quote-bg">
        <image-slot id="quote-bg" shape="rect"
        src={window.__images.imgQuote}
        placeholder="Drop photo · cocoa beans / drying"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        </image-slot>
        <div className="quote-bg-veil" />
        <div className="container quote-bg-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
          <Reveal className="quote">
            We work with <strong>accepted cocoa</strong>, under our control — never an estimate, never a promise.
          </Reveal>
          <Reveal delay={150}>
            <div className="kicker quote-bg-kicker" style={{ color: "var(--gold)" }}>Operating principle №1</div>
            <p className="lede" style={{ marginTop: 16, maxWidth: "44ch" }}>
              Origin discipline starts at acceptance and ends at settlement. Every tonne we control is <strong style={{ color: "#4B8E1E" }}>graded, warehoused, documented and buyer-matched</strong> before it moves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 14 — FINAL CTA + CONTACT */}
      <section className="section final-cta" id="contact">
        <div className="container">
          <Reveal>
            <div className="eyebrow"><span>Final note</span></div>
            <h2 className="display" style={{ marginTop: 20, maxWidth: "22ch" }}>
              Origin without execution is a promise.<br />
              <strong>Execution without origin is luck.</strong>
            </h2>
            <p className="lede" style={{ marginTop: 32, maxWidth: "60ch" }}>
              <span className="ce-name">Cocoa Empire</span> brings the two together — so our partners,
              buyers and capital allies know <strong>exactly</strong> where the cocoa is, how it was
              checked, and when it ships.
            </p>
            <div className="button-row" style={{ marginTop: 40 }}>
              <button className="btn solid-dark" onClick={() => openForm && openForm("capital")}>
                <span>Request strategic discussion</span><Arrow />
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="contact-grid" style={{ marginTop: 56 }}>
              <a className="contact-card" href="mailto:hello@cocoaempire.com">
                <div className="contact-card-kicker">General enquiries</div>
                <div className="contact-card-email">hello@cocoaempire.com</div>
                <p>Press, partnerships and any other question about the platform.</p>
              </a>
              <a className="contact-card" href="mailto:ivan@cocoaempire.com">
                <div className="contact-card-kicker">Buyers · orders</div>
                <div className="contact-card-email">ivan@cocoaempire.com</div>
                <p>Trade desks, processors and chocolate manufacturers sourcing cocoa.</p>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>);

}

function FeaturedLots({ go }) {
  const featured = LOTS.filter((l) => l.status === "accepted" || l.status === "financing").slice(0, 3);
  return (
    <div className="cols-3">
      {featured.map((l, i) =>
      <Reveal key={l.id} delay={i * 100}>
          <div onClick={() => go("origin", l.id)} style={{ cursor: "pointer" }}>
            <image-slot id={`featured-${l.id}`} shape="rect"
          placeholder={`Drop photo · ${l.region} · ${l.coop}`}
          style={{ display: "block", width: "100%", aspectRatio: "4/3", marginBottom: 20 }}>
            </image-slot>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div className="kicker">{l.id}</div>
              <div className={`status ${l.status}`}>
                <span className="dot" />{STATUS_LABEL[l.status]}
              </div>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 600, margin: "10px 0 6px", letterSpacing: "-0.005em" }}>
              {l.coop}
            </h3>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              {l.grade} · {l.tonnes.toFixed(1)} t · {l.region}
            </div>
            <hr className="rule" style={{ margin: "20px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--muted)" }}>Stage</span>
              <span style={{ fontWeight: 600 }}>{STATUS_LABEL[l.status]}</span>
            </div>
          </div>
        </Reveal>
      )}
    </div>);

}

Object.assign(window, { OverviewScreen });
