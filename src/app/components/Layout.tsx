import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Menu, X, Globe } from "lucide-react";
import FloatingAI from "./FloatingAI";
import { useLang, type Lang } from "../context/LanguageContext";

const IIT_KGP_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/120px-IIT_Kharagpur_Logo.svg.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=500&fit=crop&auto=format";

const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिंदी", short: "हिं" },
  { code: "bn", label: "বাংলা", short: "বাং" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navStuck, setNavStuck] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setNavStuck(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.replace("/", "");
      if (isHome) {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate("/");
        setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
      }
    } else {
      navigate(href);
    }
  };

  const CENTER_LINKS = [
    { label: "Home", href: "/" },
    { label: t.nav_marketplace, href: "/services" },
    { label: t.nav_mentorship, href: "/mentorship" },
    { label: t.nav_schemes, href: "/schemes" },
    { label: t.nav_content, href: "/content-hub" },
    { label: t.nav_knowledge, href: "/knowledge-center" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground bg-space-grid relative overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero Banner (home only) ── */}
      {isHome && (
        <div className="relative w-full overflow-hidden" style={{ height: "360px" }}>
          <img
            src={HERO_IMAGE}
            alt="IIT Kharagpur campus — MSME Growth Hub initiative"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-space-spotlight"
            style={{ background: "linear-gradient(135deg, rgba(5,5,16,0.92) 0%, rgba(99,102,241,0.25) 100%)" }}
          />

          {/* IIT KGP logo watermark */}
          <div className="absolute top-6 left-6 flex items-center gap-3.5 bg-black/40 backdrop-blur-lg px-4 py-2.5 rounded-xl border border-white/10">
            <img
              src={IIT_KGP_LOGO}
              alt="IIT Kharagpur Logo"
              className="h-10 w-10 object-contain drop-shadow-md filter brightness-0 invert"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="h-9 w-[1px] bg-white/30" />
            <div className="text-white/95 max-w-[210px] leading-none">
              <div className="text-[10px] font-mono tracking-widest uppercase text-white/55">RMSOEE</div>
              <div className="text-xs font-bold uppercase tracking-wide mt-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Rajendra Mishra School
              </div>
              <div className="text-[9px] uppercase tracking-wider text-white/80 leading-none">
                of Engineering Entrepreneurship
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <img src={IIT_KGP_LOGO} alt="" className="h-4 w-4 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              {t.hero_badge}
            </div>
            <h1
              className="text-4xl md:text-6xl font-800 uppercase text-white leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.hero_headline}
            </h1>
            <p className="mt-3 text-white/80 text-base md:text-lg max-w-2xl">{t.hero_sub}</p>
          </div>

          {/* IIT KGP stamp bottom-right */}
          <div className="absolute bottom-4 right-5 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
            <img src={IIT_KGP_LOGO} alt="" className="h-5 w-5 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <span className="text-[10px] text-white/80 font-mono uppercase tracking-wider">IIT Kharagpur Initiative</span>
          </div>
        </div>
      )}

      {/* ── Sticky Nav ── */}
      <div
        ref={navRef}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          navStuck || !isHome ? "glass-navbar" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">

          {/* Logo: IIT KGP + platform name */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src={IIT_KGP_LOGO}
              alt="IIT Kharagpur"
              className="h-8 w-8 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="h-6 w-[1px] bg-border mx-1" />
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif" }} className="hidden sm:block leading-tight">
              <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest leading-none">RMSOEE, IIT Kharagpur</div>
              <div className="text-base font-800 tracking-tight text-foreground leading-none uppercase">
                MSME <span className="text-primary text-neon-gradient">GROWTH HUB</span>
              </div>
            </div>
          </Link>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
            {CENTER_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right: language switcher + auth buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">

            {/* Language switcher */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
              >
                <Globe size={12} />
                {LANG_OPTIONS.find((l) => l.code === lang)?.short}
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-card border border-border/40 rounded-xl shadow-xl z-50 overflow-hidden w-32 backdrop-blur-md">
                  {LANG_OPTIONS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors font-medium ${lang === l.code ? "bg-primary/10 text-primary" : "hover:bg-muted/40 text-foreground"}`}
                    >
                      <span className="text-sm">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
              {t.nav_login}
            </Link>
            <Link to="/register" className="text-sm font-semibold border-2 border-accent/60 text-accent px-4 py-1.5 rounded-full hover:bg-accent/10 hover:border-accent transition-colors">
              {t.nav_register}
            </Link>
            <Link to="/dashboard/mentor" className="text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
              {t.nav_dashboard}
            </Link>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-card/95 border-t border-border/40 px-6 py-5 flex flex-col gap-3 shadow-lg backdrop-blur-lg">
            {CENTER_LINKS.map((l) => (
              <button key={l.href} onClick={() => handleNav(l.href)} className="text-left text-base text-muted-foreground hover:text-foreground py-1">
                {l.label}
              </button>
            ))}

            {/* Mobile language switcher */}
            <div className="flex gap-1.5 pt-2 border-t border-border/40">
              {LANG_OPTIONS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${lang === l.code ? "bg-primary text-white border-primary" : "border-border/40 text-muted-foreground"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-1">
              <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center border-2 border-accent/60 text-accent text-sm font-semibold py-2.5 rounded-full hover:bg-accent/10 hover:border-accent">
                {t.nav_register}
              </Link>
              <Link to="/dashboard/mentor" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-primary text-white text-sm font-semibold py-2.5 rounded-full">
                {t.nav_dashboard}
              </Link>
            </div>
          </div>
        )}
      </div>

      <main>
        <Outlet />
      </main>

      <FloatingAI />
    </div>
  );
}
