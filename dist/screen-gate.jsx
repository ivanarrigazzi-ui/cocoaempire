// Cocoa Empire — investor gate.
// Wraps screens that should only be visible to approved capital partners.
// Anyone else sees a marketing/landing page with sign-in / apply CTAs.
//
// Bypass for the founders / editing mode:
//   1. Append ?inv=1 to the URL once → flag is stored in localStorage
//   2. Append ?inv=0 to clear it.
//   3. While editing in the design tool, the flag survives reloads.

const INV_KEY = "cc-investor-access";

function hasInvestorAccess() {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("inv") === "1") {
      localStorage.setItem(INV_KEY, "1");
    } else if (url.searchParams.get("inv") === "0") {
      localStorage.removeItem(INV_KEY);
    }
    return localStorage.getItem(INV_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function InvestorGate({ screenLabel, children, onSignIn, onApply, go }) {
  const granted = hasInvestorAccess();
  if (granted) return children;

  return (
    <div className="view inv-gate-view" data-screen-label={screenLabel}>
      <section className="section inv-gate">
        <div className="inv-gate-bg" aria-hidden="true"></div>
        <div className="inv-gate-veil" aria-hidden="true"></div>
        <div className="container">
          <div className="inv-gate-card">
            <div className="inv-gate-icon" aria-hidden="true">
              <svg viewBox="0 0 80 96" fill="none">
                {/* Shackle (animates) */}
                <g className="inv-lock-shackle">
                  <path d="M22 46 V32 a18 18 0 0 1 36 0 V46"
                        stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
                </g>
                {/* Body */}
                <rect x="12" y="46" width="56" height="42" rx="6"
                      fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                {/* Keyhole */}
                <circle cx="40" cy="63" r="4.5" fill="#FAFAF7" />
                <path d="M40 66 v8" stroke="#FAFAF7" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            <div className="inv-gate-eyebrow">Private capital partner area</div>
            <h1 className="inv-gate-title">
              This section is <span className="hl">private</span>.
            </h1>
            <p className="inv-gate-sub">
              Operating documentation, working-capital flow detail and
              partnership terms are available only to qualified / professional
              investors under NDA. Apply for a private discussion — we respond
              within 48–72 hours.
            </p>

            <ul className="inv-gate-list">
              <li><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4B8E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5 L8.5 15 L17 6" /></svg><span>Live &amp; past cycles ledger · operating documentation</span></li>
              <li><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4B8E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5 L8.5 15 L17 6" /></svg><span>Indicative working-capital simulator</span></li>
              <li><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4B8E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5 L8.5 15 L17 6" /></svg><span>Data room: buyer references, BLs, operating records</span></li>
              <li><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4B8E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5 L8.5 15 L17 6" /></svg><span>Direct line with the operating team</span></li>
            </ul>

            <div className="inv-gate-actions">
              <button type="button" className="inv-gate-btn primary" onClick={onApply}>
                Request a strategic discussion
              </button>
              <button type="button" className="inv-gate-btn ghost" onClick={onSignIn}>
                Sign in
              </button>
            </div>

            <div className="inv-gate-foot">
              <span className="inv-gate-foot-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 L22 21 L2 21 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
                  <path d="M12 10 V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="18" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <p>
                Private by-invitation programme. Not a public offer of securities,
                not a guaranteed return. Not available to U.S. Persons or in
                jurisdictions where local registration would be required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { InvestorGate, hasInvestorAccess });
