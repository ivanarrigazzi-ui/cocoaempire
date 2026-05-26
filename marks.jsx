// Cocoa Empire — marks, logo, pod silhouettes.
// The cocoa pod is the brand pod image from the logo, used at low
// opacity as a decorative background motif. Tone="light" inverts to
// cream for placement on cocoa-dark backgrounds.

const Logo = ({ tone = "brown", height = 32 }) => (
  <img
    src={window.__images.cocoaLogo}
    alt="Cocoa Empire"
    style={{
      height,
      width: "auto",
      display: "block",
      filter: tone === "dark" ? "brightness(0) invert(1)" : "none",
    }}
  />
);

// Brand pod mark — a single pod image used inline (small).
const BrandMark = ({ size = 32, tone = "brown" }) => (
  <img
    src={window.__images.cocoaPod}
    alt=""
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: tone === "dark" ? "brightness(0) invert(1)" : "none",
      display: "block",
    }}
  />
);

// Decorative pod image — tone="light" inverts so the brown image
// reads as cream on dark backgrounds.
const PodImage = ({ tone = "dark", style = {}, opacity = 1 }) => (
  <img
    src={window.__images.cocoaPod}
    alt=""
    aria-hidden="true"
    style={{
      display: "block",
      objectFit: "contain",
      filter: tone === "light" ? "brightness(0) invert(1)" : "none",
      opacity,
      ...style,
    }}
  />
);

// Backwards-compat alias used in corners.
const PodGlyph = ({ size = 320, tone = "light", opacity = 1 }) => (
  <PodImage tone={tone} opacity={opacity}
            style={{ width: size, height: "auto" }} />
);

// Hero/section backdrop — three pods at varying scale/rotation, low opacity.
// Renders as an absolutely-positioned layer with the wrapping element
// providing the container size.
const PodField = ({ tone = "light" }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    <PodImage tone={tone} opacity={1} style={{
      position: "absolute",
      right: "-12%", top: "-8%",
      width: "62%",
      transform: "rotate(18deg)",
    }} />
    <PodImage tone={tone} opacity={1} style={{
      position: "absolute",
      left: "-8%", bottom: "-18%",
      width: "38%",
      transform: "rotate(-26deg)",
    }} />
    <PodImage tone={tone} opacity={1} style={{
      position: "absolute",
      right: "8%", bottom: "-10%",
      width: "22%",
      transform: "rotate(60deg)",
    }} />
  </div>
);

// Arrow used in CTAs.
const Arrow = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
    <path d="M0 5 H 12 M 8 1 L 12 5 L 8 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="square" />
  </svg>
);

// Abstracted Uganda outline + Lake Victoria notch.
const UgandaMap = () => (
  <svg viewBox="0 0 600 500" aria-hidden="true">
    <defs>
      <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(184,148,90,0.18)" strokeWidth="1" />
      </pattern>
    </defs>
    <path d="M 130 90 L 240 70 L 360 80 L 470 100 L 510 180 L 520 280 L 470 380 L 360 420 L 240 410 L 160 380 L 110 290 L 100 180 Z"
          fill="url(#hatch)" stroke="rgba(184,148,90,0.55)" strokeWidth="1.5" />
    <path d="M 370 380 C 410 360, 450 360, 470 380 C 470 410, 420 425, 380 420 C 360 415, 360 395, 370 380 Z"
          fill="rgba(46,74,53,0.45)" stroke="rgba(46,74,53,0.7)" strokeWidth="1" />
    <g stroke="rgba(248,245,241,0.06)" strokeWidth="1">
      <line x1="0" y1="120" x2="600" y2="120" />
      <line x1="0" y1="240" x2="600" y2="240" />
      <line x1="0" y1="360" x2="600" y2="360" />
      <line x1="150" y1="0" x2="150" y2="500" />
      <line x1="300" y1="0" x2="300" y2="500" />
      <line x1="450" y1="0" x2="450" y2="500" />
    </g>
  </svg>
);

Object.assign(window, { Logo, BrandMark, PodImage, PodField, PodGlyph, Arrow, UgandaMap });
