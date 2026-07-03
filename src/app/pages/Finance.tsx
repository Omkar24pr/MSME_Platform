import { useState } from "react";
import { Link } from "react-router";

const PRIMARY = "#F97316";
const ACCENT = "#2563EB";
const GREEN = "#059669";
const PURPLE = "#7C3AED";

const HEADING_FONT = { fontFamily: "'Barlow Condensed', sans-serif" };
const BODY_FONT = { fontFamily: "'DM Sans', sans-serif" };

// ── Loan Marketplace data ────────────────────────────────────────────────────
const LOANS = [
  {
    id: 1,
    lender: "SIDBI",
    full: "SIDBI Business Loan",
    amount: "₹5L – ₹1Cr",
    rate: "8.5% p.a.",
    tenure: "1–7 yrs",
    fee: "1%",
    color: ACCENT,
  },
  {
    id: 2,
    lender: "LK",
    full: "Lendingkart MSME Loan",
    amount: "₹50K – ₹2Cr",
    rate: "12–24% p.a.",
    tenure: "1–36 months",
    fee: "2%",
    color: PRIMARY,
  },
  {
    id: 3,
    lender: "HDFC",
    full: "HDFC Bank MSME Loan",
    amount: "₹10L – ₹50L",
    rate: "9.75% p.a.",
    tenure: "1–5 yrs",
    fee: "0.5%",
    color: "#DC2626",
  },
  {
    id: 4,
    lender: "MUD",
    full: "MUDRA Tarun",
    amount: "Up to ₹10L",
    rate: "10.5% p.a.",
    tenure: "Up to 5 yrs",
    fee: "Nil",
    color: GREEN,
  },
  {
    id: 5,
    lender: "QC",
    full: "NBFC QuickCredit",
    amount: "₹1L – ₹25L",
    rate: "18% p.a.",
    tenure: "6–24 months",
    fee: "2.5%",
    color: PURPLE,
  },
  {
    id: 6,
    lender: "SI",
    full: "Startup India Seed Fund",
    amount: "₹20L",
    rate: "0% (Grant)",
    tenure: "N/A",
    fee: "Nil",
    color: "#0891B2",
  },
];

// ── Application Tracker data ─────────────────────────────────────────────────
const APPLICATIONS = [
  {
    type: "MSME Term Loan",
    lender: "SIDBI",
    date: "12 Jun 2025",
    amount: "₹15L",
    status: "Under Review",
    next: "Wait for lender call",
    statusColor: ACCENT,
  },
  {
    type: "Mudra Loan",
    lender: "SBI",
    date: "5 Jun 2025",
    amount: "₹8L",
    status: "Documents Required",
    next: "Upload ITR & bank statements",
    statusColor: "#D97706",
  },
  {
    type: "Startup India Seed Fund",
    lender: "DPIIT",
    date: "28 May 2025",
    amount: "₹20L",
    status: "Sanctioned",
    next: "Sign disbursement agreement",
    statusColor: GREEN,
  },
];

// ── Document list ────────────────────────────────────────────────────────────
const DOCS = [
  "GST Certificate",
  "PAN Card",
  "Bank Statements (6 months)",
  "ITR (2 years)",
  "Business Registration",
];

// ── EMI Calculator ────────────────────────────────────────────────────────────
function calcEMI(principal: number, annualRate: number, months: number) {
  if (months <= 0 || annualRate < 0 || principal <= 0) return null;
  if (annualRate === 0) {
    const emi = principal / months;
    return { emi, totalInterest: 0, total: principal };
  }
  const r = annualRate / 100 / 12;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = emi * months;
  return { emi, totalInterest: total - principal, total };
}

function fmt(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold mb-4 uppercase tracking-wide"
      style={{ ...HEADING_FONT, color: PRIMARY }}
    >
      {children}
    </h2>
  );
}

