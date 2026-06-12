// Cocoa Empire — operating data.
// Buyer identities anonymized at investor stage; disclosed under NDA in the data room.

const REGIONS = [
  { id: "bun", name: "Bundibugyo", x: 12, y: 38, hectares: "8,400 ha", coops: 6 },
  { id: "muk", name: "Mukono",     x: 70, y: 50, hectares: "5,200 ha", coops: 4 },
  { id: "hoi", name: "Hoima",      x: 30, y: 28, hectares: "3,100 ha", coops: 3 },
  { id: "lui", name: "Luwero",     x: 56, y: 44, hectares: "2,700 ha", coops: 2 },
  { id: "jin", name: "Jinja",      x: 78, y: 56, hectares: "1,900 ha", coops: 2 },
];

const LOTS = [
  { id: "CE-2611-A", region: "Bundibugyo", coop: "Semuliki Growers Union",     tonnes: 24.0, grade: "Grade 1",      moisture: "7.2%", status: "accepted",  buyer: "Buyer A · EU specialty chocolatier",   price: 3820, advanced: 0.78, ship: "2026-06-04" },
  { id: "CE-2611-B", region: "Bundibugyo", coop: "Semuliki Growers Union",     tonnes: 18.5, grade: "Grade 1",      moisture: "7.0%", status: "financing", buyer: "—",                                    price: 3820, advanced: 0.55, ship: "2026-06-18" },
  { id: "CE-2610-D", region: "Mukono",     coop: "Mukono Smallholder Coop",    tonnes: 32.4, grade: "Grade 1 Org.", moisture: "7.4%", status: "shipped",   buyer: "Buyer C · Swiss premium confectioner", price: 4150, advanced: 1.00, ship: "2026-05-22" },
  { id: "CE-2609-C", region: "Hoima",      coop: "Bunyoro Farmers Alliance",   tonnes: 14.2, grade: "Grade 2",      moisture: "7.6%", status: "intake",    buyer: "—",                                    price: 3540, advanced: 0.30, ship: "2026-07-02" },
  { id: "CE-2608-A", region: "Mukono",     coop: "Mukono Smallholder Coop",    tonnes: 27.8, grade: "Grade 1",      moisture: "7.1%", status: "settled",   buyer: "Buyer D · EU certified-supply trader", price: 3920, advanced: 1.00, ship: "2026-04-11" },
  { id: "CE-2611-C", region: "Luwero",     coop: "Luwero Producers SCC",       tonnes: 11.6, grade: "Grade 1",      moisture: "7.3%", status: "financing", buyer: "—",                                    price: 3820, advanced: 0.40, ship: "2026-06-28" },
  { id: "CE-2610-E", region: "Jinja",      coop: "Jinja Lakeside Coop",        tonnes:  9.4, grade: "Grade 2",      moisture: "7.8%", status: "accepted",  buyer: "Buyer F · Asian artisan importer",     price: 3540, advanced: 0.65, ship: "2026-06-12" },
  { id: "CE-2611-D", region: "Bundibugyo", coop: "Rwenzori Cocoa Trust",       tonnes: 22.1, grade: "Grade 1 Org.", moisture: "7.1%", status: "accepted",  buyer: "Buyer B · French grand cru chocolatier", price: 4150, advanced: 0.82, ship: "2026-06-09" },
  { id: "CE-2609-A", region: "Hoima",      coop: "Bunyoro Farmers Alliance",   tonnes: 16.8, grade: "Grade 1",      moisture: "7.4%", status: "shipped",   buyer: "Buyer E · US bean-to-bar maker",       price: 3820, advanced: 1.00, ship: "2026-05-30" },
  { id: "CE-2608-C", region: "Luwero",     coop: "Luwero Producers SCC",       tonnes: 13.2, grade: "Grade 2",      moisture: "7.7%", status: "settled",   buyer: "Buyer G · Global ingredient processor",price: 3540, advanced: 1.00, ship: "2026-04-22" },
];

