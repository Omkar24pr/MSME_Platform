import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight, ChevronDown, CheckCircle2, Users, Zap, BarChart3,
  Shield, Phone, Mail, MapPin, Brain, Award, Lock, ChevronRight,
  Target, Rocket, Heart, Star, Lightbulb, Briefcase, Building2,
  GraduationCap, Megaphone, BookOpen, ExternalLink, Calendar,
  Linkedin, Facebook, Instagram, Twitter, HelpCircle,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";

const IIT_KGP_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/120px-IIT_Kharagpur_Logo.svg.png";
const CAMPUS_IMAGE = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&h=600&fit=crop&auto=format";
const CAMPUS_IMAGE2 = "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=400&fit=crop&auto=format";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let val = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      val = Math.min(val + step, target);
      setCount(val);
      if (val >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

// ── Psychometric data ──────────────────────────────────────────────────────────

const DIMENSIONS = [
  { name: "Entrepreneurial Drive", color: "#F97316", icon: Rocket },
  { name: "Risk Tolerance", color: "#2563EB", icon: Target },
  { name: "Leadership", color: "#7C3AED", icon: Users },
  { name: "Innovation", color: "#059669", icon: Lightbulb },
  { name: "Execution Focus", color: "#DC2626", icon: Zap },
];

const PSYCH_QUESTIONS = [
  { id: 1, dim: 0, text: "I am willing to dedicate 3–5 years of focused effort before expecting significant financial returns from my startup." },
  { id: 2, dim: 0, text: "When I encounter a major setback, I recover quickly and use it as learning fuel rather than a reason to quit." },
  { id: 3, dim: 0, text: "I actively seek out problems worth solving, rather than waiting for opportunities to come to me." },
  { id: 4, dim: 0, text: "Building something meaningful matters more to me than the security of a predictable salary." },
  { id: 5, dim: 1, text: "I am comfortable making decisions with incomplete information when timing is critical." },
  { id: 6, dim: 1, text: "I would leave a well-paying job to pursue a startup idea I strongly believe in, even without funding." },
  { id: 7, dim: 1, text: "I view financial risk as a calculated variable to manage, not an emotion to fear." },
  { id: 8, dim: 1, text: "I have made a significant personal or professional bet in the past that others considered risky — and I stand by it." },
  { id: 9, dim: 2, text: "People naturally look to me for direction in ambiguous or high-pressure situations." },
  { id: 10, dim: 2, text: "I give credit generously and take responsibility for team failures without deflecting blame." },
  { id: 11, dim: 2, text: "I can recruit people better than me in specific domains and keep them motivated without micromanaging." },
  { id: 12, dim: 2, text: "I adapt my communication style based on who I am speaking to — investor, engineer, customer, or recruit." },
  { id: 13, dim: 3, text: "I regularly challenge assumptions that most people in my field take for granted." },
  { id: 14, dim: 3, text: "I look for inspiration outside my domain and apply cross-industry patterns to new problems." },
  { id: 15, dim: 3, text: "I have proposed or implemented an idea that others initially dismissed but later acknowledged as valuable." },
  { id: 16, dim: 3, text: "I am energized by constraints — limited budgets or resources make me more creative, not less." },
  { id: 17, dim: 4, text: "I break large ambiguous goals into concrete weekly milestones and hold myself accountable to them." },
  { id: 18, dim: 4, text: "I ship imperfect work on time rather than perfect work late, and iterate based on real feedback." },
  { id: 19, dim: 4, text: "I ruthlessly prioritize the top 20% of tasks that produce 80% of the impact." },
  { id: 20, dim: 4, text: "I track key metrics weekly and adjust my approach based on data, not gut feel alone." },
];

const PASS_THRESHOLD = 70;

// ── Static data ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Briefcase, id: "consultancy", label: "Business Consultancy", color: "#7C3AED",
    desc: "Strategic advisory for business model design, market entry, and operational excellence.",
    link: "/services/consultancy",
  },
  {
    icon: Users, id: "mentorship", label: "Mentorship", color: "#F97316",
    desc: "Get matched 1-on-1 with domain experts who have built and scaled businesses like yours.",
    link: "/mentorship",
  },
  {
    icon: GraduationCap, id: "training", label: "Training", color: "#2563EB",
    desc: "Structured learning programs, workshops, and bootcamps tailored for MSMEs and founders.",
    link: "/services/training",
  },
  {
    icon: Lightbulb, id: "marketing", label: "Marketing Support", color: "#059669",
    desc: "GTM strategy, branding, digital marketing, and customer acquisition frameworks.",
    link: "/services/marketing",
  },
  {
    icon: Building2, id: "technology", label: "Technology Support", color: "#DC2626",
    desc: "Tech stack guidance, CTO advisory, digital transformation, and product architecture.",
    link: "/services/technology",
  },
];

