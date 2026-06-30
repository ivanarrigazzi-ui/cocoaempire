// Cocoa Empire — Buyer Channels screen.
// Holds the wordmark marquee + "For global buyers" content that previously
// lived on the Overview. Reached only through the "Buyer Channels" nav item.

function BuyersScreen() {
  return (
    <div className="view" data-screen-label="08 Buyer Channels">

      {/* Intro — photo background */}
      <section className="section tight buyers-hero">
        <image-slot id="buyers-bg" shape="rect"
        src={window.__images.imgBuyersHero}
        placeholder="Drop photo · farmer harvesting cocoa pod"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="buyers-hero-veil" />
        <div className="container buyers-hero-inner">
          <div className="eyebrow" style={{ color: "var(--gold)" }}><span>Buyer Channels</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "end", marginTop: 24 }}>
            <h1 className="display">
              Proven access to<br />
              <strong>major cocoa buyer channels.</strong>
            </h1>
            <p className="lede">
              <span className="ce-name" style={{ color: "#F8F5F1", fontWeight: 800 }}>Cocoa Empire</span> is engineered as a dedicated
              platform with <strong style={{ color: "#4B8E1E", fontWeight: 800 }}>established buyer channels</strong> across major
              international traders, processors and chocolate manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* Wordmark marquee — hidden per request (brand logos concealed) */}
      {false && (
      <section className="section tight market-section">
        <div className="brand-marquee">
          <div className="brand-track">
            {[...MARKET_BRANDS, ...MARKET_BRANDS].map((b, i) =>
            <div key={i} className="brand-cell">
                {b.type === "img" ?
              <img src={b.src} alt={b.alt} className="brand-mark-img" /> :

              <span className={`brand-mark-text ${b.case === "upper" ? "upper" : ""}`}
              style={{
                fontWeight: b.w,
                letterSpacing: b.sp,
                fontStyle: b.italic ? "italic" : "normal"
              }}>
                    {b.name}
                  </span>
              }
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <p className="disclaimer market-foot">
            Representative of the buyer channels engaged through
            Cocoa Empire's operations. Specific counterparties, contracts and
            transaction history are disclosed under NDA. Execution history
            available in the data room.
          </p>
        </div>
      </section>
      )}

      {/* For global buyers — value props */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "center", marginBottom: 56 }}>
            <Reveal>
              <div className="eyebrow"><span>For global buyers</span></div>
              <h2 className="display" style={{ marginTop: 20 }}>
                Origin-controlled cocoa<br /><strong>for <span style={{ color: "#4B8E1E" }}>global</span> buyers.</strong>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede buyers-global-lede">
                <span className="ce-name" ref={(el) => el && el.style.setProperty("color", "#FFFFFF", "important")} style={{ fontWeight: 800 }}>Cocoa Empire</span> gives traders, processors and chocolate
                manufacturers access to <strong style={{ color: "#4B8E1E", fontWeight: 800 }}>farmer-linked, quality-approved and EUDR-ready African cocoa supply</strong> — without requiring them to
                build full origin operations themselves.
              </p>
            </Reveal>
          </div>

          <div className="buyer-grid">
            {[
            { t: "Buyer-ready supply", tag: "READY TO LOAD", body: "Lots accepted, graded and warehoused before allocation.",
              icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6v12l9 4 9-4V6L12 2zm0 2.3L19.5 7 12 9.8 4.5 7 12 4.3zM5 8.4l6 2.2v8.7l-6-2.7V8.4zm14 0v8.2l-6 2.7v-8.7l6-2.2z" opacity="0.3"/><path d="M12 2L3 6l9 4 9-4-9-4z"/><path d="M11 21V11L3 7v11l8 3z" opacity="0.85"/></svg> },
            { t: "Quality approval before shipment", tag: "QC APPROVED", body: "Moisture, grade and documentation cleared at origin.",
              icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 5v7c0 5.5 3.84 10.74 9 12 5.16-1.26 9-6.5 9-12V5l-9-3z"/><path d="M10.6 16L7 12.4l1.4-1.4 2.2 2.2 5.4-5.4L17.4 9l-6.8 7z" fill="#FFFFFF"/></svg> },
            { t: "EUDR documentation pathway", tag: "TRACEABLE", body: "Chain-of-custody and traceability records linked per lot.",
              icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/><path d="M14 2v6h6" opacity="0.4"/><path d="M8 13h8v1.5H8zM8 16h8v1.5H8zM8 10h3v1.5H8z" fill="#FFFFFF"/></svg> },
            { t: "Organic + Fairtrade farmer base", tag: "CERTIFIED", body: "Certified producers integrated into the platform network.",
              icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg> },
            { t: "Warehouse-controlled execution", tag: "BONDED CUSTODY", body: "Inventory under custody and access control to dispatch.",
              icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 10v11h20V10L12 3z"/><path d="M8 21v-6h8v6" fill="#FFFFFF" opacity="0.95"/><path d="M11 21v-3h2v3" fill="currentColor"/></svg> },
            { t: "Uganda + DRC regional reach", tag: "MULTI-ORIGIN", body: "Bundibugyo operating base with 100 MT/week DRC supply access.",
              icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.59 2 4 5.59 4 10c0 6 8 12 8 12s8-6 8-12c0-4.41-3.59-8-8-8z"/><circle cx="12" cy="10" r="3" fill="#FFFFFF"/></svg> }].
            map((c, i) =>
            <Reveal key={c.t} className="buyer-tile buyer-tile-photo" data-pos={i} delay={i * 50}>
                <div className="buyer-tile-photo-bg" aria-hidden="true" />
                <div className="buyer-tile-photo-veil" />
                <div className="buyer-tile-content">
                  <div className="buyer-tag" aria-hidden="true">{c.tag}</div>
                  <div className="buyer-icon" aria-hidden="true">{c.icon}</div>
                  <h3>{c.t}</h3>
                  <p>{c.body}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </div>);

}

Object.assign(window, { BuyersScreen });
