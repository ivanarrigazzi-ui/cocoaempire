// Cocoa Empire — decorative cursor companion.
// A small cocoa pod that follows the mouse with a slight lag,
// tilts with horizontal velocity, and grows when hovering over
// interactive elements. The native cursor is NOT hidden — this is
// an additive decoration so accessibility (text I-beam, etc.) stays intact.

(() => {
  // Skip on touch / coarse pointers — the cursor would just sit at (0,0).
  if (typeof window === "undefined") return;
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

  const start = () => {
    if (document.querySelector(".ce-cursor")) return;

    const cursor = document.createElement("div");
    cursor.className = "ce-cursor";
    cursor.setAttribute("aria-hidden", "true");
    const img = document.createElement("img");
    img.src = "assets/cocoa-pod.png";
    img.alt = "";
    cursor.appendChild(img);
    document.body.appendChild(cursor);

    // Target (mouse) and current (smoothed) positions.
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let x = tx, y = ty;
    let lastTx = tx;
    let rot = 0;
    let targetRot = 0;
    let scale = 1;
    let targetScale = 1;
    let visible = false;

    const INTERACTIVE = "button, a, [role='button'], input, select, textarea, image-slot, .chip, .map-pin, .nav button, .lots-table tbody tr, .timeline .node";

    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      // Tilt slightly with horizontal velocity, clamped.
      const vx = e.clientX - lastTx;
      targetRot = Math.max(-22, Math.min(22, vx * 0.6));
      lastTx = e.clientX;

      if (!visible) {
        cursor.style.opacity = "1";
        visible = true;
      }

      const overInteractive = e.target && e.target.closest && e.target.closest(INTERACTIVE);
      targetScale = overInteractive ? 1.45 : 1;
      cursor.classList.toggle("hover", !!overInteractive);

      // Adapt color: invert (white) when over dark backgrounds.
      const onDark = e.target && e.target.closest && e.target.closest(
        ".hero, .section.dark, .section.dark-deep, .topbar.on-dark, .footer, .map-card, .detail header, .tile.featured"
      );
      cursor.classList.toggle("on-dark", !!onDark);
    });

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
      visible = false;
    });

    let raf = 0;
    const tick = () => {
      // Lerp toward target — gives a soft, premium follow rather than
      // a rigid one-to-one mapping.
      x += (tx - x) * 0.20;
      y += (ty - y) * 0.20;
      scale += (targetScale - scale) * 0.18;
      rot += (targetRot - rot) * 0.18;
      // Decay tilt back to neutral when the mouse stops.
      targetRot *= 0.86;
      cursor.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) ` +
        `rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };
    tick();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

