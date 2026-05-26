// Cocoa Empire — "How the cycle pays".
// Animated investor cycle: a cocoa pod travels through 5 phases
// (Capital in → Sourcing → QC + Acceptance → Pay & Ship → Buyer pays),
// active stop highlights as the pod arrives, gold progress line fills.
// Closes with the math 3% × ~8 cycles = 24% target IRR.

const CYCLE_PHASES = [
  {
    n: "01", k: "Capital in",
    title: "Capital partner commits",
    body: "Strategic capital enters the operating cycle. Each tranche is allocated to a specific lot pipeline before any deployment.",
    money: "Capital partner in",
  },
  {
    n: "02", k: "Sourcing",
    title: "We collect the cocoa",
    body: "Cocoa is sourced from approved farmer groups and cooperatives into our Bundibugyo warehouse — under our protocol, not in the field.",
    money: "Cocoa under our roof",
  },
  {
    n: "03", k: "QC · Acceptance",
    title: "Quality dept. accepts",
    body: "Our quality team checks moisture, grade, certification and EUDR readiness. Only accepted cocoa proceeds — capital stays unspent until then.",
    money: "Accepted, under our control",
  },
  {
    n: "04", k: "Pay & Ship",
    title: "We pay, then we ship",
    body: "On acceptance, payment is released to the farmer and the cocoa ships to the matched buyer.",
    money: "Capital deployed · shipment dispatched",
  },
  {
    n: "05", k: "Buyer settles",
    title: "Buyer pays — cycle closed",
    body: "Buyer settles in 30–45 days. Once the buyer payment is received, the operating cycle closes and proceeds are recycled into the next lot pipeline.",
    money: "Settlement complete",
  },
];

const PHASE_DURATION_MS = 2600;

