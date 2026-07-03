import { useState } from "react";
import { Link } from "react-router";
import {
  Users,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Building2,
  FileText,
  ChevronDown,
  Star,
  Clock,
  CheckCircle2,
  Download,
  MessageSquare,
  Target,
  BookOpen,
  Award,
  CalendarCheck,
  PlayCircle,
  BarChart2,
  ChevronRight,
} from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Pending: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
  Accepted: { bg: "bg-green-50 border-green-200", text: "text-green-700" },
  Rejected: { bg: "bg-red-50 border-red-200", text: "text-red-700" },
};

const APPLIED_MENTORS = [
  {
    name: "Dr. Ananya Krishnan",
    role: "Product Strategy & Deep-Tech",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&auto=format",
    rating: 4.9,
    status: "Accepted",
    notes:
      "Session booked for June 28, 2026. Prepare your product roadmap and 6-month OKRs before the session.",
    accent: "#F97316",
  },
  {
    name: "Rohan Agarwal",
    role: "VC & Fundraising",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format",
    rating: 4.8,
    status: "Pending",
    notes: "Application under review. Expected response within 2 business days.",
    accent: "#2563EB",
  },
  {
    name: "Meera Iyer",
    role: "Operations & Scale",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&auto=format",
    rating: 4.95,
    status: "Rejected",
    notes: "Current cohort is full. You have been added to the waitlist for July 2026.",
    accent: "#7C3AED",
  },
];

const MY_SERVICES = [
  { id: "mentorship", label: "Mentorship", icon: Users, active: true, color: "#F97316" },
  { id: "consultancy", label: "Business Consultancy", icon: Briefcase, active: true, color: "#2563EB" },
  { id: "technology", label: "Technology Support", icon: Building2, active: true, color: "#7C3AED" },
  { id: "training", label: "Training", icon: GraduationCap, active: false, color: "#059669" },
  { id: "marketing", label: "Marketing Support", icon: Lightbulb, active: false, color: "#DC2626" },
];

const ACTIVE_COURSES = [
  {
    id: 1,
    title: "Startup Fundamentals",
    instructor: "Dr. Ananya Krishnan",
    progress: 72,
    totalModules: 12,
    completedModules: 9,
    nextSession: "June 28, 2026",
    tag: "Entrepreneurship",
    tagColor: "#F97316",
  },
  {
    id: 2,
    title: "Digital Marketing for MSMEs",
    instructor: "Rahul Sharma",
    progress: 40,
    totalModules: 10,
    completedModules: 4,
    nextSession: "July 3, 2026",
    tag: "Marketing",
    tagColor: "#2563EB",
  },
];

const COMPLETED_COURSES = [
  { title: "Business Model Canvas", instructor: "Meera Iyer", completedOn: "May 30, 2026", certificate: true },
  { title: "GST & Compliance Basics", instructor: "CA Priya Sinha", completedOn: "April 15, 2026", certificate: true },
];

const TRAINING_MODULES = [
  { title: "Module 1: Market Research", course: "Startup Fundamentals", status: "Completed", due: "June 10" },
  { title: "Module 2: Business Model", course: "Startup Fundamentals", status: "Completed", due: "June 17" },
  { title: "Module 3: Financial Planning", course: "Startup Fundamentals", status: "In Progress", due: "June 28" },
  { title: "Module 4: Fundraising Basics", course: "Startup Fundamentals", status: "Pending", due: "July 5" },
  { title: "Week 1: Social Media Strategy", course: "Digital Marketing", status: "Completed", due: "June 15" },
  { title: "Week 2: SEO & Content", course: "Digital Marketing", status: "In Progress", due: "July 3" },
];

const ATTENDANCE = [
  { session: "Startup Fundamentals — Session 3", date: "June 10, 2026", status: "Present" },
  { session: "Digital Marketing — Week 1", date: "June 15, 2026", status: "Present" },
  { session: "Startup Fundamentals — Session 4", date: "June 17, 2026", status: "Absent" },
  { session: "Startup Fundamentals — Session 5", date: "June 24, 2026", status: "Present" },
];

