import { useState } from "react";
import { Link } from "react-router";
import { Star, Clock, Users, Search, ChevronRight, Award, Briefcase, Lightbulb, TrendingUp, Building2, Globe } from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const SPECIALIZATIONS = ["All", "Business Strategy", "Finance", "Marketing", "Technology", "Startup Growth", "Operations", "Legal", "Deep Tech", "Climate Tech"];

const MENTORS = [
  {
    name: "Dr. Ananya Krishnan", specialization: "Technology", subRole: "Product Strategy & Deep-Tech",
    company: "ex-VP Product, Google DeepMind", years: 14, rating: 4.9, reviews: 47, sessions: 120,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format",
    bio: "Ananya has taken 4 deep-tech products from research to market at Google and two of her own startups. She specializes in product-market fit for AI/ML ventures and fundraising narratives.",
    expertise: ["AI/ML Product Strategy", "Deep-Tech GTM", "IP Monetization", "Series A"],
    availability: "4 sessions / month", accent: "#F97316", badge: "Top Mentor",
  },
  {
    name: "Rohan Agarwal", specialization: "Finance", subRole: "VC & Fundraising",
    company: "Partner, Peak XV Partners (Sequoia India)", years: 11, rating: 4.8, reviews: 61, sessions: 200,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    bio: "Rohan has led or participated in 30+ seed and Series A investments across SaaS, fintech, and climate-tech. He helps founders understand what top-tier VCs actually look for.",
    expertise: ["Fundraising Strategy", "Term Sheet Navigation", "Cap Table", "Investor Relations"],
    availability: "2 sessions / month", accent: "#2563EB", badge: "Investor Mentor",
  },
  {
    name: "Meera Iyer", specialization: "Operations", subRole: "COO & Scale Expert",
    company: "ex-COO, Zomato · Founder, OpScale Ventures", years: 16, rating: 4.95, reviews: 38, sessions: 95,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format",
    bio: "Meera scaled Zomato's operations from 50 to 5,000 cities before founding OpScale. She builds the operating infrastructure for high-growth startups facing rapid scale.",
    expertise: ["Operational Systems", "Hiring & Org Design", "Unit Economics", "Series B–C Scale"],
    availability: "3 sessions / month", accent: "#7C3AED", badge: "Scale Expert",
  },
  {
    name: "Vikram Sinha", specialization: "Technology", subRole: "CTO & Tech Architecture",
    company: "ex-CTO, Meesho · Founder, StackLabs", years: 12, rating: 4.75, reviews: 29, sessions: 80,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&auto=format",
    bio: "Vikram built and scaled Meesho's engineering team from 8 to 400 engineers. He advises early-stage founders on tech stack choices, architecture, and engineering hiring.",
    expertise: ["Tech Architecture", "Engineering Hiring", "Platform Scaling", "API Design"],
    availability: "3 sessions / month", accent: "#059669", badge: "Tech Leader",
  },
  {
    name: "Deepika Rao", specialization: "Finance", subRole: "Venture Capital & Climate Tech",
    company: "Partner, Blume Ventures", years: 9, rating: 4.85, reviews: 22, sessions: 60,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&auto=format",
    bio: "Deepika leads climate tech and deep tech investments at Blume Ventures. She is a passionate advocate for impact-driven entrepreneurship and sustainability-focused startups.",
    expertise: ["Climate Tech Investing", "Impact Startups", "Pre-Seed to Seed", "ESG Metrics"],
    availability: "2 sessions / month", accent: "#059669", badge: "Climate Investor",
  },
  {
    name: "Amit Joshi", specialization: "Business Strategy", subRole: "Logistics & Supply Chain",
    company: "Founder, LogiNext (exited) · Advisor", years: 15, rating: 4.8, reviews: 44, sessions: 145,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format",
    bio: "Amit founded and successfully exited LogiNext, a SaaS logistics platform serving 200+ enterprise clients. He now mentors B2B SaaS founders on GTM, pricing, and exit strategy.",
    expertise: ["B2B SaaS GTM", "Exit Strategy", "Enterprise Sales", "Pricing Models"],
    availability: "4 sessions / month", accent: "#DC2626", badge: "Startup Exited",
  },
  {
    name: "Priya Bansal", specialization: "Marketing", subRole: "Brand & Growth Marketing",
    company: "ex-CMO, Nykaa · Founder, GrowthLab", years: 13, rating: 4.9, reviews: 55, sessions: 180,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
    bio: "Priya led Nykaa's brand and digital marketing through its IPO journey. She now helps consumer brands and D2C startups build memorable brands and scalable acquisition engines.",
    expertise: ["Brand Building", "D2C Strategy", "Digital Marketing", "IPO Readiness"],
    availability: "3 sessions / month", accent: "#E11D48", badge: "Brand Expert",
  },
  {
    name: "Suresh Krishnamurthy", specialization: "Legal", subRole: "Startup Legal & Compliance",
    company: "Partner, Nishith Desai Associates", years: 18, rating: 4.7, reviews: 33, sessions: 110,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    bio: "Suresh has advised 150+ startups on DPIIT registration, FEMA compliance, term sheets, cap table design, and IP strategy. He simplifies legal complexity for founders.",
    expertise: ["Startup Legal", "FEMA & RBI Compliance", "Term Sheets", "IP Strategy"],
    availability: "2 sessions / month", accent: "#0891B2", badge: "Legal Expert",
  },
  {
    name: "Nalini Sharma", specialization: "Startup Growth", subRole: "Growth Hacking & Retention",
    company: "Head of Growth, Razorpay · ex-Flipkart", years: 10, rating: 4.88, reviews: 41, sessions: 130,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&auto=format",
    bio: "Nalini has driven growth loops at Flipkart and Razorpay — building acquisition, activation, and retention systems that scaled to millions of users. She now advises B2C and fintech startups.",
    expertise: ["Growth Loops", "Retention Engineering", "A/B Testing", "Fintech Growth"],
    availability: "4 sessions / month", accent: "#7C3AED", badge: "Growth Expert",
  },
];

