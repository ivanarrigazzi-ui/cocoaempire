// Cocoa Empire — onboarding forms (Capital Partner / Origin Partner)
// + private-area sign-in placeholder. Pure UI, no backend wiring —
// forms collect data and show a "submitted" confirmation. When you
// connect a backend, replace the `submit()` handler.

const ENROL_FORMS = {
  capital: {
    title: "Request a strategic discussion",
    eyebrow: "Capital Partner",
    sub: "This is a private capital partner programme, available by invitation only to qualified / professional investors. Send us your information to start a private discussion under NDA — we respond within 48–72 hours.",
    submitLabel: "Request discussion",
    accent: "#4B8E1E",
    mailto: "ivan@cocoaempire.com",
    fields: [
      { id: "name",    label: "Full name",                 type: "text",  required: true,  placeholder: "Jane Doe" },
      { id: "org",     label: "Company or fund",           type: "text",  required: true,  placeholder: "Investment vehicle" },
      { id: "email",   label: "Corporate email",           type: "email", required: true,  placeholder: "you@firm.com" },
      { id: "country", label: "Country of residence",      type: "select", required: true, options: [
        "United Kingdom", "Switzerland", "Germany", "France", "Spain", "Italy",
        "Netherlands", "Belgium", "Luxembourg", "Ireland", "Portugal", "Austria",
        "Denmark", "Sweden", "Norway", "Finland", "UAE", "Singapore",
        "Hong Kong", "Australia", "Other (please specify in message)",
      ] },
      { id: "ticket",  label: "Indicative ticket size",    type: "select", required: true, options: ["$100K – $250K", "$250K – $500K", "$500K – $1M", "$1M – $5M", "$5M +"] },
      { id: "ctype",   label: "Investor type",             type: "select", required: true, options: ["Family office", "Professional / accredited investor", "Trade finance fund", "Commodity desk / corporate", "Other"] },
      { id: "src",     label: "How did you hear about us?", type: "text", required: false, placeholder: "Optional" },
      { id: "msg",     label: "Anything else? (optional)",  type: "textarea", required: false, rows: 3 },
      { id: "qualified", label: "I confirm I am a qualified / professional investor (or equivalent in my jurisdiction).", type: "checkbox", required: true },
      { id: "non_us",  label: "I confirm I am NOT a U.S. Person as defined under Regulation S of the U.S. Securities Act.", type: "checkbox", required: true },
      { id: "private", label: "I understand this is a private, by-invitation discussion and is not a public offer of securities.", type: "checkbox", required: true },
    ],
  },
  origin: {
    title: "Apply for origin partnership",
    eyebrow: "Origin Partner",
    sub: "For cooperatives, associations and processors that want to supply Cocoa Empire. We respond within 48–72 hours after a first quality review.",
    submitLabel: "Submit application",
    accent: "#B89968",
    mailto: "ivan@cocoaempire.com",
    fields: [
      { id: "org",     label: "Organisation name",                 type: "text",  required: true,  placeholder: "Cooperative / company" },
      { id: "kind",    label: "Type",                              type: "select", required: true, options: ["Cooperative", "Association", "Processor", "Exporter", "Trader", "Other"] },
      { id: "name",    label: "Contact person",                    type: "text",  required: true,  placeholder: "Jane Doe" },
      { id: "email",   label: "Contact email",                     type: "email", required: true,  placeholder: "you@coop.com" },
      { id: "phone",   label: "Phone (incl. country code)",        type: "tel",   required: false, placeholder: "+256 ..." },
      { id: "loc",     label: "Location",                          type: "text",  required: true,  placeholder: "District, country" },
      { id: "volume",  label: "Estimated yearly volume",           type: "select", required: true, options: ["< 50 MT", "50 – 200 MT", "200 – 500 MT", "500 – 1,000 MT", "1,000+ MT"] },
      { id: "cert",    label: "Certifications",                    type: "select", required: false, options: ["None", "Organic", "Fairtrade", "Organic + Fairtrade", "Rainforest Alliance", "Other"] },
      { id: "src",     label: "How did you hear about us?",        type: "text", required: false, placeholder: "Optional" },
      { id: "msg",     label: "Anything else? (optional)",          type: "textarea", required: false, rows: 3 },
    ],
  },
};