const STATUS_LABEL = {
  intake:    "Intake",
  financing: "Financing",
  accepted:  "Accepted",
  shipped:   "Shipped",
  settled:   "Settled",
};

// Tracked shipment for the Track screen
const TRACK_LOT = "CE-2610-D";
const TRACK_STEPS = [
  { stage: "Intake",     status: "done",    when: "Apr 28, 2026 · 09:14 EAT", title: "Intake at Mukono receiving station",
    detail: "32.40 t received from Mukono Smallholder Coop. Producer manifests reconciled, traceability records linked to 412 individual farms." },
  { stage: "QC",         status: "done",    when: "Apr 30, 2026 · 16:02 EAT", title: "Quality control — Grade 1 Organic confirmed",
    detail: "Moisture 7.4%, defect count 4.1%, bean count 92/100g. Organic + Fairtrade chain-of-custody verified. EUDR due-diligence statement attached." },
  { stage: "Acceptance", status: "done",    when: "May 02, 2026 · 11:38 EAT", title: "Acceptance certificate issued",
    detail: "Lot CE-2610-D accepted into Cocoa Empire bonded warehouse, Bundibugyo. Title transferred to platform. Warehouse-controlled payment released to coop." },
  { stage: "Allocation", status: "done",    when: "May 06, 2026 · 14:20 EAT", title: "Allocated to Buyer C",
    detail: "Forward contract matched (Swiss premium confectioner — held under NDA). Letter of credit confirmed, shipping documents prepared." },
  { stage: "Export",     status: "current", when: "May 22, 2026 · 07:55 EAT", title: "Departed Mombasa — MV Atlantik Bridge",
    detail: "Container MSCU-744-188-7. ETA Antwerp June 18, 2026. Real-time GPS and container telemetry attached." },
  { stage: "Arrival",    status: "future",  when: "Est. Jun 18, 2026",         title: "Arrival at Antwerp",
    detail: "Discharge to bonded transit warehouse. Buyer inspection window opens on arrival." },
  { stage: "Settlement", status: "future",  when: "Est. Jun 25, 2026",         title: "Final settlement",
    detail: "Buyer payment in full. Producer and community-impact pool distributions complete per contract terms." },
];

// Buyer categories shown on Overview — institutional types, not company names.
const BUYER_TYPES = [
  "EU specialty chocolatier",
  "French grand-cru chocolatier",
  "Swiss premium confectioner",
  "EU certified-supply trader",
  "US bean-to-bar maker",
  "Asian artisan importer",
  "Global ingredient processor",
  "Nordic single-origin roaster",
];

// Brand marks shown in the "market" marquee on Overview. Real logos only.
const MARKET_BRANDS = [
  { type: "img", src: window.__images.brandCargill,  alt: "Cargill"  },
  { type: "img", src: window.__images.brandTouton,   alt: "Touton"   },
  { type: "img", src: window.__images.brandIcam,     alt: "ICAM"     },
  { type: "img", src: window.__images.brandMayora,   alt: "Mayora"   },
  { type: "img", src: window.__images.brandBohnkaf,  alt: "Bohnkaf"  },
  { type: "img", src: window.__images.brandEcom,     alt: "ECOM"     },
];

// Operating-flow cards (4 always-visible cards above the accordion).
const FLOW_CARDS = [
  { n: "01", k: "Receive", t: "Counted, weighed, recorded",
    body: "Every delivery is received into a controlled warehouse environment. Bags are counted, weighed and linked to a farmer, cooperative or approved supply record." },
  { n: "02", k: "Verify",  t: "Quality, moisture & EUDR checks",
    body: "Each lot is reviewed for moisture, grade, bean count, certification status, documentation and EUDR readiness before acceptance." },
  { n: "03", k: "Control", t: "Approval before payment",
    body: "Payment is triggered only after cocoa is physically received, inspected and approved under Cocoa Empire\u2019s warehouse-control protocol." },
  { n: "04", k: "Execute", t: "Load, document, settle",
    body: "Approved cocoa is matched to buyer demand, loaded, sealed, documented and moved through a structured buyer payment cycle." },
];

