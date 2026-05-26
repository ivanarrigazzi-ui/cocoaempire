// Cocoa Empire — Origin / Track-record dashboard.
// Operating-history panel for lender pitches. Replicates the institutional
// table look (filters · search · status chips · payment bars). Data is the
// 17-shipment track record executed by the founding team between January
// and May 2026 under the prior trading entity.

const TRACK_LOTS = [
  {"id":"LOT 001","date":"Jan 3, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":4986,"sell":5400,"buyer":"Ecom Agrotrade","dest":"Amsterdam, NL","pct":100,"status":"settled","docs":{"bl":"MAEU-238847102","ctn":"MSKU 712 3456","vsl":"Maersk Halifax","etd":"Jan 15, 2026","eta":"Feb 14, 2026","payment":"99% departure / 1% destination"},"price":5400},
  {"id":"LOT 002","date":"Jan 3, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":4986,"sell":5400,"buyer":"Ecom Agrotrade","dest":"Amsterdam, NL","pct":100,"status":"settled","docs":{"bl":"MAEU-238847103","ctn":"MSKU 712 3457","vsl":"Maersk Halifax","etd":"Jan 15, 2026","eta":"Feb 14, 2026","payment":"99% departure / 1% destination"},"price":5400},
  {"id":"LOT 003","date":"Feb 14, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":4584,"sell":5490,"buyer":"Ecom Agrotrade","dest":"Amsterdam, NL","pct":100,"status":"settled","docs":{"bl":"MAEU-241102998","ctn":"TCLU 803 1192","vsl":"Maersk Cardiff","etd":"Feb 26, 2026","eta":"Mar 26, 2026","payment":"99% departure / 1% destination"},"price":5490},
  {"id":"LOT 004","date":"Feb 14, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":4584,"sell":5490,"buyer":"Ecom Agrotrade","dest":"Amsterdam, NL","pct":100,"status":"settled","docs":{"bl":"MAEU-241102999","ctn":"TCLU 803 1193","vsl":"Maersk Cardiff","etd":"Feb 26, 2026","eta":"Mar 26, 2026","payment":"99% departure / 1% destination"},"price":5490},
  {"id":"LOT 005","date":"Feb 14, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":4584,"sell":5490,"buyer":"Ecom Agrotrade","dest":"Amsterdam, NL","pct":100,"status":"settled","docs":{"bl":"MAEU-241103000","ctn":"TCLU 803 1194","vsl":"Maersk Cardiff","etd":"Feb 26, 2026","eta":"Mar 26, 2026","payment":"99% departure / 1% destination"},"price":5490},
  {"id":"LOT 006","date":"Feb 14, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":4584,"sell":5490,"buyer":"Ecom Agrotrade","dest":"Amsterdam, NL","pct":100,"status":"settled","docs":{"bl":"MAEU-241103001","ctn":"TCLU 803 1195","vsl":"Maersk Cardiff","etd":"Feb 26, 2026","eta":"Mar 26, 2026","payment":"99% departure / 1% destination"},"price":5490},
  {"id":"2604BT-OB003","date":"Apr 28, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3090,"sell":3910,"buyer":"Cargill BV","dest":"Antwerp, BE","pct":80,"status":"shipped","docs":{"bl":"CMDU-AMS612331","ctn":"CMAU 542 0089","vsl":"CMA CGM Estelle","etd":"May 10, 2026","eta":"Jun 5, 2026","payment":"50% loading / 40% departure / 10% destination"},"price":3910},
  {"id":"2604BT-OB004","date":"Apr 28, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3090,"sell":3910,"buyer":"Cargill BV","dest":"Antwerp, BE","pct":80,"status":"shipped","docs":{"bl":"CMDU-AMS612332","ctn":"CMAU 542 0090","vsl":"CMA CGM Estelle","etd":"May 10, 2026","eta":"Jun 5, 2026","payment":"50% loading / 40% departure / 10% destination"},"price":3910},
  {"id":"2604BT-OB005","date":"Apr 29, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3090,"sell":3910,"buyer":"Cargill BV","dest":"Antwerp, BE","pct":80,"status":"shipped","docs":{"bl":"CMDU-AMS612340","ctn":"CMAU 542 0091","vsl":"CMA CGM Estelle","etd":"May 12, 2026","eta":"Jun 7, 2026","payment":"50% loading / 40% departure / 10% destination"},"price":3910},
  {"id":"2604BT-OB006","date":"Apr 30, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3090,"sell":3910,"buyer":"Cargill BV","dest":"Antwerp, BE","pct":80,"status":"shipped","docs":{"bl":"CMDU-AMS612341","ctn":"CMAU 542 0092","vsl":"CMA CGM Estelle","etd":"May 12, 2026","eta":"Jun 7, 2026","payment":"50% loading / 40% departure / 10% destination"},"price":3910},
  {"id":"2604BT-OB001","date":"May 7, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3500,"sell":4230,"buyer":"Cargill BV","dest":"Antwerp, BE","pct":65,"status":"shipped","docs":{"bl":"MSCU-MSC780012","ctn":"MSCU 661 0214","vsl":"MSC Adriana","etd":"May 22, 2026","eta":"Jun 18, 2026","payment":"50% loading / 40% departure / 10% destination"},"price":4230},
  {"id":"2604BT-OB002","date":"May 7, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3500,"sell":4230,"buyer":"Cargill BV","dest":"Antwerp, BE","pct":65,"status":"shipped","docs":{"bl":"MSCU-MSC780013","ctn":"MSCU 661 0215","vsl":"MSC Adriana","etd":"May 22, 2026","eta":"Jun 18, 2026","payment":"50% loading / 40% departure / 10% destination"},"price":4230},
  {"id":"2604BT-CB001","date":"May 8, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":2750,"sell":3090,"buyer":"PT Golden Harvest","dest":"Jakarta, ID","pct":55,"status":"accepted","docs":{"bl":"HLCUMB1260500245","ctn":"FANU 130 0354","vsl":"Hapag-Lloyd","etd":"Jul 4, 2026","eta":"Aug 15, 2026","stage":"Gated at POL","payment":"50% loading / 49% departure / 1% destination"},"price":3090},
  {"id":"2604BT-CB002","date":"May 15, 2026","proc":"—","grade":"CONVENTIONAL","tonnes":25,"buy":2750,"sell":3090,"buyer":"PT Golden Harvest","dest":"Jakarta, ID","pct":45,"status":"accepted","docs":{"bl":"HLCUMB1260502335","ctn":"TCLU 947 9356","vsl":"Hapag-Lloyd","etd":"Jul 4, 2026","eta":"Aug 15, 2026","stage":"On-route to POL","payment":"50% loading / 49% departure / 1% destination"},"price":3090},
  {"id":"2604BT-OB007","date":"May 26, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3700,"sell":4830,"buyer":"Icam","dest":"Genova, IT","pct":25,"status":"intake","docs":{"bl":"Pre-stuffing","ctn":"TBA","vsl":"TBA","etd":"TBA","eta":"TBA","payment":"50% loading / 40% departure / 10% destination"},"price":4830},
  {"id":"2604BT-OB008","date":"May 26, 2026","proc":"—","grade":"ORGANIC","tonnes":25,"buy":3700,"sell":4830,"buyer":"Icam","dest":"Genova, IT","pct":25,"status":"intake","docs":{"bl":"Pre-stuffing","ctn":"TBA","vsl":"TBA","etd":"TBA","eta":"TBA","payment":"50% loading / 40% departure / 10% destination"},"price":4830},
  {"id":"2604BT-OB009","date":"May 26, 2026","proc":"—","grade":"ORGANIC","tonnes":12.5,"buy":null,"sell":null,"buyer":"Bohnkaf-Kolonial","dest":"Germany","pct":25,"status":"intake","docs":{"bl":"Pre-stuffing","ctn":"TBA","vsl":"TBA","etd":"TBA","eta":"TBA","payment":"TBA"},"price":null},
];

const TRACK_STATUS = {
  settled:   { label: "Settled",   tone: "#4B8E1E" },
  shipped:   { label: "Shipped",   tone: "#264E7A" },
  accepted:  { label: "Accepted",  tone: "#B89968" },
  intake:    { label: "Intake",    tone: "#A5392E" },
  financing: { label: "Financing", tone: "#7A5A3A" },
};

function OriginScreen() {
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery]   = React.useState("");
  const [openId, setOpenId] = React.useState(null);
  const [hoverId, setHoverId] = React.useState(null);

  const visible = TRACK_LOTS.filter((l) =>
    (filter === "all" || l.status === filter) &&
    (query === "" || (l.id + l.proc + l.buyer + l.dest).toLowerCase().includes(query.toLowerCase()))
  );

  const dotFmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const totalKg = TRACK_LOTS.reduce((s, l) => s + l.tonnes * 1000, 0);
  const totalRev = TRACK_LOTS.reduce((s, l) => s + ((l.sell || 0) * l.tonnes), 0);
  const totalGp  = TRACK_LOTS.reduce((s, l) => s + (((l.sell || 0) - (l.buy || 0)) * l.tonnes), 0);

  return (
    <div className="view track-screen" data-screen-label="02 Track record">

      {/* HEADER */}
      <section className="section tight track-header">
        <div className="container">
          <div className="track-eyebrow">Track record — operated by Cocoa Empire founding team</div>
          <h1 className="track-h1">
            Five months. <span className="track-h1-num">Proven traction.</span>
          </h1>
          <p className="track-sub">
            Full intake-to-delivery execution from Uganda to tier-1 European
            &amp; Asian buyers. <strong>Same team. Same playbook. Now scaling
            as Cocoa Empire.</strong>
          </p>

          <div className="track-hero-kpis">
            <div className="track-hero-kpi">
              <div className="track-hero-v">5<span> mo</span></div>
              <div className="track-hero-k">Months operating</div>
            </div>
            <div className="track-hero-kpi">
              <div className="track-hero-v">$ {dotFmt(totalRev / 1000)}<span>K</span></div>
              <div className="track-hero-k">Revenue</div>
            </div>
            <div className="track-hero-kpi">
              <div className="track-hero-v">$ {dotFmt(totalGp / 1000)}<span>K</span></div>
              <div className="track-hero-k">Gross profit</div>
            </div>
          </div>

          <div className="track-kpis">
            <div className="track-kpi">
              <div className="track-kpi-v">{dotFmt(totalKg)}<span>kg</span></div>
              <div className="track-kpi-k">Volume handled</div>
            </div>
            <div className="track-kpi">
              <div className="track-kpi-v">{TRACK_LOTS.length}</div>
              <div className="track-kpi-k">Shipments executed</div>
            </div>
            <div className="track-kpi">
              <div className="track-kpi-v">5</div>
              <div className="track-kpi-k">Destination countries</div>
            </div>
            <div className="track-kpi">
              <div className="track-kpi-v">5</div>
              <div className="track-kpi-k">Institutional buyers</div>
            </div>
            <div className="track-kpi track-kpi-zero">
              <div className="track-kpi-v">0</div>
              <div className="track-kpi-k">Rejections / claims</div>
            </div>
          </div>
        </div>
      </section>

      <div className="track-divider" />

      {/* TABLE */}
      <section className="section tight">
        <div className="container">
          <div className="track-controls">
            <div className="track-filters">
              {["all", "intake", "accepted", "shipped", "settled"].map((s) => (
                <button key={s} data-st={s} className="track-chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
                  {s === "all" ? "All" : (TRACK_STATUS[s]?.label || s)}
                </button>
              ))}
            </div>
            <div className="track-search">
              <span aria-hidden="true">⌕</span>
              <input placeholder="Search lot, origin, buyer…"
                     value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          <div className="track-table-hint">Hover any lot to preview BL · container · vessel · documents. Click to pin.</div>
          <div className="track-table-wrap">
            <table className="track-table">
              <thead>
                <tr>
                  <th>Lot</th>
                  <th>Origin</th>
                  <th>Grade</th>
                  <th className="right">Tonnes</th>
                  <th className="right hide-md">Price ($/t)</th>
                  <th>Buyer</th>
                  <th className="hide-sm">Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((l) => {
                  const s = TRACK_STATUS[l.status];
                  return (<React.Fragment key={l.id}>
                    <tr className={`row-${l.status} ${(openId === l.id || hoverId === l.id) ? "active" : ""}`}
                        data-active={l.status !== "settled" ? "1" : "0"}
                        onMouseEnter={() => setHoverId(l.id)}
                        onMouseLeave={() => setHoverId(null)}
                        onClick={() => setOpenId(openId === l.id ? null : l.id)}>
                      <td>
                        <div className="track-lot-id">{l.id}</div>
                        <div className="track-lot-sub">{l.date}</div>
                      </td>
                      <td>
                        <div>Bundibugyo</div>
                        <div className="track-lot-sub">{l.proc}</div>
                      </td>
                      <td><span className={`track-grade track-grade-${l.grade === "ORGANIC" ? "org" : "conv"}`}>{l.grade}</span></td>
                      <td className="right num tabular">{l.tonnes.toFixed(1)}</td>
                      <td className="right num tabular hide-md track-price">$ {dotFmt(l.price)}</td>
                      <td>
                        <div className="track-buyer-badge" data-buyer={l.buyer}>{l.buyer}</div>
                        <div className="track-lot-sub track-dest"><strong>{l.dest}</strong></div>
                      </td>
                      <td className="hide-sm">
                        <div className="track-pay">
                          <div className="track-pay-bar">
                            <i style={{ width: `${l.pct}%`, background: s.tone }} />
                          </div>
                          <span className="tabular">{l.pct}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="track-status" style={{ color: s.tone }}>
                          <span className="dot" style={{ background: s.tone }} />
                          {l.docs?.stage || s.label}
                        </span>
                      </td>
                    </tr>
                    {(openId === l.id || hoverId === l.id) && (
                      <tr className="track-docs-row" onMouseEnter={() => setHoverId(l.id)} onMouseLeave={() => setHoverId(null)}>
                        <td colSpan={8}>
                          <div className="track-docs">
                            <div className="track-docs-trade">
                              <div className="track-docs-item">
                                <div className="track-docs-k">Buy price</div>
                                <div className="track-docs-v">
                                  {l.buy ? "$ " + (l.buy / 1000).toFixed(3) + "/kg" : "—"}
                                </div>
                                <div className="track-docs-sub">
                                  {l.buy ? "$ " + l.buy.toLocaleString("en-US") + " /t" : ""}
                                </div>
                              </div>
                              <div className="track-docs-item">
                                <div className="track-docs-k">Sell price</div>
                                <div className="track-docs-v">
                                  {l.sell ? "$ " + (l.sell / 1000).toFixed(3) + "/kg" : "—"}
                                </div>
                                <div className="track-docs-sub">
                                  {l.sell ? "$ " + l.sell.toLocaleString("en-US") + " /t" : ""}
                                </div>
                              </div>
                              <div className="track-docs-item track-docs-gp">
                                <div className="track-docs-k">Gross profit</div>
                                <div className="track-docs-v">
                                  {(l.buy && l.sell) ? "$ " + ((l.sell - l.buy) * l.tonnes).toLocaleString("en-US", {maximumFractionDigits: 0}) : "—"}
                                </div>
                                <div className="track-docs-sub">
                                  {(l.buy && l.sell) ? "$ " + ((l.sell - l.buy) / 1000).toFixed(3) + "/kg margin" : ""}
                                </div>
                              </div>
                              <div className="track-docs-item track-docs-payment">
                                <div className="track-docs-k">Payment terms</div>
                                <div className="track-docs-v track-docs-payment-v">
                                  {(l.payment || "TBA").split(" / ").map((p, i) => (
                                    <span key={i} className="track-payment-pill">{p}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="track-docs-logistics">
                              <div className="track-docs-item">
                                <div className="track-docs-k">Bill of Lading</div>
                                <div className="track-docs-v">{l.docs?.bl || "—"}</div>
                              </div>
                              <div className="track-docs-item">
                                <div className="track-docs-k">Container</div>
                                <div className="track-docs-v">{l.docs?.ctn || "—"}</div>
                              </div>
                              <div className="track-docs-item">
                                <div className="track-docs-k">Vessel</div>
                                <div className="track-docs-v">{l.docs?.vsl || "—"}</div>
                              </div>
                              <div className="track-docs-item">
                                <div className="track-docs-k">ETD → ETA</div>
                                <div className="track-docs-v">{(l.docs?.etd || "TBA") + " → " + (l.docs?.eta || "TBA")}</div>
                              </div>
                              <div className="track-docs-item">
                                <div className="track-docs-k">Pre-shipment QC</div>
                                <div className="track-docs-v">Sampled · MC ≤ 7.5% · defects ≤ 8%</div>
                              </div>
                              <div className="track-docs-item">
                                <div className="track-docs-k">Documents</div>
                                <div className="track-docs-v">
                                  <span className="track-doc-pill">BL</span>
                                  <span className="track-doc-pill">Phyto</span>
                                  <span className="track-doc-pill">C/O</span>
                                  <span className="track-doc-pill">Packing list</span>
                                  <span className="track-doc-pill">QC report</span>
                                  {l.grade === "ORGANIC" && (
                                    <span className="track-doc-pill">COI</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>);
                })}
              </tbody>
            </table>
          </div>

          <p className="track-footnote">
            Operations executed by the Cocoa Empire founding team under prior
            trading entity, January–May 2026. Full documentation, Bills of
            Lading, tracking records and buyer references available under NDA.
          </p>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { OriginScreen, TRACK_LOTS, TRACK_STATUS });
