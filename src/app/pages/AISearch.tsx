import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Sparkles, Volume2, Globe, ChevronDown, ChevronUp,
  ExternalLink, FileText, User, BookOpen, Video, File,
  X, ArrowRight, TrendingUp, Users, DollarSign, Building2,
} from "lucide-react";

const PRIMARY = "#F97316";
const ACCENT = "#2563EB";

const POPULAR_SEARCHES = [
  "MSME loan eligibility",
  "Startup India registration",
  "GST for small business",
  "Export documentation",
  "MUDRA loan",
  "Angel investors India",
];

const FILTER_TABS = ["All", "Articles", "Schemes", "Mentors", "Videos", "Documents"];

const INDIAN_LANGUAGES = ["Hindi", "Tamil", "Telugu", "Marathi", "Bengali"];

const AI_SUMMARY = {
  query: "MSME loan schemes 2026",
  text: "MSMEs can access multiple government loan schemes in 2026. The SIDBI Direct Finance scheme offers up to ₹1Cr at 7.5% p.a. for manufacturing units. The Credit Guarantee Fund (CGTMSE) provides 75–85% guarantee on loans up to ₹2Cr, making banks more willing to lend. MUDRA Tarun loans offer up to ₹10L with no collateral. First-time borrowers should start with the CGTMSE-backed MUDRA scheme for easiest approval.",
  sources: 3,
};

const GOV_RESOURCES = [
  {
    title: "MSME Ministry – Official Loan Schemes Portal",
    url: "msme.gov.in/loan-schemes",
    description: "Comprehensive listing of all government-backed MSME loan programs, eligibility criteria, application procedures and nodal agency contacts.",
    badge: "Ministry of MSME",
  },
  {
    title: "SIDBI – Small Industries Development Bank of India",
    url: "sidbi.in/direct-finance",
    description: "SIDBI offers direct and indirect financing solutions for MSMEs including the SMILE scheme, Stand-Up India, and digital lending through SIDBI's online portal.",
    badge: "Development Finance",
  },
  {
    title: "MUDRA – Micro Units Development & Refinance Agency",
    url: "mudra.org.in/schemes",
    description: "MUDRA Shishu (up to ₹50K), Kishore (₹50K–₹5L) and Tarun (₹5L–₹10L) loans available through member lending institutions with zero collateral.",
    badge: "Govt. Scheme",
  },
];

const ARTICLES = [
  {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    title: "CGTMSE 2026: Everything MSMEs Need to Know",
    date: "Jan 15, 2026",
    author: "Priya Sharma",
    excerpt: "The Credit Guarantee Fund Trust for Micro and Small Enterprises has expanded coverage to 85% of the sanctioned amount for women entrepreneurs.",
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
    title: "How to Apply for MUDRA Tarun Loan in 5 Steps",
    date: "Feb 3, 2026",
    author: "Ravi Menon",
    excerpt: "Step-by-step walkthrough of the MUDRA Tarun application process, documentation requirements, and tips for faster approval from your local bank branch.",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    title: "SIDBI vs Banks: Which Loan Route Is Better for Your MSME?",
    date: "Mar 10, 2026",
    author: "Anjali Iyer",
    excerpt: "Comparing interest rates, turnaround times, and collateral requirements between SIDBI direct finance and traditional bank loans for manufacturing MSMEs.",
  },
];

const FAQS = [
  {
    q: "What documents do I need for MSME loan application?",
    a: "You will typically need: Udyam Registration Certificate, last 2 years ITR and financial statements, bank statements (12 months), KYC documents (Aadhaar, PAN), business address proof, and project report for new units. MUDRA loans require minimal documentation — just KYC and a brief business plan.",
  },
  {
    q: "What is the maximum loan amount under CGTMSE?",
    a: "CGTMSE provides guarantee coverage for loans up to ₹2 Crore for micro and small enterprises. The guarantee cover is 75% for most borrowers, 80% for micro enterprises, and 85% for women entrepreneurs and NE/J&K region borrowers. No collateral is required from the borrower.",
  },
  {
    q: "Can I apply for multiple MSME schemes simultaneously?",
    a: "Yes, MSMEs can benefit from multiple schemes simultaneously — for example, you can have a CGTMSE-backed bank loan while also receiving a capital subsidy under the Credit Linked Capital Subsidy Scheme (CLCSS). However, the same expenditure cannot be claimed under two subsidy schemes.",
  },
  {
    q: "What is the interest rate for SIDBI Direct Finance in 2026?",
    a: "SIDBI's interest rates for direct finance range from 7.25% to 9.5% p.a. depending on the borrower's credit rating, sector, and loan tenure. Manufacturing units with Udyam registration and clean credit history typically qualify for rates in the 7.25–7.75% band.",
  },
];

const RELATED_QUESTIONS = [
  "How to get MSME loan without collateral?",
  "What is Udyam registration process?",
  "MUDRA loan vs bank loan comparison",
  "SIDBI SMILE scheme eligibility 2026",
  "Credit guarantee scheme for women entrepreneurs",
  "MSME emergency credit line scheme",
];

