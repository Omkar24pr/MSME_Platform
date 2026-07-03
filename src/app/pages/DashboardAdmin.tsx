import { useState } from "react";
import { Link } from "react-router";
import {
  Users,
  CheckCircle,
  Clock,
  Bell,
  FileText,
  Megaphone,
  Shield,
  Eye,
  X,
  Check,
  Briefcase,
  GraduationCap,
  Building2,
  CalendarDays,
  Handshake,
  Plus,
  Trash2,
  BookOpen,
  Video,
} from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const PENDING_MENTORS = [
  {
    name: "Vikram Sinha",
    org: "ex-CTO, Meesho",
    expertise: "FinTech, SaaS",
    submitted: "2026-06-21",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&auto=format",
  },
  {
    name: "Deepika Rao",
    org: "Partner, Blume Ventures",
    expertise: "Climate Tech, Deep Tech",
    submitted: "2026-06-20",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&auto=format",
  },
  {
    name: "Amit Joshi",
    org: "Founder, LogiNext (exited)",
    expertise: "Logistics, Supply Chain",
    submitted: "2026-06-19",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&auto=format",
  },
];

const REGISTERED_USERS = [
  { name: "Priya Mehta", type: "Entrepreneur", category: "Startup Founder", need: "Fundraising + Marketing", status: "Active" },
  { name: "Rahul Verma", type: "Trainee", category: "Idea Explorer", need: "Training + Idea Validation", status: "Active" },
  { name: "Amit Kumar", type: "Entrepreneur", category: "MSME Owner", need: "Business Consultancy", status: "Under Review" },
];

const NOTICES = [
  {
    id: 1,
    title: "July 2026 Mentor Cohort Opens",
    body: "Applications for the July cohort open on July 1. Mentors should complete profile reviews by June 30.",
    date: "2026-06-18",
    pinned: true,
  },
  {
    id: 2,
    title: "New Startup Training Batch",
    body: "Trainees can join the startup fundamentals workshop from next month.",
    date: "2026-06-15",
    pinned: false,
  },
  {
    id: 3,
    title: "Entrepreneur Business Review Camp",
    body: "Registered entrepreneurs can apply for business model and pitch deck review.",
    date: "2026-06-12",
    pinned: false,
  },
];

