import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Volume2, Globe, ChevronRight, ChevronDown, ChevronUp,
  Sparkles, ThumbsUp, Copy, Star, BookOpen, Clock, X,
  FileText, BarChart3, DollarSign, Briefcase, Scale, Package,
  CheckCircle2, AlertCircle,
} from "lucide-react";

const PRIMARY = "#F97316";
const ACCENT = "#2563EB";

// ── Category tree ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: "Government Schemes",
    count: 12,
    color: "#2563EB",
    icon: <FileText size={15} />,
    children: ["MSME Loans", "Startup India", "Export Incentives"],
  },
  {
    label: "Business Guides",
    count: 18,
    color: "#16a34a",
    icon: <BookOpen size={15} />,
    children: ["Registration & Compliance", "GST & Taxation", "Business Planning"],
  },
  {
    label: "Finance & Funding",
    count: 9,
    color: "#9333ea",
    icon: <DollarSign size={15} />,
    children: ["Investor Readiness", "Fundraising", "Working Capital"],
  },
  {
    label: "Marketing",
    count: 7,
    color: "#db2777",
    icon: <BarChart3 size={15} />,
    children: [],
  },
  {
    label: "Legal Compliance",
    count: 11,
    color: "#dc2626",
    icon: <Scale size={15} />,
    children: [],
  },
  {
    label: "Export & Import",
    count: 8,
    color: "#0891b2",
    icon: <Package size={15} />,
    children: [],
  },
];

// ── AI Follow-up Questions ─────────────────────────────────────────────────────
const AI_QUESTIONS = [
  {
    q: "What happens if I miss the Udyam registration renewal?",
    a: "Missing the Udyam Registration renewal can cause your MSME classification to lapse, which may affect eligibility for government schemes, credit guarantee programs, and priority sector lending benefits. Banks may reclassify your loan, potentially increasing interest rates. You can re-register anytime on the Udyam portal without penalty, but you may lose scheme benefits for the lapsed period. It is advisable to renew annually before your registration anniversary date.",
  },
  {
    q: "Can a service-sector business register as an MSME?",
    a: "Yes, service-sector enterprises are fully eligible for MSME registration under the Udyam portal. The classification criteria are unified — a micro enterprise has investment up to ₹1Cr and turnover up to ₹5Cr; small up to ₹10Cr investment and ₹50Cr turnover; medium up to ₹50Cr investment and ₹250Cr turnover. Service businesses like IT firms, consultancies, salons, restaurants, and logistics companies all qualify.",
  },
  {
    q: "Is Udyam registration free of cost?",
    a: "Yes, Udyam registration is completely free of charge. The government portal (udyamregistration.gov.in) does not levy any fee. Be aware of fraudulent third-party websites that charge for the same service. You only need your Aadhaar and PAN to complete the self-declaration process. Any agent or website charging a fee for Udyam registration is not authorized by the Ministry of MSME.",
  },
];

// ── Article grid data ──────────────────────────────────────────────────────────
const ARTICLE_CARDS = [
  { cat: "Government Schemes", catColor: "#2563EB", title: "CGTMSE 2026: Expanded Coverage for Women Entrepreneurs", excerpt: "85% guarantee now available for women-owned MSMEs.", readTime: "5 min" },
  { cat: "Finance & Funding", catColor: "#9333ea", title: "Angel Investors vs. Venture Capital: Which Is Right for You?", excerpt: "Key differences in ticket size, dilution and control for early-stage MSMEs.", readTime: "7 min" },
  { cat: "Business Guides", catColor: "#16a34a", title: "GST Composition Scheme: Save Time and Reduce Compliance", excerpt: "Turnover under ₹1.5Cr? The composition scheme can cut your compliance burden by 70%.", readTime: "6 min" },
  { cat: "Export & Import", catColor: "#0891b2", title: "Getting Your IEC Code: Step-by-Step for New Exporters", excerpt: "Import Export Code is mandatory for all cross-border trade. Here's how to get it in 2 days.", readTime: "4 min" },
  { cat: "Legal Compliance", catColor: "#dc2626", title: "Shops & Establishment Act: State-wise Compliance Checklist", excerpt: "Every retail and service business must comply — requirements differ by state.", readTime: "9 min" },
  { cat: "Marketing", catColor: "#db2777", title: "Digital Marketing on ₹5,000/Month: A Practical MSME Guide", excerpt: "Meta ads, WhatsApp Business and Google My Business can transform local reach.", readTime: "8 min" },
  { cat: "Government Schemes", catColor: "#2563EB", title: "Startup India: Benefits Beyond the Certificate", excerpt: "Tax exemptions, fast-track IP, and easier public procurement — a full breakdown.", readTime: "10 min" },
  { cat: "Finance & Funding", catColor: "#9333ea", title: "Working Capital Management for Seasonal Businesses", excerpt: "Cash flow strategies and overdraft facilities to survive lean months.", readTime: "6 min" },
];