const QUICK_STATS = [
  { icon: <DollarSign size={16} />, label: "Schemes Available", value: "47" },
  { icon: <Users size={16} />, label: "MSMEs Funded", value: "2.4M+" },
  { icon: <TrendingUp size={16} />, label: "Avg. Loan Size", value: "₹8.2L" },
  { icon: <Building2 size={16} />, label: "Partner Banks", value: "180+" },
];

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showTranslate, setShowTranslate] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  function doSearch(q: string) {
    if (!q.trim()) return;
    setActiveQuery(q);
    setHasSearched(true);
    setQuery(q);
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Search bar — always visible at top */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="shrink-0">
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: PRIMARY }}>
                MSME<span style={{ color: ACCENT }}>Hub</span>
              </span>
            </Link>
            {hasSearched && (
              <div className="flex-1 flex items-center gap-2 bg-muted/30 border border-border rounded-2xl px-4 py-2">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  className="flex-1 bg-transparent outline-none text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                {query && (
                  <button onClick={() => { setQuery(""); setHasSearched(false); }} className="text-muted-foreground hover:text-foreground">
                    <X size={15} />
                  </button>
                )}
                <button
                  onClick={() => doSearch(query)}
                  className="text-white text-sm px-4 py-1.5 rounded-xl font-medium"
                  style={{ background: PRIMARY, fontFamily: "'DM Sans', sans-serif" }}
                >
                  Search
                </button>
              </div>
            )}
          </div>
          {hasSearched && (
            <div className="flex gap-1 mt-3 overflow-x-auto">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: activeTab === tab ? ACCENT : "transparent",
                    color: activeTab === tab ? "white" : "#64748b",
                    border: `1px solid ${activeTab === tab ? ACCENT : "#e2e8f0"}`,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!hasSearched ? (
        /* ── LANDING STATE ── */
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-6 py-16">
          <div className="w-full max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${PRIMARY}20` }}>
                <Sparkles size={28} style={{ color: PRIMARY }} />
              </div>
            </div>
            <h1
              className="mb-3 text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}
            >
              Search MSME Growth Hub
            </h1>
            <p className="text-muted-foreground mb-8 text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              AI-powered search across schemes, articles, mentors, videos and documents
            </p>
            <div className="flex items-center gap-3 bg-white border border-border rounded-2xl px-5 shadow-lg mb-6" style={{ height: 56 }}>
              <Search size={20} className="text-muted-foreground shrink-0" />
              <input
                className="flex-1 bg-transparent outline-none text-base"
                placeholder="Ask anything about MSME schemes, funding, compliance..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button
                onClick={() => doSearch(query)}
                className="text-white text-sm px-5 py-2 rounded-xl font-semibold"
                style={{ background: PRIMARY, fontFamily: "'DM Sans', sans-serif" }}
              >
                Search
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Popular searches
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => doSearch(s)}
                  className="px-4 py-2 rounded-full text-sm border border-border bg-white hover:border-orange-300 hover:bg-orange-50 transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── RESULTS STATE ── */
        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
          {/* Left: Results (70%) */}
          <div className="flex-1 min-w-0 space-y-6">
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Showing results for <strong>"{activeQuery}"</strong>
            </p>

            {/* AI Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} style={{ color: ACCENT }} />
                <span className="font-semibold text-sm" style={{ color: ACCENT, fontFamily: "'DM Sans', sans-serif" }}>AI Summary</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {AI_SUMMARY.text}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Sources: {AI_SUMMARY.sources} official documents
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Volume2 size={13} />
                    {isSpeaking ? "Stop" : "Listen"}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowTranslate(!showTranslate)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <Globe size={13} />
                      Translate
                      <ChevronDown size={12} />
                    </button>
                    {showTranslate && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-lg z-20 py-1 min-w-32">
                        {INDIAN_LANGUAGES.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => { setSelectedLang(lang); setShowTranslate(false); }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-all"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: selectedLang === lang ? ACCENT : undefined }}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Gov Resources */}
            <div>
              <h2 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22 }}>
                Official Government Resources
              </h2>
              <div className="space-y-3">
                {GOV_RESOURCES.map((r) => (
                  <div key={r.url} className="bg-white rounded-2xl border border-border p-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${PRIMARY}15`, color: PRIMARY, fontFamily: "'DM Sans', sans-serif" }}>
                          {r.badge}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.title}</h3>
                      <p className="text-xs text-green-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>🔗 {r.url}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.description}</p>
                    </div>
                    <a
                      href={`https://${r.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white"
                      style={{ background: ACCENT, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Visit <ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles */}
            <div>
              <h2 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22 }}>
                Articles
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {ARTICLES.map((a) => (
                  <div key={a.title} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                    <img src={a.image} alt={a.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <User size={11} />
                        <span>{a.author}</span>
                        <span>·</span>
                        <span>{a.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22 }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/20 transition-all"
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    >
                      <span className="font-medium text-sm pr-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{faq.q}</span>
                      {expandedFaq === i ? <ChevronUp size={16} className="shrink-0 text-muted-foreground" /> : <ChevronDown size={16} className="shrink-0 text-muted-foreground" />}
                    </button>
                    {expandedFaq === i && (
                      <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar (30%) */}
          <div className="w-72 shrink-0 space-y-5">
            {/* Related Questions */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <h3 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18 }}>
                Related Questions
              </h3>
              <div className="space-y-1">
                {RELATED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => doSearch(q)}
                    className="w-full text-left flex items-start gap-2 px-2 py-2 rounded-xl text-sm hover:bg-muted/30 transition-all group"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <ArrowRight size={14} className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-600 transition-colors">{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-border p-4">
              <h3 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18 }}>
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_STATS.map((s) => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: `${PRIMARY}08` }}>
                    <div className="flex justify-center mb-1" style={{ color: PRIMARY }}>{s.icon}</div>
                    <div className="font-bold text-base" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: PRIMARY }}>{s.value}</div>
                    <div className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg, ${PRIMARY}, #ea580c)` }}>
              <h3 className="font-bold mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18 }}>
                Need Expert Help?
              </h3>
              <p className="text-xs mb-3 opacity-90" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Connect with a verified MSME mentor who specializes in funding
              </p>
              <Link
                to="/mentorship"
                className="block text-center bg-white rounded-xl py-2 text-sm font-semibold"
                style={{ color: PRIMARY, fontFamily: "'DM Sans', sans-serif" }}
              >
                Find a Mentor
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
