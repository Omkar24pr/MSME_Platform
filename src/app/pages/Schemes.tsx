import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, Clock, FileText, ChevronRight } from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

type SchemeStatus = "Open" | "Closing Soon";

interface Scheme {
  id: number;
  name: string;
  body: string;
  tag: string;
  tagColor: string;
  description: string;
  benefit: string;
  eligibility: string[];
  status: SchemeStatus;
}

const governmentSchemes: Scheme[] = [
  {
    id: 1,
    name: "SIDBI MSME Loan Scheme",
    body: "Ministry of MSME",
    tag: "Loan",
    tagColor: "bg-blue-100 text-blue-700",
    description:
      "Collateral-backed term loans and working capital finance for micro, small, and medium enterprises through SIDBI's direct and indirect lending channels.",
    benefit: "Up to ₹1 Cr at 7.5% p.a.",
    eligibility: [
      "Registered MSME with Udyam certificate",
      "Minimum 2 years of business operation",
      "Satisfactory credit history (CIBIL 650+)",
    ],
    status: "Open",
  },
  {
    id: 2,
    name: "PM Vishwakarma Scheme",
    body: "Ministry of Skill Development",
    tag: "Skill + Loan",
    tagColor: "bg-purple-100 text-purple-700",
    description:
      "End-to-end support for traditional artisans and craftspeople — skill training, modern toolkits, digital payments, and collateral-free credit access.",
    benefit: "₹3L collateral-free loan + skill training",
    eligibility: [
      "Artisan or craftsperson in 18 listed trades",
      "Working with hands/tools",
      "Not a GST taxpayer (micro level)",
    ],
    status: "Open",
  },
  {
    id: 3,
    name: "Credit Guarantee Fund Scheme (CGTMSE)",
    body: "SIDBI / Ministry of MSME",
    tag: "Credit Guarantee",
    tagColor: "bg-teal-100 text-teal-700",
    description:
      "Provides collateral-free credit to micro and small enterprises by guaranteeing the lending risk for member lending institutions across India.",
    benefit: "75–85% guarantee on loans up to ₹2 Cr",
    eligibility: [
      "Micro or Small Enterprise (not Medium)",
      "Loan from a registered MLI (bank/NBFC)",
      "No existing collateral or third-party guarantee",
    ],
    status: "Open",
  },
  {
    id: 4,
    name: "MUDRA Loan",
    body: "RBI / MUDRA Ltd",
    tag: "Micro Loan",
    tagColor: "bg-orange-100 text-orange-700",
    description:
      "Three-tier micro-financing scheme under PMMY for non-corporate, non-farm micro and small enterprises via banks, MFIs, and NBFCs.",
    benefit: "Shishu ₹50K / Kishor ₹5L / Tarun ₹10L",
    eligibility: [
      "Non-farm income-generating activity",
      "Micro or small enterprise (not corporate)",
      "No prior loan default history",
    ],
    status: "Open",
  },
  {
    id: 5,
    name: "Stand-Up India",
    body: "SIDBI / Ministry of Finance",
    tag: "Inclusion Loan",
    tagColor: "bg-pink-100 text-pink-700",
    description:
      "Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and one woman borrower per bank branch for greenfield enterprises.",
    benefit: "₹10L – ₹1 Cr for SC/ST/Women entrepreneurs",
    eligibility: [
      "SC/ST or Women entrepreneur (51%+ stake)",
      "Greenfield enterprise (first-time venture)",
      "Manufacturing, Services, or Trading sector",
    ],
    status: "Closing Soon",
  },
];

