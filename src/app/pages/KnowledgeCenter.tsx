import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Volume2, Globe, ChevronRight, ChevronDown, ChevronUp,
  Sparkles, ThumbsUp, Copy, Star, BookOpen, Clock, X,
  FileText, BarChart3, DollarSign, Scale, Package,
  CheckCircle2, AlertCircle, Play, Film
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

// ── Related Videos Database ───────────────────────────────────────────────────
const RELATED_VIDEOS_MAP: Record<string, { title: string; embedId: string; duration: string; desc: string; thumbnail: string }[]> = {
  "Government Schemes": [
    { title: "CGTMSE Collateral Free Loans", embedId: "5K17H8H-3a4", duration: "12 min", desc: "Understand guarantee covers and maximum loan sizes for MSME expansions.", thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&fit=crop&auto=format" },
    { title: "Startup India Seed Fund Scheme", embedId: "Yn_vM6rRzts", duration: "8 min", desc: "How early stage startups can apply for ₹20 Lakhs grant funding.", thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&fit=crop&auto=format" },
  ],
  "MSME Loans": [
    { title: "CGTMSE Collateral Free Loans", embedId: "5K17H8H-3a4", duration: "12 min", desc: "Understand guarantee covers and maximum loan sizes for MSME expansions.", thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&fit=crop&auto=format" },
    { title: "SIDBI MSME Direct Funding", embedId: "Yn_vM6rRzts", duration: "10 min", desc: "SIDBI's direct credit schemes for manufacturing setups.", thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&fit=crop&auto=format" },
  ],
  "Startup India": [
    { title: "DPIIT Recognition Benefits", embedId: "Yn_vM6rRzts", duration: "9 min", desc: "Step by step Udyam and DPIIT certificate guide.", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&fit=crop&auto=format" },
  ],
  "Export Incentives": [
    { title: "RoDTEP Export Scheme 2026", embedId: "5K17H8H-3a4", duration: "11 min", desc: "Duty remission guide on export products.", thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&fit=crop&auto=format" },
  ],
  "Business Guides": [
    { title: "Udyam Registration Tutorial", embedId: "Yn_vM6rRzts", duration: "15 min", desc: "Complete walkthrough of the free registration portal.", thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&fit=crop&auto=format" },
  ],
  "Registration & Compliance": [
    { title: "Udyam Registration Tutorial", embedId: "Yn_vM6rRzts", duration: "15 min", desc: "Complete walkthrough of the free registration portal.", thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&fit=crop&auto=format" },
  ],
  "GST & Taxation": [
    { title: "GST Composition Scheme Explained", embedId: "5K17H8H-3a4", duration: "10 min", desc: "Save tax compliance time for turnover up to ₹1.5 Crore.", thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&fit=crop&auto=format" },
  ],
  "Business Planning": [
    { title: "How to Build a Pitch Deck", embedId: "Yn_vM6rRzts", duration: "14 min", desc: "Create a compelling business plan that investors will read.", thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&fit=crop&auto=format" },
  ],
  "Finance & Funding": [
    { title: "Raising Venture Capital in India", embedId: "5K17H8H-3a4", duration: "16 min", desc: "Seed funding checklists and valuation insights.", thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&fit=crop&auto=format" },
  ],
  "Investor Readiness": [
    { title: "Term Sheet Negotiations", embedId: "Yn_vM6rRzts", duration: "12 min", desc: "Learn key clauses: dilution, anti-dilution, board rights.", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&fit=crop&auto=format" },
  ],
  "Fundraising": [
    { title: "Pitching to Angels vs VCs", embedId: "5K17H8H-3a4", duration: "11 min", desc: "Matching investment expectation models.", thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&fit=crop&auto=format" },
  ],
  "Working Capital": [
    { title: "Cash Flow Management Hacks", embedId: "Yn_vM6rRzts", duration: "9 min", desc: "How to avoid working capital gaps in seasonality.", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&fit=crop&auto=format" },
  ],
  "Marketing": [
    { title: "Low Budget Marketing for MSMEs", embedId: "5K17H8H-3a4", duration: "13 min", desc: "Leveraging WhatsApp Business and local SEO effectively.", thumbnail: "https://images.unsplash.com/photo-1434626881859-1a44503b11db?w=200&fit=crop&auto=format" },
  ],
  "Legal Compliance": [
    { title: "Startup Trademark Checklist", embedId: "Yn_vM6rRzts", duration: "8 min", desc: "How to register and protect intellectual property.", thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&fit=crop&auto=format" },
  ],
  "Export & Import": [
    { title: "IEC Code Online Application", embedId: "5K17H8H-3a4", duration: "14 min", desc: "Get Import Export Code certificate within 48 hours.", thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&fit=crop&auto=format" },
  ],
};

const DEFAULT_VIDEOS = [
  { title: "Ecosystem Launch & MSME Services Overview", embedId: "5K17H8H-3a4", duration: "10 min", desc: "Introductory overview of mentorship, support programs, and structural resources.", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&fit=crop&auto=format" },
  { title: "Udyam Scheme & Government Benefit Integrations", embedId: "Yn_vM6rRzts", duration: "15 min", desc: "Detailed step by step video guide to registration procedures.", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&fit=crop&auto=format" },
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
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [helpful, setHelpful] = useState(false);

  // Summarizer states
  const [summarizerUrl, setSummarizerUrl] = useState("");
  const [summarizerLoading, setSummarizerLoading] = useState(false);
  const [summarizerStep, setSummarizerStep] = useState("");
  const [summaryResult, setSummaryResult] = useState<any | null>(null);

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

  // Related videos filter matching
  const activeVideos = RELATED_VIDEOS_MAP[selectedCategory] || DEFAULT_VIDEOS;

  // Summarizer Trigger
  const handleSummarize = () => {
    if (!summarizerUrl.trim()) {
      alert("Please paste a valid URL first.");
      return;
    }

    setSummaryResult(null);
    setSummarizerLoading(true);

    const steps = [
      "Fetching resource data and validating headers...",
      "Extracting text contents & parsing headings...",
      "Analyzing vocabulary and mapping MSME context...",
      "Structuring summaries, takeaways, and insights...",
    ];

    let currentStep = 0;
    setSummarizerStep(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setSummarizerStep(steps[currentStep]);
      } else {
        clearInterval(interval);

        // Pre-program answers based on domains
        const urlLower = summarizerUrl.toLowerCase();
        if (urlLower.includes("startupindia.gov.in") || urlLower.includes("startupindia")) {
          setSummaryResult({
            title: "Startup India Hub Guidelines & Incentives",
            summary: "The Startup India portal acts as a central hub for Indian entrepreneurs, facilitating company creation, tax holiday approvals, and access to the Startup India Seed Fund Scheme (SISFS). It unifies compliance audits under multiple environmental and labor regulations, making business initiation frictionless.",
            takeaways: [
              "Tax Holiday: 100% tax rebate for 3 consecutive years under Section 80-IAC.",
              "Seed Capital: Grant support up to ₹20L for validation & debt-based scaling up to ₹50L.",
              "IP Fast-Tracking: Fast-track patent filings and 80% rebate on registration fees."
            ],
            insight: "Startups registered under DPIIT are exempt from tax on share premiums exceeding face value (Angel Tax relief), removing friction in early funding rounds.",
            readTime: "3 min read",
            topics: ["Startup India", "Tax Benefits", "Funding Support"],
          });
        } else if (urlLower.includes("gst.gov.in") || urlLower.includes("gst")) {
          setSummaryResult({
            title: "GST Portal: MSME Compliance & Composition Scheme",
            summary: "This resource details tax compliance baselines for micro and small businesses. It highlights registration criteria and outlines the GST Composition Scheme, which reduces the documentation load for businesses reporting turnovers under ₹1.5 Crores.",
            takeaways: [
              "Registration Limits: Required if annual turnover exceeds ₹40L for goods, or ₹20L for services.",
              "Composition Scheme: Tax rate fixed between 1% to 6%, requiring simple quarterly reporting.",
              "E-Way Bills: Mandatory compliance for movements of goods valued above ₹50,000."
            ],
            insight: "Claiming Input Tax Credit (ITC) requires suppliers to upload invoices timely in their GSTR-1, emphasizing active cash reconciliation.",
            readTime: "4 min read",
            topics: ["GST Compliance", "Composition Scheme", "Tax Filings"],
          });
        } else {
          // Parse generic domain
          let domain = "Resource File";
          try {
            domain = summarizerUrl.replace(/(^\w+:|^)\/\//, "").split("/")[0];
          } catch (e) {}

          setSummaryResult({
            title: `Summary Report for ${domain}`,
            summary: `This digital guide provides strategic operational guidelines, market orientation benchmarks, and digital visibility frameworks tailored for entrepreneurs. It summarizes practical structures to establish, finance, and expand local MSME units.`,
            takeaways: [
              "Audit Procedures: Analyze operational workflows regularly to isolate financial resource waste.",
              "Compliance Standards: Verify regional licenses, certifications, and MSME registrations early.",
              "Client Expansion: Leverage local registries, customer discovery tools, and digital platforms."
            ],
            insight: "Continuous customer feedback iteration provides a significantly higher return on early spending compared to heavy initial advertising campaigns.",
            readTime: "3 min read",
            topics: ["Operational Best Practices", "MSME Scaling", "Digital Branding"],
          });
        }
        setSummarizerLoading(false);
      }
    }, 900);
  };

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

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-border flex flex-col hidden md:block">
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
                  onClick={() => { toggleCategory(cat.label); if (cat.children.length === 0) setSelectedCategory(cat.label); }}
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
        <main className="flex-1 overflow-y-auto bg-muted/10">
          <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">

            {/* A. URL-Based Knowledge Summarizer */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <Sparkles size={18} className="text-primary animate-pulse" />
                <h3 className="font-bold text-base text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20 }}>
                  AI URL Knowledge Summarizer
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Paste any website, research paper, blog, or news link below to generate a concise summary and takeaways tailored for MSMEs.
              </p>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/msme-guide"
                  value={summarizerUrl}
                  onChange={(e) => setSummarizerUrl(e.target.value)}
                  className="flex-1 bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
                />
                <button
                  onClick={handleSummarize}
                  disabled={summarizerLoading}
                  className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {summarizerLoading ? "Summarizing..." : "Summarize"}
                </button>
              </div>

              {/* Loading State */}
              {summarizerLoading && (
                <div className="mt-4 p-5 bg-muted/20 border border-border/55 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-3" />
                  <p className="text-sm font-semibold text-foreground">{summarizerStep}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">MSME AI Engine at work</p>
                </div>
              )}

              {/* Summary Results */}
              {summaryResult && !summarizerLoading && (
                <div className="mt-6 border border-primary/20 bg-orange-50/20 rounded-3xl p-6 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between gap-4 flex-wrap border-b border-border/60 pb-3">
                    <div>
                      <h4 className="font-bold text-foreground text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif'" }}>
                        {summaryResult.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground font-mono">Source Link Analysed</span>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Clock size={12} /> {summaryResult.readTime}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase text-muted-foreground mb-1">Executive Summary</h5>
                    <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                      {summaryResult.summary}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase text-muted-foreground mb-2">Key Takeaways</h5>
                    <ul className="space-y-1.5">
                      {summaryResult.takeaways.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-normal">
                          <CheckCircle2 size={15} className="text-green-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                    <h5 className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
                      <Sparkles size={12} /> Key Insight
                    </h5>
                    <p className="text-xs text-foreground/80 leading-relaxed italic">
                      "{summaryResult.insight}"
                    </p>
                  </div>

                  <div className="flex gap-1.5 flex-wrap pt-2">
                    {summaryResult.topics.map((t: string) => (
                      <span key={t} className="text-[10px] font-mono bg-muted border border-border text-muted-foreground px-2.5 py-0.5 rounded-full font-bold">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Featured Article */}
            <div className="bg-white rounded-3xl border border-border overflow-hidden">
              {/* Metadata bar */}
              <div className="px-6 pt-6 pb-4 border-b border-border">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium animate-pulse" style={{ background: `${ACCENT}15`, color: ACCENT, fontFamily: "'DM Sans', sans-serif" }}>
                    Featured Article
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <Clock size={12} /> 8 min read
                  </span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Topic: <strong className="text-foreground">{selectedCategory}</strong>
                  </span>
                </div>
                <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>
                  Complete Guide to MSME Registration & Growth Frameworks
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
                    <span className="font-semibold text-sm" style={{ color: ACCENT, fontFamily: "'DM Sans', sans-serif" }}>AI Highlights</span>
                  </div>
                  {summaryExpanded ? <ChevronUp size={15} style={{ color: ACCENT }} /> : <ChevronDown size={15} style={{ color: ACCENT }} />}
                </button>
                {summaryExpanded && (
                  <div className="px-5 pb-4 space-y-2">
                    {[
                      "Any business meeting the micro, small or medium investment criteria qualifies for registration under the Udyam portal using PAN and Aadhaar.",
                      "Unlocks direct collateral-free banking lines under CGTMSE guarantees, subsidised interest costs, and statutory delayed payment resolution.",
                      "Self-declaration process is entirely online, free of charge, and takes less than 24 hours to issue valid permanent certifications."
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
                    What Is MSME / Udyam Certification?
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Udyam registration is a primary government verification that validates your business classification as a Micro, Small, or Medium Enterprise under the guidelines of the MSMED Act 2006. Managed directly by the Ministry of MSME, it establishes an entity's operational eligibility across institutional frameworks.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground font-normal mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    It functions entirely based on self-declaration and PAN/Aadhaar integration. There are no physical documents to submit, no audits required to register, and no fees payable, protecting founders from unauthorized intermediaries.
                  </p>
                </section>

                <section>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700 }}>
                    General Thresholds (Micro, Small, Medium)
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm font-mono text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left px-4 py-3 font-semibold">Category</th>
                          <th className="text-left px-4 py-3 font-semibold">Investment Limit</th>
                          <th className="text-left px-4 py-3 font-semibold">Turnover Limit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Micro", "≤ ₹1 Crore", "≤ ₹5 Crore"],
                          ["Small", "≤ ₹10 Crore", "≤ ₹50 Crore"],
                          ["Medium", "≤ ₹50 Crore", "≤ ₹250 Crore"],
                        ].map(([cat, inv, turn]) => (
                          <tr key={cat} className="border-b border-border last:border-0 hover:bg-muted/20">
                            <td className="px-4 py-3 font-semibold">{cat}</td>
                            <td className="px-4 py-3 text-muted-foreground">{inv}</td>
                            <td className="px-4 py-3 text-muted-foreground">{turn}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
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
                <button
                  onClick={() => toggleSave("Featured Article Guide")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border transition-all ml-auto"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: savedArticles.has("Featured Article Guide") ? "#fef3c7" : "white",
                    borderColor: savedArticles.has("Featured Article Guide") ? "#f59e0b" : "#e2e8f0",
                    color: savedArticles.has("Featured Article Guide") ? "#d97706" : "#64748b",
                  }}
                >
                  <Star size={14} fill={savedArticles.has("Featured Article Guide") ? "#d97706" : "none"} />
                  {savedArticles.has("Featured Article Guide") ? "Saved" : "Save"}
                </button>
              </div>

              {/* AI Questions Panel */}
              <div className="px-6 pb-6 mt-4">
                <div className="rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} style={{ color: PRIMARY }} />
                    <span className="font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: PRIMARY }}>AI Follow-up Q&A</span>
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

            {/* Mobile/Tablet Related Videos Section (hidden on XL screen size) */}
            <div className="xl:hidden bg-white border border-border rounded-3xl p-6">
              <h3 className="font-bold text-base text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20 }}>
                Related Guides for {selectedCategory}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {activeVideos.map((video) => (
                  <div key={video.title} className="border border-border/80 rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white">
                    <div className="aspect-video relative bg-slate-900 group">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80" />
                      <button
                        onClick={() => setActiveVideoEmbed(video.embedId)}
                        className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105"
                      >
                        <Play size={16} className="fill-current ml-0.5" />
                      </button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-bold text-sm leading-tight text-foreground">{video.title}</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 flex-1 leading-normal">{video.desc}</p>
                      <button
                        onClick={() => setActiveVideoEmbed(video.embedId)}
                        className="mt-3 w-full py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-lg hover:bg-primary/25 transition-colors uppercase tracking-wider"
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Article Cards Grid */}
            <div>
              <h2 className="font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26 }}>
                Browse More Insights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* B. Related Video Section (XL screens only) */}
        <aside className="w-80 shrink-0 bg-white border-l border-border p-4 overflow-y-auto hidden xl:block">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
            <Film size={18} className="text-primary animate-pulse" />
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Related Guides & Video
            </h3>
          </div>

          <p className="text-[11px] text-muted-foreground mb-4">
            Recommending educational topics related to: <strong className="text-foreground">{selectedCategory}</strong>
          </p>

          <div className="space-y-4">
            {activeVideos.map((video) => (
              <div key={video.title} className="border border-border/80 rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white hover:border-primary/30 transition-all duration-300">
                <div className="aspect-video relative bg-slate-900 group">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-75 transition-opacity" />
                  <button
                    onClick={() => setActiveVideoEmbed(video.embedId)}
                    className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                  >
                    <Play size={16} className="fill-current ml-0.5" />
                  </button>
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-2">{video.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 flex-1 leading-normal line-clamp-2">{video.desc}</p>
                  <button
                    onClick={() => setActiveVideoEmbed(video.embedId)}
                    className="mt-3 w-full py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-xl hover:bg-primary/20 transition-all uppercase tracking-wider"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
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
            <p className="text-sm text-muted-foreground leading-relaxed font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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

      {/* Dynamic Video Playback Modal */}
      {activeVideoEmbed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoEmbed(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoEmbed}?autoplay=1`}
                title="Ecosystem Video Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
