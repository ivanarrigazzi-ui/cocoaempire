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
      <header className={`topbar ${onDark ? "on-dark" : ""}`}>
        <div className="topbar-inner">
          <div className="brand" onClick={() => go("overview")}>
            <Logo tone={onDark ? "dark" : "brown"} height={48} />
          </div>
          <nav className="nav">
            <button aria-current={screen === "overview"} onClick={() => go("overview")}>Origin Platform</button>
            <button aria-current={screen === "supply" || screen === "control" || screen === "origin"} onClick={() => go("supply")}>Supply Network</button>
            <button aria-current={screen === "buyers"} onClick={() => go("buyers")}>Buyer Channels</button>
            <button aria-current={screen === "impact"} onClick={() => go("impact")}>10% Impact</button>
            <button aria-current={screen === "financing"} className="nav-cta" onClick={() => go("financing")}>Invest with Us</button>
          </nav>
          <div className="topbar-actions">
            <button type="button" className="topbar-signin" onClick={() => setModal("signin")} aria-label="Sign in to private area">
              <svg className="lock" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="8" height="6" rx="1.5" />
                <path d="M5 6V4a2 2 0 014 0v2" />
              </svg>
              <span>Sign in</span>
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
      {modal === "signin"  && <SignInModal onClose={closeModal} />}

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
              <li><a href="tel:+256414000000">+256 414 000 000</a></li>
              <li>Plot 14, Yusuf Lule Road<br />Kampala, Uganda</li>
            </ul>
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
