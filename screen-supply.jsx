// Cocoa Empire — Supply Network screen.
// Consolidates the physical-origin story: Bundibugyo infrastructure +
// the sample lot flow. The 11-point Risk & Control accordion lives on
// its own (control) screen, reached via the OperatingFlow CTA from the
// Overview ("Explore our risk & control, step by step").

function SupplyScreen({ go }) {
  return (
    <div className="view" data-screen-label="06 Supply Network">

      {/* INTRO — full-bleed photo hero */}
      <section className="supply-hero">
        <image-slot id="supply-hero-bg" shape="rect"
                    src={window.__images.imgSupplyHero}
                    placeholder="Drop photo · cocoa pod harvest"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="supply-hero-veil" />
        <div className="container supply-hero-inner">
          <div className="eyebrow" style={{ color: "var(--gold)" }}><span>Supply Network</span></div>
          <h1 className="display" style={{ marginTop: 22 }}>
            Built around a physical<br />
            <strong>Bundibugyo base.</strong>
          </h1>
          <p className="lede" style={{ marginTop: 28, maxWidth: "60ch", color: "rgba(248,245,241,.86)" }}>
            <span className="ce-name">Cocoa Empire</span> operates around a physical origin base in
            Bundibugyo. The main warehouse can handle approximately
            200 MT per week through stock rotation, equivalent to around <strong style={{ color: "#4B8E1E", fontWeight: 800 }}>800 MT/month of operational handling capacity</strong>. Additional
            loading can be coordinated through partner and cooperative
            warehouses as volumes scale.
          </p>
        </div>
      </section>

      {/* INFRASTRUCTURE — styled cards with depth, bold labels */}
      <section className="section">
        <div className="container">
          <div className="eyebrow"><span>Infrastructure at origin</span></div>
          <h2 className="display" style={{ marginTop: 18, marginBottom: 48, maxWidth: "22ch" }}>
            Every layer of the <strong>operating base.</strong>
          </h2>

          <div className="infra-grid-rich">
            {INFRA.map((it, i) => {
              // Chess pattern — positions 0, 2, 4, 6, 8 carry a photo slot.
              const withPhoto = i % 2 === 0;
              // Photo lookup for each photo-tile position.
              const INFRA_PHOTOS = {
                0: window.__images.infraDrying,
                2: window.__images.imgInfra2,
                4: window.__images.infraBundi,
                6: window.__images.infraWeighing,
                8: window.__images.infraOffice,
              };
              return (
                <Reveal key={i} className={`infra-rich-tile ${withPhoto ? "with-photo" : ""}`} delay={i * 40}>
                  {withPhoto && (
                    <image-slot id={`infra-${i}`} shape="rect"
                                src={INFRA_PHOTOS[i]}
                                placeholder={`Drop photo · ${it.k}`}
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
                    </image-slot>
                  )}
                  {withPhoto && <div className="infra-rich-veil" />}
                  <div className="infra-rich-content">
                    <div className="infra-rich-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="infra-rich-k">{it.k}</div>
                    <div className="infra-rich-v">{it.v}</div>
                    <p>{it.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY — loading process */}
      <section className="section" id="loading-gallery">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "end", marginBottom: 56 }}>
            <Reveal>
              <div className="eyebrow"><span>Loading process</span></div>
              <h2 className="display" style={{ marginTop: 18 }}>
                Twelve steps,<br />
                <strong>fully documented.</strong>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede gallery-lede">
                From the moment a truck reaches the warehouse to the moment
                the container is sealed and dispatched — <strong>every stage</strong> of the
                loading process is recorded and ready to drop into.
              </p>
            </Reveal>
          </div>

          <div className="gallery-grid">
            {GALLERY_STEPS.slice(0, 12).map((g) => (
              <Reveal key={g.n} className="gallery-card">
                <image-slot id={`gallery-${g.n}`} shape="rect"
                            src={`assets/gallery/gallery-${g.n}.jpg`}
                            placeholder={`Drop photo · ${g.t}`}
                            style={{ display: "block", width: "100%", aspectRatio: "4/3" }}>
                </image-slot>
                <div className="gallery-cap">
                  <span className="gallery-n">{g.n}</span>
                  <span>{g.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA → 11-point risk & control accordion */}
      <section className="section dark supply-cta" style={{ position: "relative", overflow: "hidden" }}>
        <image-slot id="supply-cta-bg" shape="rect"
                    src={window.__images.imgSupplyCta}
                    placeholder="Drop photo · yellow cocoa pods on branch"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="supply-cta-veil" />
        <div className="container supply-cta-inner" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="eyebrow"><span>Want the full protocol?</span></div>
            <h2 className="display" style={{ marginTop: 18 }}>
              Eleven checkpoints,<br />
              <strong>one discipline.</strong>
            </h2>
            <p className="lede" style={{ marginTop: 22, maxWidth: "52ch" }}>
              Every layer of control we operate, what it covers, and the
              specific risk it removes.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <button className="btn primary" onClick={() => go("control")}>
              <span>Explore our risk &amp; control, step by step</span><Arrow />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { SupplyScreen });