const SPEC_ICONS: Record<string, React.ElementType> = {
  "Business Strategy": Briefcase,
  "Finance": TrendingUp,
  "Marketing": Lightbulb,
  "Technology": Building2,
  "Startup Growth": Star,
  "Operations": Users,
  "Legal": Award,
  "Deep Tech": Globe,
  "Climate Tech": Globe,
};

function MentorCard({ mentor, onConnectClick }: { mentor: typeof MENTORS[0]; onConnectClick: (name: string) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="h-1.5" style={{ background: mentor.accent }} />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-xl object-cover bg-muted shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-700 text-foreground leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{mentor.name}</h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: mentor.accent }}>{mentor.subRole}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{mentor.company}</p>
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-1 rounded-full shrink-0" style={{ color: mentor.accent, background: `${mentor.accent}12`, border: `1px solid ${mentor.accent}30` }}>{mentor.badge}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{mentor.bio}</p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.expertise.map((e) => (
            <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{e}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-border mb-4 text-center">
          <div>
            <div className="text-sm font-700 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{mentor.years}y</div>
            <div className="text-[10px] text-muted-foreground font-mono">Experience</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-0.5">
              <Star size={11} fill={mentor.accent} style={{ color: mentor.accent }} />
              <span className="text-sm font-700 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{mentor.rating}</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">{mentor.reviews} reviews</div>
          </div>
          <div>
            <div className="text-sm font-700 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{mentor.sessions}</div>
            <div className="text-[10px] text-muted-foreground font-mono">Sessions</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} /> {mentor.availability}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2.5">
          <button
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="flex-1 py-2.5 rounded-full text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5"
            style={{ borderColor: mentor.accent, color: hov ? "#fff" : mentor.accent, background: hov ? mentor.accent : "transparent" }}
          >
            View Profile
          </button>
          <button
            onClick={() => onConnectClick(mentor.name)}
            className="flex-1 py-2.5 rounded-full text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90"
            style={{ background: mentor.accent }}
          >
            Connect with Notes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Mentorship() {
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");

  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleConnectClick = (name: string) => {
    setSelectedMentor(name);
    setShowLoginModal(true);
  };

  const filtered = MENTORS.filter((m) => {
    const matchSpec = activeSpec === "All" || m.specialization === activeSpec;
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.subRole.toLowerCase().includes(search.toLowerCase()) || m.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()));
    return matchSpec && matchSearch;
  });

  return (
    <div className="min-h-screen bg-muted/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Page hero */}
      <div className="bg-white border-b border-border py-14 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border font-medium text-primary border-orange-200 bg-orange-50 mb-4">Expert Mentorship</span>
          <h1 className="text-[clamp(40px,6vw,80px)] font-800 uppercase leading-tight text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Meet Your <span className="text-primary">Mentors.</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Vetted domain experts across business, finance, technology, marketing, and operations — ready to accelerate your journey.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: `${MENTORS.length}+`, label: "Active Mentors" },
              { value: "2,400+", label: "Sessions Completed" },
              { value: "4.85", label: "Avg. Rating" },
              { value: "6", label: "Specializations" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-800 text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</div>
                <div className="text-xs text-muted-foreground font-mono">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, role, or expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-white text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Specialization filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SPECIALIZATIONS.map((spec) => {
            const Icon = SPEC_ICONS[spec] ?? Users;
            return (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all",
                  activeSpec === spec ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary bg-white"
                )}
              >
                {spec !== "All" && <Icon size={12} />}
                {spec}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground font-mono mb-6">{filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Mentor grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m) => (
              <MentorCard key={m.name} mentor={m} onConnectClick={handleConnectClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No mentors match your search. Try a different keyword or category.</p>
            <button onClick={() => { setSearch(""); setActiveSpec("All"); }} className="mt-4 text-sm text-primary hover:underline font-semibold">
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-white border-2 border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-800 uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Ready to get matched?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Register your business now to get matched with our expert mentors.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/register" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 text-sm shadow-md shadow-orange-100">
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Login & Connection Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-border shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Connect with {selectedMentor}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Send a personalized connection request. Please write a brief note about your startup and the guidance you need.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Personal Note</label>
                  <textarea
                    rows={3}
                    placeholder="E.g., Hi, I am building a logistics SaaS and need help with enterprise pricing strategy..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50/50"
                  />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
                    <p className="text-xs font-semibold text-orange-800">Authentication Required</p>
                    <p className="text-[11px] text-orange-700 mt-0.5">You must be logged in to send a request. Please sign in below.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 mt-6">
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    setSelectedMentor(null);
                    setNotes("");
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!notes.trim()) {
                      alert("Please enter a note for the mentor.");
                      return;
                    }
                    if (!loginEmail.trim() || !loginPassword.trim()) {
                      alert("Please enter your email and password to log in.");
                      return;
                    }
                    alert(`Successfully logged in! Connection request with notes sent to ${selectedMentor}.`);
                    setShowLoginModal(false);
                    setSelectedMentor(null);
                    setNotes("");
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="flex-1 bg-primary text-white font-semibold py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Log In &amp; Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
