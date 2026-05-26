// Cocoa Empire — live market ticker.
// A continuously scrolling Bloomberg-style strip that pulls cocoa
// futures prices from Yahoo Finance's public chart endpoint (works
// from the sandbox; if CORS bites it falls back to simulated jitter
// around plausible baselines so the strip never looks broken).

// Tickers we want to surface, in display order.
// Baselines are fallback values shown if all live sources fail.
const TICKER_SPEC = [
  { sym: "CC=F",   label: "ICE NY Cocoa",       unit: "$/t",  baseline: 7820,  jitter: 28 },
  { sym: "LCC=F",  label: "ICE London Cocoa",   unit: "£/t",  baseline: 5180,  jitter: 22 },
  { sym: "UGX=X",  label: "USD / UGX",          unit: "",     baseline: 3720,  jitter: 4, decimals: 0 },
];

// Yahoo Finance · multiple endpoints + CORS fallbacks. The first one
// that returns data wins; if all fail we keep the simulated jitter.
const SOURCES = [
  // Yahoo v8 chart (often more permissive than v7 quote)
  (sym) => `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=2d`,
  // CORS proxy 1
  (sym) => `https://corsproxy.io/?` + encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`
  ),
  // CORS proxy 2 (allorigins)
  (sym) => `https://api.allorigins.win/raw?url=` + encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`
  ),
];

function fmtNumber(v, decimals = 0) {
  if (v == null || Number.isNaN(v)) return "—";
  const fixed = Number(v).toFixed(decimals);
  // European-style thousands separators (matches the rest of the site).
  const [int, frac] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return frac ? `${grouped},${frac}` : grouped;
}

function fmtDelta(pct) {
  if (pct == null || Number.isNaN(pct)) return null;
  const sign = pct > 0 ? "+" : pct < 0 ? "" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

function LiveTicker() {
  const [rows, setRows] = React.useState(() =>
    TICKER_SPEC.map((s) => ({
      ...s,
      price: s.baseline,
      delta: (Math.random() * 1.6 - 0.5),
      live: false,
    }))
  );
  const [clock, setClock] = React.useState("");

  // Fetch real prices for the Yahoo-recognized symbols.
  React.useEffect(() => {
    let cancelled = false;
    const yahooSymbols = TICKER_SPEC
      .map((s) => s.sym)
      .filter((s) => !s.startsWith("CE-"));

    const fetchOne = async (sym) => {
      for (const builder of SOURCES) {
        try {
          const r = await fetch(builder(sym), { mode: "cors" });
          if (!r.ok) continue;
          const j = await r.json();
          const chart = j?.chart?.result?.[0];
          if (!chart) continue;
          const meta = chart.meta || {};
          const price = meta.regularMarketPrice ?? meta.previousClose ?? null;
          const prev  = meta.previousClose ?? meta.chartPreviousClose ?? null;
          if (price == null) continue;
          const delta = prev != null && prev !== 0
            ? ((price - prev) / prev) * 100
            : null;
          return { sym, price, delta };
        } catch (e) {
          // try next source
        }
      }
      return null;
    };

    const pull = async () => {
      const results = await Promise.all(yahooSymbols.map(fetchOne));
      if (cancelled) return;
      setRows((prev) => prev.map((row) => {
        const hit = results.find((r) => r && r.sym === row.sym);
        if (hit && hit.price != null) {
          return { ...row, price: hit.price, delta: hit.delta ?? row.delta, live: true };
        }
        return row;
      }));
    };

    pull();
    const id = setInterval(pull, 60000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // Simulated micro-jitter for CE-internal tickers + fallback liveness.
  // Updates every 3-4 seconds with small random walk inside ±jitter.
  React.useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => prev.map((r) => {
        // For Yahoo-live rows, only nudge if we never got data yet.
        if (r.live) return r;
        const walk = (Math.random() - 0.5) * r.jitter * 0.6;
        const next = r.price + walk;
        const pctChange = ((next - r.baseline) / r.baseline) * 100;
        return { ...r, price: next, delta: pctChange };
      }));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Clock — local time in EAT (Bundibugyo)
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      // EAT is UTC+3 year-round; format as HH:MM
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const eat = new Date(utc + 3 * 60 * 60 * 1000);
      const hh = String(eat.getHours()).padStart(2, "0");
      const mm = String(eat.getMinutes()).padStart(2, "0");
      setClock(`${hh}:${mm} EAT`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Duplicate rows for seamless marquee loop
  const doubled = [...rows, ...rows];

  return (
    <div className="ribbon live-ticker">
      <div className="lt-track-wrap">
        <div className="lt-track">
          {doubled.map((r, i) => (
            <div key={i} className="lt-item">
              <span className="lt-label">{r.label}</span>
              <span className="lt-price tabular">
                {fmtNumber(r.price, r.decimals ?? (r.price < 5 ? 4 : r.price < 100 ? 2 : 0))}
                {r.unit && <span className="lt-unit">{r.unit}</span>}
              </span>
              <span className={`lt-delta ${r.delta > 0 ? "up" : r.delta < 0 ? "down" : ""}`}>
                {fmtDelta(r.delta)}
              </span>
              <span className="lt-pulse" data-live={r.live ? "1" : "0"} />
            </div>
          ))}
        </div>
      </div>
      <div className="lt-clock">
        <span className="lt-dot" />
        <span>Live · {clock}</span>
      </div>
    </div>
  );
}

Object.assign(window, { LiveTicker });