const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali"];

function TopicVideo({ title, embedId }: { title: string; embedId: string }) {
  return (
    <div className="my-6 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
      <div className="aspect-video w-full bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${embedId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Video Guide</span>
        </div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
      </div>
    </div>
  );
}

export default function KnowledgeCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isReadAloud, setIsReadAloud] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Government Schemes", "Business Guides"]));
  const [selectedCategory, setSelectedCategory] = useState("MSME Loans");
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<null | typeof AI_QUESTIONS[0]>(null);
  const [copied, setCopied] = useState(false);
  const [helpful, setHelpful] = useState(false);

  function toggleCategory(label: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function toggleSave(title: string) {
    setSavedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-border px-6 py-3 flex items-center gap-4 sticky top-0 z-30">
        <Link to="/" className="shrink-0">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: PRIMARY }}>
            MSME<span style={{ color: ACCENT }}>Hub</span>
          </span>
        </Link>
        <h1 className="font-bold text-base shrink-0" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20 }}>
          Knowledge Center
        </h1>
        <div className="flex-1 flex items-center gap-2 bg-muted/30 border border-border rounded-xl px-3 py-2 max-w-md">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search articles, guides, schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-border bg-white hover:bg-muted/20 transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Globe size={15} className="text-muted-foreground" />
              {selectedLanguage}
              <ChevronDown size={13} className="text-muted-foreground" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-lg z-20 py-1 min-w-28">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLanguage(lang); setShowLangDropdown(false); }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-all"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: selectedLanguage === lang ? ACCENT : undefined, fontWeight: selectedLanguage === lang ? 600 : undefined }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Read Aloud */}
          <button
            onClick={() => setIsReadAloud(!isReadAloud)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: isReadAloud ? PRIMARY : "white",
              color: isReadAloud ? "white" : "#64748b",
              borderColor: isReadAloud ? PRIMARY : "#e2e8f0",
            }}
          >
            <Volume2 size={15} />
            {isReadAloud ? "Stop" : "Read Aloud"}
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Categories
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto py-2">
            {CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-muted/30 transition-all group text-left"
                  onClick={() => { toggleCategory(cat.label); setSelectedCategory(cat.label); }}
                >
                  <span style={{ color: cat.color }}>{cat.icon}</span>
                  <span className="flex-1 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cat.label}</span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cat.count}</span>
                  {cat.children.length > 0 && (
                    expandedCategories.has(cat.label)
                      ? <ChevronUp size={13} className="text-muted-foreground" />
                      : <ChevronDown size={13} className="text-muted-foreground" />
                  )}
                </button>
                {cat.children.length > 0 && expandedCategories.has(cat.label) && (
                  <div className="pl-6 pb-1">
                    {cat.children.map((child) => (
                      <button
                        key={child}
                        onClick={() => setSelectedCategory(child)}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          background: selectedCategory === child ? `${cat.color}12` : "transparent",
                          color: selectedCategory === child ? cat.color : "#64748b",
                          fontWeight: selectedCategory === child ? 600 : 400,
                        }}
                      >
                        <ChevronRight size={11} className="shrink-0" />
                        {child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">

            {/* Featured Article */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              {/* Metadata bar */}
              <div className="px-6 pt-6 pb-4 border-b border-border">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${ACCENT}15`, color: ACCENT, fontFamily: "'DM Sans', sans-serif" }}>
                    Business Guides
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <Clock size={12} /> 8 min read
                  </span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Last updated: 12 Jan 2026
                  </span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    By Anjali Iyer
                  </span>
                </div>
                <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>
                  Complete Guide to MSME Registration in India 2026
                </h1>
              </div>

              {/* AI Summary (collapsible) */}
              <div className="mx-6 mt-5 rounded-2xl border border-blue-200 bg-blue-50 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-3"
                  onClick={() => setSummaryExpanded(!summaryExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} style={{ color: ACCENT }} />
                    <span className="font-semibold text-sm" style={{ color: ACCENT, fontFamily: "'DM Sans', sans-serif" }}>AI Summary</span>
                  </div>
                  {summaryExpanded ? <ChevronUp size={15} style={{ color: ACCENT }} /> : <ChevronDown size={15} style={{ color: ACCENT }} />}
                </button>
                {summaryExpanded && (
                  <div className="px-5 pb-4 space-y-2">
                    {[
                      "Any business with investment ≤₹50Cr and turnover ≤₹250Cr qualifies — registration is free on the Udyam portal using only Aadhaar and PAN.",
                      "Udyam registration unlocks priority sector lending, 1–2% interest subvention, CGTMSE collateral-free loans, and delayed payment protections under MSMED Act.",
                      "The process is 100% online, paperless and typically completes within 24 hours with a permanent Udyam Registration Number (URN) valid for lifetime.",
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
                        <p className="text-sm text-blue-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Article body */}
              <div className="px-6 py-5 prose max-w-none space-y-5">
                <section>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700 }}>
                    What Is MSME Registration?
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    MSME registration — now officially called <strong>Udyam Registration</strong> — is a government certification that formally recognizes your business as a Micro, Small or Medium Enterprise under the MSMED Act 2006 (as amended in 2020). The Ministry of MSME manages the Udyam portal, which replaced the old Udyog Aadhaar system in July 2020.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Unlike a business license, Udyam registration is a declaration-based self-certification. There is no inspection, no fee, and no physical documents to submit — just your Aadhaar and PAN linked to your enterprise's financial data.
                  </p>
                  <TopicVideo title="Understanding MSME/Udyam Registration & Key Benefits" embedId="5K17H8H-3a4" />
                </section>

                <section>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700 }}>
                    Classification Criteria (2026)
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left px-4 py-3 font-semibold">Category</th>
                          <th className="text-left px-4 py-3 font-semibold">Investment</th>
                          <th className="text-left px-4 py-3 font-semibold">Turnover</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Micro", "≤ ₹1 Crore", "≤ ₹5 Crore"],
                          ["Small", "≤ ₹10 Crore", "≤ ₹50 Crore"],
                          ["Medium", "≤ ₹50 Crore", "≤ ₹250 Crore"],
                        ].map(([cat, inv, turn]) => (
                          <tr key={cat} className="border-b border-border last:border-0 hover:bg-muted/20">
                            <td className="px-4 py-3 font-medium">{cat}</td>
                            <td className="px-4 py-3 text-muted-foreground">{inv}</td>
                            <td className="px-4 py-3 text-muted-foreground">{turn}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700 }}>
                    Step-by-Step Registration Process
                  </h2>
                  <ol className="space-y-3">
                    {[
                      { step: "Visit udyamregistration.gov.in", detail: "Use only the official government portal. Ignore third-party sites charging fees." },
                      { step: "Enter Aadhaar Number", detail: "Proprietors use personal Aadhaar. Partners use the managing partner's Aadhaar. Directors use their own Aadhaar." },
                      { step: "OTP Verification", detail: "An OTP will be sent to the mobile number linked to your Aadhaar. Ensure your mobile is linked to Aadhaar before starting." },
                      { step: "Enter PAN and Business Details", detail: "Business PAN is auto-validated against the Income Tax database. Provide turnover, investment, NIC activity code." },
                      { step: "Submit & Download Certificate", detail: "On successful submission, your Udyam Registration Number (URN) is generated immediately and the certificate is emailed." },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${PRIMARY}20`, color: PRIMARY, fontFamily: "'DM Sans', sans-serif" }}>
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.step}</p>
                          <p className="text-sm text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <TopicVideo title="Step-by-Step Walkthrough: Online Udyam Registration Process" embedId="Yn_vM6rRzts" />
                </section>

                <section>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700 }}>
                    Key Benefits of Udyam Registration
                  </h2>
                  <ul className="space-y-2">
                    {[
                      "Collateral-free loans up to ₹2Cr under CGTMSE",
                      "1–3% interest subvention on eligible loans",
                      "Protection against delayed payments (MSMED Act Section 15)",
                      "Priority in government procurement (25% reserved for MSMEs)",
                      "Tax concessions, patent and trademark fee reductions",
                      "Access to all state government MSME schemes",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
                  <AlertCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-amber-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Important Note</p>
                    <p className="text-sm text-amber-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Udyam registration must be updated annually if your investment or turnover changes category. Misclassification can result in recovery of benefits received.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-6 py-4 border-t border-border flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setHelpful(!helpful)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: helpful ? "#dcfce7" : "white",
                    borderColor: helpful ? "#16a34a" : "#e2e8f0",
                    color: helpful ? "#16a34a" : "#64748b",
                  }}
                >
                  <ThumbsUp size={14} />
                  {helpful ? "Helpful!" : "Helpful"}
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-border bg-white hover:bg-muted/20 transition-all text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Copy size={14} />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setIsReadAloud(!isReadAloud)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-border bg-white hover:bg-muted/20 transition-all text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Volume2 size={14} />
                  Read Aloud
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-border bg-white hover:bg-muted/20 transition-all text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Globe size={14} />
                  Translate
                </button>
                <button
                  onClick={() => toggleSave("Complete Guide to MSME Registration in India 2026")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border transition-all ml-auto"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: savedArticles.has("Complete Guide to MSME Registration in India 2026") ? "#fef3c7" : "white",
                    borderColor: savedArticles.has("Complete Guide to MSME Registration in India 2026") ? "#f59e0b" : "#e2e8f0",
                    color: savedArticles.has("Complete Guide to MSME Registration in India 2026") ? "#d97706" : "#64748b",
                  }}
                >
                  <Star size={14} fill={savedArticles.has("Complete Guide to MSME Registration in India 2026") ? "#d97706" : "none"} />
                  {savedArticles.has("Complete Guide to MSME Registration in India 2026") ? "Saved" : "Save"}
                </button>
              </div>

              {/* AI Questions Panel */}
              <div className="px-6 pb-6">
                <div className="rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} style={{ color: PRIMARY }} />
                    <span className="font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: PRIMARY }}>AI Follow-up Questions</span>
                  </div>
                  <div className="space-y-2">
                    {AI_QUESTIONS.map((item) => (
                      <button
                        key={item.q}
                        onClick={() => setActiveModal(item)}
                        className="w-full text-left flex items-start gap-2 px-3 py-2.5 rounded-xl bg-white border border-border hover:border-orange-300 hover:bg-orange-50 transition-all group"
                      >
                        <ChevronRight size={14} className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                        <span className="text-sm group-hover:text-orange-700 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Article Cards Grid */}
            <div>
              <h2 className="font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26 }}>
                More Articles
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {ARTICLE_CARDS.map((card) => (
                  <div key={card.title} className="bg-white rounded-2xl border border-border p-4 hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${card.catColor}15`, color: card.catColor, fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {card.cat}
                      </span>
                      <button
                        onClick={() => toggleSave(card.title)}
                        className="text-muted-foreground hover:text-yellow-500 transition-colors"
                      >
                        <Star
                          size={16}
                          fill={savedArticles.has(card.title) ? "#d97706" : "none"}
                          color={savedArticles.has(card.title) ? "#d97706" : undefined}
                        />
                      </button>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.excerpt}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <Clock size={11} />
                      <span>{card.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Answer Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-border shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} style={{ color: ACCENT }} />
                <span className="font-semibold text-sm" style={{ color: ACCENT, fontFamily: "'DM Sans', sans-serif" }}>AI Answer</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            <h3 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20 }}>
              {activeModal.q}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {activeModal.a}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: PRIMARY, fontFamily: "'DM Sans', sans-serif" }}
              >
                Close
              </button>
              <Link
                to="/ai-search"
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center border border-border hover:bg-muted/20 transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Search More
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
