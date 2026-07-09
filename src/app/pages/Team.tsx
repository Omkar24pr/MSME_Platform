import { useEffect } from "react";
import { Link } from "react-router";
import { Mail, Linkedin, ChevronRight, Award, Code2, Users } from "lucide-react";

const IIT_KGP_LOGO =
  "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/120px-IIT_Kharagpur_Logo.svg.png";

const TEAM_MEMBERS = [
  {
    id: "omkar",
    name: "Omkar Prajapati",
    initials: "OP",
    role: "Technical Developer",
    description:
      "Working on the development and maintenance of the MSME Growth Hub platform under the guidance of Mrigank Sharad, contributing to full-stack development, AI-powered features, backend systems, and user experience improvements.",
    email: "mailto:omkar@example.com",
    linkedin: "https://linkedin.com/in/omkar-prajapati",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  {
    id: "abhishek",
    name: "Abhishek Gupta",
    initials: "AG",
    role: "Technical Developer",
    description:
      "Contributing to backend architecture, frontend development, system integration, and continuous enhancement of the MSME Growth Hub platform under the guidance of Mrigank Sharad.",
    email: "mailto:abhishek@example.com",
    linkedin: "https://linkedin.com/in/abhishek-gupta",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
  {
    id: "adarsh",
    name: "Adarsh Mishra",
    initials: "AM",
    role: "Technical Developer",
    description:
      "Working on software development, technical implementation, and platform optimization for the MSME Growth Hub under the guidance of Mrigank Sharad.",
    email: "mailto:adarsh@example.com",
    linkedin: "https://linkedin.com/in/adarsh-mishra",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
];

export default function Team() {
  useEffect(() => {
    document.title = "Meet Our Team | MSME Growth Hub";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f9fafb", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── PAGE HEADER ── */}
      <div
        className="border-b border-gray-200"
        style={{ background: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-700 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-semibold">Meet Our Team</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <img
                  src={IIT_KGP_LOGO}
                  alt="IIT KGP"
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  RMSOEE · IIT Kharagpur
                </span>
              </div>
              <h1
                className="text-3xl font-bold tracking-tight text-gray-900"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                Meet Our Team
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                The MSME Growth Hub platform is developed and maintained by a
                dedicated team from IIT Kharagpur, committed to empowering
                entrepreneurs, startups, and MSMEs through technology and
                innovation.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 shrink-0">
              {[
                { icon: Award, label: "Faculty Mentor", val: "1" },
                { icon: Code2, label: "Developers", val: "3" },
                { icon: Users, label: "IIT KGP", val: "✓" },
              ].map(({ icon: Icon, label, val }) => (
                <div
                  key={label}
                  className="text-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 min-w-[80px]"
                >
                  <Icon size={16} className="text-gray-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{val}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ── FACULTY MENTOR ── */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-mono"
              style={{
                background: "#FFF3E8",
                color: "#F97316",
                border: "1px solid #FDD5B0",
              }}
            >
              Faculty Leadership
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Featured Faculty Card */}
          <div className="flex justify-center">
            <div
              className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: "#F97316", background: "#ffffff" }}
            >
              <div
                className="h-2 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)",
                }}
              />

              <div className="p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div
                    className="w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-extrabold font-mono shadow-md"
                    style={{
                      background: "#FFF3E8",
                      color: "#F97316",
                      border: "2px solid #FDD5B0",
                    }}
                  >
                    MS
                  </div>
                  <div className="mt-2 text-center">
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full font-mono"
                      style={{
                        background: "#F97316",
                        color: "#ffffff",
                      }}
                    >
                      Guide
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2
                    className="text-3xl font-800 uppercase text-gray-900 leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Mrigank Sharad
                  </h2>
                  <p
                    className="text-sm font-bold mt-1"
                    style={{ color: "#F97316" }}
                  >
                    Faculty Mentor &amp; Project Guide
                  </p>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      <span className="font-semibold text-gray-800">
                        Assistant Professor Grade-I
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                      <span>
                        Rajendra Mishra School of Engineering Entrepreneurship
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                      <span className="text-gray-400">IIT Kharagpur</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                    Leading the MSME Growth Hub initiative at RMSOEE, IIT
                    Kharagpur — guiding the team in building a comprehensive
                    platform for MSME support, startup mentorship, and
                    entrepreneurship development.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-5 justify-center sm:justify-start">
                    <a
                      href="mailto:mrigank@see.iitkgp.ac.in"
                      className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all"
                    >
                      <Mail size={13} />
                      mrigank@see.iitkgp.ac.in
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mrigank-sharad"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all"
                    >
                      <Linkedin size={13} />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TECHNICAL DEVELOPERS ── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-mono"
              style={{
                background: "#F3F4F6",
                color: "#374151",
                border: "1px solid #E5E7EB",
              }}
            >
              Technical Team
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                style={{
                  background: "#ffffff",
                  borderColor: "#E5E7EB",
                }}
              >
                {/* Color top stripe */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: member.color }}
                />

                <div className="p-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-extrabold font-mono shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: member.bg,
                        color: member.color,
                        border: `1.5px solid ${member.border}`,
                      }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold text-gray-900 leading-tight"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {member.name}
                      </h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest font-mono"
                        style={{ color: member.color }}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-5 min-h-[80px]">
                    {member.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["Full-Stack", "React", "Node.js", "AI/ML"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{
                          background: member.bg,
                          color: member.color,
                          borderColor: member.border,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <a
                      href={member.email}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
                      title="Send Email"
                    >
                      <Mail size={12} /> Email
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      title="LinkedIn Profile"
                    >
                      <Linkedin size={12} /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AFFILIATION BANNER ── */}
        <div
          className="mt-12 rounded-2xl p-6 border border-orange-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          style={{ background: "#FFF7ED" }}
        >
          <img
            src={IIT_KGP_LOGO}
            alt="IIT Kharagpur"
            className="h-14 w-14 object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="flex-1">
            <h3
              className="font-bold text-gray-900 text-lg uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              An Initiative of IIT Kharagpur
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mt-1">
              This platform is developed under the Rajendra Mishra School of
              Engineering Entrepreneurship (RMSOEE), IIT Kharagpur — one of
              India's premier institutions for entrepreneurship education and
              MSME capacity building.
            </p>
          </div>
          <Link
            to="/mentorship"
            className="shrink-0 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: "#F97316" }}
          >
            Find a Mentor
          </Link>
        </div>
      </div>
    </div>
  );
}