// Detailed-control accordion items.
const FLOW_ITEMS = [
  {
    n: "01", header: "Farmer & Partner Pre-Screening",
    title: "Approved farmers, partners and supply zones",
    explain: "Before cocoa enters the platform, Cocoa Empire works through approved farmer groups, cooperatives and origin partners. Supply is pre-screened for origin reliability, certification potential, community alignment and compliance readiness.",
    controls: ["Farmer records", "Approved sourcing zones", "Cooperative / partner validation", "Organic and Fairtrade potential", "EUDR readiness screening"],
    risks: "Unreliable supply, weak traceability, non-compliant sourcing and supplier fraud.",
  },
  {
    n: "02", header: "Warehouse Intake",
    title: "Every bag counted, weighed and recorded",
    explain: "Cocoa is received into a controlled warehouse environment. Each delivery is logged with bag count, gross weight, net weight, supplier identity, origin data and batch reference.",
    controls: ["Bag count", "Weight record", "Supplier ID", "Batch number", "Origin record", "Intake report"],
    risks: "Weight mismatch, undocumented origin, inventory confusion and fraud risk.",
  },
  {
    n: "03", header: "Quality Verification",
    title: "Moisture, grade and quality checked before acceptance",
    explain: "Each lot is checked before payment. Cocoa is reviewed for moisture, grade, bean count, visual defects, fermentation quality and export suitability. Non-compliant lots can be rejected before capital is deployed.",
    controls: ["Moisture testing", "Grade assessment", "Bean count", "Visual inspection", "Lot segregation", "Reject-before-payment protocol"],
    risks: "Buyer claims, quality rejection, pricing penalties, shipment delays and quality erosion.",
  },
  {
    n: "04", header: "EUDR & Certification Control",
    title: "Compliance built before shipment",
    explain: "The platform verifies whether cocoa is conventional, organic, Fairtrade or in transition. Each accepted lot is linked to the relevant documentation pathway, supporting traceability, chain of custody and EUDR readiness.",
    controls: ["Farmer records", "Certification status", "Batch traceability", "Chain of custody", "EUDR documentation pathway", "Approved sourcing areas"],
    risks: "Compliance gaps, certification contamination, weak European market access and documentation failure.",
  },
  {
    n: "05", header: "Independent Inspection",
    title: "External validation before capital exposure",
    explain: "Where required, third-party inspectors or collateral managers validate quantity, quality, sampling and warehouse conditions before payment, shipment or financing confirmation.",
    controls: ["Independent inspection", "Sampling", "Formal report", "Warehouse verification", "Quantity confirmation", "Collateral confirmation"],
    risks: "Verification risk, lender uncertainty, inventory disputes and buyer confidence risk.",
  },
  {
    n: "06", header: "Custody & Stock Control",
    title: "Accepted cocoa remains under controlled custody",
    explain: "Once approved, cocoa is stored under controlled access and monitored until loading. Inventory is segregated by batch, quality, certification status and buyer allocation.",
    controls: ["Restricted access", "Stock ledger", "Batch segregation", "Security protocol", "Insurance pathway", "Inventory reporting"],
    risks: "Loss, theft, substitution, quality mixing and operational negligence.",
  },
  {
    n: "07", header: "Payment After Approval",
    title: "No approval. No payment.",
    explain: "Supplier payment is triggered only after cocoa has been received, weighed, inspected and approved. This is the core risk-control point of the model.",
    controls: ["QC approval", "Intake report", "Documentation check", "Payment authorization", "Supplier confirmation", "Warehouse-controlled release"],
    risks: "Prepayment risk, unsecured crop finance, supplier disputes and cash leakage.",
    pull:  "We do not pay for cocoa in the field. We pay only for cocoa accepted under our control.",
  },
  {
    n: "08", header: "Loading, Sealing & Dispatch",
    title: "Every container. Every seal. Every shipment.",
    explain: "Approved cocoa is loaded under documented conditions. Each container is linked to specific lots, buyer contract, seal number, container number, loading report and shipment record.",
    controls: ["Loading report", "Container number", "Seal number", "Photos", "Weight record", "Buyer contract reference", "Lot allocation"],
    risks: "Tampering, substitution, post-loading disputes, shipment mismatch and buyer claims.",
  },
  {
    n: "09", header: "Export Documentation",
    title: "Documentation secures payment",
    explain: "Export documentation is prepared and matched to buyer requirements, including invoice, packing list, bill of lading, certificate of origin, certification documents and shipment records.",
    controls: ["Commercial invoice", "Packing list", "Bill of lading", "Certificate of origin", "Organic / Fairtrade documents", "EUDR pack where applicable", "Shipment file"],
    risks: "Documentary risk, payment delays, buyer rejection and compliance failure.",
  },
  {
    n: "10", header: "Buyer Payment Cycle",
    title: "Structured payments. Controlled cash cycle.",
    explain: "Buyer payments are structured around clear milestones such as warehouse approval or loading advance, CAD against documents and final payment on arrival or settlement.",
    controls: ["Advance payment", "CAD payment", "Final settlement", "Receivables tracking", "Buyer payment calendar", "Cash collection report"],
    risks: "Counterparty risk, payment delay, cash-cycle uncertainty and working capital pressure.",
  },
  {
    n: "11", header: "Waterfall Discipline",
    title: "Capital protected before reserves are released",
    explain: "Incoming buyer payments first replenish working capital, then cover operating costs, then reserve cash for growth, certification, farmer support and reinvestment.",
    controls: ["Capital repayment", "Operating cost coverage", "Growth reserve", "Certification reserve", "Farmer support reserve", "Impact allocation"],
    risks: "Cash diversion, uncontrolled growth, liquidity stress and weak financial discipline.",
  },
];

