import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Sparkles, X, Mic, MicOff, Send, Globe, ArrowRight,
  Maximize2, ChevronDown, Search, BookOpen, FileText,
} from "lucide-react";

const LANGUAGES = [
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "हिंदी" },
  { code: "bn-IN", label: "বাংলা" },
  { code: "ta-IN", label: "தமிழ்" },
  { code: "te-IN", label: "తెలుగు" },
  { code: "mr-IN", label: "मराठी" },
  { code: "gu-IN", label: "ગુજરાતી" },
  { code: "kn-IN", label: "ಕನ್ನಡ" },
  { code: "ml-IN", label: "മലയാളം" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ" },
  { code: "or-IN", label: "ଓଡ଼ିଆ" },
  { code: "as-IN", label: "অসমীয়া" },
  { code: "ur-IN", label: "اردو" },
];

const QUICK_PROMPTS = [
  "What MSME schemes am I eligible for?",
  "How do I register on Startup India?",
  "Find mentors for my business",
  "Explain GST for small businesses",
];

const AI_REPLIES: Record<string, string> = {
  default: "I'm your MSME Growth Hub AI assistant. I can help with government schemes, business guidance, mentorship, funding, GST, and more. Ask me anything!",
  "What MSME schemes am I eligible for?": "Based on common MSME profiles, you may be eligible for: SIDBI MSME Loans (up to ₹1Cr at 7.5% p.a.), CGTMSE Credit Guarantee (75–85% coverage), PM Vishwakarma Scheme (₹3L + skill training), and MUDRA Tarun (up to ₹10L). Visit our Schemes page for a full eligibility check.",
  "How do I register on Startup India?": "To register: 1) Visit startupindia.gov.in, 2) Create an account with your business email, 3) Fill the DPIIT recognition form, 4) Upload incorporation certificate & PAN. DPIIT recognition unlocks tax holidays, fast-track patent filing, and seed fund access. Shall I guide you step by step?",
  "Find mentors for my business": "I found 12 verified mentors matching general MSME profiles. Top matches: Dr. Ananya Krishnan (Product Strategy), Rohan Agarwal (VC & Fundraising), Meera Iyer (Operations & Scale). Register your business on our platform to get matched.",
  "Explain GST for small businesses": "For MSMEs under ₹40L turnover (₹20L for services), GST registration is optional. Once registered you file GSTR-1 and GSTR-3B monthly/quarterly and can claim Input Tax Credit. Businesses under ₹1.5Cr can use the Composition Scheme — pay just 1% flat with minimal compliance. Want me to calculate your specific GST obligations?",
};

interface Msg { role: "user" | "ai"; text: string; time: string; }

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: AI_REPLIES.default, time: now() },
  ]);
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [showLang, setShowLang] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: text.trim(), time: now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = AI_REPLIES[text.trim()] ?? AI_REPLIES.default;
      setMsgs((m) => [...m, { role: "ai", text: reply, time: now() }]);
      setTyping(false);
    }, 1100);
  };

  const toggleVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported in this browser. Try Chrome."); return; }
    if (listening) {
      recogRef.current?.stop(); setListening(false);
    } else {
      const r = new SR();
      r.lang = lang.code; r.interimResults = false;
      r.onresult = (e: any) => { send(e.results[0][0].transcript); setListening(false); };
      r.onerror = () => setListening(false);
      r.onend = () => setListening(false);
      r.start(); recogRef.current = r; setListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1d4ed8, #F97316)" }}
          aria-label="Open AI Assistant"
        >
          <span
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: "linear-gradient(135deg, #1d4ed8, #F97316)",
              animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <Sparkles size={22} className="text-white relative z-10" />
          <style>{`@keyframes ping{75%,100%{transform:scale(1.6);opacity:0}}`}</style>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="w-[360px] rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden"
          style={{ height: "530px", background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: "linear-gradient(135deg, #1e3a8a, #c2410c)" }}>
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-white" />
              <span className="text-sm font-700 text-white uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                AI Assistant
              </span>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">MSME Growth Hub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Link to="/ai-assistant" onClick={() => setOpen(false)} title="Full screen" className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                <Maximize2 size={12} className="text-white" />
              </Link>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                <X size={12} className="text-white" />
              </button>
            </div>
          </div>

          {/* Language bar */}
          <div className="px-4 py-2 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe size={11} /> {lang.label} <ChevronDown size={10} className={showLang ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              {showLang && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-xl shadow-xl z-20 max-h-52 overflow-y-auto w-36" style={{ scrollbarWidth: "none" }}>
                  {LANGUAGES.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l); setShowLang(false); }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors font-medium">
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/ai-search" onClick={() => setOpen(false)} className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                <Search size={10} /> Search
              </Link>
              <Link to="/knowledge-center" onClick={() => setOpen(false)} className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                <BookOpen size={10} /> Guides
              </Link>
              <Link to="/ai-assistant" onClick={() => setOpen(false)} className="text-[10px] text-primary font-semibold flex items-center gap-0.5 hover:underline">
                Full <ArrowRight size={9} />
              </Link>
            </div>
          </div>

          {/* Quick prompts */}
          {msgs.length === 1 && (
            <div className="px-4 py-3 grid grid-cols-2 gap-1.5 shrink-0">
              {QUICK_PROMPTS.map((p) => (
                <button key={p} onClick={() => send(p)}
                  className="text-left text-[11px] bg-muted/40 border border-border rounded-xl px-2.5 py-2 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-orange-50/60 transition-all leading-tight">
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "none" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[84%] rounded-2xl px-3 py-2.5 text-xs leading-relaxed ${m.role === "user" ? "text-white rounded-br-sm" : "bg-muted/50 text-foreground rounded-bl-sm border border-border"}`}
                  style={m.role === "user" ? { background: "linear-gradient(135deg,#1d4ed8,#F97316)" } : {}}>
                  {m.role === "ai" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles size={9} className="text-primary" />
                      <span className="text-[9px] font-semibold text-primary">AI Assistant</span>
                    </div>
                  )}
                  <p className="leading-relaxed">{m.text}</p>
                  <p className={`text-[9px] mt-1 ${m.role === "user" ? "text-white/60" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-muted/50 border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                        style={{ animation: "bounce 1s infinite", animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border bg-white shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoice}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{ background: listening ? "#DC2626" : "#f1f5f9" }}
              >
                {listening
                  ? <MicOff size={13} className="text-white" />
                  : <Mic size={13} className="text-muted-foreground" />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send(input))}
                placeholder={listening ? "Listening…" : `Ask in ${lang.label}…`}
                className="flex-1 bg-muted/30 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-30"
                style={{ background: input.trim() ? "linear-gradient(135deg,#1d4ed8,#F97316)" : "#e2e8f0" }}
              >
                <Send size={12} className="text-white" />
              </button>
            </div>
            <p className="text-[9px] text-muted-foreground/50 text-center mt-1.5 font-mono">AI · 13 Indian Languages · Voice Enabled</p>
          </div>
        </div>
      )}
    </div>
  );
}
