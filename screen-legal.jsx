// Cocoa Empire — generic Legal, Privacy and Disclosures pages.
// Three lightweight screens accessible from the footer.

const LEGAL_PAGES = {
  legal: {
    title: "Legal",
    eyebrow: "Legal notice",
    sections: [
      {
        h: "1. Company information",
        p: "Cocoa Empire is the trade name of the operating platform behind the origin-control activity described on this website. The company maintains physical operating bases in cocoa-producing regions and may operate through one or more affiliated legal entities depending on jurisdiction. Specific corporate identifiers, registration numbers and tax information are made available under NDA in the data room.",
      },
      {
        h: "2. Website purpose",
        p: "This website is a corporate communication tool. It describes the platform's operating model, control protocol and capital partnership framework. It does not constitute an offer to sell, a solicitation to buy, an investment recommendation or a financial promotion in any jurisdiction.",
      },
      {
        h: "3. Trademarks and copyright",
        p: "All names, logos and visual assets shown on this website are the property of their respective owners. Logos of third-party companies are displayed for illustrative purposes only and do not imply endorsement, partnership or any contractual relationship unless explicitly stated. All content on this website is © Cocoa Empire and may not be reproduced without prior written consent.",
      },
      {
        h: "4. Forward-looking statements",
        p: "Some content on this website refers to objectives, ambitions, target capacities and indicative projections. These forward-looking statements are based on current assumptions and involve risks and uncertainties. Actual results may differ materially.",
      },
      {
        h: "5. Governing law",
        p: "Unless agreed otherwise in writing, any matter relating to this website or to any commercial or capital partnership entered into through it shall be governed by the applicable law of the jurisdiction in which the relevant Cocoa Empire entity is incorporated.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    eyebrow: "Privacy policy",
    sections: [
      {
        h: "1. Data we collect",
        p: "We collect the minimum information needed to respond to commercial enquiries, capital-partner conversations and operational requests. This typically includes name, business email, company, country and the content of the message you send us.",
      },
      {
        h: "2. How we use it",
        p: "Information is used to reply to enquiries, share documentation under NDA where appropriate, and maintain a record of communications with prospective partners and counterparties. We do not sell, rent or share personal data with unrelated third parties for marketing purposes.",
      },
      {
        h: "3. Retention",
        p: "Personal data is retained only as long as needed to fulfil the purpose for which it was collected and to comply with applicable legal and regulatory record-keeping obligations.",
      },
      {
        h: "4. Your rights",
        p: "Subject to applicable data-protection law, you can request access, rectification, erasure or restriction of your personal data, and object to certain processing. Requests should be sent to hello@cocoaempire.com.",
      },
      {
        h: "5. Cookies",
        p: "This website uses minimal first-party storage for navigation, analytics and to remember a user's session state (e.g. the in-page tweaks). It does not deploy third-party advertising trackers.",
      },
    ],
  },
  disclosures: {
    title: "Disclosures",
    eyebrow: "Disclosures",
    sections: [
      {
        h: "1. Not an offer of securities",
        p: "Nothing on this website constitutes an offer to sell, a solicitation to buy or a recommendation in respect of any security, fund, financial instrument or investment product. Where the website refers to capital partnerships, it does so in the context of bespoke, negotiated, private arrangements only.",
      },
      {
        h: "2. No guaranteed returns",
        p: "Any cycle simulator, indicative figure or scenario shown on this website is illustrative only. Actual outcomes depend on, among other things, buyer payment timing, cocoa availability, quality acceptance, currency, logistics and applicable risk controls. Past performance does not guarantee future results.",
      },
      {
        h: "3. Restrictions",
        p: "The information on this website is not directed at, and is not intended for distribution to or use by, any person or entity in any jurisdiction where such distribution or use would be contrary to local law. Capital partnership opportunities are only made available, where legally possible, to persons who satisfy the applicable eligibility, KYC and AML requirements.",
      },
      {
        h: "4. Confidentiality",
        p: "Specific buyer counterparties, contracts, transaction history and detailed operating metrics are confidential. They are disclosed only under NDA to prospective capital partners and to strategic buyers actively engaged in commercial discussions.",
      },
      {
        h: "5. Conditions of partnership",
        p: "Any capital partnership is subject to due diligence, KYC/AML, legal documentation, risk assessment and applicable laws.",
      },
    ],
  },
};

// Inline SVG line icons, currentColor.
const LEGAL_ICON = (kind) => {
  const props = { viewBox: "0 0 32 32", fill: "none", stroke: "currentColor",
                  strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const M = {
    company:    <><path d="M5 28V11l11-6 11 6v17" /><path d="M5 28h22" /><path d="M11 28v-8h4v8M17 28v-8h4v8" /></>,
    site:       <><rect x="3" y="6" width="26" height="20" rx="2" /><path d="M3 12h26" /><circle cx="7" cy="9" r=".8" fill="currentColor" /><circle cx="10" cy="9" r=".8" fill="currentColor" /></>,
    shield:     <><path d="M16 3l11 4v9c0 7-5 11-11 13-6-2-11-6-11-13V7l11-4z" /><path d="M11 17l4 4 7-9" /></>,
    forward:    <><path d="M5 17l7-7 5 5 10-10" /><path d="M21 5h7v7" /></>,
    law:        <><path d="M16 5v22" /><path d="M5 9h22" /><path d="M9 12l-3 7c.5 2 5 2 6 0l-3-7z" /><path d="M23 12l-3 7c.5 2 5 2 6 0l-3-7z" /><path d="M11 27h10" /></>,
    cookies:    <><circle cx="16" cy="16" r="11" /><circle cx="11" cy="13" r="1.4" fill="currentColor" /><circle cx="20" cy="11" r="1.2" fill="currentColor" /><circle cx="13" cy="20" r="1.2" fill="currentColor" /><circle cx="21" cy="19" r="1.4" fill="currentColor" /></>,
    rights:     <><circle cx="16" cy="11" r="5" /><path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9" /></>,
    use:        <><path d="M6 6h20v20H6z" /><path d="M6 11h20" /><path d="M11 17h10" /><path d="M11 21h6" /></>,
    retention:  <><circle cx="16" cy="16" r="11" /><path d="M16 9v7l5 3" /></>,
    no:         <><circle cx="16" cy="16" r="11" /><path d="M8 8l16 16" /></>,
    chart:      <><path d="M5 26h22" /><path d="M9 26v-7M15 26V12M21 26v-10M27 26V8" /></>,
    map:        <><path d="M12 3v22l8-3 8 3V6l-8-3-8 3z" /><path d="M20 3v22M12 6l8-3" /></>,
    lock:       <><rect x="6" y="14" width="20" height="14" rx="2" /><path d="M11 14V9a5 5 0 0 1 10 0v5" /><circle cx="16" cy="21" r="1.4" fill="currentColor" /></>,
    handshake:  <><path d="M3 14l4-4h6l4 4-4 4-3-3M29 14l-4-4h-6l-4 4 4 4 3-3M14 18l3 3 4-4" /></>,
  };
  return <svg {...props}>{M[kind]}</svg>;
};

const LEGAL_ICONS_BY_PAGE = {
  legal:       ["company", "site", "shield", "forward", "law"],
  privacy:     ["use", "chart", "retention", "rights", "cookies"],
  disclosures: ["no", "chart", "map", "lock", "handshake"],
};

function LegalPage({ slug, go }) {
  const page = LEGAL_PAGES[slug];
  if (!page) return null;
  return (
    <div className="view" data-screen-label={`Legal · ${page.title}`}>
      <section className="section legal-page legal-dark">
        <div className="container legal-container">
          {go && (
            <button type="button" className="legal-back" onClick={() => go("overview")}>
              <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Arrow /></span>
              <span>Back to platform</span>
            </button>
          )}
          <div className="legal-meta-row">
            <div className="legal-meta-k">{page.eyebrow}</div>
            <div className="legal-meta-k">Last updated — May 2026</div>
          </div>
          <h1 className="legal-h1">{page.title}</h1>
          <div className="legal-rule" aria-hidden="true" />
          <ol className="legal-list">
            {page.sections.map((s, i) => (
              <li key={i} className="legal-item">
                <div className="legal-item-n">{String(i + 1).padStart(2, "0")}</div>
                <div className="legal-item-body">
                  <h2>{s.h.replace(/^\d+\.\s*/, "")}</h2>
                  <p>{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="legal-foot">
            For any question related to this page, write to{" "}
            <a href="mailto:hello@cocoaempire.com">hello@cocoaempire.com</a>.
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { LegalPage, LEGAL_PAGES });