// "Origin Control in Numbers" — carousel cards.
const CONTROL_METRICS = [
  { num: 4370,   lbl: "Direct farmers in the platform",                       animated: true, iconKey: "farmers" },
  { num: 890,    lbl: "Organic + Fairtrade certified farmers",                animated: true, iconKey: "certified" },
  { num: 5120,   lbl: "Direct volume · MT",                                   animated: true, iconKey: "warehouse" },
  { num: 4600,   lbl: "Indirect volume · partnership associations · MT",       animated: true, iconKey: "network" },
  { num: "800",  unit: "MT/mo",  lbl: "Main warehouse handling capacity",     iconKey: "warehouse" },
  { num: "200",  unit: "MT/wk",  lbl: "Rotating operational capacity",        iconKey: "rotate" },
  { num: "10",   unit: "%",      lbl: "Of annual profit to farmer community programmes", iconKey: "community" },
];

// "Infrastructure at Origin" cards — Bundibugyo base.
const INFRA = [
  { k: "Operating base",      v: "Bundibugyo",        body: "Physical origin base in one of Uganda's premier cocoa regions, on the Semuliki corridor." },
  { k: "Main warehouse",      v: "800 MT/mo",         body: "Operational handling capacity through weekly stock rotation. Bonded, controlled access." },
  { k: "Weekly rotation",     v: "200 MT/wk",         body: "Throughput per week — intake, QC, dispatch — cycles cleanly without inventory build-up." },
  { k: "Partner network",     v: "Coop loading",      body: "Additional loading coordinated through partner and cooperative warehouses as volumes scale." },
  { k: "Drying",              v: "Solar racks",       body: "Controlled solar drying racks on-site. Moisture targets met before grading." },
  { k: "Moisture control",    v: "Calibrated meters", body: "Calibrated digital moisture meters on every intake batch." },
  { k: "Weighing",            v: "Calibrated scales",  body: "Calibrated platform scales reconciled to producer manifests and logged to the platform ledger at every intake." },
  { k: "Quality control",     v: "QC desk",           body: "Dedicated quality-control desk: grade, defect count, bean count, certification chain." },
  { k: "Documentation",       v: "Expert oversight",  body: "On-site specialist team controlling quality records, logistics paperwork, EUDR due-diligence statements and buyer-ready documentation — every lot, every shipment." },
];

