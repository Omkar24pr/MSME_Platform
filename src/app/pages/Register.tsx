import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  GraduationCap,
  CheckCircle2,
  Building2,
  Briefcase,
  Lightbulb,
  User,
  MapPin,
  ShieldCheck,
  Brain,
  Award,
  Sparkles,
} from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

type Role = "mentor" | "entrepreneur" | "trainee" | null;
type Step = "role" | "basic" | "details" | "services" | "psychometric" | "summary";

const EXPERTISE_OPTIONS = [
  "Startup Strategy",
  "Business Consultancy",
  "Marketing Support",
  "Technology Support",
  "Fundraising",
  "Finance",
  "Legal & Compliance",
  "Product Development",
  "MSME Growth",
  "AI / Deep Tech",
  "SaaS",
  "Operations",
];

const INDUSTRIES = [
  "Agri-Tech",
  "Climate Tech",
  "Consumer",
  "Deep Tech / AI",
  "EdTech",
  "FinTech",
  "HealthTech",
  "Manufacturing",
  "Retail / E-commerce",
  "SaaS / B2B",
  "Social Impact",
  "Other",
];

const BUSINESS_STAGES = [
  "Idea / Pre-MVP",
  "Prototype",
  "MVP Built",
  "Early Traction",
  "Revenue Generating",
  "Scaling",
  "Funded",
];

const ENTREPRENEUR_TYPES = [
  { value: "solo_founder", label: "Solo Founder", icon: User },
  { value: "startup_founder", label: "Startup Founder", icon: Lightbulb },
  { value: "msme_owner", label: "MSME Owner", icon: Building2 },
  { value: "business_owner", label: "Business Owner", icon: Briefcase },
];

const TRAINEE_TYPES = [
  { value: "student", label: "Student", icon: GraduationCap },
  { value: "researcher", label: "Researcher", icon: GraduationCap },
  { value: "working_professional", label: "Working Professional", icon: User },
  { value: "idea_explorer", label: "Idea Explorer", icon: Lightbulb },
];

const SERVICES_OPTIONS = [
  { id: "mentorship", label: "Mentorship", desc: "1-on-1 guidance from domain experts", icon: Users },
  { id: "training", label: "Training", desc: "Structured programs and workshops", icon: GraduationCap },
  { id: "consultancy", label: "Business Consultancy", desc: "Strategy and business model advisory", icon: Briefcase },
  { id: "marketing", label: "Marketing Support", desc: "GTM, branding, and growth marketing", icon: Lightbulb },
  { id: "technology", label: "Technology Support", desc: "Tech stack, architecture, and CTO advisory", icon: Building2 },
];

const TRAINEE_SUPPORT_OPTIONS = [
  { id: "mentorship", label: "Mentorship", desc: "Guidance from mentors", icon: Users },
  { id: "training", label: "Training", desc: "Learning programs and workshops", icon: GraduationCap },
  { id: "idea_validation", label: "Idea Validation", desc: "Check if your idea is practical", icon: Lightbulb },
  { id: "technology_guidance", label: "Technology Guidance", desc: "Understand how to build your idea", icon: Building2 },
  { id: "startup_guidance", label: "Startup Guidance", desc: "Learn how to start and grow", icon: Briefcase },
];

// Psychometric Questions (10 Behavioral, 10 Business Orientation)
interface PsychQuestion {
  id: number;
  section: "Behavioral" | "Business";
  trait: string;
  text: string;
}