const MENTOR_GUIDANCE = {
  recommendations: [
    "Clarify whether you are registering as an entrepreneur with an existing business or as a trainee exploring an idea.",
    "If you already have a business, add business stage, current challenge, revenue status and team size.",
    "If you are a trainee, focus on your learning goal, interest area and idea status instead of business details.",
  ],
  nextSteps: [
    { text: "Update profile with correct category: Entrepreneur or Trainee", due: "June 28, 2026", done: false },
    { text: "Prepare a 1-page business or idea summary", due: "July 2, 2026", done: false },
    { text: "Select required support from services section", due: "Ongoing", done: true },
    { text: "Book first mentor review session", due: "July 10, 2026", done: false },
  ],
  documents: [
    { name: "Mentor Guidance Summary.pdf", size: "1.2 MB", date: "2026-06-15", type: "pdf" },
    { name: "Business Model Template.xlsx", size: "890 KB", date: "2026-06-12", type: "sheet" },
  ],
};

function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.Pending;
  return (
    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", colors.bg, colors.text)}>
      {status}
    </span>
  );
}

const MODULE_STATUS_COLORS: Record<string, string> = {
  Completed: "bg-green-50 border-green-200 text-green-700",
  "In Progress": "bg-blue-50 border-blue-200 text-blue-700",
  Pending: "bg-muted border-border text-muted-foreground",
};