// Team — the operating crew. Placeholder roster of ~15 people; real names
// and photos to be swapped in by the operator. Order: leadership first,
// then operations, then ground team.
const TEAM = [
  { name: "Ivan Sergi",          role: "Co-founder",                       location: "Kampala",     squad: "Leadership" },
  { name: "Ernest Frank",        role: "Co-founder",                       location: "Kampala",     squad: "Leadership" },
  { name: "Lazarous Mwesigwa",   role: "Co-CEO",                           location: "Kampala",     squad: "Leadership" },
  { name: "Apollo Tumusiime",    role: "Co-CEO",                           location: "Bundibugyo",  squad: "Leadership" },
  { name: "Asha Nakimera",       role: "Head of Quality",                  location: "Bundibugyo",  squad: "Operations" },
  { name: "Patrick Bwambale",    role: "Head of Operations",               location: "Bundibugyo",  squad: "Operations" },
  { name: "Mariam Babirye",      role: "Head of Finance",                  location: "Kampala",     squad: "Operations" },
  { name: "Daniel Wanyama",      role: "Warehouse Manager",                location: "Bundibugyo",  squad: "Operations" },
  { name: "Esther Nalubega",     role: "Documentation Lead",               location: "Kampala",     squad: "Operations" },
  { name: "Joseph Kakuru",       role: "Sourcing Lead",                    location: "Bundibugyo",  squad: "Field"      },
  { name: "Grace Ainembabazi",   role: "Agronomy Lead",                    location: "Bundibugyo",  squad: "Field"      },
  { name: "Moses Tibenkana",     role: "Field Officer · Bundibugyo",       location: "Bundibugyo",  squad: "Field"      },
  { name: "Florence Akello",     role: "Field Officer · Mukono / Luwero",  location: "Mukono",      squad: "Field"      },
  { name: "Samuel Okwir",        role: "QC Technician",                    location: "Bundibugyo",  squad: "Field"      },
  { name: "Beatrice Namuli",     role: "Community Liaison",                location: "Bundibugyo",  squad: "Field"      },
];

// Loading-process photo gallery — 20 stages from intake to seal.
const GALLERY_STEPS = [
  { n: "01", t: "Truck arrives at the warehouse" },
  { n: "02", t: "Stock floor at intake" },
  { n: "03", t: "Bagging and weighing under supervision" },
  { n: "04", t: "Cutting test — bean-by-bean quality" },
  { n: "05", t: "QC inspection on filled bags" },
  { n: "06", t: "Sealing accepted intake bags" },
  { n: "07", t: "Container positioned at the loading dock" },
  { n: "08", t: "Container lined for export · clean & sealed" },
  { n: "09", t: "Bags loaded into the container" },
  { n: "10", t: "Stowage complete · final check inside" },
  { n: "11", t: "Container closed and locked" },
  { n: "12", t: "SGS seal applied · number logged" },
  { n: "13", t: "Bill of Lading prepared" },
  { n: "14", t: "Documentation pack assembled" },
  { n: "15", t: "Buyer paperwork dispatched" },
  { n: "16", t: "Truck leaves for the port" },
  { n: "17", t: "Container handed to carrier" },
  { n: "18", t: "Export clearance completed" },
  { n: "19", t: "Departure for port of export" },
  { n: "20", t: "Settlement on arrival" },
];

Object.assign(window, {
  REGIONS, LOTS, STATUS_LABEL, TRACK_LOT, TRACK_STEPS,
  BUYER_TYPES, MARKET_BRANDS, CONTROL_METRICS, INFRA, TEAM, GALLERY_STEPS,
  FLOW_CARDS, FLOW_ITEMS,
});