const startupSchemes: Scheme[] = [
  {
    id: 1,
    name: "Startup India Seed Fund",
    body: "DPIIT, Govt. of India",
    tag: "Grant",
    tagColor: "bg-green-100 text-green-700",
    description:
      "Non-dilutive seed funding for DPIIT-recognized startups at early stages for proof of concept, prototype development, and market entry.",
    benefit: "Up to ₹20L non-dilutive grant",
    eligibility: [
      "DPIIT-recognized startup (incorporated < 2 years)",
      "No prior funding from VC/angel/GoI scheme",
      "Must work through SISFS-approved incubator",
    ],
    status: "Open",
  },
  {
    id: 2,
    name: "Tax Exemption (Section 80-IAC)",
    body: "Income Tax Department",
    tag: "Tax Benefit",
    tagColor: "bg-yellow-100 text-yellow-700",
    description:
      "Eligible DPIIT-recognized startups can avail 100% income tax deduction on profits for any 3 consecutive years out of their first 10 years of incorporation.",
    benefit: "3-year income tax holiday",
    eligibility: [
      "DPIIT-recognized startup",
      "Incorporated after April 1, 2016",
      "Turnover does not exceed ₹100 Cr in any FY",
    ],
    status: "Open",
  },
  {
    id: 3,
    name: "MAARG Mentorship Program",
    body: "DPIIT, Startup India",
    tag: "Mentorship",
    tagColor: "bg-blue-100 text-blue-700",
    description:
      "Mentorship, Advisory, Assistance, Resilience and Growth (MAARG) connects recognized startups with corporate mentors, industry experts, and serial entrepreneurs.",
    benefit: "Free mentorship from top corporates",
    eligibility: [
      "DPIIT-recognized startup",
      "Open to all sectors and stages",
      "Must commit to 3-month mentorship engagement",
    ],
    status: "Open",
  },
  {
    id: 4,
    name: "Fast-Track IP Filing",
    body: "Patent Office, India",
    tag: "IP Support",
    tagColor: "bg-indigo-100 text-indigo-700",
    description:
      "Expedited examination of patent applications for DPIIT-recognized startups with significantly reduced official fees to encourage innovation.",
    benefit: "80% fee reduction on patents",
    eligibility: [
      "DPIIT-recognized startup",
      "Indian patent application",
      "Application filed by the startup itself (not assigned)",
    ],
    status: "Open",
  },
];

const exportSchemes: Scheme[] = [
  {
    id: 1,
    name: "RoDTEP Scheme",
    body: "DGFT, Ministry of Commerce",
    tag: "Duty Remission",
    tagColor: "bg-teal-100 text-teal-700",
    description:
      "Remission of Duties and Taxes on Export Products — refunds embedded central, state, and local duties/taxes not rebated by any other mechanism.",
    benefit: "Duty & tax remission as % of FOB value",
    eligibility: [
      "Manufacturer-exporter or merchant-exporter",
      "Covered product under RoDTEP schedule",
      "Valid IEC (Import Export Code) from DGFT",
    ],
    status: "Open",
  },
  {
    id: 2,
    name: "Interest Equalisation Scheme",
    body: "RBI / Ministry of Commerce",
    tag: "Interest Subsidy",
    tagColor: "bg-orange-100 text-orange-700",
    description:
      "Pre and post-shipment export credit interest equalisation to make Indian exporters cost-competitive globally by reducing their financing burden.",
    benefit: "2–3% interest subsidy on export credit",
    eligibility: [
      "MSME manufacturer-exporter (3%) or merchant-exporter in notified sectors (2%)",
      "Pre/post-shipment credit in INR from scheduled commercial bank",
      "Export proceeds realized within RBI prescribed time",
    ],
    status: "Open",
  },
  {
    id: 3,
    name: "ECGC Export Credit Insurance",
    body: "Export Credit Guarantee Corporation",
    tag: "Insurance",
    tagColor: "bg-red-100 text-red-700",
    description:
      "Insurance coverage for Indian exporters against payment risks — commercial and political — enabling them to explore new markets with confidence.",
    benefit: "Risk coverage up to 90% of export value",
    eligibility: [
      "Indian exporter with valid IEC",
      "Export of goods or services (not prohibited items)",
      "Premium payment on due dates",
    ],
    status: "Open",
  },
];

const trackerRows = [
  {
    scheme: "MUDRA Loan – Kishor",
    appliedDate: "12 Apr 2024",
    status: "Under Review",
    statusColor: "bg-blue-100 text-blue-700",
    nextStep: "Await bank verification call",
  },
  {
    scheme: "CGTMSE Credit Guarantee",
    appliedDate: "02 Mar 2024",
    status: "Documents Pending",
    statusColor: "bg-amber-100 text-amber-700",
    nextStep: "Upload audited balance sheet",
  },
  {
    scheme: "Startup India Seed Fund",
    appliedDate: "18 Jan 2024",
    status: "Approved",
    statusColor: "bg-green-100 text-green-700",
    nextStep: "Sign grant disbursement agreement",
  },
];