const PSYCH_QUESTIONS: PsychQuestion[] = [
  // Behavioral Assessment
  { id: 1, section: "Behavioral", trait: "Leadership", text: "I naturally take charge of team projects and guide others toward a shared vision." },
  { id: 2, section: "Behavioral", trait: "Teamwork", text: "I value collaboration and ensure everyone's voices are heard during team discussions." },
  { id: 3, section: "Behavioral", trait: "Communication", text: "I can explain complex ideas clearly to people from diverse backgrounds." },
  { id: 4, section: "Behavioral", trait: "Adaptability", text: "I adjust quickly when plans change unexpectedly and stay productive." },
  { id: 5, section: "Behavioral", trait: "Problem-solving", text: "I enjoy breaking down difficult challenges into actionable steps." },
  { id: 6, section: "Behavioral", trait: "Decision-making", text: "I make logical, timely decisions even when under stress." },
  { id: 7, section: "Behavioral", trait: "Emotional intelligence", text: "I am empathetic and can manage my emotions effectively during conflicts." },
  { id: 8, section: "Behavioral", trait: "Time management", text: "I prioritize tasks effectively to meet deadlines." },
  { id: 9, section: "Behavioral", trait: "Learning attitude", text: "I actively seek feedback and continuously work on self-improvement." },
  { id: 10, section: "Behavioral", trait: "Responsibility", text: "I take full ownership of mistakes and follow through on my commitments." },

  // Business Orientation Assessment
  { id: 11, section: "Business", trait: "Entrepreneurial mindset", text: "I constantly look for new business opportunities in everyday challenges." },
  { id: 12, section: "Business", trait: "Risk-taking ability", text: "I am willing to take calculated risks for potential long-term rewards." },
  { id: 13, section: "Business", trait: "Innovation", text: "I like finding unique, creative solutions rather than standard approaches." },
  { id: 14, section: "Business", trait: "Business planning", text: "I structure goals with clear plans and realistic milestones." },
  { id: 15, section: "Business", trait: "Financial awareness", text: "I manage budgets carefully and understand basic cash flow principles." },
  { id: 16, section: "Business", trait: "Customer orientation", text: "I prioritize understanding customer needs and feedback above all." },
  { id: 17, section: "Business", trait: "Market understanding", text: "I follow industry trends and analyze competitors to find market gaps." },
  { id: 18, section: "Business", trait: "Strategic thinking", text: "I focus on long-term vision rather than just immediate gains." },
  { id: 19, section: "Business", trait: "Resource management", text: "I organize people, tools, and budgets efficiently to scale." },
  { id: 20, section: "Business", trait: "Growth mindset", text: "I believe effort and learning can overcome any initial lack of business experience." },
];

const generateProfileSummary = (behavioralScore: number, businessScore: number) => {
  const avgB = behavioralScore;
  const avgBus = businessScore;
  if (avgB >= 40 && avgBus >= 40) {
    return "Balanced Founder-Operator: Equipped with robust team leadership, high emotional intelligence, and a sharp entrepreneurial business focus. Highly suited for fast-track scaling.";
  } else if (avgBus >= 40) {
    return "Strategic Business Visionary: Strong entrepreneurial drive and high risk-taking ability. Excellent at business planning and market analysis, but could focus on team dynamics.";
  } else if (avgB >= 40) {
    return "People-Centric Execution Leader: Exceptional communication, adaptability, and emotional intelligence. Highly effective in leadership and team collaboration, but could refine financial awareness.";
  } else {
    return "Developing Aspiring Entrepreneur: Foundations are developing. Would benefit greatly from core mentorship and educational workshops to build business confidence.";
  }
};

interface BasicForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
}

interface MentorForm {
  organization: string;
  designation: string;
  experience: string;
  expertise: string[];
  availability: string;
  linkedin: string;
  bio: string;
}

interface EntrepreneurForm {
  entrepreneurType: string;
  businessName: string;
  industry: string;
  stage: string;
  teamSize: string;
  revenueStatus: string;
  website: string;
  businessProblem: string;
}