function EligibilityDashboard() {
  const [checked, setChecked] = useState(false);

  return (
    <section className="bg-white rounded-2xl shadow p-6 mb-8">
      <SectionTitle>Loan Eligibility Dashboard</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            Business Type
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" style={BODY_FONT}>
            <option>Sole Proprietorship</option>
            <option>Partnership</option>
            <option>Private Limited</option>
            <option>LLP</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            Annual Revenue
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" style={BODY_FONT}>
            <option>&lt;5L</option>
            <option>5–25L</option>
            <option>25L–1Cr</option>
            <option>&gt;1Cr</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            Years in Business
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" style={BODY_FONT}>
            <option>&lt;1 yr</option>
            <option>1–3 yrs</option>
            <option>3–5 yrs</option>
            <option>5+ yrs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            CIBIL Score
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" style={BODY_FONT}>
            <option>&lt;650</option>
            <option>650–750</option>
            <option>750+</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => setChecked(true)}
        className="px-6 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: PRIMARY, ...BODY_FONT }}
      >
        Check Eligibility
      </button>
      {checked && (
        <div className="flex flex-wrap gap-3 mt-5">
          {["MSME Term Loan: Eligible ✓", "Startup Loan: Eligible ✓", "Mudra Loan: Eligible ✓"].map((chip) => (
            <span
              key={chip}
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
              style={{ background: GREEN, ...BODY_FONT }}
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function LoanMarketplace() {
  return (
    <section className="mb-8">
      <SectionTitle>Loan Marketplace</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LOANS.map((loan) => (
          <div key={loan.id} className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: loan.color, ...HEADING_FONT }}
              >
                {loan.lender}
              </div>
              <span className="font-semibold text-gray-800 leading-tight" style={BODY_FONT}>
                {loan.full}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-600" style={BODY_FONT}>
              <span className="text-gray-400">Amount</span>
              <span className="font-medium text-gray-800">{loan.amount}</span>
              <span className="text-gray-400">Rate</span>
              <span className="font-medium text-gray-800">{loan.rate}</span>
              <span className="text-gray-400">Tenure</span>
              <span className="font-medium text-gray-800">{loan.tenure}</span>
              <span className="text-gray-400">Processing Fee</span>
              <span className="font-medium text-gray-800">{loan.fee}</span>
            </div>
            <div className="flex items-center gap-3 mt-auto pt-1">
              <button
                className="flex-1 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: PRIMARY, ...BODY_FONT }}
              >
                Apply Now
              </button>
              <button
                className="text-sm font-medium hover:underline"
                style={{ color: ACCENT, ...BODY_FONT }}
              >
                Calculate EMI
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(36);
  const [result, setResult] = useState<ReturnType<typeof calcEMI>>(null);

  const handleCalc = () => {
    setResult(calcEMI(principal, rate, months));
  };

  return (
    <section className="bg-white rounded-2xl shadow p-6 mb-8">
      <SectionTitle>EMI Calculator</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            Loan Amount (₹)
          </label>
          <input
            type="number"
            min={50000}
            max={5000000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            style={BODY_FONT}
          />
          <input
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full mt-2 accent-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            min={0}
            max={36}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            style={BODY_FONT}
          />
          <input
            type="range"
            min={0}
            max={36}
            step={0.25}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full mt-2 accent-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" style={BODY_FONT}>
            Tenure (months)
          </label>
          <input
            type="number"
            min={1}
            max={360}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            style={BODY_FONT}
          />
          <input
            type="range"
            min={1}
            max={360}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full mt-2 accent-orange-500"
          />
        </div>
      </div>
      <button
        onClick={handleCalc}
        className="px-6 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
        style={{ background: PRIMARY, ...BODY_FONT }}
      >
        Calculate EMI
      </button>
      {result && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Monthly EMI", value: `₹${fmt(result.emi)}`, color: PRIMARY },
            { label: "Total Interest", value: `₹${fmt(result.totalInterest)}`, color: "#D97706" },
            { label: "Total Amount", value: `₹${fmt(result.total)}`, color: ACCENT },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: `${item.color}14` }}>
              <p className="text-xs text-gray-500 mb-1" style={BODY_FONT}>{item.label}</p>
              <p className="text-2xl font-bold" style={{ color: item.color, ...HEADING_FONT }}>{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ApplicationTracker() {
  const statusBadge = (status: string, color: string) => (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap"
      style={{ background: color, ...BODY_FONT }}
    >
      {status}
    </span>
  );

  return (
    <section className="mb-8">
      <SectionTitle>Application Tracker</SectionTitle>
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm" style={BODY_FONT}>
          <thead>
            <tr className="border-b border-gray-100">
              {["Loan Type", "Lender", "Applied On", "Amount", "Status", "Next Step"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                  style={HEADING_FONT}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPLICATIONS.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-800">{row.type}</td>
                <td className="px-5 py-4 text-gray-600">{row.lender}</td>
                <td className="px-5 py-4 text-gray-500">{row.date}</td>
                <td className="px-5 py-4 font-semibold text-gray-800">{row.amount}</td>
                <td className="px-5 py-4">{statusBadge(row.status, row.statusColor)}</td>
                <td className="px-5 py-4 text-gray-500 text-xs">{row.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DocumentUpload() {
  return (
    <section className="mb-8">
      <SectionTitle>Document Upload</SectionTitle>
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white">
        <p className="text-sm text-gray-500 mb-5" style={BODY_FONT}>
          Upload the required documents to speed up your loan application process.
        </p>
        <div className="flex flex-col gap-3">
          {DOCS.map((doc) => (
            <div key={doc} className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700" style={BODY_FONT}>{doc}</span>
              </div>
              <button
                className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                style={BODY_FONT}
              >
                Upload
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Finance() {
  return (
    <div className="min-h-screen bg-gray-50" style={BODY_FONT}>
      {/* Page Header */}
      <div
        className="relative px-6 py-10"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #EA580C 100%)` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide"
                style={HEADING_FONT}
              >
                Finance & Loans
              </h1>
              <p className="text-orange-100 mt-2 text-sm" style={BODY_FONT}>
                MSME Growth Hub · Loan Marketplace · EMI Calculator · Application Tracker
              </p>
            </div>
            <Link
              to="/"
              className="shrink-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
              style={BODY_FONT}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <EligibilityDashboard />
        <LoanMarketplace />
        <EMICalculator />
        <ApplicationTracker />
        <DocumentUpload />
      </main>
    </div>
  );
}