function CycleAnimation() {
  const [active, setActive] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const rootRef = React.useRef(null);

  // Start cycling once the section is in view; pause when out of view
  // or when the user hovers the track (gives them a chance to read).
  const [inView, setInView] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    setRunning(false);
  }, [inView, hovering]);

  // Auto-cycle disabled — advance only on user interaction.
  // Kept the running state so existing JSX/effects still work.

  // Position pod at the center of the active stop. The track now uses a
  // 5-column grid that matches the detail rail below, so the column centers
  // sit at 10%, 30%, 50%, 70%, 90% of the track’s width.
  const podLeft = `${10 + active * 20}%`;
  const fillWidth = `${active * 20}%`;

  const onStopClick = (i) => {
    setActive(i);
    // Restart the timer phase from now (clean perceived cadence)
    setRunning(false);
    requestAnimationFrame(() => setRunning(inView && !hovering));
  };

  return (
    <div ref={rootRef} className="cycle-anim"
         onMouseEnter={() => setHovering(true)}
         onMouseLeave={() => setHovering(false)}>

      {/* Track */}
      <div className="cycle-track-wrap">
        <div className="cycle-track">
          <div className="cycle-line" />
          <div className="cycle-line-fill" style={{ width: fillWidth }} />
          <div className="cycle-stops">
            {CYCLE_PHASES.map((p, i) => (
              <button key={p.n}
                      type="button"
                      className={`cycle-stop ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
                      onClick={() => onStopClick(i)}
                      aria-label={`Phase ${p.n} — ${p.k}`}>
                <span className="num">{p.n}</span>
              </button>
            ))}
          </div>
          <div className="cycle-pod" style={{ left: podLeft }}>
            <img src={window.__images.cocoaPod} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Detail rail under the track */}
      <div className="cycle-details">
        {CYCLE_PHASES.map((p, i) => (
          <div key={p.n} data-step-num={p.n}
               onMouseEnter={() => setActive(i)}
               className={`cycle-detail ${i === active ? "is-active" : ""}`}>
            {i === 4 && i === active && (
              <div className="cycle-pod-rain" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, j) => {
                  const colors = ["#C75441", "#D46A2C", "#C9A14B", "#5A7B36", "#B8945A", "#7A3D14"];
                  return (
                    <span key={j}
                          style={{
                            "--x": `${5 + (j * 95) / 16}%`,
                            "--d": `${(Math.random() * 1.6).toFixed(2)}s`,
                            "--dur": `${(2.0 + Math.random() * 1.4).toFixed(2)}s`,
                            "--c": colors[j % colors.length],
                            "--w": `${10 + Math.round(Math.random() * 8)}px`,
                            "--h": `${16 + Math.round(Math.random() * 12)}px`,
                            "--r": `${Math.round(Math.random() * 360)}deg`,
                          }} />
                  );
                })}
              </div>
            )}
            <div className="k">{p.k}</div>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
            <div className="money">{p.money}</div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

function Calculator() {
  const MIN = 100000;
  const MAX = 5000000;
  const STEP = 100000;
  const [amount, setAmount] = React.useState(500000);

  const SCENARIOS = [
    { k: "Conservative", n: 6,  sub: "6 cycles · cautious year" },
    { k: "Base case",    n: 8,  sub: "8 cycles · expected"     },
    { k: "Strong",       n: 10, sub: "10 cycles · upside"      },
  ];

  // Format with dot as thousands separator (institutional/European style).
  const dots = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const fmt = (n) => {
    if (n >= 1000000) {
      const m = n / 1000000;
      const s = m % 1 === 0 ? m.toFixed(0) : m.toFixed(1);
      return `$${s}M`;
    }
    return `$${dots(n / 1000)}K`;
  };
  const fmtFull = (n) => `$${dots(n)}`;

  const bump = (d) =>
    setAmount((a) => Math.max(MIN, Math.min(MAX, a + d * STEP)));

  const calc = (cycles) => {
    // Indicative working-capital rotation: capital deployed N times/year.
    const rotated = amount * cycles;
    // Illustrative MT financed: assume $3,800 average lot pricing.
    const mtFinanced = Math.round(rotated / 3800);
    const days = Math.round(365 / cycles);
    // Indicative gross return: 3% per cycle on the deployed ticket.
    const returnPct = cycles * 3;
    const yieldAmt = (amount * returnPct) / 100;
    return { rotated, mtFinanced, days, returnPct, yieldAmt };
  };

  return (
    <div className="calc">
      <div className="calc-head">
        <div className="eyebrow"><span>Working capital cycle simulator</span></div>
        <h3 className="calc-title">
          See how capital may rotate<br /><strong>through controlled flows.</strong>
        </h3>
        <p className="calc-sub">
          Illustrative simulator showing how working capital may rotate
          through warehouse-approved cocoa flows. Figures are indicative and
          subject to final agreements, buyer payment timing, product
          availability and risk controls.
        </p>
      </div>

      <div className="calc-input">
        <div className="calc-amount-row">
          <button type="button" className="calc-step"
                  onClick={() => bump(-1)}
                  aria-label="Decrease by 100,000">−</button>
          <div className="calc-amount">
            <span className="v">{fmt(amount)}</span>
            <span className="lbl">Investment ticket · USD</span>
          </div>
          <button type="button" className="calc-step"
                  onClick={() => bump(1)}
                  aria-label="Increase by 100,000">+</button>
        </div>
        <input type="range" className="calc-slider"
               min={MIN} max={MAX} step={STEP} value={amount}
               style={{ "--pct": ((amount - MIN) / (MAX - MIN)) * 100 + "%" }}
               onChange={(e) => setAmount(Number(e.target.value))} />
        <div className="calc-scale">
          <span>{fmt(MIN)}</span>
          <span>Multiples of $100K</span>
          <span>{fmt(MAX)}</span>
        </div>
      </div>

      <div className="calc-scenarios">
        {SCENARIOS.map((s, i) => {
          const r = calc(s.n);
          return (
            <div key={s.k}
                 className={`calc-scen ${i === 1 ? "is-base" : ""}`}>
              {i === 1 && <div className="calc-flag">Expected</div>}
              <div className="calc-scen-head">
                <div className="kicker">{s.k}</div>
                <div className="calc-cyc">{s.n} <span>cycles / year</span></div>
              </div>
              <div className="calc-pct">
                {s.n}<span className="unit">cycles</span>
              </div>
              <div className="calc-pct-lbl">~{r.days} days per cycle</div>
              <div className="calc-divider" />
              <div className="calc-yield-row">
                <span className="k">Capital rotated</span>
                <span className="v">{fmtFull(r.rotated)}</span>
              </div>
              <div className="calc-total-row">
                <span className="k">Controlled MT</span>
                <span className="v">{r.mtFinanced.toLocaleString("de-DE")} t</span>
              </div>
              <div className="calc-divider" />
              <div className="calc-return">
                <div className="calc-return-pct">
                  ~{r.returnPct}<span className="unit">%</span>
                </div>
                <div className="calc-return-lbl">Indicative gross return · 3% per cycle</div>
                <div className="calc-return-amt">+ {fmtFull(r.yieldAmt)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="calc-foot">
        This is not an offer of securities, investment advice or a guaranteed
        return. Any capital partnership is subject to due diligence, KYC/AML,
        legal documentation, risk assessment and applicable laws.
      </p>
    </div>
  );
}

Object.assign(window, { CycleAnimation, CYCLE_PHASES });