function StatusBadge({ status }: { status: SchemeStatus }) {
  if (status === "Open") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2 py-0.5 rounded-full">
        <CheckCircle2 size={11} />
        Open
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full">
      <Clock size={11} />
      Closing Soon
    </span>
  );
}

function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", scheme.tagColor)}>
          {scheme.tag}
        </span>
        <StatusBadge status={scheme.status} />
      </div>

      <div>
        <h3
          className="font-bold text-gray-900 text-lg leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {scheme.name}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{scheme.body}</p>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{scheme.description}</p>

      <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-0.5">Benefit</p>
        <p className="text-sm font-bold text-orange-700">{scheme.benefit}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Eligibility</p>
        <ul className="flex flex-col gap-1">
          {scheme.eligibility.map((point, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
              <ChevronRight size={12} className="text-orange-400 shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 mt-auto pt-1">
        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
          Check Eligibility
        </button>
        <button className="flex-1 border border-orange-400 text-orange-500 hover:bg-orange-50 text-sm font-semibold py-2 rounded-lg transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}

type TabKey = "government" | "startup" | "export";

const tabs: { key: TabKey; label: string }[] = [
  { key: "government", label: "Government Schemes" },
  { key: "startup", label: "Startup India" },
  { key: "export", label: "Export Incentives" },
];

const schemesByTab: Record<TabKey, Scheme[]> = {
  government: governmentSchemes,
  startup: startupSchemes,
  export: exportSchemes,
};

export default function Schemes() {
  const [filter, setFilter] = useState("all");

  const allSchemes = [
    ...governmentSchemes.map((s) => ({ ...s, category: "indian" })),
    ...startupSchemes.map((s) => ({ ...s, category: "startup" })),
    ...exportSchemes.map((s) => ({ ...s, category: "export" })),
  ];

  const filteredSchemes = allSchemes.filter((s) => {
    if (filter === "all") return true;
    if (filter === "indian") return s.category === "indian" || s.category === "startup";
    if (filter === "startup") return s.category === "startup";
    if (filter === "export") return s.category === "export";
    if (filter === "financial")
      return ["Loan", "Credit Guarantee", "Micro Loan", "Inclusion Loan", "Duty Remission", "Interest Subsidy"].includes(s.tag);
    if (filter === "skill")
      return ["Skill + Loan", "Mentorship", "IP Support", "Tax Benefit"].includes(s.tag);
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Page Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
            >
              Schemes &amp; Support
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              MSME Growth Hub &nbsp;&middot;&nbsp; Government Schemes &nbsp;&middot;&nbsp; Startup India &nbsp;&middot;&nbsp; Export Incentives
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 font-semibold shadow-sm"
            >
              <option value="all">All Schemes</option>
              <option value="indian">Indian Schemes</option>
              <option value="export">Export Schemes</option>
              <option value="startup">Startup Support</option>
              <option value="financial">Financial &amp; Loans</option>
              <option value="skill">Skill &amp; Advisory</option>
            </select>
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors border border-gray-200 px-4 py-2 rounded-xl bg-white shadow-sm"
            >
              &#8592; Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Scheme Cards */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={`${scheme.category}-${scheme.id}`} scheme={scheme} />
          ))}
        </div>

        {/* Application Tracker */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-blue-600" />
            <h2
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Application Tracker
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">Track the status of your scheme applications in real time.</p>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                      Scheme Name
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                      Applied Date
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                      Next Step
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trackerRows.map((row, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",
                      )}
                    >
                      <td className="px-5 py-4 font-medium text-gray-800">{row.scheme}</td>
                      <td className="px-5 py-4 text-gray-500">{row.appliedDate}</td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full",
                            row.statusColor
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{row.nextStep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 mt-4">
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          &#8592; Back to Home
        </Link>
      </div>
    </div>
  );
}