const ARTICLES = [
  {
    id: 1, title: "How to Structure Your First MSME for Tax Benefits",
    date: "June 18, 2026", category: "Finance",
    summary: "A practical guide to entity types, DPIIT registration, and the tax exemptions available to early-stage MSMEs in India.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop&auto=format",
    author: "Ananya Krishnan",
  },
  {
    id: 2, title: "The 5 GTM Mistakes Every Startup Makes in Year One",
    date: "June 10, 2026", category: "Marketing",
    summary: "From targeting too broad to skipping customer discovery — here are the most common go-to-market errors and how to avoid them.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format",
    author: "Rohan Agarwal",
  },
  {
    id: 3, title: "Building Resilient Operations: Lessons from Scaling to 5,000 Cities",
    date: "June 3, 2026", category: "Operations",
    summary: "How Zomato built its operational muscle and what MSMEs can learn from hyper-growth playbooks at any stage.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop&auto=format",
    author: "Meera Iyer",
  },
];

const NOTICES = [
  {
    id: 1, tag: "Government Scheme", title: "SIDBI MSME Loan Scheme — FY 2026-27 Applications Open",
    date: "June 20, 2026", pinned: true,
    desc: "The Small Industries Development Bank of India has opened applications for its MSME growth loan scheme with interest rates starting at 7.5% p.a.",
  },
  {
    id: 2, tag: "Training Program", title: "Digital Marketing Bootcamp — July 12–14, 2026",
    date: "June 15, 2026", pinned: false,
    desc: "3-day intensive workshop covering SEO, paid ads, content strategy, and analytics for MSME owners. Limited to 40 participants.",
  },
  {
    id: 3, tag: "Upcoming Workshop", title: "Funding Readiness Workshop with Peak XV Partners",
    date: "June 12, 2026", pinned: false,
    desc: "Learn what institutional investors look for and how to prepare your pitch, cap table, and financials for a Series A conversation.",
  },
  {
    id: 4, tag: "Funding Opportunity", title: "Startup India Seed Fund — ₹20L Grants for Early-Stage Founders",
    date: "June 8, 2026", pinned: false,
    desc: "DPIIT-recognized startups can apply for non-dilutive seed funding under the Startup India Seed Fund Scheme. Applications close July 31.",
  },
];

const STATS = [
  { value: 280, suffix: "+", label: "Startups Supported" },
  { value: 91, suffix: "%", label: "Seed Round Success Rate" },
  { value: 1.6, suffix: "B", label: "Portfolio Valuation (USD)" },
  { value: 18, suffix: "+", label: "Years of Legacy" },
];

