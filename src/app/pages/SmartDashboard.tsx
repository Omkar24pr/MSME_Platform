import { useState } from "react";
import { Link } from "react-router";
import {
  Bell,
  MessageSquare,
  Upload,
  Search,
  BookOpen,
  Bookmark,
  TrendingUp,
  FileText,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  X,
  Bot,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Static data ─────────────────────────────────────────────────────────────

const CHART_DATA = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 58000 },
  { month: "Mar", revenue: 71000 },
  { month: "Apr", revenue: 65000 },
  { month: "May", revenue: 89000 },
  { month: "Jun", revenue: 102000 },
];

const CONVERSATIONS = [
  { id: 1, title: "MSME scheme eligibility", preview: "Discussed eligibility criteria for CGTMSE and MUDRA schemes…", time: "10:32 AM" },
  { id: 2, title: "GST filing help", preview: "Step-by-step guide for filing GSTR-1 for June quarter…", time: "Yesterday" },
  { id: 3, title: "Investor pitch review", preview: "Reviewed slide deck and suggested improvements to financials…", time: "June 24" },
  { id: 4, title: "Export documentation", preview: "Required documents for first-time exporters under DGFT…", time: "June 22" },
  { id: 5, title: "MUDRA loan process", preview: "Tarun category loan process and required documents…", time: "June 20" },
];

const NOTIFICATIONS = [
  { id: 1, title: "SIDBI MSME Loan scheme extended to Dec 2026", color: "bg-blue-500", date: "June 24", badge: "bg-blue-100 text-blue-700", label: "Scheme" },
  { id: 2, title: "New DPIIT recognition criteria effective July 2026", color: "bg-orange-500", date: "June 22", badge: "bg-orange-100 text-orange-700", label: "Policy" },
  { id: 3, title: "GST return deadline: July 20, 2026", color: "bg-red-500", date: "June 20", badge: "bg-red-100 text-red-700", label: "Deadline" },
  { id: 4, title: "PM Vishwakarma scheme: New categories added", color: "bg-green-500", date: "June 18", badge: "bg-green-100 text-green-700", label: "Scheme" },
];

const SCHEMES = [
  { id: 1, name: "CGTMSE Credit Guarantee", match: 94, desc: "Collateral-free loans up to ₹5 Cr for micro & small enterprises", tag: "Credit" },
  { id: 2, name: "MUDRA Tarun Loan", match: 87, desc: "Loans from ₹5L–₹10L for established businesses with growth plans", tag: "Loan" },
  { id: 3, name: "Startup India Seed Fund", match: 76, desc: "Early-stage funding for proof of concept and prototype development", tag: "Startup" },
];

const SAVED_RESOURCES = [
  { id: 1, icon: FileText, title: "GST Filing Complete Guide 2026", type: "Guide", color: "text-blue-600", bg: "bg-blue-50" },
  { id: 2, icon: BookOpen, title: "MSME Registration Step-by-Step", type: "Article", color: "text-green-600", bg: "bg-green-50" },
  { id: 3, icon: PlayCircle, title: "Pitch Deck Masterclass", type: "Video", color: "text-red-500", bg: "bg-red-50" },
  { id: 4, icon: Bookmark, title: "Export Benefits for MSMEs", type: "Scheme", color: "text-orange-500", bg: "bg-orange-50" },
];

const INITIAL_SEARCH_TAGS = [
  "MUDRA loan eligibility", "GST registration", "DPIIT recognition", "export subsidy",
  "startup India", "CGTMSE guarantee", "MSME certificate", "trade license",
];

const COURSES = [
  { id: 1, title: "Startup Fundamentals", progress: 72, done: false },
  { id: 2, title: "Digital Marketing for MSMEs", progress: 40, done: false },
  { id: 3, title: "GST Compliance Essentials", progress: 100, done: true },
];

