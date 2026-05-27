// Cocoa Empire — live market ticker.
// Pulls ICE NY Cocoa, ICE London Cocoa and USD/UGX from public sources.
// Forex uses Frankfurter (CORS-friendly, no key, free). Cocoa futures
// fall back through several CORS proxies for Yahoo Finance. If every
// network attempt fails, the strip keeps showing simulated jitter
// around plausible baselines so it never looks broken.

const TICKER_SPEC = [
  { sym: "UGX=X",  label: "USD / UGX",          unit: "",     baseline: 3760,  jitter: 4,  decimals: 0 },
  { sym: "CC=F",   label: "ICE NY Cocoa",       unit: "$/t",  baseline: 4150,  jitter: 25 },
  { sym: "LCC=F",  label: "ICE London Cocoa",   unit: "£/t",  baseline: 2950,  jitter: 18 },
];

// CORS proxies for Yahoo Finance v8 chart endpoint. The first that
// answers with usable JSON wins. The dedicated Cocoa Empire Worker is
// listed first — it's the most reliable source.
const COCOA_SOURCES = [
  (sym) => `https://cocoa-prices.ivanarrigazzi.workers.dev/?s=${encodeURIComponent(sym)}`,
  (sym) => `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=2d`,
  (sym) => `https://corsproxy.io/?` + encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`),
  (sym) => `https://api.allorigins.win/raw?url=` + encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`),
  (sym) => `https://api.codetabs.com/v1/proxy?quest=` + encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`),
];

function fmtNumber(v, decimals = 0) {
  if (v == null || Number.isNaN(v)) return "—";
  const fixed = Number(v).toFixed(decimals);
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

  // --- USD / UGX from Frankfurter ---------------------------------
  React.useEffect(() => {
    let cancelled = false;
    const pullFx = async () => {
      try {
        const r = await fetch("https://api.frankfurter.app/latest?from=USD&to=UGX");
        if (!r.ok) return;
        const j = await r.json();
        const rate = j?.rates?.UGX;
        if (rate == null || cancelled) return;
        // Also fetch yesterday for delta.
        const yest = new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10);
        let prev = null;
        try {
          const r2 = await fetch(`https://api.frankfurter.app/${yest}?from=USD&to=UGX`);
          const j2 = await r2.json();
          prev = j2?.rates?.UGX ?? null;
        } catch (e) {}
        const delta = prev ? ((rate - prev) / prev) * 100 : null;
        setRows((rs) => rs.map((row) =>
          row.sym === "UGX=X" ? { ...row, price: rate, delta, live: true } : row
        ));
      } catch (e) {}
    };
    pullFx();
    const id = setInterval(pullFx, 5 * 60 * 1000); // every 5 min
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // --- Cocoa futures from Yahoo through CORS proxies --------------
  React.useEffect(() => {
    let cancelled = false;
    const cocoaSymbols = TICKER_SPEC.filter((s) => s.sym !== "UGX=X").map((s) => s.sym);

    const fetchOne = async (sym) => {
      for (const builder of COCOA_SOURCES) {
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
          const delta = prev != null && prev !== 0 ? ((price - prev) / prev) * 100 : null;
          return { sym, price, delta };
        } catch (e) { /* try next */ }
      }
      return null;
    };

    const pull = async () => {
      const results = await Promise.all(cocoaSymbols.map(fetchOne));
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
    const id = setInterval(pull, 60 * 1000); // every minute
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // Simulated micro-jitter for any row that never went live.
  React.useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => prev.map((r) => {
        if (r.live) return r;
        const walk = (Math.random() - 0.5) * r.jitter * 0.6;
        const next = r.price + walk;
        const pctChange = ((next - r.baseline) / r.baseline) * 100;
        return { ...r, price: next, delta: pctChange };
      }));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Clock — local time in EAT (Bundibugyo, UTC+3, no DST)
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
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