const TESTIMONIALS = [
  { quote: "The consultancy team helped us identify a GTM blind spot we'd missed for 6 months. Revenue doubled in Q2.", name: "Aditya Sharma", title: "Co-founder, Volt Systems", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format", stars: 5 },
  { quote: "Coming from research, building a company felt alien. MSME Growth Hub made every step systematic. Seed closed in 3 months.", name: "Riya Bose", title: "Founder, NeuralDraft", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&auto=format", stars: 5 },
  { quote: "The psychometric test matched me with the perfect mentor. The level of alignment was impressive.", name: "Karan Mehrotra", title: "Co-founder, Fintrack", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format", stars: 5 },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function Tag({ children, color = "#F97316" }: { children: string; color?: string }) {
  return (
    <span className="inline-block font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border font-medium" style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
      {children}
    </span>
  );
}

function SectionHeading({ tag, tagColor, title, highlight }: { tag: string; tagColor?: string; title: string; highlight?: string }) {
  return (
    <div className="mb-12 text-center">
      <Tag color={tagColor}>{tag}</Tag>
      <h2 className="mt-4 text-[clamp(32px,5vw,60px)] font-800 uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {title}{highlight && <> <span className="text-primary">{highlight}</span></>}
      </h2>
    </div>
  );
}

function StatCard({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const isDecimal = value % 1 !== 0;
  const intTarget = isDecimal ? Math.floor(value * 10) : value;
  const count = useCountUp(intTarget, 1600, started);
  const display = isDecimal ? (count / 10).toFixed(1) : count;
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-800 leading-none text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{display}{suffix}</div>
      <div className="mt-2 text-xs text-muted-foreground tracking-widest uppercase font-mono">{label}</div>
    </div>
  );
}

// ── Psychometric Test ──────────────────────────────────────────────────────────

type TestPhase = "intro" | "test" | "result";

function PsychometricTest({ onQualify }: { onQualify: () => void }) {
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [dimScores, setDimScores] = useState<number[]>([]);

  const totalQ = PSYCH_QUESTIONS.length;
  const q = PSYCH_QUESTIONS[current];
  const dim = DIMENSIONS[q?.dim ?? 0];
  const DimIcon = dim?.icon ?? Brain;

  const handleAnswer = (val: number) => {
    const newAnswers = { ...answers, [PSYCH_QUESTIONS[current].id]: val };
    setAnswers(newAnswers);
    if (current < totalQ - 1) {
      setTimeout(() => setCurrent(current + 1), 220);
    } else {
      const dims = [0, 0, 0, 0, 0];
      const dimCount = [0, 0, 0, 0, 0];
      PSYCH_QUESTIONS.forEach((q) => { dims[q.dim] += newAnswers[q.id] ?? 0; dimCount[q.dim]++; });
      const normalized = dims.map((s, i) => Math.round((s / (dimCount[i] * 5)) * 20));
      setDimScores(normalized);
      setScore(normalized.reduce((a, b) => a + b, 0));
      setPhase("result");
    }
  };

  if (phase === "intro") return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
        <Brain size={30} className="text-primary" />
      </div>
      <h3 className="text-3xl font-800 uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Founder Psychometric Assessment</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg mx-auto">
        20 questions across 5 entrepreneurial dimensions. Score <strong className="text-foreground">70+</strong> out of 100 to unlock our expert mentor network.
      </p>
      <div className="grid grid-cols-5 gap-3 mb-8">
        {DIMENSIONS.map((d) => { const DIcon = d.icon; return (
          <div key={d.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card">
            <DIcon size={18} style={{ color: d.color }} />
            <span className="text-[10px] font-mono text-center text-muted-foreground leading-tight">{d.name}</span>
          </div>
        ); })}
      </div>
      <button onClick={() => setPhase("test")} className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity">
        Begin Assessment <ArrowRight size={16} />
      </button>
      <p className="text-xs text-muted-foreground mt-4 font-mono">Free · No signup required · Results instant</p>
    </div>
  );

  if (phase === "result") {
    const passed = score >= PASS_THRESHOLD;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-4" style={{ borderColor: passed ? "#F97316" : "#94A3B8" }}>
            <span className="text-4xl font-800 leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: passed ? "#F97316" : "#64748B" }}>{score}</span>
            <span className="text-xs text-muted-foreground font-mono">/100</span>
          </div>
          {passed ? (
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-5 py-2 text-sm font-semibold">
              <Award size={16} /> Qualified for Mentorship
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-full px-5 py-2 text-sm font-semibold">
              <Lock size={16} /> Score {PASS_THRESHOLD - score} more points to qualify
            </div>
          )}
        </div>
        <div className="space-y-3 mb-8">
          {DIMENSIONS.map((d, i) => { const DIcon = d.icon; return (
            <div key={d.name} className="flex items-center gap-4">
              <DIcon size={16} style={{ color: d.color }} className="shrink-0" />
              <span className="text-sm text-foreground w-36 shrink-0">{d.name}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(dimScores[i] / 20) * 100}%`, background: d.color }} />
              </div>
              <span className="text-sm font-mono font-semibold text-foreground w-10 text-right">{dimScores[i]}/20</span>
            </div>
          ); })}
        </div>
        <div className="flex gap-3 justify-center">
          {passed ? (
            <button onClick={onQualify} className="flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity">
              Meet Your Mentors <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={() => { setPhase("intro"); setCurrent(0); setAnswers({}); }} className="flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary/40 transition-colors">
              Retake Assessment
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground">Question {current + 1} of {totalQ}</span>
        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: dim.color }} />{dim.name}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full mb-8 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(current / totalQ) * 100}%`, background: dim.color }} />
      </div>
      <div className="bg-card border border-border rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <DimIcon size={18} style={{ color: dim.color }} />
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: dim.color }}>{dim.name}</span>
        </div>
        <p className="text-xl font-semibold text-foreground leading-snug">{q.text}</p>
      </div>
      <div className="space-y-2.5">
        {([
          [5, "Strongly Agree", "This is very true of me"],
          [4, "Agree", "Mostly true of me"],
          [3, "Neutral", "Somewhat true, somewhat not"],
          [2, "Disagree", "Mostly not true of me"],
          [1, "Strongly Disagree", "This is not true of me"],
        ] as [number, string, string][]).map(([val, label, sub]) => (
          <button key={val} onClick={() => handleAnswer(val)}
            className={cn("w-full flex items-center justify-between px-5 py-3.5 rounded-xl border text-left transition-all duration-150", answers[q.id] === val ? "border-2 bg-primary/15" : "border-border/40 bg-card hover:border-primary/40 hover:bg-primary/5")}
            style={answers[q.id] === val ? { borderColor: dim.color } : {}}
          >
            <div>
              <div className="text-sm font-semibold text-foreground">{label}</div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={answers[q.id] === val ? { borderColor: dim.color, background: dim.color } : { borderColor: "#CBD5E1" }}>
              {answers[q.id] === val && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>
      {current > 0 && <button onClick={() => setCurrent(current - 1)} className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to previous question</button>}
    </div>
  );
}

// ── Home ───────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const [statsStarted, setStatsStarted] = useState(false);
  const [mentorUnlocked, setMentorUnlocked] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const mentorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const { t } = useLang();

  const handleQualify = () => {
    setMentorUnlocked(true);
    setTimeout(() => mentorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  return (
    <>
      {/* ── ABOUT US ── */}
      <section id="about" className="py-16 px-6 bg-transparent border-b border-border/40">
        {/* IIT KGP affiliation banner */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="flex flex-wrap items-center gap-4 glass-card rounded-2xl px-6 py-4">
            <img src={IIT_KGP_LOGO} alt="IIT Kharagpur Logo" className="h-14 w-14 object-contain shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">An Initiative of</div>
              <div className="text-xl font-800 uppercase text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Indian Institute of Technology Kharagpur
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Rajendra Mishra School of Engineering Entrepreneurship (RMSOEE)</div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["NAAC A++ Accredited", "QS World Rank #280", "Est. 1951"].map((tag) => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-card/85 text-muted-foreground border border-border/40">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Tag color="#2563EB">{t.about_tag}</Tag>
            <h2 className="mt-4 text-[clamp(32px,5vw,56px)] font-800 uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {t.about_heading}<br />
              <span className="text-neon-gradient">{t.about_highlight}</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed max-w-lg">{t.about_body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-md shadow-primary/20">
                {t.about_join} <ArrowRight size={15} />
              </Link>
              <button onClick={() => scrollTo("#services")} className="inline-flex items-center gap-2 border-2 border-accent/60 text-accent font-semibold px-6 py-2.5 rounded-full hover:bg-accent/15 transition-colors text-sm">
                {t.about_services}
              </button>
            </div>

            {/* Feature grid removed from here */}
          </div>

          {/* IIT KGP campus images */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden h-80 bg-muted border border-border shadow-sm">
              <img src={CAMPUS_IMAGE2} alt="IIT Kharagpur institute building" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,30,80,0.60) 0%, transparent 60%)" }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm font-semibold">Rajendra Mishra School of Engineering Entrepreneurship</p>
                <p className="text-white/70 text-xs font-mono">Supporting 280+ startups since 2006</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "280+", label: "Startups Supported" },
                { value: "73+", label: "Years of Legacy" },
                { value: "₹1.6B", label: "Portfolio Value" },
              ].map(({ value, label }) => (
                <div key={label} className="glass-card rounded-xl p-4 text-center transition-all">
                  <div className="text-2xl font-800 text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 font-mono uppercase tracking-wider leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width 4-column feature row */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {[
            { icon: Shield, color: "#F97316" },
            { icon: Users, color: "#2563EB" },
            { icon: Zap, color: "#7C3AED" },
            { icon: Award, color: "#059669" },
          ].map(({ icon: Icon, color }, i) => (
            <div key={i} className="glass-card rounded-xl p-5 transition-all">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}12` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{t.about_cards[i].title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{t.about_cards[i].desc}</div>
            </div>
          ))}
        </div>
      </section>



      {/* ── SERVICES ── */}
      <section id="services" className="py-20 px-6 bg-transparent border-b border-border/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading tag={t.services_tag} tagColor="#3b82f6" title={t.services_heading} highlight={t.services_highlight} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="glass-card border-2 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group"
                  style={{ borderColor: `${svc.color}20` }}
                  onClick={() => svc.link.startsWith("/") && !svc.link.includes("#") ? navigate(svc.link) : scrollTo(svc.link.replace("/", ""))}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${svc.color}12` }}>
                    <Icon size={24} style={{ color: svc.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-700 uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{svc.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                  <button
                    className="mt-auto flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                    style={{ color: svc.color }}
                  >
                    Learn More <ChevronRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ── STATS ── */}
      <section className="py-16 px-6 border-b border-border/30 bg-transparent" ref={statsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((s) => <StatCard key={s.label} {...s} started={statsStarted} />)}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section id="articles" className="py-20 px-6 border-b border-border/30 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-12 gap-4 flex-wrap">
            <div>
              <Tag color="#3b82f6">{t.articles_tag}</Tag>
              <h2 className="mt-3 text-[clamp(32px,5vw,56px)] font-800 uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {t.articles_heading} <span className="text-neon-gradient">{t.articles_highlight}</span>
              </h2>
            </div>
            <Link to="/articles" className="mt-8 flex items-center gap-2 border-2 border-accent/60 text-accent font-semibold px-5 py-2 rounded-full hover:bg-accent/15 transition-colors text-sm shrink-0 self-end">
              More Articles <ExternalLink size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <article key={a.id} className="glass-card rounded-2xl overflow-hidden transition-all duration-300">
                <div className="h-44 bg-muted/20 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">{a.category}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Calendar size={10} /> {a.date}</span>
                  </div>
                  <h3 className="text-base font-700 text-foreground mb-2 leading-snug">{a.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{a.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">By {a.author}</span>
                    <Link to="/articles" className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES & EVENTS ── */}
      <section id="activities" className="py-20 px-6 border-b border-border/30 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-12 gap-4 flex-wrap">
            <div>
              <Tag color="#3b82f6">{t.activities_tag}</Tag>
              <h2 className="mt-3 text-[clamp(32px,5vw,56px)] font-800 uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {t.activities_heading} <span className="text-neon-gradient">Competitions.</span>
              </h2>
            </div>
            <Link to="/register" className="mt-8 flex items-center gap-2 border-2 border-primary/60 text-primary font-semibold px-5 py-2 rounded-full hover:bg-primary/10 transition-colors text-sm shrink-0 self-end">
              Register for Events <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { tag: "Workshop", title: "Digital Marketing Bootcamp for MSMEs", date: "July 12–14, 2026", location: "IIT Kharagpur · Online", seats: "40 seats", color: "#2563EB", registrations: 28 },
              { tag: "Startup Event", title: "IIT KGP Startup Pitch Competition 2026", date: "July 15, 2026", location: "IIT Kharagpur Campus", seats: "50 teams", color: "#F97316", registrations: 41 },
              { tag: "MSME Program", title: "MSME Export Readiness Program", date: "July 20–22, 2026", location: "Mumbai · Hybrid", seats: "60 seats", color: "#059669", registrations: 19 },
              { tag: "Investor Meet", title: "Series A Funding Readiness Workshop", date: "July 22, 2026", location: "Bangalore · IIT Alumni", seats: "30 seats", color: "#7C3AED", registrations: 27 },
              { tag: "Competition", title: "Women Entrepreneur Innovation Challenge", date: "Aug 5, 2026", location: "Online", seats: "Unlimited", color: "#DC2626", registrations: 85 },
              { tag: "Summit", title: "STEP-IITKGP Annual Entrepreneurship Summit", date: "Aug 20, 2026", location: "IIT Kharagpur", seats: "500 seats", color: "#0891B2", registrations: 210 },
            ].map((ev) => (
              <div key={ev.title} className="glass-card border-2 rounded-2xl p-6 transition-all duration-300" style={{ borderColor: `${ev.color}25` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: `${ev.color}12`, color: ev.color, border: `1px solid ${ev.color}25` }}>{ev.tag}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{ev.registrations} registered</span>
                </div>
                <h3 className="text-base font-700 text-foreground mb-3 leading-snug">{ev.title}</h3>
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar size={11} /> {ev.date}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={11} /> {ev.location}</div>
                </div>
                <button className="w-full py-2 rounded-xl border-2 text-sm font-semibold transition-colors hover:opacity-90" style={{ borderColor: ev.color, color: ev.color }}>
                  Register — {ev.seats}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS & COLLABORATORS ── */}
      <section className="py-16 px-6 border-b border-border/30 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <Tag color="#6366f1">{t.partners_tag}</Tag>
            <h2 className="mt-3 text-[clamp(24px,4vw,44px)] font-800 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {t.partners_heading} <span className="text-neon-gradient">{t.partners_sub}</span>
            </h2>
          </div>

          {/* IIT KGP featured prominently */}
          <div className="glass-card rounded-2xl border-2 border-primary/30 p-6 mb-6 flex flex-wrap items-center gap-6">
            <img src={IIT_KGP_LOGO} alt="IIT Kharagpur Logo" className="h-16 w-16 object-contain shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono uppercase tracking-widest text-primary mb-1">Primary Institution Partner</div>
              <div className="text-xl font-800 uppercase text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Indian Institute of Technology Kharagpur
              </div>
              <p className="text-xs text-muted-foreground mt-1">Rajendra Mishra School of Engineering Entrepreneurship (RMSOEE) · Ranked #1 in India (NIRF 2024)</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] bg-primary/10 border border-primary/30 text-primary px-2.5 py-1 rounded-full font-semibold">Founding Institution</span>
              <span className="text-[10px] bg-accent/10 border border-accent/30 text-accent px-2.5 py-1 rounded-full font-semibold">Est. 1951</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Startup India", type: "Government", color: "#F97316" },
              { name: "BIRAC", type: "Govt Body", color: "#059669" },
              { name: "MSME Ministry", type: "Government", color: "#DC2626" },
              { name: "TiE India", type: "Incubator", color: "#7C3AED" },
              { name: "NASSCOM", type: "Industry", color: "#0891B2" },
              { name: "SIDBI", type: "Finance", color: "#D97706" },
            ].map((p) => (
              <div key={p.name} className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}12` }}>
                  <Building2 size={20} style={{ color: p.color }} />
                </div>
                <span className="text-sm font-semibold text-foreground text-center leading-tight">{p.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTICE BOARD ── */}
      <section id="notices" className="py-20 px-6 border-b border-border/30 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
            <div>
              <Tag color="#6366f1">{t.notices_tag}</Tag>
              <h2 className="mt-3 text-[clamp(32px,5vw,56px)] font-800 uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {t.notices_heading} <span className="text-accent text-neon-gradient">{t.notices_sub}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-8 self-end">
              <Megaphone size={18} className="text-purple-600" />
              <span className="text-xs text-muted-foreground font-mono">Updated regularly</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {NOTICES.map((n) => (
              <div key={n.id} className="glass-card border-2 rounded-2xl p-6 transition-all" style={{ borderColor: n.pinned ? "rgba(59, 130, 246, 0.4)" : "rgba(255,255,255,0.08)" }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(99, 102, 241, 0.12)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.25)" }}>{n.tag}</span>
                    {n.pinned && <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">Pinned</span>}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">{n.date}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">{n.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{n.desc}</p>
                <button className="flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                  View Details <ExternalLink size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand + contact */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3.5 mb-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 w-fit">
                <img src={IIT_KGP_LOGO} alt="IIT Kharagpur" className="h-10 w-10 object-contain filter brightness-0 invert"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="h-8 w-[1px] bg-white/20" />
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  <div className="text-[8px] font-mono text-white/50 uppercase tracking-widest leading-none">RMSOEE</div>
                  <div className="text-lg font-800 text-white leading-tight uppercase">MSME <span className="text-primary">GROWTH HUB</span></div>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed mb-5">{t.footer_tagline}</p>
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, text: "RMSOEE, IIT Kharagpur, West Bengal — 721302" },
                  { icon: Phone, text: "Emergency: 1800-111-0001" },
                  { icon: Phone, text: "Support: +91 3222-282-000" },
                  { icon: Mail, text: "msme@iitkgp.ac.in" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2 text-xs text-white/60">
                    <Icon size={12} className="shrink-0 mt-0.5 text-primary" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">{t.footer_quick}</div>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", href: "/#about" },
                  { label: "Services", href: "/services" },
                  { label: "Mentorship", href: "/mentorship" },
                  { label: "Schemes & Support", href: "/schemes" },
                  { label: "Resources Hub", href: "/resources" },
                  { label: "Finance & Loans", href: "/finance" },
                  { label: "Articles", href: "/articles" },
                ].map(({ label, href }) => (
                  <li key={label}><Link to={href} className="text-sm text-white/60 hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Services</div>
              <ul className="space-y-2.5">
                {["Mentorship", "Training Programs", "Business Consultancy", "Marketing Support", "Technology Support", "Legal Support", "Financial Advisory", "Govt Scheme Assistance"].map((link) => (
                  <li key={link}><a href="/#services" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">{t.footer_connect}</div>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
                  { icon: Facebook, label: "Facebook", color: "#1877F2" },
                  { icon: Instagram, label: "Instagram", color: "#E4405F" },
                  { icon: Twitter, label: "Twitter/X", color: "#1DA1F2" },
                ].map(({ icon: Icon, label, color }) => (
                  <a key={label} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title={label}>
                    <Icon size={16} className="text-white" />
                  </a>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xs font-semibold text-white mb-1 flex items-center gap-2">
                  <HelpCircle size={13} className="text-primary" /> {t.footer_helpline}
                </div>
                <div className="text-lg font-800 text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>1800-111-0001</div>
                <div className="text-[10px] text-white/40 font-mono mt-0.5">{t.footer_tollfree}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">{t.footer_copyright}</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
              <div className="flex items-center gap-1.5">
                <Heart size={11} className="text-primary" fill="#F97316" />
                <span>{t.footer_made}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


