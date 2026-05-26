// Cocoa Empire — Team screen.
// Operating crew, grouped by squad (Leadership, Operations, Field).
// Each tile is a portrait placeholder via <image-slot> so the operator
// can drop a real photo per person — falls back to a typeset monogram.

function TeamScreen() {
  const squads = ["Leadership", "Operations", "Field"];
  return (
    <div className="view" data-screen-label="07 Team">

      <section className="section tight team-hero" style={{ position: "relative", overflow: "hidden" }}>
        <image-slot id="team-hero-bg" shape="rect"
                    src={window.__images.imgTeamHero}
                    placeholder="Drop photo · cocoa beans drying on blue cloth"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        </image-slot>
        <div className="team-hero-veil" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}><span>Team</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "end", marginTop: 24 }}>
            <h1 className="display">
              The crew behind<br />
              <strong>the origin control.</strong>
            </h1>
            <p className="lede">
              <span className="ce-name">Cocoa Empire</span> is built and operated by a focused team of
              <strong style={{ color: "var(--gold)", fontWeight: 700 }}> {TEAM.length} people </strong>
              across leadership, operations and the Bundibugyo field network.
            </p>
          </div>
        </div>
      </section>

      {squads.map((squad, sIdx) => (
        <section key={squad} className={sIdx % 2 === 0 ? "section" : "section beige"}>
          <div className="container">
            <div className="team-head">
              <div className="eyebrow"><span>{squad}</span></div>
              <div className="team-count tabular">
                {TEAM.filter((m) => m.squad === squad).length}
                <span> members</span>
              </div>
            </div>

            <div className="team-grid">
              {TEAM.filter((m) => m.squad === squad).map((m, i) => (
                <Reveal key={m.name + i} className="team-card" delay={i * 50}>
                  <image-slot id={`team-${squad}-${i}`} shape="rect"
                              placeholder={`Drop portrait · ${m.name}`}
                              style={{ display: "block", width: "100%", aspectRatio: "4/5" }}>
                  </image-slot>
                  <div className="team-body">
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                    <div className="team-meta">
                      <span className="dot" />
                      <span>{m.location}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

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

Object.assign(window, { TeamScreen });
