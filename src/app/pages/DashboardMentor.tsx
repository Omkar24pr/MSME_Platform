import { useState } from "react";
import { Link } from "react-router";
import {
  Edit3,
  FileText,
  HelpCircle,
  CheckCircle,
  X,
  ChevronDown,
  Bell,
  BarChart3,
  Users,
  Star,
  Clock,
  MessageSquare,
  Send,
  Save,
} from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const STATUS_OPTIONS = [
  "Onboarded",
  "Paid Consultancy",
  "Equity Engagement",
];

const STATUS_COLORS: Record<
  string,
  { bg: string; text: string }
> = {
  Onboarded: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-700",
  },
  "Paid Consultancy": {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
  "Equity Engagement": {
    bg: "bg-purple-50 border-purple-200",
    text: "text-purple-700",
  },
  Pending: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
  },
  Accepted: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-700",
  },
  Rejected: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
  },
};

type RequestItem = {
  id: number;
  date: string;
  name: string;
  company: string;
  avatar: string;
  request: string;
  status: string;
};

type MenteeItem = {
  name: string;
  company: string;
  avatar: string;
  notes: string;
  pendingAction: string;
  status: string;
  recommendation?: string;
  nextSteps?: string;
};

const INCOMING_REQUESTS: RequestItem[] = [
  {
    id: 1,
    date: "2026-06-20",
    name: "Priya Mehta",
    company: "NeuralDraft",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&auto=format",
    request:
      "Need guidance on AI product positioning and Series A fundraising deck review.",
    status: "Pending",
  },
  {
    id: 2,
    date: "2026-06-19",
    name: "Arjun Kapoor",
    company: "Stackraft",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format",
    request:
      "Looking for help with GTM strategy for a B2B SaaS targeting mid-market companies.",
    status: "Pending",
  },
  {
    id: 3,
    date: "2026-06-18",
    name: "Fatima Al-Rashid",
    company: "Flowsense",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&auto=format",
    request:
      "Need review of our pitch deck before meeting investors next week.",
    status: "Pending",
  },
];

const ACTIVE_MENTEES: MenteeItem[] = [
  {
    name: "Riya Bose",
    company: "CarbonZero",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&auto=format",
    notes:
      "Strong technical founder, needs help with investor narrative. Next session: June 28.",
    pendingAction: "Review pitch deck v3",
    status: "Onboarded",
    recommendation:
      "Make the climate impact calculation more specific and investor-friendly.",
    nextSteps:
      "Update pitch deck problem slide and share revised version before next meeting.",
  },
  {
    name: "Karan Mehrotra",
    company: "Fintrack",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format",
    notes:
      "Closed seed round ₹2Cr. Now working on Series A materials.",
    pendingAction: "Share VC contact list",
    status: "Paid Consultancy",
  },
  {
    name: "Shreya Nair",
    company: "AgriSense",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format",
    notes:
      "Early revenue, needs operational scaling help. Potential equity arrangement being discussed.",
    pendingAction: "Term sheet review",
    status: "Equity Engagement",
  },
];

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border",
        c.bg,
        c.text,
      )}
    >
      {status}
    </span>
  );
}

function StatusDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const c = STATUS_COLORS[value] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer",
          c.bg,
          c.text,
        )}
      >
        {value}
        <ChevronDown
          size={10}
          className={cn(
            "transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-border rounded-xl shadow-lg z-30 overflow-hidden min-w-[170px]">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors font-medium text-foreground"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary resize-none"
      />
    </label>
  );
}

