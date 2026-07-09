import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Search, Volume2, Globe, ChevronRight, ChevronDown, ChevronUp,
  Sparkles, ThumbsUp, Copy, Star, BookOpen, Clock, X,
  FileText, BarChart3, DollarSign, Scale, Package,
  CheckCircle2, AlertCircle, Play, Film, Award, HelpCircle
} from "lucide-react";

const PRIMARY = "#F97316";
const ACCENT = "#2563EB";

// ──────────────────────────────────────────────────────────────────────────────
// VIDEO DATA (From ContentHub.tsx)
// ──────────────────────────────────────────────────────────────────────────────
const videoCategories = [
  { id: "all", label: "All Videos", icon: "🏠" },
  { id: "business", label: "Business Tips", icon: "💼" },
  { id: "schemes", label: "MSME Schemes", icon: "🏛️" },
  { id: "startup", label: "Startup Stories", icon: "🚀" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "legal", label: "Legal", icon: "⚖️" },
  { id: "export", label: "Export", icon: "📦" },
];

const trendingTopics = [
  "MUDRA Loan 2026",
  "GST Amendment Updates",
  "Startup India Benefits",
  "PM Vishwakarma Scheme",
  "MSME Export Incentives",
];

const videos = [
  {
    id: 1,
    title: "How to Apply for MUDRA Loan Step-by-Step",
    channel: "FinanceGuru India",
    views: "45K",
    date: "2 days ago",
    duration: "8:23",
    category: "Finance",
    categoryId: "finance",
    likes: 1240,
    photo: "1554224155-6726b3ff858f",
    embedId: "5K17H8H-3a4",
  },
  {
    id: 2,
    title: "Startup India Registration Complete Tutorial 2026",
    channel: "StartupHub",
    views: "120K",
    date: "1 week ago",
    duration: "15:42",
    category: "Startup",
    categoryId: "startup",
    likes: 4800,
    photo: "1460925895917-afdab827c52f",
    embedId: "Yn_vM6rRzts",
  },
  {
    id: 3,
    title: "GST Filing for MSMEs Made Simple",
    channel: "TaxEase India",
    views: "67K",
    date: "3 days ago",
    duration: "11:15",
    category: "Legal",
    categoryId: "legal",
    likes: 2100,
    photo: "1507679799987-c73779587ccf",
    embedId: "5K17H8H-3a4",
  },
  {
    id: 4,
    title: "Success Story: From ₹50K to ₹2Cr Turnover in 2 Years",
    channel: "MSME Stories",
    views: "203K",
    date: "5 days ago",
    duration: "18:30",
    category: "Success",
    categoryId: "startup",
    likes: 9300,
    photo: "1522202176988-66273c2fd55f",
    embedId: "Yn_vM6rRzts",
  },
  {
    id: 5,
    title: "Export Documentation: Complete Checklist",
    channel: "TradeIndia",
    views: "34K",
    date: "1 week ago",
    duration: "9:47",
    category: "Export",
    categoryId: "export",
    likes: 870,
    photo: "1578662996442-48f60103fc96",
    embedId: "5K17H8H-3a4",
  },
  {
    id: 6,
    title: "Digital Marketing on ₹5000/month Budget",
    channel: "GrowthLab",
    views: "89K",
    date: "4 days ago",
    duration: "12:20",
    category: "Marketing",
    categoryId: "marketing",
    likes: 3400,
    photo: "1611532736597-de2d4265fba3",
    embedId: "Yn_vM6rRzts",
  },
  {
    id: 7,
    title: "How I Raised ₹1Cr Angel Investment",
    channel: "FundedStartups",
    views: "156K",
    date: "2 weeks ago",
    duration: "22:15",
    category: "Finance",
    categoryId: "finance",
    likes: 6700,
    photo: "1559526324-4b87b5e36e44",
    embedId: "5K17H8H-3a4",
  },
  {
    id: 8,
    title: "MSME Udyam Registration: New Rules 2026",
    channel: "ComplianceKaro",
    views: "78K",
    date: "6 days ago",
    duration: "7:55",
    category: "Legal",
    categoryId: "legal",
    likes: 2900,
    photo: "1450101499163-c8848c66ca85",
    embedId: "Yn_vM6rRzts",
  },
  {
    id: 9,
    title: "Manufacturing MSME: Zero to ₹10Cr Blueprint",
    channel: "MakInIndia",
    views: "91K",
    date: "3 days ago",
    duration: "31:40",
    category: "Business",
    categoryId: "business",
    likes: 3800,
    photo: "1565514020179-026b92b2d70b",
    embedId: "5K17H8H-3a4",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE HUB DATA (From KnowledgeCenter.tsx)
// ──────────────────────────────────────────────────────────────────────────────
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
    { title: "DPIIT Recognition Benefits", embedId: "Yn_vM6rRzts", duration: "9 min", desc: "Step by Udyam and DPIIT certificate guide.", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&fit=crop&auto=format" },
  ],
  "Export Incentives": [
    { title: "RoDTEP Export Scheme 2026", embedId: "5K17H8H-3a4", duration: "11 min", desc: "Duty remission guide on export products.", thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&fit=crop&auto=format" },
  ],
};

const DEFAULT_VIDEOS = [
  { title: "Ecosystem Launch & MSME Services Overview", embedId: "5K17H8H-3a4", duration: "10 min", desc: "Introductory overview of mentorship, support programs, and structural resources.", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&fit=crop&auto=format" },
  { title: "Udyam Scheme & Government Benefit Integrations", embedId: "Yn_vM6rRzts", duration: "15 min", desc: "Detailed step by step video guide to registration procedures.", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&fit=crop&auto=format" },
];

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

const ARTICLE_CARDS = [
  { cat: "Government Schemes", catColor: "#2563EB", title: "CGTMSE 2026: Expanded Coverage for Women Entrepreneurs", excerpt: "85% guarantee now available for women-owned MSMEs.", readTime: "5 min" },
  { cat: "Finance & Funding", catColor: "#9333ea", title: "Angel Investors vs. Venture Capital: Which Is Right for You?", excerpt: "Key differences in ticket size, dilution and control for early-stage MSMEs.", readTime: "7 min" },
  { cat: "Business Guides", catColor: "#16a34a", title: "GST Composition Scheme: Save Time and Reduce Compliance", excerpt: "Turnover under ₹1.5Cr? The composition scheme can cut your compliance burden by 70%.", readTime: "6 min" },
  { cat: "Export & Import", catColor: "#0891b2", title: "Getting Your IEC Code: Step-by-Step for New Exporters", excerpt: "Import Export Code is mandatory for all cross-border trade. Here's how to get it in 2 days.", readTime: "4 min" },
];

const LANGUAGES = ["English", "Hindi", "Bengali"];

export default function Resources() {
  // ── STATE FOR TRENDING VIDEOS ──
  const [activeVideoCategory, setActiveVideoCategory] = useState("all");
  const [videoSearchQuery, setVideoSearchQuery] = useState("");
  const [likedSet, setLikedSet] = useState<Set<number>>(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<number>>(new Set());

  // ── STATE FOR KNOWLEDGE HUB ──
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Government Schemes", "Business Guides"]));
  const [selectedCategory, setSelectedCategory] = useState("MSME Loans");
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<null | typeof AI_QUESTIONS[0]>(null);
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [helpful, setHelpful] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isReadAloud, setIsReadAloud] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Summarizer states
  const [summarizerUrl, setSummarizerUrl] = useState("");
  const [summarizerLoading, setSummarizerLoading] = useState(false);
  const [summarizerStep, setSummarizerStep] = useState("");
  const [summaryResult, setSummaryResult] = useState<any | null>(null);

  useEffect(() => {
    document.title = "Resources Hub | MSME Growth Hub";
  }, []);

  // ── HANDLERS FOR TRENDING VIDEOS ──
  const toggleLike = (id: number) => {
    setLikedSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredVideos = videos.filter((v) => {
    const matchesCategory = activeVideoCategory === "all" || v.categoryId === activeVideoCategory;
    const matchesSearch =
      videoSearchQuery === "" ||
      v.title.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(videoSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ── HANDLERS FOR KNOWLEDGE HUB ──
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
    navigator.clipboard.writeText("MSME Udyam Registration & Growth Frameworks Guide - IIT Kharagpur Growth Hub");
    setTimeout(() => setCopied(false), 2000);
  }

  const activeVideos = RELATED_VIDEOS_MAP[selectedCategory] || DEFAULT_VIDEOS;

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
        } else {
          setSummaryResult({
            title: "Summary Report for Resource",
            summary: "This digital guide provides strategic operational guidelines, market orientation benchmarks, and digital visibility frameworks tailored for entrepreneurs. It summarizes practical structures to establish, finance, and expand local MSME units.",
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
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 px-6 py-6 sticky top-14 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Resources Hub
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Access IIT Kharagpur guides, tutorials, video lectures, and tools for startup scaling and MSME compliance.
            </p>
          </div>
          {/* Quick Section Anchor Links */}
          <div className="flex gap-2">
            <a href="#videos" className="text-xs font-bold uppercase tracking-wider bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm">
              🎬 Watch Videos
            </a>
            <a href="#knowledge" className="text-xs font-bold uppercase tracking-wider border border-gray-300 bg-white text-gray-700 px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              📚 Knowledge Hub
            </a>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: TRENDING VIDEOS
          ────────────────────────────────────────────────────────────────────────── */}
      <section id="videos" className="max-w-7xl mx-auto px-6 py-10 w-full border-b border-gray-200 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F97316] font-mono">Curated Tutorials</span>
            <h2 className="text-2xl md:text-3xl font-800 text-gray-900 uppercase mt-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Trending Videos &amp; Explainers
            </h2>
          </div>

          {/* Search Inputs & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos, channels..."
                value={videoSearchQuery}
                onChange={(e) => setVideoSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
              />
            </div>
          </div>
        </div>

        {/* Video Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {videoCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveVideoCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer ${
                activeVideoCategory === cat.id
                  ? "bg-[#F97316] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white border border-gray-200 rounded-3xl p-8">
            <p className="font-semibold text-lg">No educational videos match your filter</p>
            <button onClick={() => { setActiveVideoCategory("all"); setVideoSearchQuery(""); }} className="mt-2 text-sm text-primary font-bold hover:underline">Reset Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video) => {
              const liked = likedSet.has(video.id);
              const bookmarked = bookmarkedSet.has(video.id);
              return (
                <div key={video.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative group cursor-pointer" onClick={() => setActiveVideoEmbed(video.embedId)}>
                    <img
                      src={`https://images.unsplash.com/photo-${video.photo}?w=400&h=225&fit=crop&auto=format`}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-[1.01] transition-transform duration-350"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm transition-transform group-hover:scale-110">
                        <Play size={18} className="text-gray-800 ml-0.5 fill-current" />
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {video.category}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-gray-900 font-bold text-sm leading-snug line-clamp-2 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                      <span className="font-semibold text-[#2563EB]">{video.channel}</span>
                      <span>·</span>
                      <span>{video.views} views</span>
                      <span>·</span>
                      <span>{video.date}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLike(video.id); }}
                        className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-transparent ${
                          liked ? "text-[#F97316] bg-orange-50 font-bold" : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        👍 <span>{liked ? video.likes + 1 : video.likes}</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(video.id); }}
                        className={`flex items-center justify-center text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-transparent ${
                          bookmarked ? "text-[#2563EB] bg-blue-50" : "text-gray-500 hover:bg-gray-100"
                        }`}
                        title="Save Video"
                      >
                        🔖
                      </button>
                      <button
                        onClick={() => setActiveVideoEmbed(video.embedId)}
                        className="ml-auto flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-lg bg-[#F97316] text-white font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
                      >
                        ▶ Watch
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: KNOWLEDGE HUB
          ────────────────────────────────────────────────────────────────────────── */}
      <section id="knowledge" className="max-w-7xl mx-auto px-6 py-12 w-full scroll-mt-28 flex-1 flex flex-col">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a] font-mono">Documentation &amp; Policy</span>
          <h2 className="text-2xl md:text-3xl font-800 text-gray-900 uppercase mt-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Knowledge Hub &amp; AI Summarizer
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start flex-1 w-full">
          {/* Categories Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50/50">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Article Categories
              </p>
            </div>
            <nav className="flex-1 py-2 space-y-0.5">
              {CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-all text-left cursor-pointer"
                    onClick={() => { toggleCategory(cat.label); if (cat.children.length === 0) setSelectedCategory(cat.label); }}
                  >
                    <span style={{ color: cat.color }}>{cat.icon}</span>
                    <span className="flex-1 text-sm font-medium text-gray-700">{cat.label}</span>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                    {cat.children.length > 0 && (
                      expandedCategories.has(cat.label)
                        ? <ChevronUp size={13} className="text-gray-400" />
                        : <ChevronDown size={13} className="text-gray-400" />
                    )}
                  </button>
                  {cat.children.length > 0 && expandedCategories.has(cat.label) && (
                    <div className="pl-6 pb-2 pr-2 space-y-0.5 animate-fadeIn">
                      {cat.children.map((child) => (
                        <button
                          key={child}
                          onClick={() => setSelectedCategory(child)}
                          className="w-full text-left flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                          style={{
                            background: selectedCategory === child ? `${cat.color}10` : "transparent",
                            color: selectedCategory === child ? cat.color : "#4b5563",
                            fontWeight: selectedCategory === child ? 700 : 500,
                          }}
                        >
                          <ChevronRight size={10} className="shrink-0" />
                          {child}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Knowledge Hub Panels */}
          <div className="flex-1 min-w-0 space-y-6 w-full">
            {/* A. URL Knowledge Summarizer */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-primary animate-pulse" />
                <h3 className="font-bold text-lg text-gray-900 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  AI URL Knowledge Summarizer
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Paste any external guideline, government scheme link, or PDF URL to generate instant takeaways tailored for MSMEs.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="e.g., https://www.startupindia.gov.in/incentives"
                  value={summarizerUrl}
                  onChange={(e) => setSummarizerUrl(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900"
                />
                <button
                  onClick={handleSummarize}
                  disabled={summarizerLoading}
                  className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer border-0"
                >
                  {summarizerLoading ? "Processing..." : "Summarize"}
                </button>
              </div>

              {/* Loading */}
              {summarizerLoading && (
                <div className="mt-4 p-5 bg-orange-50/20 border border-orange-100/50 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="w-7 h-7 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-2" />
                  <p className="text-xs font-semibold text-gray-800">{summarizerStep}</p>
                </div>
              )}

              {/* Summarizer Result */}
              {summaryResult && !summarizerLoading && (
                <div className="mt-5 border border-orange-200 bg-orange-50/10 rounded-2xl p-5 space-y-4 animate-scaleUp">
                  <div className="flex items-start justify-between gap-4 flex-wrap border-b border-orange-100 pb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{summaryResult.title}</h4>
                      <span className="text-[10px] text-gray-400 font-mono">MSME AI Engine Result</span>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock size={11} /> {summaryResult.readTime}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed font-normal">{summaryResult.summary}</p>

                  <div className="space-y-1">
                    <h5 className="text-[10px] font-mono uppercase text-gray-500 font-bold">Key Takeaways</h5>
                    <ul className="space-y-1">
                      {summaryResult.takeaways.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <CheckCircle2 size={13} className="text-green-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                    <h5 className="text-[10px] font-bold text-primary mb-0.5 flex items-center gap-1">💡 Key Insight</h5>
                    <p className="text-[11px] text-gray-700 leading-relaxed italic">"{summaryResult.insight}"</p>
                  </div>
                </div>
              )}
            </div>

            {/* B. Active Detailed Content Article */}
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-200 bg-gray-50/20">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full">
                    Official Guide
                  </span>
                  <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                    <Clock size={11} /> 8 min read
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    Category: <strong className="text-gray-700 font-bold">{selectedCategory}</strong>
                  </span>
                </div>
                <h3 className="font-bold text-2xl text-gray-900 leading-snug uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Complete Guide to MSME Udyam Registration &amp; Schemes
                </h3>
              </div>

              {/* AI highlights */}
              <div className="m-6 bg-blue-50/40 border border-blue-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-3 cursor-pointer border-0 bg-transparent text-left"
                  onClick={() => setSummaryExpanded(!summaryExpanded)}
                >
                  <span className="font-semibold text-xs text-blue-700 flex items-center gap-1"><Sparkles size={13} /> AI Highlights</span>
                  {summaryExpanded ? <ChevronUp size={14} className="text-blue-700" /> : <ChevronDown size={14} className="text-blue-700" />}
                </button>
                {summaryExpanded && (
                  <div className="px-5 pb-4 space-y-2">
                    {[
                      "Any business meeting the micro, small or medium investment criteria qualifies for registration under the Udyam portal using PAN and Aadhaar.",
                      "Unlocks direct collateral-free banking lines under CGTMSE guarantees, subsidised interest costs, and statutory delayed payment resolution.",
                      "Self-declaration process is entirely online, free of charge, and takes less than 24 hours to issue valid permanent certifications."
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-blue-900 leading-normal">
                        <CheckCircle2 size={13} className="shrink-0 mt-0.5 text-blue-600" />
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Content Body */}
              <div className="px-6 pb-6 space-y-5 prose text-gray-700 text-sm leading-relaxed font-normal">
                <section className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-base uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif'" }}>
                    What Is MSME / Udyam Certification?
                  </h4>
                  <p>
                    Udyam registration is a primary government verification that validates your business classification as a Micro, Small, or Medium Enterprise under the guidelines of the MSMED Act 2006. Managed directly by the Ministry of MSME, it establishes an entity's operational eligibility across institutional frameworks.
                  </p>
                  <p>
                    It functions entirely based on self-declaration and PAN/Aadhaar integration. There are no physical documents to submit, no audits required to register, and no fees payable, protecting founders from unauthorized intermediaries.
                  </p>
                </section>

                <section className="space-y-3">
                  <h4 className="font-bold text-gray-900 text-base uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif'" }}>
                    General Thresholds (Micro, Small, Medium)
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-xs font-mono text-gray-700">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left px-4 py-2 font-bold text-gray-900">Category</th>
                          <th className="text-left px-4 py-2 font-bold text-gray-900">Investment Limit</th>
                          <th className="text-left px-4 py-2 font-bold text-gray-900">Turnover Limit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Micro", "≤ ₹1 Crore", "≤ ₹5 Crore"],
                          ["Small", "≤ ₹10 Crore", "≤ ₹50 Crore"],
                          ["Medium", "≤ ₹50 Crore", "≤ ₹250 Crore"],
                        ].map(([cat, inv, turn]) => (
                          <tr key={cat} className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50">
                            <td className="px-4 py-2 font-bold text-gray-900">{cat}</td>
                            <td className="px-4 py-2 text-gray-500">{inv}</td>
                            <td className="px-4 py-2 text-gray-500">{turn}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Action Toolbar */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setHelpful(!helpful)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer bg-white"
                  style={{
                    borderColor: helpful ? "#16a34a" : "#cbd5e1",
                    background: helpful ? "#dcfce7" : "white",
                    color: helpful ? "#16a34a" : "#4b5563",
                  }}
                >
                  👍 {helpful ? "Helpful!" : "Helpful"}
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all text-gray-600 cursor-pointer"
                >
                  {copied ? "Copied!" : "📋 Copy Link"}
                </button>
                <button
                  onClick={() => setIsReadAloud(!isReadAloud)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all text-gray-600 cursor-pointer"
                >
                  📢 {isReadAloud ? "Stop Aloud" : "Read Aloud"}
                </button>
                <button
                  onClick={() => toggleSave("Featured Article Guide")}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border ml-auto transition-all cursor-pointer"
                  style={{
                    background: savedArticles.has("Featured Article Guide") ? "#fef3c7" : "white",
                    borderColor: savedArticles.has("Featured Article Guide") ? "#d97706" : "#cbd5e1",
                    color: savedArticles.has("Featured Article Guide") ? "#b45309" : "#4b5563",
                  }}
                >
                  ★ {savedArticles.has("Featured Article Guide") ? "Saved" : "Save"}
                </button>
              </div>

              {/* Follow-up Q&A Panel */}
              <div className="px-6 pb-6 mt-2 relative z-10">
                <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Sparkles size={15} style={{ color: PRIMARY }} />
                    <span className="font-bold text-xs text-orange-600">AI Follow-up Q&amp;A</span>
                  </div>
                  <div className="space-y-1.5">
                    {AI_QUESTIONS.map((item) => (
                      <button
                        key={item.q}
                        onClick={() => setActiveModal(item)}
                        className="w-full text-left flex items-start gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all group cursor-pointer"
                      >
                        <ChevronRight size={13} className="shrink-0 mt-0.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <span className="text-xs text-gray-600 group-hover:text-orange-700 transition-colors">{item.q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Video Recommendations */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Related Guides for {selectedCategory}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeVideos.map((video) => (
                  <div key={video.title} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white">
                    <div className="aspect-video relative bg-slate-900 group">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80" />
                      <button
                        onClick={() => setActiveVideoEmbed(video.embedId)}
                        className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer border-0"
                      >
                        <Play size={15} className="fill-current ml-0.5" />
                      </button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-bold text-xs leading-tight text-gray-900">{video.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 flex-1 leading-normal">{video.desc}</p>
                      <button
                        onClick={() => setActiveVideoEmbed(video.embedId)}
                        className="mt-3 w-full py-2 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold rounded-lg hover:bg-primary/20 transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse More articles */}
            <div>
              <h2 className="font-bold text-gray-950 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22 }}>
                Browse More Insights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ARTICLE_CARDS.map((card) => (
                  <div key={card.title} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-sm transition-shadow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={{ background: `${card.catColor}15`, color: card.catColor }}
                      >
                        {card.cat}
                      </span>
                      <button
                        onClick={() => toggleSave(card.title)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer border-0 bg-transparent"
                      >
                        <Star
                          size={15}
                          fill={savedArticles.has(card.title) ? "#d97706" : "none"}
                          color={savedArticles.has(card.title) ? "#d97706" : undefined}
                        />
                      </button>
                    </div>
                    <h3 className="font-bold text-xs mb-1 text-gray-950 flex-1">{card.title}</h3>
                    <p className="text-[11px] text-gray-500 mb-2 line-clamp-1">{card.excerpt}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-auto">
                      <Clock size={10} />
                      <span>{card.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          MODALS
          ────────────────────────────────────────────────────────────────────────── */}

      {/* AI Answer Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} style={{ color: ACCENT }} />
                <span className="font-semibold text-sm" style={{ color: ACCENT }}>AI Follow-up</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0 bg-transparent">
                <X size={18} />
              </button>
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {activeModal.q}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              {activeModal.a}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer border-0"
                style={{ background: PRIMARY }}
              >
                Close
              </button>
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
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full border-0"
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