export default function DashboardAdmin() {
  const [mentors, setMentors] = useState(PENDING_MENTORS.map((m) => ({ ...m, status: "Pending" as string })));
  const [notices, setNotices] = useState(NOTICES);
  const [noticeText, setNoticeText] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");

  const approve = (name: string) => setMentors((m) => m.map((x) => (x.name === name ? { ...x, status: "Approved" } : x)));
  const reject = (name: string) => setMentors((m) => m.map((x) => (x.name === name ? { ...x, status: "Rejected" } : x)));

  const postNotice = () => {
    if (!noticeTitle || !noticeText) return;
    setNotices([
      {
        id: Date.now(),
        title: noticeTitle,
        body: noticeText,
        date: new Date().toISOString().slice(0, 10),
        pinned: false,
      },
      ...notices,
    ]);
    setNoticeTitle("");
    setNoticeText("");
  };

  return (
    <div className="min-h-screen bg-muted/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-800 uppercase text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground font-mono">MSME Growth Hub · Internal Control Panel</p>
            </div>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Users", value: 260, icon: Users, color: "#2563EB", sub: "+15 this week" },
            { label: "Total Businesses", value: 94, icon: Building2, color: "#F97316", sub: "+6 this week" },
            { label: "Total Mentors", value: 47, icon: Briefcase, color: "#7C3AED", sub: "+3 pending" },
            { label: "Total Trainees", value: 85, icon: GraduationCap, color: "#059669", sub: "+4 this week" },
            { label: "Active Partnerships", value: 12, icon: Handshake, color: "#0891B2", sub: "Incubators & IITs" },
            { label: "Active Events", value: 5, icon: CalendarDays, color: "#DC2626", sub: "This month" },
          ].map(({ label, value, icon: Icon, color, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
                  <Icon size={15} style={{ color }} />
                </div>
              </div>
              <div className="text-4xl font-800 text-foreground mt-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color }}>
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Approve Mentors
              </h2>
              <span className="text-xs font-mono text-muted-foreground">{mentors.filter((m) => m.status === "Pending").length} pending review</span>
            </div>
            <div className="divide-y divide-border">
              {mentors.map((mentor) => (
                <div key={mentor.name} className="px-6 py-4 flex items-center gap-4">
                  <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full object-cover bg-muted shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">{mentor.name}</div>
                    <div className="text-xs text-muted-foreground">{mentor.org}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {mentor.expertise.split(", ").map((e) => (
                        <span key={e} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {e}
                        </span>
                      ))}
                      <span className="text-[10px] text-muted-foreground font-mono">Submitted: {mentor.submitted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {mentor.status === "Pending" ? (
                      <>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border px-2.5 py-1.5 rounded-lg hover:border-accent/40 transition-colors">
                          <Eye size={12} /> View
                        </button>
                        <button onClick={() => approve(mentor.name)} className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                          <Check size={12} /> Approve
                        </button>
                        <button onClick={() => reject(mentor.name)} className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                          <X size={12} /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full border", mentor.status === "Approved" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700")}>
                        {mentor.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2 className="text-base font-700 uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Manage Content
              </h2>
              <div className="space-y-2">
                {[
                  { label: "View All Mentors", icon: Users, color: "#2563EB" },
                  { label: "View Entrepreneurs", icon: Briefcase, color: "#F97316" },
                  { label: "View Trainees", icon: GraduationCap, color: "#059669" },
                  { label: "Pending Help Requests", icon: Bell, color: "#DC2626" },
                  { label: "Session Reports", icon: FileText, color: "#7C3AED" },
                ].map(({ label, icon: Icon, color }) => (
                  <button key={label} className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/20 text-left transition-all">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Users size={18} className="text-primary" />
            <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Registered Entrepreneurs / Trainees
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Support Needed</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {REGISTERED_USERS.map((user) => (
                  <tr key={user.name} className="hover:bg-muted/20">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.type}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.category}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.need}</td>
                    <td className="px-6 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-50 border-green-200 text-green-700">{user.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-primary" />
                <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Organization Approval</h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground">Pending review</span>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "IIT Kharagpur Innovation Cell", type: "IIT / University", status: "Pending" },
                { name: "TiE Kolkata Incubator", type: "Incubator", status: "Pending" },
                { name: "Reliance Jio Platforms", type: "Corporate Partner", status: "Approved" },
                { name: "NSRCEL, IIM Bangalore", type: "Incubator", status: "Pending" },
              ].map((org) => (
                <div key={org.name} className="px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{org.name}</p>
                    <p className="text-xs text-muted-foreground">{org.type}</p>
                  </div>
                  {org.status === "Pending" ? (
                    <div className="flex gap-2 shrink-0">
                      <button className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                        <Check size={11} /> Approve
                      </button>
                      <button className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                        <X size={11} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">Approved</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Content Moderation</h2>
            </div>
            <div className="divide-y divide-border">
              {[
                { title: "How to Raise Your First Round", author: "Rohan Agarwal", type: "Article", status: "Pending" },
                { title: "MSME Export Incentives 2026", author: "Deepika Rao", type: "Blog", status: "Pending" },
                { title: "Product Market Fit Workshop", author: "Startup India", type: "Training Content", status: "Approved" },
                { title: "Legal Compliance for Startups", author: "Meera Iyer", type: "Blog", status: "Pending" },
              ].map((item) => (
                <div key={item.title} className="px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    {item.type === "Training Content" ? <Video size={15} className="text-muted-foreground" /> : <FileText size={15} className="text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground">{item.type} · {item.author}</p>
                  </div>
                  {item.status === "Pending" ? (
                    <div className="flex gap-2 shrink-0">
                      <button className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                        <Check size={11} /> Approve
                      </button>
                      <button className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                        <X size={11} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">Live</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-primary" />
              <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Event Management</h2>
            </div>
            <button className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Plus size={13} /> Create Event
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Event Name</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Startup Pitch Competition 2026", type: "Competition", date: "July 15, 2026", status: "Published" },
                  { name: "Investor Meet — Series A Focus", type: "Investor Meet", date: "July 22, 2026", status: "Published" },
                  { name: "MSME Digital Transformation Workshop", type: "Workshop", date: "Aug 5, 2026", status: "Draft" },
                  { name: "Women Entrepreneur Summit", type: "Summit", date: "Aug 20, 2026", status: "Draft" },
                ].map((ev) => (
                  <tr key={ev.name} className="hover:bg-muted/20">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{ev.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{ev.type}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{ev.date}</td>
                    <td className="px-6 py-4">
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", ev.status === "Published" ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700")}>{ev.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-xs border border-border px-2.5 py-1.5 rounded-lg hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                        {ev.status === "Draft" && (
                          <button className="text-xs bg-primary/10 border border-primary/20 text-primary px-2.5 py-1.5 rounded-lg hover:bg-primary/20 transition-colors font-semibold">Publish</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Megaphone size={18} className="text-primary" />
            <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Notice Board
            </h2>
          </div>

          <div className="px-6 py-5 border-b border-border bg-muted/20">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Post New Notice</p>
            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <input type="text" placeholder="Notice title" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
                <textarea rows={2} placeholder="Notice body..." value={noticeText} onChange={(e) => setNoticeText(e.target.value)} className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>
              <button onClick={postNotice} disabled={!noticeTitle || !noticeText} className={cn("px-5 py-2 rounded-xl text-sm font-semibold self-end transition-all", noticeTitle && noticeText ? "bg-primary text-white hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>Post</button>
            </div>
          </div>

          <div className="divide-y divide-border">
            {notices.map((notice) => (
              <div key={notice.id} className="px-6 py-4 flex items-start gap-4">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", notice.pinned ? "bg-orange-50" : "bg-muted")}>{notice.pinned ? <Bell size={15} className="text-primary" /> : <FileText size={15} className="text-muted-foreground" />}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-foreground">{notice.title}</span>
                    {notice.pinned && <span className="text-[10px] bg-orange-50 border border-orange-200 text-primary px-2 py-0.5 rounded-full font-semibold">Pinned</span>}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{notice.body}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-mono mt-1">{notice.date}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button className="text-xs border border-border px-2.5 py-1.5 rounded-lg hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                  <button
                    onClick={() => setNotices((n) => n.filter((x) => x.id !== notice.id))}
                    className="flex items-center gap-1 text-xs border border-red-200 bg-red-50 text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={11} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center"><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Home</Link></div>
      </div>
    </div>
  );
}