export default function DashboardMentor() {
  const [requests, setRequests] = useState<RequestItem[]>(
    INCOMING_REQUESTS,
  );
  const [mentees, setMentees] =
    useState<MenteeItem[]>(ACTIVE_MENTEES);
  const [activeTab, setActiveTab] = useState<
    "requests" | "mentees"
  >("requests");

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showCreateContent, setShowCreateContent] =
    useState(false);
  const [selectedMentee, setSelectedMentee] =
    useState<MenteeItem | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: "Dr. Ananya Krishnan",
    expertise: "Product Strategy & Deep-Tech",
    experience: "12 Years",
    availability: "5 hours/week",
    linkedin: "https://linkedin.com/in/ananya",
    bio: "I help early-stage founders refine positioning, pitch decks, GTM strategy and investor readiness.",
  });

  const [contentForm, setContentForm] = useState({
    title: "",
    type: "Article",
    visibility: "Public",
    description: "",
  });

  const [guidanceForm, setGuidanceForm] = useState({
    recommendation: "",
    nextSteps: "",
    pendingAction: "",
    status: "Onboarded",
  });

  const pendingCount = requests.filter(
    (r) => r.status === "Pending",
  ).length;

  const handleAccept = (id: number) => {
    const acceptedRequest = requests.find(
      (req) => req.id === id,
    );

    setRequests((r) =>
      r.map((req) =>
        req.id === id ? { ...req, status: "Accepted" } : req,
      ),
    );

    if (!acceptedRequest) return;

    setMentees((current) => {
      const alreadyAdded = current.some(
        (m) => m.name === acceptedRequest.name,
      );
      if (alreadyAdded) return current;

      return [
        {
          name: acceptedRequest.name,
          company: acceptedRequest.company,
          avatar: acceptedRequest.avatar,
          notes: acceptedRequest.request,
          pendingAction: "Initial mentorship call",
          status: "Onboarded",
          recommendation: "",
          nextSteps: "",
        },
        ...current,
      ];
    });

    setActiveTab("mentees");
  };

  const handleReject = (id: number) => {
    setRequests((r) =>
      r.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req,
      ),
    );
  };

  const updateMenteeStatus = (name: string, status: string) => {
    setMentees((m) =>
      m.map((me) =>
        me.name === name ? { ...me, status } : me,
      ),
    );
  };

  const openGuidancePanel = (mentee: MenteeItem) => {
    setSelectedMentee(mentee);
    setGuidanceForm({
      recommendation: mentee.recommendation ?? "",
      nextSteps: mentee.nextSteps ?? "",
      pendingAction: mentee.pendingAction,
      status: mentee.status,
    });
  };

  const saveGuidance = () => {
    if (!selectedMentee) return;

    setMentees((current) =>
      current.map((m) =>
        m.name === selectedMentee.name
          ? {
              ...m,
              recommendation: guidanceForm.recommendation,
              nextSteps: guidanceForm.nextSteps,
              pendingAction: guidanceForm.pendingAction,
              status: guidanceForm.status,
              notes:
                guidanceForm.recommendation ||
                m.notes ||
                "Guidance shared by mentor.",
            }
          : m,
      ),
    );

    setSelectedMentee(null);
  };

  return (
    <div
      className="min-h-screen bg-muted/30"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-800 uppercase text-foreground"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Mentor Dashboard
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              {profileForm.name} · {profileForm.expertise}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEditProfile(true)}
              className="flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-4 py-2 rounded-full hover:border-primary/40 transition-colors"
            >
              <Edit3 size={14} /> Edit Profile
            </button>

            <button
              onClick={() => setShowCreateContent(true)}
              className="flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-4 py-2 rounded-full hover:border-accent/40 hover:text-accent transition-colors"
            >
              <FileText size={14} /> Create Content
            </button>

            <button
              onClick={() => setActiveTab("requests")}
              className="relative flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <HelpCircle size={14} /> Help Requests
              {pendingCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-700 rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("requests")}
              className="relative p-2 rounded-full border border-border hover:border-primary/40 transition-colors"
            >
              <Bell
                size={16}
                className="text-muted-foreground"
              />
              {pendingCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Mentees",
              value: mentees.length,
              icon: Users,
              color: "#F97316",
            },
            {
              label: "Pending Requests",
              value: pendingCount,
              icon: Clock,
              color: "#2563EB",
            },
            {
              label: "Sessions This Month",
              value: 8,
              icon: BarChart3,
              color: "#7C3AED",
            },
            {
              label: "Avg. Rating",
              value: "4.9",
              icon: Star,
              color: "#059669",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-border p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {label}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={15} style={{ color }} />
                </div>
              </div>
              <div
                className="text-3xl font-800 text-foreground"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 w-fit">
          {[
            {
              id: "requests" as const,
              label: "Incoming Requests",
              count: pendingCount,
            },
            {
              id: "mentees" as const,
              label: "Status of Mentees",
              count: mentees.length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === tab.id
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={cn(
                    "text-[10px] font-700 rounded-full w-5 h-5 flex items-center justify-center",
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "bg-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "requests" && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2
                className="text-lg font-700 uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                Incoming Mentorship Requests
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {requests.length} total · {pendingCount} pending
                review
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Founder
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Request
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {req.date}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={req.avatar}
                            alt={req.name}
                            className="w-8 h-8 rounded-full object-cover bg-muted"
                          />
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              {req.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {req.company}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {req.request}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={req.status} />
                      </td>

                      <td className="px-6 py-4">
                        {req.status === "Pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleAccept(req.id)
                              }
                              className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                            >
                              <CheckCircle size={12} /> Accept
                            </button>

                            <button
                              onClick={() =>
                                handleReject(req.id)
                              }
                              className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <X size={12} /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground font-mono">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "mentees" && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2
                className="text-lg font-700 uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                Status of Mentees
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {mentees.length} active mentees
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Mentee
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Notes
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Pending Action
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Guidance
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {mentees.map((mentee) => (
                    <tr
                      key={mentee.name}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={mentee.avatar}
                            alt={mentee.name}
                            className="w-9 h-9 rounded-full object-cover bg-muted"
                          />
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              {mentee.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {mentee.company}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                          {mentee.recommendation ||
                            mentee.notes}
                        </p>
                        {mentee.nextSteps && (
                          <p className="text-[11px] text-primary font-medium line-clamp-1">
                            Next: {mentee.nextSteps}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-lg font-medium">
                          {mentee.pendingAction}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <StatusDropdown
                          value={mentee.status}
                          onChange={(v) =>
                            updateMenteeStatus(mentee.name, v)
                          }
                        />
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            openGuidancePanel(mentee)
                          }
                          className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary/15 transition-colors"
                        >
                          <MessageSquare size={13} /> Guide /
                          Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {showEditProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl border border-border shadow-2xl w-full max-w-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3
                  className="text-2xl font-800 uppercase"
                  style={{
                    fontFamily:
                      "'Barlow Condensed', sans-serif",
                  }}
                >
                  Edit Mentor Profile
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update your expertise, availability and public
                  mentor details.
                </p>
              </div>
              <button
                onClick={() => setShowEditProfile(false)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TextInput
                label="Mentor Name"
                value={profileForm.name}
                onChange={(v) =>
                  setProfileForm({ ...profileForm, name: v })
                }
              />
              <TextInput
                label="Expertise"
                value={profileForm.expertise}
                onChange={(v) =>
                  setProfileForm({
                    ...profileForm,
                    expertise: v,
                  })
                }
              />
              <TextInput
                label="Experience"
                value={profileForm.experience}
                onChange={(v) =>
                  setProfileForm({
                    ...profileForm,
                    experience: v,
                  })
                }
              />
              <TextInput
                label="Availability"
                value={profileForm.availability}
                onChange={(v) =>
                  setProfileForm({
                    ...profileForm,
                    availability: v,
                  })
                }
              />
              <div className="md:col-span-2">
                <TextInput
                  label="LinkedIn URL"
                  value={profileForm.linkedin}
                  onChange={(v) =>
                    setProfileForm({
                      ...profileForm,
                      linkedin: v,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <TextAreaInput
                  label="Bio"
                  value={profileForm.bio}
                  onChange={(v) =>
                    setProfileForm({ ...profileForm, bio: v })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditProfile(false)}
                className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditProfile(false)}
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateContent && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl border border-border shadow-2xl w-full max-w-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3
                  className="text-2xl font-800 uppercase"
                  style={{
                    fontFamily:
                      "'Barlow Condensed', sans-serif",
                  }}
                >
                  Create Content
                </h3>
                <p className="text-sm text-muted-foreground">
                  Publish articles, resources, workshops or
                  announcements for mentees.
                </p>
              </div>
              <button
                onClick={() => setShowCreateContent(false)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TextInput
                label="Content Title"
                value={contentForm.title}
                onChange={(v) =>
                  setContentForm({ ...contentForm, title: v })
                }
                placeholder="Example: How to prepare investor pitch deck"
              />

              <label className="block">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Content Type
                </span>
                <select
                  value={contentForm.type}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      type: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  <option>Article</option>
                  <option>Workshop</option>
                  <option>Resource</option>
                  <option>Announcement</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Visibility
                </span>
                <select
                  value={contentForm.visibility}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      visibility: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  <option>Public</option>
                  <option>Only My Mentees</option>
                </select>
              </label>

              <div className="md:col-span-2">
                <TextAreaInput
                  label="Description"
                  value={contentForm.description}
                  onChange={(v) =>
                    setContentForm({
                      ...contentForm,
                      description: v,
                    })
                  }
                  placeholder="Write short description or content summary..."
                  rows={5}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateContent(false)}
                className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateContent(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90"
              >
                <FileText size={14} /> Publish Content
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedMentee && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
          <div className="bg-white h-full w-full max-w-lg shadow-2xl border-l border-border p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3
                  className="text-2xl font-800 uppercase"
                  style={{
                    fontFamily:
                      "'Barlow Condensed', sans-serif",
                  }}
                >
                  Guide Mentee
                </h3>
                <p className="text-sm text-muted-foreground">
                  Send structured feedback and next steps to the
                  mentee.
                </p>
              </div>
              <button
                onClick={() => setSelectedMentee(null)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-muted/40 border border-border rounded-2xl p-4 mb-6">
              <img
                src={selectedMentee.avatar}
                alt={selectedMentee.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-foreground">
                  {selectedMentee.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedMentee.company}
                </div>
                <div className="mt-1">
                  <StatusBadge status={selectedMentee.status} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <TextAreaInput
                label="Mentor Recommendation"
                value={guidanceForm.recommendation}
                onChange={(v) =>
                  setGuidanceForm({
                    ...guidanceForm,
                    recommendation: v,
                  })
                }
                placeholder="Example: Improve your problem statement and clearly mention customer pain point..."
                rows={5}
              />

              <TextAreaInput
                label="Next Steps"
                value={guidanceForm.nextSteps}
                onChange={(v) =>
                  setGuidanceForm({
                    ...guidanceForm,
                    nextSteps: v,
                  })
                }
                placeholder="Example: Update pitch deck, validate with 20 users, share revised version before Friday..."
                rows={4}
              />

              <TextInput
                label="Pending Action"
                value={guidanceForm.pendingAction}
                onChange={(v) =>
                  setGuidanceForm({
                    ...guidanceForm,
                    pendingAction: v,
                  })
                }
                placeholder="Example: Submit revised pitch deck"
              />

              <label className="block">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Engagement Status
                </span>
                <select
                  value={guidanceForm.status}
                  onChange={(e) =>
                    setGuidanceForm({
                      ...guidanceForm,
                      status: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={saveGuidance}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90"
              >
                <Send size={14} /> Send to Mentee
              </button>

              <button
                onClick={saveGuidance}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold hover:bg-muted"
              >
                <Save size={14} /> Save Draft
              </button>
            </div>

            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                Demo Note
              </p>
              <p className="text-sm text-muted-foreground">
                In the real system, this guidance will be
                visible inside the mentee dashboard under mentor
                notes and recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}