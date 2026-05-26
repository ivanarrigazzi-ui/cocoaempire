// Cocoa Empire — Track screen (shipment timeline)

function TrackScreen() {
  const [activeIdx, setActiveIdx] = React.useState(
    TRACK_STEPS.findIndex((s) => s.status === "current")
  );
  const active = TRACK_STEPS[activeIdx];

  return (
    <div className="view" data-screen-label="04 Track">

      <section className="section tight">
        <div className="container">
          <div className="eyebrow"><span>Track & Trace</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "end", marginTop: 20 }}>
            <h1 className="display">
              From tree to <strong>port.</strong>
            </h1>
            <p className="lede">
              Every accepted lot is tracked end-to-end. Investors, buyers, and
              cooperatives see the same record: graded, warehoused,
              allocated, shipped, settled.
            </p>
          </div>
        </div>
      </section>

      {/* Shipment hero */}
      <section className="container">
        <div style={{
          background: "var(--cocoa)",
          color: "var(--cream)",
          padding: "40px 48px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
          gap: 32,
          alignItems: "center",
        }}>
          <div>
            <div className="kicker" style={{ color: "var(--gold)" }}>Tracking</div>
            <div style={{ marginTop: 12, fontSize: 32, fontWeight: 300, letterSpacing: "-0.015em" }}>
              Lot <strong>{TRACK_LOT}</strong>
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: "rgba(248,245,241,.7)" }}>
              32.40 t · Grade 1 Organic · Mukono Smallholder Coop
            </div>
          </div>
          <Stat label="Origin"    value="Mukono"          sub="Receiving station 02" />
          <Stat label="Carrier"   value="MV Atlantik Bridge" sub="MSCU-744-188-7" />
          <Stat label="ETA"       value="Jun 18, 2026"     sub="Antwerp · BE" />
        </div>
      </section>

      {/* Timeline + detail */}
      <section className="section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80 }}>
          {/* Timeline column */}
          <div>
            <div className="kicker" style={{ marginBottom: 28 }}>Chain of custody</div>
            <div className="timeline">
              {TRACK_STEPS.map((s, i) => (
                <div key={i}
                     className={`node ${s.status} ${i === activeIdx ? "active" : ""}`}
                     onClick={() => setActiveIdx(i)}
                     style={i === activeIdx ? { background: "rgba(61,28,8,0.035)", marginLeft: -16, paddingLeft: 16 } : {}}>
                  <div className="stamp">{s.stage} · {s.when}</div>
                  <h4>{s.title}</h4>
                  <p>{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detail column */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <image-slot id={`track-${active.stage}`} shape="rect"
                        placeholder={`Drop photo \u00b7 ${active.stage} \u00b7 ${TRACK_LOT}`}
                        style={{ display: "block", width: "100%", aspectRatio: "4/3" }}>
            </image-slot>

            <div style={{ marginTop: 24, background: "var(--white)", border: "1px solid var(--rule-strong)", padding: 28 }}>
              <div className="kicker" style={{ color: "var(--gold)" }}>{active.stage}</div>
              <h3 style={{ margin: "10px 0 8px", fontSize: 22, fontWeight: 600 }}>{active.title}</h3>
              <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                {active.when}
              </div>
              <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>
                {active.detail}
              </p>

              <hr className="rule" style={{ margin: "20px 0" }} />

              <div className="specs" style={{ gridTemplateColumns: "1fr" }}>
                <div className="row"><span className="k">Container</span><span className="v tabular">MSCU-744-188-7</span></div>
                <div className="row"><span className="k">Seal №</span><span className="v tabular">UG-0044187</span></div>
                <div className="row"><span className="k">Bill of lading</span><span className="v tabular">BL/26/4188-A</span></div>
                <div className="row"><span className="k">Inspector</span><span className="v">SGS East Africa</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit strip */}
      <section className="section dark-deep">
        <div className="container">
          <div className="eyebrow"><span>Audit & assurance</span></div>
          <div className="cols-3" style={{ marginTop: 40 }}>
            <AuditCard t="QC & inspection" body="Independent grading by SGS East Africa. Moisture, defect count, bean count, mycotoxin screen on every lot."/>
            <AuditCard t="Chain of custody" body="Rainforest Alliance + EU Organic chain-of-custody, mass-balance verified per lot."/>
            <AuditCard t="Bonded warehouse" body="Kampala bonded facility under Uganda Revenue Authority control. Daily inventory reconciliation to platform ledger."/>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div>
      <div className="kicker" style={{ color: "var(--gold)" }}>{label}</div>
      <div style={{ marginTop: 12, fontSize: 22, fontWeight: 600, letterSpacing: "-0.005em" }}>{value}</div>
      <div style={{ fontSize: 12, color: "rgba(248,245,241,.6)", marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function AuditCard({ t, body }) {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,.18)", paddingTop: 24 }}>
      <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{t}</h3>
      <p style={{ marginTop: 14, color: "rgba(248,245,241,.7)", fontSize: 14, lineHeight: 1.6, maxWidth: "36ch" }}>{body}</p>
    </div>
  );
}

Object.assign(window, { TrackScreen });
