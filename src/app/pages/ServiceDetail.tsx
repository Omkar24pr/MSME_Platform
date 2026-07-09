import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Briefcase, GraduationCap, Lightbulb, Building2, CheckCircle2, ShieldAlert, X, Send } from "lucide-react";

interface ServiceInfo {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  description: string;
  bullets: string[];
}

const SERVICE_DATA: Record<string, ServiceInfo> = {
  consultancy: {
    title: "Business Consultancy",
    subtitle: "Strategic Growth & Business Model Advisory",
    icon: Briefcase,
    color: "#7C3AED", // Purple
    description: "Our business consultancy services help early-stage startups and established MSMEs design robust models, navigate market entries, optimize operations, and create actionable financial plans. We match you with industry veterans to build a solid foundation for growth and scalability.",
    bullets: [
      "Business strategy development",
      "Business model validation",
      "Market entry planning",
      "Financial planning & cash flow mapping",
      "Operational optimization & efficiency audits",
      "Scaling strategies & organizational restructuring",
      "One-on-one expert consultation & advisory sessions",
    ],
  },
  training: {
    title: "Training & Workshops",
    subtitle: "Practical Learning & Skill Development",
    icon: GraduationCap,
    color: "#2563EB", // Blue
    description: "Empower your team with industry-led training programs, bootcamps, and interactive workshops tailored to the modern business landscape. Led by experts from IIT Kharagpur and top corporate organizations, our programs cover everything from entrepreneurship readiness to technical certifications.",
    bullets: [
      "Startup bootcamps for early founders",
      "MSME workshops on tax, compliance & funding",
      "Industry-led training on emerging technologies",
      "Professional certifications & capacity building",
      "Practical hands-on learning models",
      "Entrepreneurship readiness assessments",
      "Skill development programs for staff scaling",
    ],
  },
  marketing: {
    title: "Marketing Support",
    subtitle: "Branding, GTM & Customer Acquisition",
    icon: Lightbulb,
    color: "#059669", // Emerald
    description: "Launch your products successfully and reach your target audience effectively. We assist you in establishing your brand identity, engineering growth loops, optimizing digital visibility, and structuring SEO/social campaigns that deliver a high return on marketing spend.",
    bullets: [
      "Branding & brand identity frameworks",
      "Digital Marketing & social campaigns",
      "SEO (Search Engine Optimization) setup",
      "Social Media presence engineering",
      "Customer Acquisition & growth loops",
      "Performance Marketing & advertising analytics",
      "Growth Strategy & go-to-market (GTM) blueprints",
    ],
  },
  technology: {
    title: "Technology Support",
    subtitle: "Tech Stack, AI & Product Architecture",
    icon: Building2,
    color: "#DC2626", // Red
    description: "Navigate digital transformation with expert architectural guidance. Our technical team and CTO advisors help you select tools, design secure databases, build mobile/web apps, integrate AI and automation systems, and deploy scalable cloud infrastructure.",
    bullets: [
      "Product Development & prototyping",
      "Website Development (Vite, React, NextJS)",
      "Mobile Applications (iOS, Android)",
      "AI integration & business workflow automation",
      "Cloud Deployment & serverless architecture",
      "CTO Advisory & technical reviews",
      "Digital Transformation for legacy systems",
    ],
  },
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    requirements: "",
  });

  const service = serviceId ? SERVICE_DATA[serviceId] : null;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | MSME Growth Hub`;
    } else {
      document.title = "Service Details | MSME Growth Hub";
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold uppercase text-primary mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Service Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mb-6">
          The requested service detail page could not be located. It might have been moved or renamed.
        </p>
        <Link to="/" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
          Back to Home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("A valid email address is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Contact number is required.");
      return;
    }
    if (!formData.requirements.trim()) {
      setFormError("Please explain your specific requirements.");
      return;
    }

    // Save request in local storage
    const requests = JSON.parse(localStorage.getItem("service_requests") || "[]");
    requests.push({
      serviceId,
      serviceTitle: service.title,
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("service_requests", JSON.stringify(requests));

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessName: "",
      requirements: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white pt-12 pb-24 relative overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `${service.color}10` }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `${service.color}08` }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-8 cursor-pointer text-left"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Hero Card */}
        <div className="glass-card border-2 rounded-3xl p-8 md:p-10 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative" style={{ borderColor: `${service.color}25` }}>
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `${service.color}15`, border: `1px solid ${service.color}35` }}>
            <Icon size={36} style={{ color: service.color }} />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: service.color }}>Our Services</span>
            <h1 className="text-4xl md:text-5xl font-800 uppercase leading-none mt-1 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {service.title}
            </h1>
            <p className="text-lg text-white/70 font-semibold leading-tight">{service.subtitle}</p>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Overview
              </h2>
              <p className="text-white/80 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Core Areas Covered
              </h2>
              <ul className="grid sm:grid-cols-1 gap-3.5">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: service.color }} />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action Column */}
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 border-2 text-center flex flex-col items-center justify-center gap-4" style={{ borderColor: `${service.color}25` }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${service.color}15` }}>
                <Icon size={20} style={{ color: service.color }} />
              </div>
              <h3 className="font-bold text-lg text-white leading-tight">Need This Support?</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Connect with our expert panels and consultants from IIT Kharagpur for customized services.
              </p>
              <button
                onClick={() => {
                  setShowModal(true);
                  setSubmitted(false);
                  setFormError("");
                }}
                className="w-full text-center text-sm font-bold uppercase tracking-wider py-3 rounded-full hover:opacity-90 transition-opacity text-white cursor-pointer shadow-lg shadow-black/30"
                style={{ background: service.color }}
              >
                Request This Service
              </button>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-white/10 text-center">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Platform Guarantee</h4>
              <p className="text-[11px] text-white/60 leading-relaxed">
                All training programs and consultancy matches are reviewed by Rajendra Mishra School of Engineering Entrepreneurship (RMSOEE) faculty mentors to ensure premium advisory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Request Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card border border-white/15 shadow-2xl max-w-lg w-full rounded-3xl p-6 relative overflow-hidden bg-[#0a0a1a]">
            {/* Background color glow inside modal */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: `${service.color}20` }} />

            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <Icon size={20} style={{ color: service.color }} />
                <h3 className="font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Request Service
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {formError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-2.5 text-xs">
                    <ShieldAlert size={16} className="shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all animate-none bg-none outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all animate-none bg-none outline-none"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all animate-none bg-none outline-none"
                      placeholder="+91 98000 12345"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                    Startup / Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all animate-none bg-none outline-none"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                    Explain Your Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all resize-none animate-none bg-none outline-none"
                    placeholder="Describe what support you need, your business size, and stage."
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-white/10 text-white/80 hover:text-white hover:bg-white/5 text-sm font-semibold rounded-full transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-white text-sm font-semibold rounded-full flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer border-0"
                    style={{ background: service.color }}
                  >
                    Submit Request <Send size={14} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4 animate-scaleUp relative z-10">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">Request Submitted!</h4>
                  <p className="text-sm text-white/60 mt-1 max-w-sm mx-auto leading-normal">
                    Thank you. Your request for **{service.title}** has been registered. An advisor from the IIT KGP startup team will contact you shortly.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-white/15 text-white text-xs font-bold uppercase rounded-full hover:bg-white/5 transition-colors cursor-pointer bg-transparent"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