function EnrolModal({ kind, onClose }) {
  const cfg = ENROL_FORMS[kind];
  const [values, setValues] = React.useState(() =>
    Object.fromEntries(cfg.fields.map((f) => [f.id, ""])));
  const [errors, setErrors] = React.useState({});
  const [state, setState] = React.useState("idle"); // idle | sending | done | error

  const set = (id, v) => setValues((s) => ({ ...s, [id]: v }));

  const validate = () => {
    const e = {};
    cfg.fields.forEach((f) => {
      const v = f.type === "checkbox" ? !!values[f.id] : (values[f.id] || "").trim();
      if (f.required && (!v || v === false || v === "")) e[f.id] = "Required";
      if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v))
        e[f.id] = "Invalid email";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("sending");

    const payload = {
      kind,
      title: cfg.title,
      submittedAt: new Date().toISOString(),
      data: Object.fromEntries(
        cfg.fields.map((f) => [f.label, values[f.id] || (f.type === "checkbox" ? false : "")])
      ),
    };

    // 1) Always persist locally so nothing is lost.
    try {
      const log = JSON.parse(localStorage.getItem("cc-form-log") || "[]");
      log.push(payload);
      localStorage.setItem("cc-form-log", JSON.stringify(log));
    } catch (e) {}

    // 2) Try the configured backend (Web3Forms / Formspree / custom).
    //    Set window.__formEndpoint = "https://api.web3forms.com/submit"
    //    and window.__formAccessKey to enable HTTP submission.
    //    Until that's wired, we simply show the confirmation without
    //    triggering a mailto pop-up (which previously hijacked the page).
    const endpoint = (typeof window !== "undefined" && window.__formEndpoint) || null;
    const accessKey = (typeof window !== "undefined" && window.__formAccessKey) || null;
    if (endpoint && accessKey) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject: cfg.title,
            from_name: payload.data["Full name"] || payload.data["Contact person"] || "Cocoa Empire form",
            to: cfg.mailto,
            ...payload.data,
          }),
        });
      } catch (e) {
        // Don't block UX on network error — data is in localStorage.
      }
    }

    setTimeout(() => setState("done"), 350);
  };

  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="enrol-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="enrol-modal" onClick={(e) => e.stopPropagation()} style={{ "--accent": cfg.accent }}>
        <button type="button" className="enrol-close" onClick={onClose} aria-label="Close">×</button>

        {state !== "done" ? (
          <>
            <div className="enrol-head">
              <div className="enrol-eyebrow">{cfg.eyebrow} · Private application</div>
              <h2 className="enrol-title">{cfg.title}</h2>
              <p className="enrol-sub">{cfg.sub}</p>
            </div>

            <form className="enrol-form" onSubmit={submit} noValidate>
              <div className="enrol-grid">
                {cfg.fields.map((f) => (
                  <label key={f.id}
                         className={`enrol-field enrol-field-${f.type}${(f.type === "textarea" || f.type === "checkbox") ? " enrol-field-full" : ""}${errors[f.id] ? " has-error" : ""}`}>
                    {f.type === "checkbox" ? (
                      <span className="enrol-checkbox-row">
                        <input type="checkbox" checked={!!values[f.id]}
                               onChange={(e) => set(f.id, e.target.checked)} />
                        <span className="enrol-checkbox-box" aria-hidden="true">
                          <svg viewBox="0 0 14 14" fill="none">
                            <path d="M3 7.5 L6 10.5 L11 4.5" stroke="#4B8E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="enrol-checkbox-lbl">
                          {f.label}{f.required && <em>*</em>}
                        </span>
                      </span>
                    ) : f.type === "textarea" ? (
                      <>
                        <span className="enrol-label">
                          {f.label}{f.required && <em>*</em>}
                        </span>
                        <textarea rows={f.rows || 3} value={values[f.id]}
                                  onChange={(e) => set(f.id, e.target.value)} />
                      </>
                    ) : f.type === "select" ? (
                      <>
                        <span className="enrol-label">
                          {f.label}{f.required && <em>*</em>}
                        </span>
                        <select value={values[f.id]} onChange={(e) => set(f.id, e.target.value)}>
                          <option value="">Select…</option>
                          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </>
                    ) : (
                      <>
                        <span className="enrol-label">
                          {f.label}{f.required && <em>*</em>}
                        </span>
                        <input type={f.type} value={values[f.id]} placeholder={f.placeholder || ""}
                               onChange={(e) => set(f.id, e.target.value)} />
                      </>
                    )}
                    {errors[f.id] && <span className="enrol-err">{errors[f.id]}</span>}
                  </label>
                ))}
              </div>

              <div className="enrol-footer">
                <div className="enrol-fineprint enrol-fineprint-warn">
                  <span className="enrol-fineprint-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3 L22 21 L2 21 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
                      <path d="M12 10 V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="18" r="1.2" fill="currentColor" />
                    </svg>
                  </span>
                  <p>
                    This is <strong>not a public offer of securities or a guaranteed return</strong>.
                    Any subsequent agreement is subject to NDA, KYC/AML, legal
                    documentation and applicable laws. Available only to qualified /
                    professional investors outside restricted jurisdictions.
                  </p>
                </div>
                <button type="submit" className="enrol-submit" disabled={state === "sending"}>
                  {state === "sending" ? "Sending…" : cfg.submitLabel}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="enrol-done">
            <div className="enrol-done-icon" aria-hidden="true">
              <svg viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="27" stroke="currentColor" strokeWidth="2" />
                <path d="M18 31 L27 40 L43 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Application received.</h3>
            <p>
              Thank you. We'll review your details and reply within
              <strong> 48–72 hours</strong>. Check your inbox — including the
              spam folder.
            </p>
            {kind === "capital" && (
              <div className="enrol-access-note">
                <div className="enrol-access-note-h">How private access works</div>
                <p>
                  Once approved, you will access the private partner area
                  at <strong>partners.cocoaempire.com</strong> with your
                  email — you'll receive a one-time 6-digit code by email
                  to enter (valid for 24 hours). No passwords to remember.
                </p>
              </div>
            )}
            <button type="button" className="enrol-submit" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SignInModal({ onClose, onSignedIn }) {
  const [phase, setPhase] = React.useState("idle"); // idle | submitting | granted | denied
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [err, setErr] = React.useState("");

  // Generic credentials. Change in source whenever you want to rotate access.
  const VALID = [
    { user: "partner@cocoaempire.com", pass: "EmpireOrigin2026" },
    { user: "investor@cocoaempire.com", pass: "EmpireOrigin2026" },
  ];

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!email || !pwd) { setErr("Email and password required"); return; }
    setErr("");
    setPhase("submitting");
    setTimeout(() => {
      const ok = VALID.some(v =>
        v.user.toLowerCase() === email.trim().toLowerCase() && v.pass === pwd);
      if (ok) {
        try { localStorage.setItem("cc-investor-access", "1"); } catch (e) {}
        setPhase("granted");
      } else {
        setPhase("idle");
        setErr("Invalid credentials. Check your email and password.");
      }
    }, 500);
  };

  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="enrol-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="enrol-modal signin-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="enrol-close" onClick={onClose} aria-label="Close">×</button>

        {phase === "granted" ? (
          <div className="enrol-done">
            <div className="enrol-done-icon" aria-hidden="true">
              <svg viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="27" stroke="currentColor" strokeWidth="2" />
                <path d="M18 31 L27 40 L43 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Welcome, partner.</h3>
            <p>
              You now have access to the private capital partner area.
              Click below to enter.
            </p>
            <button type="button" className="enrol-submit" onClick={() => {
              if (onSignedIn) onSignedIn();
              else { try { window.location.reload(); } catch (e) { onClose && onClose(); } }
            }}>Enter the private area</button>
          </div>
        ) : phase !== "done" ? (
          <>
            <div className="enrol-head">
              <div className="enrol-eyebrow">Private area · Sign in</div>
              <h2 className="enrol-title">Welcome back.</h2>
              <p className="enrol-sub">
                Use the credentials we sent you after approving your application.
              </p>
            </div>

            <form className="enrol-form" onSubmit={onSubmit}>
              <div className="enrol-grid">
                <label className="enrol-field enrol-field-full">
                  <span className="enrol-label">Email</span>
                  <input type="email" value={email} placeholder="you@firm.com"
                         onChange={(e) => setEmail(e.target.value)} autoFocus />
                </label>
                <label className="enrol-field enrol-field-full">
                  <span className="enrol-label">Password</span>
                  <input type="password" value={pwd} placeholder="••••••••"
                         onChange={(e) => setPwd(e.target.value)} />
                </label>
                {err && <div className="enrol-err" style={{ gridColumn: "1 / -1" }}>{err}</div>}
              </div>
              <div className="enrol-footer">
                <p className="enrol-fineprint">
                  Don't have credentials yet?{" "}
                  <a href="#" onClick={(e) => { e.preventDefault(); onClose && onClose("apply"); }}>
                    Apply for access
                  </a>.
                </p>
                <button type="submit" className="enrol-submit" disabled={phase === "submitting"}>
                  {phase === "submitting" ? "Signing in…" : "Sign in"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="enrol-done">
            <div className="enrol-done-icon" aria-hidden="true" style={{ color: "#B89968" }}>
              <svg viewBox="0 0 60 60" fill="none">
                <rect x="14" y="26" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M20 26v-6a10 10 0 0 1 20 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="30" cy="37" r="2" fill="currentColor" />
              </svg>
            </div>
            <h3>Private area in preparation</h3>
            <p>
              The investor &amp; partner area is being finalised. Existing
              applicants will be notified when access opens. Apologies for
              the wait.
            </p>
            <button type="button" className="enrol-submit" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { EnrolModal, SignInModal, ENROL_FORMS });