interface TraineeForm {
  traineeType: string;
  educationOrBackground: string;
  institution: string;
  interestArea: string;
  ideaStatus: string;
  learningGoal: string;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => (
  <div>
    <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => (
  <div>
    <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <textarea
      rows={4}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
    />
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>(null);
  const [services, setServices] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  // Psychometric Assessment State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({ behavioral: 0, business: 0, overall: 0, summary: "" });

  const [basicForm, setBasicForm] = useState<BasicForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [mentorForm, setMentorForm] = useState<MentorForm>({
    organization: "",
    designation: "",
    experience: "",
    expertise: [],
    availability: "",
    linkedin: "",
    bio: "",
  });

  const [entrepreneurForm, setEntrepreneurForm] = useState<EntrepreneurForm>({
    entrepreneurType: "",
    businessName: "",
    industry: "",
    stage: "",
    teamSize: "",
    revenueStatus: "",
    website: "",
    businessProblem: "",
  });

  const [traineeForm, setTraineeForm] = useState<TraineeForm>({
    traineeType: "",
    educationOrBackground: "",
    institution: "",
    interestArea: "",
    ideaStatus: "",
    learningGoal: "",
  });

  const toggleExpertise = (tag: string) => {
    setMentorForm((f) => ({
      ...f,
      expertise: f.expertise.includes(tag)
        ? f.expertise.filter((e) => e !== tag)
        : [...f.expertise, tag],
    }));
  };

  const toggleService = (id: string) => {
    setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const handleBack = () => {
    if (step === "basic") setStep("role");
    if (step === "details") setStep("basic");
    if (step === "services") setStep("details");
    if (step === "psychometric") {
      if (currentQIndex > 0) {
        setCurrentQIndex(currentQIndex - 1);
      } else {
        setStep("services");
      }
    }
  };

  const handleFormSubmit = () => {
    // Navigate to mandatory psychometric test
    setStep("psychometric");
    setCurrentQIndex(0);
  };

  const handleAnswerSelect = (scoreValue: number) => {
    const q = PSYCH_QUESTIONS[currentQIndex];
    const newAnswers = { ...answers, [q.id]: scoreValue };
    setAnswers(newAnswers);

    if (currentQIndex < PSYCH_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handleAssessmentSubmit = () => {
    // Calculate Scores
    let behavioralTotal = 0;
    let businessTotal = 0;

    PSYCH_QUESTIONS.forEach((q) => {
      const val = answers[q.id] || 3; // default to neutral if unanswered
      if (q.section === "Behavioral") {
        behavioralTotal += val;
      } else {
        businessTotal += val;
      }
    });

    const overallTotal = behavioralTotal + businessTotal;
    const summaryText = generateProfileSummary(behavioralTotal, businessTotal);

    setScores({
      behavioral: behavioralTotal,
      business: businessTotal,
      overall: overallTotal,
      summary: summaryText,
    });

    // Save in Simulated DB (Local Storage)
    const userRoleDetails = role === "mentor" ? mentorForm : role === "entrepreneur" ? entrepreneurForm : traineeForm;
    const newUser = {
      name: basicForm.name,
      email: basicForm.email,
      phone: basicForm.phone,
      role: role || "unknown",
      location: basicForm.location,
      details: userRoleDetails,
      services: services,
      assessment: {
        behavioralScore: behavioralTotal,
        businessScore: businessTotal,
        overallScore: overallTotal,
        summary: summaryText,
        submittedAt: new Date().toLocaleDateString(),
      },
    };

    const existingUsersString = localStorage.getItem("msme_users");
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    existingUsers.push(newUser);
    localStorage.setItem("msme_users", JSON.stringify(existingUsers));

    setStep("summary");
  };

  const handleGoToDashboard = () => {
    if (role === "mentor") {
      navigate("/dashboard/mentor");
    } else {
      navigate("/dashboard/mentee");
    }
  };

  const stepNum = step === "role" ? 1 : step === "basic" ? 2 : step === "details" ? 3 : step === "services" ? 4 : 5;
  const serviceOptions = role === "trainee" ? TRAINEE_SUPPORT_OPTIONS : SERVICES_OPTIONS;
  const serviceHeading = role === "mentor" ? "Services I Can Provide" : role === "trainee" ? "Support Required" : "Services Required";
  const serviceDescription =
    role === "mentor"
      ? "Select the areas where you can guide entrepreneurs and trainees."
      : role === "trainee"
        ? "Select the support you need for learning, idea exploration, or startup understanding."
        : "Select the support you need for your business, startup, or MSME.";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            {step !== "role" && step !== "summary" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mr-2"
              >
                <ArrowLeft size={15} /> Back
              </button>
            )}

            {step !== "summary" && (
              <div className="flex items-center gap-2 flex-1 overflow-x-auto pb-1">
                {[
                  { n: 1, label: "Choose Role" },
                  { n: 2, label: "Basic Details" },
                  { n: 3, label: "Role Details" },
                  { n: 4, label: role === "mentor" ? "Provide" : "Support" },
                  { n: 5, label: "Assessment" },
                ].map((s, i) => (
                  <div key={s.n} className="flex items-center gap-2 shrink-0">
                    {i > 0 && <div className={cn("h-px w-8 transition-colors", stepNum > i ? "bg-primary" : "bg-border")} />}
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 transition-all",
                          stepNum === s.n
                            ? "bg-primary text-white"
                            : stepNum > s.n
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                        )}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {stepNum > s.n ? <CheckCircle2 size={14} /> : s.n}
                      </div>
                      <span className={cn("text-xs font-medium hidden sm:inline", stepNum === s.n ? "text-foreground" : "text-muted-foreground")}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <h1
            className="text-4xl md:text-5xl font-800 uppercase leading-tight text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {step === "role" && (
              <>
                <span className="text-primary">Join</span> MSME Growth Hub
              </>
            )}
            {step === "basic" && (
              <>
                Basic <span className="text-primary">Details</span>
              </>
            )}
            {step === "details" && role === "mentor" && (
              <>
                Mentor <span className="text-primary">Details</span>
              </>
            )}
            {step === "details" && role === "entrepreneur" && (
              <>
                Entrepreneur <span className="text-primary">Details</span>
              </>
            )}
            {step === "details" && role === "trainee" && (
              <>
                Trainee <span className="text-primary">Details</span>
              </>
            )}
            {step === "services" && (
              <>
                {serviceHeading.split(" ")[0]} <span className="text-primary">{serviceHeading.split(" ").slice(1).join(" ")}</span>
              </>
            )}
            {step === "psychometric" && (
              <>
                Psychometric <span className="text-primary">Assessment</span>
              </>
            )}
            {step === "summary" && (
              <>
                Account <span className="text-primary">Created</span>
              </>
            )}
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            {step === "role" && "Choose how you want to engage with the MSME Growth Hub ecosystem."}
            {step === "basic" && "These details are mandatory for account creation and communication."}
            {step === "details" && role === "mentor" && "Tell us about your expertise so we can match you with the right entrepreneurs and trainees."}
            {step === "details" && role === "entrepreneur" && "Tell us about your existing business, startup, or MSME so we can understand what support you need."}
            {step === "details" && role === "trainee" && "Tell us about your background, idea interest, and what you want to learn or explore."}
            {step === "services" && serviceDescription}
            {step === "psychometric" && "This mandatory assessment helps map your traits and entrepreneurial orientation."}
            {step === "summary" && "Your registration has completed successfully. Review your assessment summary below."}
          </p>
        </div>

        {step === "role" && (
          <div className="space-y-4">
            {[
              {
                value: "mentor" as Role,
                label: "I'm a Mentor",
                desc: "Share your expertise with entrepreneurs and trainees by guiding them through business, technology, marketing, and growth challenges.",
                icon: Users,
                color: "#2563EB",
                tags: ["Expert", "Advisor", "Industry Leader"],
              },
              {
                value: "entrepreneur" as Role,
                label: "I'm an Entrepreneur",
                desc: "For users who already have a business, startup, MSME, product, or company and need mentorship, consultancy, marketing, or tech support.",
                icon: Briefcase,
                color: "#F97316",
                tags: ["Business Owner", "Founder", "MSME"],
              },
              {
                value: "trainee" as Role,
                label: "I'm a Trainee",
                desc: "For users who do not have a business yet but want to learn, explore ideas, validate an idea, or understand startup opportunities.",
                icon: GraduationCap,
                color: "#059669",
                tags: ["Student", "Idea Explorer", "Learner"],
              },
            ].map(({ value, label, desc, icon: Icon, color, tags }) => (
              <button
                key={value}
                onClick={() => {
                  setRole(value);
                  setStep("basic");
                }}
                className={cn(
                  "w-full text-left border-2 rounded-2xl p-7 transition-all duration-200 group hover:shadow-md",
                  role === value ? "border-primary bg-orange-50" : "border-border bg-white hover:border-primary/40"
                )}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-700 uppercase text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {label}
                      </h3>
                      <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {tags.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5 flex gap-3">
              <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Admin accounts are not created from public registration. Admins should login separately from the internal MSME Growth Hub admin portal.
              </p>
            </div>
          </div>
        )}

        {step === "basic" && (
          <div className="space-y-5 bg-white border border-border rounded-3xl p-6 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Full Name" required placeholder="Enter your full name" value={basicForm.name} onChange={(v) => setBasicForm({ ...basicForm, name: v })} />
              <InputField label="Email" type="email" required placeholder="you@email.com" value={basicForm.email} onChange={(v) => setBasicForm({ ...basicForm, email: v })} />
              <InputField label="Phone Number" type="tel" required placeholder="+91 98000 12345" value={basicForm.phone} onChange={(v) => setBasicForm({ ...basicForm, phone: v })} />
              <InputField label="Password" type="password" required placeholder="Create password" value={basicForm.password} onChange={(v) => setBasicForm({ ...basicForm, password: v })} />
            </div>
            <InputField label="City / Location" required placeholder="Kolkata, West Bengal" value={basicForm.location} onChange={(v) => setBasicForm({ ...basicForm, location: v })} />
            <button
              onClick={() => setStep("details")}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-orange-100"
            >
              Continue to Role Details <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "details" && role === "mentor" && (
          <div className="space-y-5 bg-white border border-border rounded-3xl p-6 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Current Organization" required placeholder="Company / Institute" value={mentorForm.organization} onChange={(v) => setMentorForm({ ...mentorForm, organization: v })} />
              <InputField label="Designation" required placeholder="Founder, CTO, Professor..." value={mentorForm.designation} onChange={(v) => setMentorForm({ ...mentorForm, designation: v })} />
              <SelectField label="Years of Experience" required value={mentorForm.experience} onChange={(v) => setMentorForm({ ...mentorForm, experience: v })} options={["0–2 years", "3–5 years", "6–10 years", "10+ years", "15+ years"]} placeholder="Select experience" />
              <SelectField label="Availability" required value={mentorForm.availability} onChange={(v) => setMentorForm({ ...mentorForm, availability: v })} options={["1 hour/week", "2 hours/week", "5 hours/week", "10 hours/week"]} placeholder="Select availability" />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Areas of Expertise <span className="text-primary">*</span></label>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleExpertise(tag)}
                    className={cn(
                      "px-3 py-2 rounded-full border text-xs font-semibold transition-all",
                      mentorForm.expertise.includes(tag) ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <InputField label="LinkedIn Profile" placeholder="https://linkedin.com/in/your-profile" value={mentorForm.linkedin} onChange={(v) => setMentorForm({ ...mentorForm, linkedin: v })} />
            <TextAreaField label="Professional Bio" required placeholder="Briefly describe your mentorship background, achievements, and how you can support users." value={mentorForm.bio} onChange={(v) => setMentorForm({ ...mentorForm, bio: v })} />

            <button onClick={() => setStep("services")} className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-orange-100">
              Continue to Services <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "details" && role === "entrepreneur" && (
          <div className="space-y-5 bg-white border border-border rounded-3xl p-6 shadow-sm">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Entrepreneur Type <span className="text-primary">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {ENTREPRENEUR_TYPES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setEntrepreneurForm({ ...entrepreneurForm, entrepreneurType: value })}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center transition-all",
                      entrepreneurForm.entrepreneurType === value ? "border-primary bg-orange-50 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    <Icon size={18} />
                    <span className="text-xs font-medium leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Business / Startup Name" required placeholder="Your venture name" value={entrepreneurForm.businessName} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, businessName: v })} />
              <SelectField label="Industry" required value={entrepreneurForm.industry} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, industry: v })} options={INDUSTRIES} placeholder="Select industry" />
              <SelectField label="Current Business Stage" required value={entrepreneurForm.stage} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, stage: v })} options={BUSINESS_STAGES} placeholder="Select stage" />
              <SelectField label="Team Size" value={entrepreneurForm.teamSize} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, teamSize: v })} options={["Solo", "2–5", "6–10", "11–25", "25+"]} placeholder="Select team size" />
              <SelectField label="Revenue Status" value={entrepreneurForm.revenueStatus} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, revenueStatus: v })} options={["No revenue yet", "Early revenue", "Monthly revenue", "Profitable", "Funded"]} placeholder="Select revenue status" />
              <InputField label="Website / Social Link" placeholder="https://yourstartup.com" value={entrepreneurForm.website} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, website: v })} />
            </div>

            <TextAreaField label="Current Business Challenge" required placeholder="Tell us what support you need now: funding, marketing, technology, product, operations, sales, etc." value={entrepreneurForm.businessProblem} onChange={(v) => setEntrepreneurForm({ ...entrepreneurForm, businessProblem: v })} />

            <button onClick={() => setStep("services")} className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-orange-100">
              Continue to Services <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "details" && role === "trainee" && (
          <div className="space-y-5 bg-white border border-border rounded-3xl p-6 shadow-sm">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Trainee Type <span className="text-primary">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {TRAINEE_TYPES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTraineeForm({ ...traineeForm, traineeType: value })}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center transition-all",
                      traineeForm.traineeType === value ? "border-primary bg-orange-50 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    <Icon size={18} />
                    <span className="text-xs font-medium leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <InputField label="Education / Background" required placeholder="B.Tech student, MBA student, working professional..." value={traineeForm.educationOrBackground} onChange={(v) => setTraineeForm({ ...traineeForm, educationOrBackground: v })} />
            <InputField label="Institution / Company" placeholder="College, institute or company name" value={traineeForm.institution} onChange={(v) => setTraineeForm({ ...traineeForm, institution: v })} />
            <SelectField label="Interest Area" required value={traineeForm.interestArea} onChange={(v) => setTraineeForm({ ...traineeForm, interestArea: v })} options={INDUSTRIES} placeholder="Select area you want to explore" />
            <SelectField label="Idea Status" required value={traineeForm.ideaStatus} onChange={(v) => setTraineeForm({ ...traineeForm, ideaStatus: v })} options={["I only want to explore", "I have an idea", "I need help validating my idea", "I want startup training", "I want to connect with mentors"]} placeholder="Select idea status" />
            <TextAreaField label="Learning Goal" required placeholder="Example: I want to understand how to start a business, validate an idea, or learn about funding and marketing." value={traineeForm.learningGoal} onChange={(v) => setTraineeForm({ ...traineeForm, learningGoal: v })} />

            <button onClick={() => setStep("services")} className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-orange-100">
              Continue to Support <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "services" && (
          <div className="space-y-5">
            <div className="grid gap-3">
              {serviceOptions.map(({ id, label, desc, icon: Icon }) => {
                const active = services.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleService(id)}
                    className={cn(
                      "w-full text-left border-2 rounded-2xl p-5 transition-all",
                      active ? "border-primary bg-orange-50" : "border-border bg-white hover:border-primary/40"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", active ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-700 text-foreground">{label}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                      {active && <CheckCircle2 size={20} className="text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-border p-4 bg-muted/30 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
              <span className="text-sm text-muted-foreground">
                I confirm that the information provided is correct and I agree to the platform terms and privacy policy.
              </span>
            </label>

            <button
              onClick={handleFormSubmit}
              disabled={!agreed}
              className={cn(
                "w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-full transition-all shadow-md",
                agreed ? "bg-primary text-white hover:opacity-90 shadow-orange-100" : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              Continue to Psychometric Assessment <ArrowRight size={16} />
            </button>

            <div className="rounded-2xl border border-border bg-muted/30 p-4 flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Location, role and selected services will help the platform match users with the right mentors, workshops, consultancy and resources.
              </p>
            </div>
          </div>
        )}

        {/* Mandatory Psychometric Assessment Step */}
        {step === "psychometric" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm font-mono text-muted-foreground">
              <span>
                Question <strong className="text-foreground">{currentQIndex + 1}</strong> of 20
              </span>
              <span className="flex items-center gap-2">
                <Brain size={14} className="text-primary" />
                <span className="font-semibold text-primary">
                  {PSYCH_QUESTIONS[currentQIndex].section === "Behavioral" ? "A: Behavioral Traits" : "B: Business Mindset"}
                </span>
              </span>
            </div>

            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / 20) * 100}%` }}
              />
            </div>

            <div className="bg-muted/30 border border-border rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-2 right-4 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                Evaluating: {PSYCH_QUESTIONS[currentQIndex].trait}
              </div>
              <p className="text-xl md:text-2xl text-foreground font-semibold leading-relaxed">
                "{PSYCH_QUESTIONS[currentQIndex].text}"
              </p>
            </div>

            <div className="grid gap-2.5">
              {[
                { label: "Strongly Agree", val: 5 },
                { label: "Agree", val: 4 },
                { label: "Neutral", val: 3 },
                { label: "Disagree", val: 2 },
                { label: "Strongly Disagree", val: 1 },
              ].map(({ label, val }) => {
                const active = answers[PSYCH_QUESTIONS[currentQIndex].id] === val;
                return (
                  <button
                    key={val}
                    onClick={() => handleAnswerSelect(val)}
                    className={cn(
                      "w-full text-left border rounded-2xl px-5 py-4 transition-all flex items-center justify-between",
                      active ? "border-primary bg-orange-50/50 ring-2 ring-primary/10" : "border-border hover:border-primary/30 bg-white"
                    )}
                  >
                    <span className={cn("text-sm font-medium", active ? "text-primary font-bold" : "text-foreground")}>
                      {label}
                    </span>
                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0", active ? "border-primary bg-primary" : "border-muted-foreground/30")}>
                      {active && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {currentQIndex === 19 && answers[20] !== undefined && (
              <button
                onClick={handleAssessmentSubmit}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-orange-100"
              >
                Complete Registration & View Profile <Sparkles size={16} />
              </button>
            )}
          </div>
        )}

        {/* Summary / Result Page */}
        {step === "summary" && (
          <div className="space-y-6 bg-white border border-border rounded-3xl p-8 shadow-sm">
            <div className="text-center pb-6 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-green-600">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Welcome to the Ecosystem!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your account is ready, and your psychometric baseline has been registered.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Psychometric Assessment Profile
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Overall Score", score: scores.overall, max: 100, color: "text-primary" },
                  { label: "Behavioral Traits", score: scores.behavioral, max: 50, color: "text-blue-600" },
                  { label: "Business Mindset", score: scores.business, max: 50, color: "text-green-600" },
                ].map(({ label, score, max, color }) => (
                  <div key={label} className="bg-muted/20 border border-border/60 rounded-2xl p-4 text-center">
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className={cn("text-3xl font-extrabold mt-1", color)}>
                      {score}
                      <span className="text-xs text-muted-foreground font-normal">/{max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-orange-50/50 border border-orange-200/50 rounded-2xl p-5 flex items-start gap-4">
                <Award className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-orange-800 text-sm">Ecosystem Profile Summary</h4>
                  <p className="text-xs text-orange-700 mt-1 leading-relaxed">{scores.summary}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoToDashboard}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md"
              >
                Go to Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
