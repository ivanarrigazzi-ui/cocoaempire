// Cocoa Empire — Investor FAQ (private area only).
// Accordion of the questions capital partners ask most. Styled in the
// site palette (cocoa / gold / green, Raleway). Mounted only inside the
// gated private screens.

const FAQ_DATA = [
  ["What exactly am I funding?",
   "Short-term working capital against <b>organic and Fair Trade cocoa that already exists</b> — received, inspected and independently verified in the warehouse, and tied to a specific buyer contract. Your capital finances inventory that is on its way to a confirmed buyer, not speculative purchases. This is post-procurement, inventory-backed financing: funds are deployed only against confirmed collateral."],

  ["How does the return work?",
   "Capital partners are offered <b>3% gross per completed trade cycle</b>, paid as the buyer settles. The average cycle observed over recent months is around <b>45 days</b>, so capital can rotate roughly eight times a year (an indicative ~24% gross in the base case). After each cycle you can recycle your capital into the next lot or withdraw it. Returns are indicative, not guaranteed — see the notice below."],

  ["What secures my capital?",
   "Physical cocoa inventory acts as collateral. Quantity, quality and existence are confirmed by <b>accredited third-party inspectors</b> (e.g. SGS, Control Union) and the goods are held in controlled, secured warehousing. Repayment is structured as Cash-Against-Documents and ordered through a waterfall in which the <b>lender is repaid first</b> — principal, then fees — before any margin is released to the operator."],

  ["Is my capital ever deployed before the goods exist?",
   "No. Funds release <b>only after</b> inventory has been received, inspected and third-party verified, and recorded as eligible collateral. There are no advance payments to suppliers and no unsecured exposure to goods that don't yet exist. This removes prepayment and misuse-of-funds risk from your side of the transaction."],

  ["What happens if a buyer doesn't pay?",
   "Buyer payments are structured against shipment milestones — for example <b>25% on warehouse approval, 65% CAD at sight against export documents, 10% on delivery</b> (an alternative 50/40/10 structure is also used). A large share is therefore secured at or around shipment through documents, the goods stay controlled until paid, and the lender sits first in the repayment waterfall. This materially reduces counterparty risk — it does not remove it entirely."],

  ["When and how am I repaid?",
   "Directly from the buyer's settlement. As payments arrive, the waterfall pays <b>lender principal first, then interest and fees</b>, and only the residual margin flows to the operator afterwards. The average cash cycle for cocoa is roughly three weeks from disbursement to full repayment."],

  ["What are the main risks, and how are they controlled?",
   "Each stage of the trade has a dedicated control: <b>field pre-screening</b> (quality), <b>warehouse intake and logging</b> (traceability and fraud), <b>standardised QA</b> (rejection and pricing), <b>independent inspection</b> (verification), <b>secured custody and insurance</b> (theft and loss), and <b>full export documentation</b> (documentary risk). The detail sits in our Operational Flow &amp; Risk Control material, available on request."],

  ["What's the minimum, and how flexible is it?",
   "Tickets start at <b>USD 100,000</b>, adjustable in USD 50,000 steps, up to around USD 1,000,000. You can participate in a single cycle or roll continuously, and recycle capital at your option after each completed cycle."],

  ["Why do the margins hold up?",
   "Because the programme finances <b>only organic and Fair Trade cocoa</b>, which carries a structural premium over conventional. That premium, combined with origin control and a short cash cycle, is what supports the per-cycle return rather than relying on price speculation."],

  ["Are the returns guaranteed?",
   "No. The figures shown are <b>indicative and gross</b>; actual outcomes depend on completed cycles, deal flow and successful settlement, and your capital is at risk. The structure — collateral, independent verification, CAD terms and a lender-first waterfall — is built to <b>reduce</b> risk, not to eliminate it. Please read the notice below and take your own advice."],
];

function FaqScreen({ go, openForm }) {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="view faq-screen" data-screen-label="05 Investor FAQ · private">
      <section className="section faq-section">
        <div className="container faq-wrap">

          <div className="faq-head">
            <div className="eyebrow"><span>Private investor area · FAQ</span></div>
            <h1 className="faq-title">
              Before you commit <span className="faq-title-green">capital.</span>
            </h1>
            <p className="faq-lead">
              The questions capital partners ask most often, answered from the
              risk-control side of the trade. Short cycles, physical collateral,
              <strong> lender repaid first.</strong>
            </p>
          </div>

          <div className="faq-list">
            {FAQ_DATA.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button type="button" className="faq-q"
                          aria-expanded={isOpen}
                          onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="faq-q-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q-text">{q}</span>
                    <span className="faq-q-icon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: isOpen ? "500px" : "0" }}>
                    <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: a }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-note">
            <span className="faq-note-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3.5L21.5 20H2.5L12 3.5z" />
                <path d="M12 10v4.5" /><circle cx="12" cy="16.8" r="0.7" fill="currentColor" />
              </svg>
            </span>
            <div>
              <strong>Important notice</strong>
              This page is shared privately with approved contacts for information only. It is not
              an offer, solicitation or financial advice, and may not be available in every
              jurisdiction. All figures are indicative and gross of fees, FX and any losses — they
              are not guaranteed. Trade finance carries risk and your capital may be at risk. The
              controls described reduce risk; they do not remove it. Prospective partners should take
              their own independent legal, tax and financial advice before participating.
            </div>
          </div>

          <div className="faq-contact">
            <span>Still have questions? Speak with us directly.</span>
            <button type="button" className="btn primary invest-btn-primary"
                    onClick={() => openForm && openForm("capital")}>
              <span>Message the team</span><Arrow />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

Object.assign(window, { FaqScreen, FAQ_DATA });