export default function DashboardMentee() {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "training" | "attendance" | "certificates">("overview");

  return (
    <div className="min-h-screen bg-muted/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-800 uppercase text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Trainee / Entrepreneur Dashboard
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Aditya Sharma · Entrepreneur Profile · Active Profile
            </p>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-border">
          <div className="flex gap-1 -mb-px">
            {[
              { id: "overview", label: "Overview", icon: BarChart2 },
              { id: "training", label: "Training Modules", icon: BookOpen },
              { id: "attendance", label: "Attendance", icon: CalendarCheck },
              { id: "certificates", label: "Certificates", icon: Award },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Courses", value: ACTIVE_COURSES.length, icon: PlayCircle, color: "#F97316" },
            { label: "Completed Courses", value: COMPLETED_COURSES.length, icon: CheckCircle2, color: "#059669" },
            { label: "Assigned Mentors", value: APPLIED_MENTORS.filter((m) => m.status === "Accepted").length, icon: Users, color: "#2563EB" },
            { label: "Certificates", value: COMPLETED_COURSES.filter((c) => c.certificate).length, icon: Award, color: "#7C3AED" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={15} style={{ color }} />
                </div>
              </div>
              <div className="text-3xl font-800 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Active Courses */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Active Courses
                </h2>
                <span className="text-xs font-mono text-muted-foreground">Progress tracking</span>
              </div>
              <div className="divide-y divide-border">
                {ACTIVE_COURSES.map((course) => (
                  <div key={course.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{course.title}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium border" style={{ background: `${course.tagColor}12`, color: course.tagColor, borderColor: `${course.tagColor}30` }}>
                            {course.tag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Instructor: {course.instructor}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {course.completedModules}/{course.totalModules} modules · Next session: {course.nextSession}
                        </p>
                      </div>
                      <button className="flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors shrink-0">
                        <PlayCircle size={12} /> Continue
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground shrink-0">{course.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Applied Mentors */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Applied Mentors
                    </h2>
                    <span className="text-xs font-mono text-muted-foreground">Track request status and notes</span>
                  </div>

                  <div className="divide-y divide-border">
                    {APPLIED_MENTORS.map((mentor) => (
                      <div key={mentor.name} className="px-6 py-5 hover:bg-muted/20 transition-colors">
                        <div className="flex items-start gap-4">
                          <img src={mentor.avatar} alt={mentor.name} className="w-11 h-11 rounded-full object-cover bg-muted shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-foreground">{mentor.name}</h3>
                              <StatusBadge status={mentor.status} />
                            </div>
                            <p className="text-xs text-muted-foreground">{mentor.role}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <Star size={12} className="text-amber-500 fill-amber-500" /> {mentor.rating}
                            </div>
                            <button
                              onClick={() => setExpandedNote(expandedNote === mentor.name ? null : mentor.name)}
                              className="mt-3 flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                            >
                              View Notes <ChevronDown size={12} className={cn("transition-transform", expandedNote === mentor.name && "rotate-180")} />
                            </button>
                            {expandedNote === mentor.name && (
                              <div className="mt-3 bg-muted/40 border border-border rounded-xl p-3 text-sm text-muted-foreground leading-relaxed">
                                {mentor.notes}
                              </div>
                            )}
                          </div>
                          <button className="text-xs font-semibold border border-border px-3 py-2 rounded-lg hover:border-primary/40 transition-colors">
                            Message
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentor Guidance */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Mentor Guidance
                    </h2>
                    <p className="text-xs text-muted-foreground font-mono mt-1">Recommendations and next actions shared by mentors</p>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <MessageSquare size={15} className="text-primary" /> Recommendations
                      </h3>
                      <div className="space-y-3">
                        {MENTOR_GUIDANCE.recommendations.map((r) => (
                          <div key={r} className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-sm text-muted-foreground leading-relaxed">
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-green-600" /> Next Steps
                      </h3>
                      <div className="space-y-3">
                        {MENTOR_GUIDANCE.nextSteps.map((n) => (
                          <div key={n.text} className="flex items-start gap-3 border border-border rounded-xl p-3">
                            <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5", n.done ? "bg-green-500 border-green-500" : "border-muted-foreground/30")}>
                              {n.done && <CheckCircle2 size={13} className="text-white" />}
                            </div>
                            <div>
                              <p className={cn("text-sm font-medium", n.done ? "text-muted-foreground line-through" : "text-foreground")}>{n.text}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">Due: {n.due}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h2 className="text-base font-700 uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    My Selected Services
                  </h2>
                  <div className="space-y-3">
                    {MY_SERVICES.map(({ label, icon: Icon, active, color }) => (
                      <div key={label} className={cn("flex items-center gap-3 p-3 rounded-xl border", active ? "border-primary/30 bg-orange-50" : "border-border bg-white opacity-60")}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                          <Icon size={15} style={{ color }} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{label}</span>
                        {active && <CheckCircle2 size={15} className="text-primary ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-border p-5">
                  <h2 className="text-base font-700 uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Documents
                  </h2>
                  <div className="space-y-3">
                    {MENTOR_GUIDANCE.documents.map((d) => (
                      <div key={d.name} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <FileText size={15} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{d.name}</p>
                          <p className="text-[11px] text-muted-foreground">{d.size} · {d.date}</p>
                        </div>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <Download size={14} className="text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h2 className="text-base font-700 uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Progress Tracking
                  </h2>
                  <div className="space-y-4">
                    {ACTIVE_COURSES.map((c) => (
                      <div key={c.id}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-foreground truncate pr-2">{c.title}</span>
                          <span className="font-mono text-muted-foreground shrink-0">{c.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Training Modules Tab */}
        {activeTab === "training" && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Training Modules
              </h2>
              <span className="text-xs font-mono text-muted-foreground">{TRAINING_MODULES.filter((m) => m.status === "Completed").length}/{TRAINING_MODULES.length} completed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Module</th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Course</th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Due</th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {TRAINING_MODULES.map((mod) => (
                    <tr key={mod.title} className="hover:bg-muted/20">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{mod.title}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{mod.course}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{mod.due}</td>
                      <td className="px-6 py-4">
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", MODULE_STATUS_COLORS[mod.status])}>
                          {mod.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {mod.status !== "Completed" && (
                          <button className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                            {mod.status === "In Progress" ? "Continue" : "Start"} <ChevronRight size={12} />
                          </button>
                        )}
                        {mod.status === "Completed" && <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Attendance Record
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> {ATTENDANCE.filter(a => a.status === "Present").length} Present</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> {ATTENDANCE.filter(a => a.status === "Absent").length} Absent</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Session</th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ATTENDANCE.map((a) => (
                    <tr key={a.session + a.date} className="hover:bg-muted/20">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{a.session}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{a.date}</td>
                      <td className="px-6 py-4">
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", a.status === "Present" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600")}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {COMPLETED_COURSES.map((c) => (
                <div key={c.title} className="bg-white rounded-2xl border border-border p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Award size={26} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-700 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {c.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Instructor: {c.instructor}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">Completed: {c.completedOn}</p>
                    </div>
                  </div>
                  {c.certificate && (
                    <button className="mt-4 w-full flex items-center justify-center gap-2 border border-primary/30 bg-primary/5 text-primary text-sm font-semibold py-2.5 rounded-xl hover:bg-primary/10 transition-colors">
                      <Download size={14} /> Download Certificate
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-muted/40 border border-border rounded-2xl p-6 text-center">
              <Target size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">Complete your active courses to earn more certificates</p>
              <p className="text-xs text-muted-foreground mt-1">{ACTIVE_COURSES.length} course{ACTIVE_COURSES.length !== 1 ? "s" : ""} in progress</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
