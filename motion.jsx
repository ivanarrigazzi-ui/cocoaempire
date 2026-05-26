// Cocoa Empire — motion primitives.
// Investor-grade restraint: counters fire once on intersection,
// reveals fade-in on scroll, carousel is a continuous marquee
// that pauses on hover.

// Animated number counter — count up from 0 → target when scrolled into view.
// Number formatting: integer with thousand separators, or fixed decimals.
function Counter({ target, duration = 1600, decimals = 0, prefix = "", suffix = "" }) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const t0 = performance.now();
            const tick = (now) => {
              const p = Math.min(1, (now - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
              setV(target * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  const display = decimals === 0
    ? String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : v.toFixed(decimals);

  return (
    <span ref={ref} className="tabular">
      {prefix}{display}{suffix}
    </span>
  );
}

// Reveal — fade + lift in on scroll. Disconnects after firing so it never re-triggers.
function Reveal({ children, delay = 0, as = "div", className = "", style, ...rest }) {
  const As = as;
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <As ref={ref}
        className={`reveal ${shown ? "in" : ""} ${className}`}
        style={style}
        {...rest}>
      {children}
    </As>
  );
}

// SVG icon set for MetricCarousel. Minimal line-art, currentColor.
const METRIC_ICONS = {
  farmers: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <circle cx="10" cy="11" r="4.2" />
      <circle cx="22" cy="13" r="3.2" />
      <path d="M3 26c0-4 3.2-7 7-7s7 3 7 7v1H3v-1z" />
      <path d="M17 26c.3-3 2.5-5 5-5s4.7 2 5 5v1H17v-1z" />
    </svg>
  ),
  certified: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 3l3.4 3.4 4.6-1.1 1.1 4.6L28.5 13l-3.4 3.4 1.1 4.6-4.6 1.1L19 26.5l-3-3.4-3 3.4-3.4-3.4-4.6-1.1 1.1-4.6L3.5 13l3.4-3.4-1.1-4.6L10.4 4 13.6 1z" opacity="0.95" />
      <path d="M11 16l4 4 7-8" fill="none" stroke="#3D1C08" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  onboarding: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <circle cx="9" cy="10" r="4" />
      <path d="M3 24c0-3.3 2.7-6 6-6s6 2.7 6 6v1H3v-1z" />
      <path d="M22 16l5 5-5 5v-3h-5v-4h5v-3z" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <circle cx="16" cy="16" r="3.5" />
      <circle cx="6" cy="7" r="2.8" />
      <circle cx="26" cy="7" r="2.8" />
      <circle cx="6" cy="25" r="2.8" />
      <circle cx="26" cy="25" r="2.8" />
      <path d="M8 9l6 5M24 9l-6 5M8 23l6-5M24 23l-6-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warehouse: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M4 14l12-8 12 8v14H4z" />
      <rect x="10" y="19" width="12" height="9" fill="#3F8D1A" />
      <rect x="14" y="23" width="4" height="5" fill="currentColor" />
    </svg>
  ),
  rotate: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 4a12 12 0 1 1-11 7.5l3 1A9 9 0 1 0 16 7v4l-6-5 6-5v3z" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 3c-5 0-9 4-9 9 0 7 9 17 9 17s9-10 9-17c0-5-4-9-9-9z" />
      <circle cx="16" cy="12" r="3.2" fill="#3F8D1A" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 28s-9-6-9-13a5.5 5.5 0 0 1 9-3.5 5.5 5.5 0 0 1 9 3.5c0 7-9 13-9 13z" />
    </svg>
  ),
};

// MetricCarousel — continuous horizontal marquee, pauses on hover.
// Duplicates the cards so a translateX(-50%) loops seamlessly.
function MetricCarousel({ metrics, speed = 80 }) {
  const doubled = [...metrics, ...metrics];
  return (
    <div className="metric-carousel">
      <div className="metric-track"
           style={{ animationDuration: `${speed}s` }}>
        {doubled.map((m, i) => (
          <div key={i} className="metric-card">
            <div className="metric-num">
              {m.num}
              {m.unit && <span className="unit">{m.unit}</span>}
            </div>
            <div className="metric-lbl">{m.lbl}</div>
            {m.iconKey && METRIC_ICONS[m.iconKey] && (
              <div className={`metric-icon icon-${m.iconKey}`} aria-hidden="true">
                {METRIC_ICONS[m.iconKey]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Counter, Reveal, MetricCarousel });
