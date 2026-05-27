// Cocoa Empire — app shell (nav, footer, screen routing, tweaks)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#3D1C08", "#F8F5F1", "#B8945A"],
  "density": "regular",
  "showPodMotifs": true,
  "accent": "#B8945A"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState("overview");
  const [prevScreen, setPrevScreen] = React.useState("overview");
  const [prevScroll, setPrevScroll] = React.useState(0);
  const [lotFocus, setLotFocus] = React.useState(null);
  const [splashKey, setSplashKey] = React.useState(0);

  const go = (next, lotId) => {
    setPrevScreen(screen);
    setPrevScroll(window.scrollY);
    setScreen(next);
    if (lotId) setLotFocus(lotId);
    if (next === "overview") setSplashKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const goBack = () => {
    const target = prevScreen && prevScreen !== screen ? prevScreen : "overview";
    const restoreY = prevScroll;
    setPrevScreen(screen);
    setPrevScroll(window.scrollY);
    setScreen(target);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: restoreY, behavior: "instant" });
      });
    });
  };

  const goToCalc = () => {
    setScreen("financing");
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.querySelector(".calc");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  };

  // Smooth-scroll to an anchor on the current screen. If the screen does
  // not contain the anchor (e.g. clicking Impact while on the Origin
  // screen), it first navigates to Overview, then scrolls.
  const goAnchor = (id, screenName = "overview") => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    if (screen !== screenName) {
      setScreen(screenName);
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
    } else {
      doScroll();
    }
  };

  // Apply tweaks via CSS variables on <body>
  React.useEffect(() => {
    const [cocoa, cream, gold] = t.palette || ["#3D1C08", "#F8F5F1", "#B8945A"];
    document.documentElement.style.setProperty("--cocoa", cocoa);
    document.documentElement.style.setProperty("--cream", cream);
    document.documentElement.style.setProperty("--gold", t.accent || gold);
    document.body.dataset.density = t.density;
    document.body.dataset.podMotifs = t.showPodMotifs ? "1" : "0";
  }, [t]);

  // Pod motif visibility — hide via CSS when toggled off
  React.useEffect(() => {
    const styleId = "pod-vis";
    let el = document.getElementById(styleId);
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      document.head.appendChild(el);
    }
    el.textContent = t.showPodMotifs
      ? ""
      : `.hero-pods, .pod-corner { display: none !important; }`;
  }, [t.showPodMotifs]);

  const onDark = screen === "overview"; // hero is dark on overview; topbar overlays it
  const [modal, setModal] = React.useState(null); // "capital" | "origin" | "signin" | null
  const [navOpen, setNavOpen] = React.useState(false);

  // Detect whether we're on the partners subdomain (private access already granted via
  // Cloudflare Access). When true, we skip the JS gate, default to the invest screen
  // and surface the private nav. On the public domain (cocoaempire.com) we instead
  // bounce private CTAs to https://partners.cocoaempire.com so the user re-authenticates.
  const PARTNERS_HOST = "partners.cocoaempire.com";
  const onPartners = (typeof window !== "undefined")
    && /(^|\.)partners\./i.test(window.location.hostname);
  const partnersUrl = (path = "") => `https://${PARTNERS_HOST}/${path}`;
  const gotoInvest = () => {
    if (onPartners) { go("financing"); return; }
    // Public site: open the capital partner application form so
    // prospects can submit their details. Once approved, they'll use
    // "Investor login" to reach the private area.
    setModal("capital");
  };
  const gotoSignIn = () => {
    if (onPartners) {
      try { window.location.assign("/cdn-cgi/access/logout"); } catch (e) {}
      return;
    }
    // Public site: surface a styled warning before forwarding to Cloudflare
    // Access so prospects don't try to log in before being approved.
    setModal("signin-warn");
  };

  // Default landing for the partners subdomain.
  React.useEffect(() => {
    if (onPartners && screen === "overview") {
      go("financing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close mobile nav whenever we navigate.
  React.useEffect(() => { setNavOpen(false); }, [screen]);

  // Cross-link from sign-in modal -> apply (capital application).
  const closeModal = (next) => {
    setModal(null);
    if (next === "apply") {
      setTimeout(() => setModal("capital"), 220);
    }
  };

  return (
    <div className="shell">
      {screen === "overview" && <SplashIntro key={splashKey} />}
      <header className={`topbar ${onDark ? "on-dark" : ""} ${navOpen ? "is-mobile-open" : ""}`}>
        <div className="topbar-inner">
          <div className="brand" onClick={() => go("overview")}>
            <Logo tone={onDark ? "dark" : "brown"} height={48} />
          </div>
          <button type="button" className="topbar-hamburger" aria-label="Menu"
                  aria-expanded={navOpen}
                  onClick={() => setNavOpen(v => !v)}>
            <span /><span /><span />
          </button>
          <nav className="nav">
            <button aria-current={screen === "overview"} onClick={() => go("overview")}>Origin Platform</button>
            <button aria-current={screen === "supply" || screen === "control" || screen === "origin"} onClick={() => go("supply")}>Supply Network</button>
            <button aria-current={screen === "buyers"} onClick={() => go("buyers")}>Buyer Channels</button>
            <button aria-current={screen === "impact"} onClick={() => go("impact")}>10% Impact</button>
            <button aria-current={screen === "financing"} className="nav-cta" onClick={gotoInvest}>Invest with Us</button>
          </nav>
          <div className="topbar-actions">
            <button type="button" className="topbar-signin" onClick={gotoSignIn} aria-label={onPartners ? "Sign out of private area" : "Investor login"}>
              <svg className="lock" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="8" height="6" rx="1.5" />
                <path d="M5 6V4a2 2 0 014 0v2" />
              </svg>
              <span>{onPartners ? "Sign out" : "Approved login"}</span>
            </button>
            <button className="cta solid" onClick={() => setModal("origin")}>Partner with us</button>
          </div>
        </div>
      </header>

      <main>
        {screen === "overview"  && <OverviewScreen  go={go} openForm={(k) => setModal(k)} />}
        {screen === "origin"    && (
          <InvestorGate screenLabel="02 Track record · private"
            onSignIn={() => setModal("signin")} onApply={() => setModal("capital")} go={go}>
            <OriginScreen initialLotId={lotFocus} />
          </InvestorGate>
        )}
        {screen === "supply"    && <SupplyScreen    go={go} />}
        {screen === "buyers"    && <BuyersScreen />}
        {screen === "impact"    && <ImpactScreen />}
        {screen === "financing" && (
          <InvestorGate screenLabel="03 Invest with us · private"
            onSignIn={() => setModal("signin")} onApply={() => setModal("capital")} go={go}>
            <FinancingScreen go={go} />
          </InvestorGate>
        )}
        {screen === "track"     && <TrackScreen />}
        {screen === "calc"      && (
          <InvestorGate screenLabel="04 Capital Simulator · private"
            onSignIn={() => setModal("signin")} onApply={() => setModal("capital")} go={go}>
            <CalcScreen go={go} />
          </InvestorGate>
        )}
        {screen === "control"   && <ControlLayers   go={go} goBack={goBack} />}
        {screen === "team"      && <TeamScreen />}
        {screen === "legal"     && <LegalPage slug="legal"       go={go} />}
        {screen === "privacy"   && <LegalPage slug="privacy"     go={go} />}
        {screen === "disclosures" && <LegalPage slug="disclosures" go={go} />}
      </main>

      <Footer go={go} openForm={(k) => setModal(k)} />

      {modal === "capital" && <EnrolModal kind="capital" onClose={closeModal} />}
      {modal === "origin"  && <EnrolModal kind="origin"  onClose={closeModal} />}
      {modal === "signin-warn" && (
        <div className="enrol-backdrop" onClick={() => setModal(null)} role="dialog" aria-modal="true">
          <div className="enrol-modal signin-warn-modal" onClick={(e) => e.stopPropagation()} style={{ "--accent": "#4B8E1E" }}>
            <button type="button" className="enrol-close" onClick={() => setModal(null)} aria-label="Close">×</button>
            <div className="signin-warn-icon" aria-hidden="true">
              <svg viewBox="0 0 60 60" fill="none">
                <rect x="15" y="27" width="30" height="22" rx="3" stroke="currentColor" strokeWidth="2.4" />
                <path d="M22 27v-7a8 8 0 0 1 16 0v7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="30" cy="38" r="2.2" fill="currentColor" />
              </svg>
            </div>
            <div className="enrol-head" style={{ textAlign: "center" }}>
              <div className="enrol-eyebrow">Private partner area</div>
              <h2 className="enrol-title">Approved access only</h2>
              <p className="enrol-sub">
                The private area is reserved for partners <strong>previously approved</strong>
                by Cocoa Empire. Approval is communicated by email after submitting an
                application.
              </p>
            </div>
            <p className="enrol-fineprint" style={{ borderTop: 0, padding: 0, margin: "0 0 20px", textAlign: "center", maxWidth: "none" }}>
              Don’t have approval yet? Apply for a strategic discussion —
              we respond within 48–72 hours.
            </p>
            <div className="signin-warn-actions">
              <button type="button" className="signin-warn-btn ghost" onClick={() => {
                setModal(null);
                setTimeout(() => setModal("capital"), 200);
              }}>
                Apply for access
              </button>
              <button type="button" className="signin-warn-btn primary" onClick={() => {
                setModal(null);
                try { window.open(partnersUrl(), "_blank", "noopener,noreferrer"); }
                catch (e) { window.location.assign(partnersUrl()); }
              }}>
                Continue to secure login
              </button>
            </div>
          </div>
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor label="Brand" value={t.palette}
                    options={[
                      ["#3D1C08", "#F8F5F1", "#B8945A"],  /* default cocoa */
                      ["#2B1306", "#F8F5F1", "#B8945A"],  /* deeper cocoa */
                      ["#1F1208", "#FAF7F1", "#C9A871"],  /* near-black + brass */
                      ["#3D1C08", "#FFFFFF", "#2E4A35"],  /* white + deep green accent */
                      ["#23150B", "#EFE7DA", "#A8895A"],  /* duskier */
                    ]}
                    onChange={(v) => setTweak({ palette: v, accent: v[2] })} />
        <TweakSection label="Density" />
        <TweakRadio label="Layout" value={t.density}
                    options={["compact", "regular", "comfy"]}
                    onChange={(v) => setTweak("density", v)} />
        <TweakSection label="Imagery" />
        <TweakToggle label="Cocoa pod motifs" value={t.showPodMotifs}
                     onChange={(v) => setTweak("showPodMotifs", v)} />
        <TweakSection label="Jump to" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <TweakButton label="Overview"  secondary onClick={() => go("overview")} />
          <TweakButton label="Origin"    secondary onClick={() => go("origin")} />
          <TweakButton label="Financing" secondary onClick={() => go("financing")} />
          <TweakButton label="Track"     secondary onClick={() => go("track")} />
        </div>
      </TweaksPanel>
    </div>
  );
}

function SplashIntro() {
  const [phase, setPhase] = React.useState("in");
  React.useEffect(() => {
    // Replays on every mount — caller controls re-mount via `key`.
    const t1 = setTimeout(() => setPhase("hold"), 1000);
    const t2 = setTimeout(() => setPhase("out"),  2400);
    const t3 = setTimeout(() => setPhase("gone"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  if (phase === "gone") return null;
  return (
    <div className={`ce-splash ce-splash-${phase}`} aria-hidden="true">
      <div className="ce-splash-burst" />
      <div className="ce-splash-ring r1" />
      <div className="ce-splash-ring r2" />
      <div className="ce-splash-ring r3" />
      <div className="ce-splash-particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ "--a": `${(360 / 14) * i}deg` }} />
        ))}
      </div>
      <div className="ce-splash-logo">
        <Logo tone="dark" height={120} />
      </div>
    </div>
  );
}

function Footer({ go, openForm }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="brand" style={{ marginBottom: 32 }}>
              <Logo tone="dark" height={52} />
            </div>
            <div className="footer-statement">
              Control the <strong>origin</strong>.<br />
              Own the <strong>supply</strong>.
            </div>
            <p style={{ marginTop: 24, fontSize: 13, color: "rgba(248,245,241,.6)", maxWidth: "44ch", lineHeight: 1.6 }}>
              Cocoa Empire Ltd. operates the institutional origin
              platform for Ugandan cocoa. Bonded warehouse, Kampala. Field
              operations across Bundibugyo, Mukono, Hoima, Luwero and Jinja.
            </p>
          </div>

          <div>
            <h5>Platform</h5>
            <ul>
              <li><a onClick={() => go("overview")}>Origin Platform</a></li>
              <li><a onClick={() => go("supply")}>Supply Network</a></li>
              <li><a onClick={() => go("buyers")}>Buyer Channels</a></li>
              <li><a onClick={() => go("impact")}>10% Impact</a></li>
            </ul>
          </div>

          <div>
            <h5>Investors</h5>
            <ul>
              <li><a onClick={() => openForm && openForm("origin")}>Partner with us</a></li>
              <li><a onClick={() => openForm && openForm("capital")}>Request data room</a></li>
              <li><a onClick={() => openForm && openForm("capital")}>Invest with us</a></li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@cocoaempire.com">hello@cocoaempire.com</a></li>
              <li><a href="mailto:ivan@cocoaempire.com">ivan@cocoaempire.com</a></li>
              <li><a href="https://wa.me/3197010281250" target="_blank" rel="noopener noreferrer">+31 9701 0281 250</a></li>
            </ul>
            <div className="footer-social">
              <a className="footer-social-btn" href="https://www.linkedin.com/company/cocoaempire" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18H5.67V9.67h2.67V18zm-1.34-9.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zM18.33 18h-2.66v-4.06c0-.97-.02-2.21-1.35-2.21-1.35 0-1.56 1.05-1.56 2.14V18h-2.66V9.67h2.55v1.14h.04c.36-.67 1.22-1.38 2.52-1.38 2.69 0 3.19 1.77 3.19 4.08V18z"/></svg>
              </a>
              <a className="footer-social-btn" href="https://www.instagram.com/cocoa.empire.uganda" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4.5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a className="footer-social-btn" href="mailto:hello@cocoaempire.com" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M3 7.5l9 6 9-6" />
                </svg>
              </a>
              <a className="footer-social-btn footer-social-wa" href="https://wa.me/3197010281250" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M16 .5C7.5.5.5 7.5.5 16c0 2.8.8 5.5 2.2 7.9L.5 31.5l7.8-2.1c2.3 1.2 4.9 1.9 7.7 1.9 8.5 0 15.5-7 15.5-15.5S24.5.5 16 .5zm0 28.3c-2.5 0-4.9-.7-7-1.9l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.5 20.9 2.7 18.5 2.7 16 2.7 8.7 8.7 2.7 16 2.7s13.3 6 13.3 13.3-6 13.1-13.3 13.1zm7.5-9.9c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.7.2-.2.4-.4.5-.6.2-.2.2-.4.4-.6.1-.3 0-.5 0-.7 0-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.5-.3.4-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.4 3.7 5.8 5.2.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Cocoa Empire Ltd. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a onClick={() => go("legal")}>Legal</a>
            <a onClick={() => go("privacy")}>Privacy</a>
            <a onClick={() => go("disclosures")}>Disclosures</a>
          </div>
        </div>

        <div className="footer-restricted">
          <strong>Restricted offering.</strong> This website does not constitute
          an offer of securities or a public solicitation. Any capital partnership
          referred to here is a private, by-invitation arrangement between Cocoa
          Empire and qualified / professional investors only, governed by
          separate written agreements and applicable KYC/AML procedures. Not
          available to U.S. Persons (as defined under Regulation S of the U.S.
          Securities Act) or in any jurisdiction where local registration would
          be required.
        </div>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