const KPI_CARDS = [
  { label: "AI Conversations Today", value: 7, icon: Bot, color: "text-primary", bg: "bg-orange-50", trend: "+2 from yesterday" },
  { label: "Saved Resources", value: 23, icon: Bookmark, color: "text-accent", bg: "bg-blue-50", trend: "+5 this week" },
  { label: "Active Schemes Tracking", value: 4, icon: Target, color: "text-green-600", bg: "bg-green-50", trend: "2 deadlines soon" },
  { label: "Pending Actions", value: 6, icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", trend: "3 high priority" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SmartDashboard() {
  const [searchTags, setSearchTags] = useState<string[]>(INITIAL_SEARCH_TAGS);
  const [prefLang, setPrefLang] = useState("English");
  const [voice, setVoice] = useState<"Female" | "Male">("Female");
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");
  const [savedPref, setSavedPref] = useState(false);
  const [now] = useState(() => {
    const d = new Date(2026, 5, 26, 9, 41);
    return d.toLocaleString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
  });

  const removeTag = (tag: string) => setSearchTags(prev => prev.filter(t => t !== tag));

  const handleSavePref = () => {
    setSavedPref(true);
    setTimeout(() => setSavedPref(false), 2500);
  };

  return (
    <div className="min-h-screen bg-muted/20" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Sticky Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-border px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1
              className="text-3xl font-bold uppercase tracking-wide text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Smart Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Good morning, Aditya! Here&apos;s your personalized overview.
            </p>
          </div>

          {/* Date/time */}
          <div className="hidden md:block text-right">
            <p className="text-xs text-muted-foreground">{now}</p>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2">
            <Link to="/ai-search">
              <button className="flex items-center gap-1.5 text-sm font-medium bg-primary text-white px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                <Bot size={15} /> Ask AI
              </button>
            </Link>
            <Link to="/doc-assistant">
              <button className="flex items-center gap-1.5 text-sm font-medium border border-border px-3 py-2 rounded-xl hover:border-primary hover:text-primary transition-colors">
                <Upload size={15} /> Upload
              </button>
            </Link>
            <Link to="/schemes">
              <button className="flex items-center gap-1.5 text-sm font-medium border border-border px-3 py-2 rounded-xl hover:border-accent hover:text-accent transition-colors">
                <Search size={15} /> Schemes
              </button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:border-primary transition-colors">
                <Bell size={18} />
              </button>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">

        {/* ── Row 1: KPI Cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-2xl border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <Icon size={20} className={kpi.color} />
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
                <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {kpi.value}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{kpi.trend}</p>
              </div>
            );
          })}
        </div>

        {/* ── Row 2: Main 3-col grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left col-span-2 */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Recent AI Conversations */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold uppercase tracking-wide text-foreground"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Recent AI Conversations
                </h2>
                <Link to="/ai-search" className="text-sm font-medium text-primary hover:underline">View all</Link>
              </div>
              <div className="flex flex-col divide-y divide-border">
                {CONVERSATIONS.map(c => (
                  <div key={c.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                      <button className="text-xs font-medium text-accent px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Insights chart */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2
                    className="text-lg font-bold uppercase tracking-wide text-foreground"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Business Insights
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue activity — Jan to Jun 2026</p>
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={CHART_DATA} barSize={32}>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 13 }}
                  />
                  <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right col-span-1 */}
          <div className="flex flex-col gap-6">

            {/* Government Notifications */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2
                className="text-lg font-bold uppercase tracking-wide text-foreground mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Government Notifications
              </h2>
              <div className="flex flex-col gap-3">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className="flex gap-3">
                    <div className={`w-1 rounded-full ${n.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{n.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${n.badge}`}>{n.label}</span>
                        <span className="text-xs text-muted-foreground">{n.date}</span>
                        <button className="text-xs font-medium text-accent hover:underline ml-auto">View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Schemes */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2
                className="text-lg font-bold uppercase tracking-wide text-foreground mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Recommended Schemes
              </h2>
              <div className="flex flex-col gap-3">
                {SCHEMES.map(s => (
                  <div key={s.id} className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground leading-snug">{s.name}</p>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
                        {s.match}% match
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
                    <button className="w-full bg-primary text-white text-xs font-semibold py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 3: Bottom widgets ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Saved Resources */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2
              className="text-lg font-bold uppercase tracking-wide text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Saved Resources
            </h2>
            <div className="flex flex-col gap-3">
              {SAVED_RESOURCES.map(r => {
                const Icon = r.icon;
                return (
                  <div key={r.id} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${r.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={r.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-snug truncate">{r.title}</p>
                      <span className="text-[10px] font-medium text-muted-foreground">{r.type}</span>
                    </div>
                    <button className="text-xs font-medium text-accent hover:underline flex-shrink-0 flex items-center gap-0.5">
                      Open <ExternalLink size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2
              className="text-lg font-bold uppercase tracking-wide text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {searchTags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs font-medium bg-muted px-2.5 py-1.5 rounded-full border border-border hover:border-primary/40 transition-colors group"
                >
                  {tag}
                  <button
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => removeTag(tag)}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              {searchTags.length === 0 && (
                <p className="text-xs text-muted-foreground">No recent searches.</p>
              )}
            </div>
          </div>

          {/* Learning Progress */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2
              className="text-lg font-bold uppercase tracking-wide text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Learning Progress
            </h2>
            <div className="flex flex-col gap-4">
              {COURSES.map(c => (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-foreground flex items-center gap-1">
                      {c.title}
                      {c.done && <CheckCircle2 size={13} className="text-green-500" />}
                    </p>
                    <span className="text-xs font-bold text-muted-foreground">{c.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${c.done ? "bg-green-500" : "bg-primary"}`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-border text-sm font-medium py-2 rounded-xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
              <BookOpen size={15} /> Continue Learning
            </button>
          </div>

          {/* Personalization Settings */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2
              className="text-lg font-bold uppercase tracking-wide text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Preferences
            </h2>
            <div className="flex flex-col gap-4">

              {/* Language */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Preferred Language</label>
                <select
                  value={prefLang}
                  onChange={e => setPrefLang(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-muted/20 focus:outline-none focus:border-primary"
                >
                  {["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"].map(l => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Voice */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Voice</label>
                <div className="flex rounded-xl border border-border overflow-hidden">
                  {(["Female", "Male"] as const).map(v => (
                    <button
                      key={v}
                      className={`flex-1 text-sm py-2 font-medium transition-colors ${voice === v ? "bg-primary text-white" : "bg-white text-foreground hover:bg-muted/40"}`}
                      onClick={() => setVoice(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Theme</label>
                <div className="flex rounded-xl border border-border overflow-hidden">
                  {(["Light", "Dark"] as const).map(t => (
                    <button
                      key={t}
                      className={`flex-1 text-sm py-2 font-medium transition-colors ${theme === t ? "bg-accent text-white" : "bg-white text-foreground hover:bg-muted/40"}`}
                      onClick={() => setTheme(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`w-full text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 ${savedPref ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}
                onClick={handleSavePref}
              >
                {savedPref ? (
                  <><CheckCircle2 size={15} /> Saved!</>
                ) : (
                  <><Clock size={15} /> Save Preferences</>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
