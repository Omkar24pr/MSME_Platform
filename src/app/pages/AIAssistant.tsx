import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  Plus,
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  ChevronDown,
  Trash2,
  Home,
  Globe,
  ChevronRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  date: string;
}

interface Language {
  label: string;
  code: string;
  native: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const LANGUAGES: Language[] = [
  { label: "English", code: "en-IN", native: "English" },
  { label: "Hindi", code: "hi-IN", native: "हिंदी" },
  { label: "Bengali", code: "bn-IN", native: "বাংলা" },
  { label: "Tamil", code: "ta-IN", native: "தமிழ்" },
  { label: "Telugu", code: "te-IN", native: "తెలుగు" },
  { label: "Marathi", code: "mr-IN", native: "मराठी" },
  { label: "Gujarati", code: "gu-IN", native: "ગુજરાતી" },
  { label: "Kannada", code: "kn-IN", native: "ಕನ್ನಡ" },
  { label: "Malayalam", code: "ml-IN", native: "മലയാളം" },
  { label: "Punjabi", code: "pa-IN", native: "ਪੰਜਾਬੀ" },
  { label: "Odia", code: "or-IN", native: "ଓଡ଼ିଆ" },
  { label: "Assamese", code: "as-IN", native: "অসমীয়া" },
  { label: "Urdu", code: "ur-IN", native: "اردو" },
];

const RECENT_CONVERSATIONS: Conversation[] = [
  { id: "1", title: "MSME Scheme eligibility check", date: "Today" },
  { id: "2", title: "GST registration process", date: "Yesterday" },
  { id: "3", title: "Finding investors for Series A", date: "Jun 23" },
  { id: "4", title: "Export documentation help", date: "Jun 21" },
  { id: "5", title: "MUDRA loan application", date: "Jun 18" },
];

const SUGGESTED_PROMPTS = [
  "Check my eligibility for MSME schemes",
  "How to get DPIIT recognition?",
  "Explain GST composition scheme",
  "Steps to apply for MUDRA loan",
  "Export documentation checklist",
  "How to find an investor?",
];

const AI_REPLIES: Record<string, string> = {
  dpiit: `**DPIIT Recognition (Startup India)** gives your MSME access to tax exemptions, easier compliance, and investor visibility. Here's how to get it:

1. **Register** at startupindia.gov.in with your PAN, CIN/LLP number
2. **Eligibility**: Company incorporated < 10 years, annual turnover < ₹100Cr, working on innovation/scalable business
3. **Upload**: Certificate of incorporation, description of innovation, pitch deck (optional)
4. **Processing**: 5-10 working days; you'll receive a DPIIT recognition number

**Benefits after recognition:**
- Angel Tax exemption (Section 56(2)(viib))
- Fast-track patent filing (80% fee rebate)
- Self-certification under 6 labour laws
- Access to ₹10,000 Cr Fund of Funds

Want me to walk you through the portal step by step?`,

  gst: `**GST Composition Scheme** — simplified taxation for small MSMEs:

**Who can opt in?**
- Aggregate turnover ≤ ₹1.5 Cr (₹75L for NE states)
- Manufacturers, traders, restaurants

**Tax rates under Composition:**
- Manufacturers/Traders: 1% of turnover (0.5% CGST + 0.5% SGST)
- Restaurants: 5%
- Service providers: 6%

**Key advantages:**
- File quarterly returns (GSTR-4) instead of monthly
- No input tax credit reversal headache
- Simpler record-keeping

**Limitations:**
- Cannot sell inter-state
- Cannot claim ITC
- Must display "Composition Taxable Person" on invoices

**How to opt in:** Login to GST portal → Services → Application to opt for Composition Levy → Submit before 31st March

Would you like help with the application form?`,

  mudra: `**MUDRA Loan Application — Step by Step:**

**Three tiers:**
- Shishu: Up to ₹50,000 (new/micro businesses)
- Kishore: ₹50,001 – ₹5L
- Tarun: ₹5L – ₹10L

**Documents needed:**
1. Aadhaar + PAN card
2. Bank statement (6 months)
3. Business proof (Udyam registration, GST certificate)
4. Quotation for equipment/assets (if applicable)
5. 2 passport photos

**Application process:**
1. Visit any PSB, Regional Rural Bank, or MFI
2. Fill MUDRA application form (available on mudra.org.in)
3. Submit documents + business plan summary
4. Bank reviews within 7-14 working days
5. Loan disbursed to bank account directly

**No collateral required** for Shishu & Kishore. Tarun may require minimal security.

Shall I help you check which tier fits your business?`,

  export: `**Export Documentation Checklist for Indian MSMEs:**

**Mandatory documents:**
- [ ] IEC (Import Export Code) from DGFT
- [ ] GST registration (LUT filing for zero-rated exports)
- [ ] Commercial Invoice (in USD/foreign currency)
- [ ] Packing List
- [ ] Bill of Lading / Airway Bill
- [ ] Certificate of Origin (from FIEO/Chamber of Commerce)
- [ ] Shipping Bill (filed on ICEGATE portal)

**Product-specific:**
- [ ] Phytosanitary Certificate (food/agri products)
- [ ] FSSAI export clearance (processed food)
- [ ] BIS certification (electronics)
- [ ] Drug License (pharma)

**Post-shipment:**
- [ ] Bank Realisation Certificate (BRC)
- [ ] RODTEP/MEIS benefit claim (on DGFT portal)

**Free help available:**
- FIEO helpdesk: 1800-11-3844
- DGFT regional offices offer free document review

Want me to explain any specific document in detail?`,

  investor: `**How to Find Investors for Your MSME:**

**Stage-appropriate sources:**

**Early/Seed Stage:**
- Angel Networks: Indian Angel Network, Mumbai Angels, LetsVenture
- Government: SIDBI Startup Mitra, Startup India Seed Fund (up to ₹20L)
- Incubators: IIT/IIM incubation cells offer ₹5-25L + mentorship

**Growth Stage:**
- VC Firms: Blume Ventures, Nexus VP, Accel India (Series A ₹5Cr+)
- SIDBI Venture Capital
- NABARD for agri/rural MSMEs

**Debt Alternatives (non-dilutive):**
- Revenue-based financing: Velocity, GetVantage, Recur Club
- Trade finance: M1xchange, RXIL (invoice discounting)

**Pitch preparation checklist:**
1. One-page executive summary
2. Financial model (3-year projections)
3. Market size (TAM/SAM/SOM)
4. Traction metrics (MoM growth, CAC, LTV)
5. Team slide

**MSME Connect portal** lists 200+ active investors looking for MSME deals.

Want me to help you craft your investor pitch?`,

  eligibility: `**MSME Scheme Eligibility — Quick Check:**

To accurately check eligibility, I need a few details:
1. **Business type**: Manufacturing / Services / Trading?
2. **Annual turnover** (approximate): < ₹5Cr / ₹5-50Cr / ₹50-250Cr?
3. **Employee count**: < 10 / 10-50 / 50-250?
4. **Udyam Registration**: Done / Pending?

**General eligibility matrix:**

| Scheme | Turnover | Category |
|--------|----------|----------|
| PM SVANidhi | < ₹10L | Street vendors |
| MUDRA Shishu | Any | Micro |
| CGTMSE | < ₹250Cr | Micro/Small |
| PMEGP | New units | Rural/Urban |
| TUFS | Manufacturing | Textile |

**Quick win:** If you have Udyam registration, you're automatically eligible for 15+ central government procurement schemes and priority sector lending at 8-9% p.a.

Share your business details and I'll give you a personalized scheme list!`,
};

function getAIReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes("dpiit") || lower.includes("startup india") || lower.includes("recognition")) return AI_REPLIES.dpiit;
  if (lower.includes("gst") || lower.includes("composition")) return AI_REPLIES.gst;
  if (lower.includes("mudra") || lower.includes("loan") || lower.includes("apply")) return AI_REPLIES.mudra;
  if (lower.includes("export") || lower.includes("documentation") || lower.includes("checklist")) return AI_REPLIES.export;
  if (lower.includes("investor") || lower.includes("funding") || lower.includes("series")) return AI_REPLIES.investor;
  if (lower.includes("eligib") || lower.includes("scheme") || lower.includes("check")) return AI_REPLIES.eligibility;
  return `Thank you for your question! I'm here to help with all aspects of MSME business growth in India — from government schemes and loans to compliance, exports, and investor readiness.

For the most accurate guidance, I can help you with:
- **Government Schemes**: MUDRA, CGTMSE, PMEGP, PM Vishwakarma, SIDBI loans
- **Compliance**: GST, Udyam registration, DPIIT recognition, labour laws
- **Funding**: Angel investors, VCs, revenue-based financing, grants
- **Export**: IEC registration, documentation, RODTEP benefits
- **Mentorship**: Connecting with industry experts and incubators

Could you give me a bit more detail about your specific situation? I'll provide step-by-step guidance tailored to your business!`;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-0",
    role: "ai",
    text: "Namaste! I'm your MSME Growth Hub AI Assistant. I can help you with government schemes, business registration, funding, mentorship, GST compliance, export documentation, and more — in 13 Indian languages. How can I help you today?",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "msg-1",
    role: "user",
    text: "What are the best government loans for a textile MSME?",
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: "msg-2",
    role: "ai",
    text: `Great question! For textile MSMEs, here are the top government loan schemes available in FY 2026-27:

1. **SIDBI Direct Finance** — Up to ₹1Cr at 7.5% p.a. for manufacturing MSMEs. Textile sector gets priority processing.

2. **MUDRA Tarun Loan** — Up to ₹10L with no collateral required. Perfect for small textile units.

3. **Credit Guarantee Fund (CGTMSE)** — 85% guarantee on loans up to ₹2Cr. Banks are more willing to lend with this backing.

4. **Technology Upgradation Fund Scheme (TUFS)** — Specifically for textile machinery upgrades. 5% interest subsidy.

5. **PM Vishwakarma for Weavers** — ₹3L at 5% p.a. + free skill training for traditional weavers.

Would you like me to check your eligibility for any of these, or help you with the application process?`,
    timestamp: new Date(Date.now() - 60000),
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function renderMarkdown(text: string): JSX.Element {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(<strong key={key++} style={{ display: "block", marginTop: 6 }}>{line.slice(2, -2)}</strong>);
    } else if (/^\d+\.\s\*\*/.test(line)) {
      const match = line.match(/^(\d+\.\s)\*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <div key={key++} style={{ marginTop: 6 }}>
            <span style={{ fontWeight: 600 }}>{match[1]}<strong>{match[2]}</strong></span>
            <span>{renderInline(match[3])}</span>
          </div>
        );
      } else {
        elements.push(<div key={key++}>{renderInline(line)}</div>);
      }
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={key++} style={{ display: "flex", gap: 6, marginTop: 3 }}>
          <span style={{ color: "#F97316", fontWeight: 700, flexShrink: 0 }}>•</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
    } else if (line.startsWith("- [ ]") || line.startsWith("- [x]")) {
      const checked = line.startsWith("- [x]");
      elements.push(
        <div key={key++} style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 3 }}>
          <span style={{ fontSize: 12, color: checked ? "#16a34a" : "#6b7280" }}>{checked ? "☑" : "☐"}</span>
          <span>{renderInline(line.slice(6))}</span>
        </div>
      );
    } else if (line.startsWith("| ") || line.startsWith("|--")) {
      // skip table lines for simplicity — render as pre
      elements.push(<code key={key++} style={{ display: "block", fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4, marginTop: 2 }}>{line}</code>);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} style={{ height: 6 }} />);
    } else {
      elements.push(<div key={key++}>{renderInline(line)}</div>);
    }
  }

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

// ── Waveform Animation ─────────────────────────────────────────────────────────

const WAVEFORM_STYLE = `
@keyframes waveBar1 { 0%,100%{height:8px} 50%{height:28px} }
@keyframes waveBar2 { 0%,100%{height:16px} 40%{height:36px} }
@keyframes waveBar3 { 0%,100%{height:24px} 50%{height:8px} }
@keyframes waveBar4 { 0%,100%{height:12px} 60%{height:32px} }
@keyframes waveBar5 { 0%,100%{height:6px} 50%{height:22px} }
@keyframes dotBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }
`;

function WaveformBars() {
  const bars = [
    { anim: "waveBar1 0.8s ease-in-out infinite" },
    { anim: "waveBar2 0.8s ease-in-out infinite 0.1s" },
    { anim: "waveBar3 0.8s ease-in-out infinite 0.2s" },
    { anim: "waveBar4 0.8s ease-in-out infinite 0.3s" },
    { anim: "waveBar5 0.8s ease-in-out infinite 0.4s" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, height: 40 }}>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            width: 6,
            borderRadius: 3,
            background: "linear-gradient(180deg,#F97316,#fb923c)",
            animation: b.anim,
          }}
        />
      ))}
    </div>
  );
}

function TypingDots() {
  const dots = [0, 1, 2];
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "8px 0" }}>
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#9ca3af",
            animation: `dotBounce 1.2s ease-in-out infinite ${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [readAloud, setReadAloud] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [speed, setSpeed] = useState<"Normal" | "Fast" | "Slow">("Normal");
  const [interim, setInterim] = useState("");
  const [activeConv, setActiveConv] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // cleanup speech on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setInterim("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIReply(text);
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        role: "ai",
        text: reply,
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
      if (readAloud && window.speechSynthesis) {
        const utt = new SpeechSynthesisUtterance(reply.replace(/\*\*/g, ""));
        utt.lang = selectedLang.code;
        utt.rate = speed === "Fast" ? 1.4 : speed === "Slow" ? 0.7 : 1;
        window.speechSynthesis.speak(utt);
      }
    }, 1200);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    const recog = new SpeechRecognition();
    recog.lang = selectedLang.code;
    recog.interimResults = true;
    recog.continuous = false;

    recog.onresult = (e: SpeechRecognitionEvent) => {
      let interimText = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript;
        } else {
          interimText += e.results[i][0].transcript;
        }
      }
      setInterim(interimText || finalText);
      if (finalText) {
        setInputText(finalText);
        setInterim("");
      }
    };

    recog.onend = () => {
      setIsListening(false);
    };

    recog.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recog;
    recog.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const clearChat = () => {
    setMessages([]);
    setInterim("");
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        background: "#f9fafb",
        overflow: "hidden",
      }}
    >
      <style>{WAVEFORM_STYLE}</style>

      {/* ── LEFT SIDEBAR ── */}
      <aside
        style={{
          width: 288,
          flexShrink: 0,
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Sidebar header */}
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Sparkles size={20} color="#F97316" />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#111827",
              }}
            >
              AI Assistant
            </span>
          </div>
          <button
            onClick={() => { clearChat(); setActiveConv(null); }}
            style={{
              width: "100%",
              padding: "9px 14px",
              background: "#F97316",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Plus size={16} /> New Conversation
          </button>
        </div>

        {/* Recent conversations */}
        <div style={{ padding: "12px 8px 0", flex: 1, overflowY: "auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0 8px",
              marginBottom: 6,
            }}
          >
            Recent
          </p>
          {RECENT_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 8,
                border: "none",
                background: activeConv === conv.id ? "#fff7ed" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: activeConv === conv.id ? "#F97316" : "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MessageSquare size={13} color={activeConv === conv.id ? "#fff" : "#6b7280"} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#111827",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {conv.title}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{conv.date}</div>
              </div>
              <ChevronRight size={13} color="#d1d5db" />
            </button>
          ))}
        </div>

        {/* Language selector */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f3f4f6" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Language
          </p>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                background: "#fff",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Globe size={14} color="#6b7280" />
                <span>{selectedLang.native}</span>
                <span style={{ color: "#9ca3af", fontSize: 11 }}>({selectedLang.code})</span>
              </span>
              <ChevronDown size={14} color="#6b7280" />
            </button>
            {langOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  zIndex: 50,
                  maxHeight: 240,
                  overflowY: "auto",
                }}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                    style={{
                      width: "100%",
                      padding: "8px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "none",
                      background: lang.code === selectedLang.code ? "#fff7ed" : "transparent",
                      cursor: "pointer",
                      fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif",
                      color: lang.code === selectedLang.code ? "#F97316" : "#374151",
                      textAlign: "left",
                    }}
                  >
                    <span>{lang.native}</span>
                    <span style={{ color: "#9ca3af", fontSize: 11 }}>{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voice settings */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f3f4f6" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Voice Settings
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Voice</span>
            <button
              onClick={() => setVoiceOn((v) => !v)}
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: voiceOn ? "#F97316" : "#d1d5db",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: voiceOn ? 21 : 3,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Speed</span>
            <div style={{ display: "flex", gap: 4 }}>
              {(["Slow", "Normal", "Fast"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    border: "1px solid",
                    borderColor: speed === s ? "#F97316" : "#e5e7eb",
                    background: speed === s ? "#fff7ed" : "#fff",
                    color: speed === s ? "#F97316" : "#6b7280",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f3f4f6" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#6b7280",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              padding: "6px 8px",
              borderRadius: 8,
            }}
          >
            <Home size={15} /> Back to Home
          </Link>
        </div>
      </aside>

      {/* ── RIGHT MAIN AREA ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "rgba(243,244,246,0.4)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "12px 20px",
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              background: "#fff7ed",
              borderRadius: 20,
              border: "1px solid #fed7aa",
            }}
          >
            <Globe size={13} color="#F97316" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#F97316" }}>
              {selectedLang.native}
            </span>
          </div>

          <button
            onClick={() => setVoiceMode((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              border: "1px solid",
              borderColor: voiceMode ? "#F97316" : "#e5e7eb",
              borderRadius: 8,
              background: voiceMode ? "#fff7ed" : "#fff",
              color: voiceMode ? "#F97316" : "#6b7280",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {voiceMode ? <Mic size={14} /> : <MicOff size={14} />}
            Voice Mode
          </button>

          <button
            onClick={clearChat}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              background: "#fff",
              color: "#6b7280",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              marginLeft: "auto",
            }}
          >
            <Trash2 size={14} /> Clear Chat
          </button>
        </div>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Empty state with suggested prompts */}
          {messages.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 24,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#F97316,#fb923c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: "0 8px 24px rgba(249,115,22,0.3)",
                  }}
                >
                  <Sparkles size={28} color="#fff" />
                </div>
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 26,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#111827",
                    marginBottom: 6,
                  }}
                >
                  MSME AI Assistant
                </h2>
                <p style={{ color: "#6b7280", fontSize: 14 }}>
                  Ask me anything about MSME schemes, compliance, funding, or exports
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "center",
                  maxWidth: 600,
                }}
              >
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 20,
                      background: "#fff",
                      color: "#374151",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#F97316";
                      (e.currentTarget as HTMLButtonElement).style.color = "#F97316";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
                      (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                gap: 10,
                alignItems: "flex-end",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    msg.role === "ai"
                      ? "linear-gradient(135deg,#F97316,#fb923c)"
                      : "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow:
                    msg.role === "ai"
                      ? "0 4px 12px rgba(249,115,22,0.3)"
                      : "0 4px 12px rgba(37,99,235,0.3)",
                }}
              >
                {msg.role === "ai" ? (
                  <Sparkles size={15} color="#fff" />
                ) : (
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>You</span>
                )}
              </div>

              {/* Bubble */}
              <div style={{ maxWidth: "70%", minWidth: 60 }}>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: msg.role === "ai" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                    background: msg.role === "ai" ? "#fff" : "#2563EB",
                    color: msg.role === "ai" ? "#1f2937" : "#fff",
                    fontSize: 14,
                    lineHeight: 1.6,
                    boxShadow:
                      msg.role === "ai"
                        ? "0 1px 6px rgba(0,0,0,0.08)"
                        : "0 4px 12px rgba(37,99,235,0.25)",
                    border: msg.role === "ai" ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  {msg.role === "ai" ? renderMarkdown(msg.text) : msg.text}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    marginTop: 4,
                    textAlign: msg.role === "user" ? "right" : "left",
                    paddingLeft: msg.role === "ai" ? 4 : 0,
                    paddingRight: msg.role === "user" ? 4 : 0,
                  }}
                >
                  {formatTime(msg.timestamp)}
                  {msg.role === "ai" && readAloud && (
                    <button
                      onClick={() => {
                        if (window.speechSynthesis) {
                          const utt = new SpeechSynthesisUtterance(msg.text.replace(/\*\*/g, ""));
                          utt.lang = selectedLang.code;
                          utt.rate = speed === "Fast" ? 1.4 : speed === "Slow" ? 0.7 : 1;
                          window.speechSynthesis.speak(utt);
                        }
                      }}
                      style={{
                        marginLeft: 8,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9ca3af",
                        padding: 0,
                        verticalAlign: "middle",
                      }}
                      title="Read aloud"
                    >
                      <Volume2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#F97316,#fb923c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={15} color="#fff" />
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  background: "#fff",
                  borderRadius: "18px 18px 18px 4px",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                }}
              >
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #e5e7eb",
            padding: "12px 20px",
          }}
        >
          {/* Waveform / listening state */}
          {isListening && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 14px",
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <WaveformBars />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#F97316", margin: 0 }}>
                  Listening…
                </p>
                <p style={{ fontSize: 13, color: "#374151", margin: "2px 0 0" }}>
                  {interim || "Say your question in " + selectedLang.native}
                </p>
              </div>
              <button
                onClick={stopListening}
                style={{
                  marginLeft: "auto",
                  padding: "4px 10px",
                  border: "1px solid #fed7aa",
                  borderRadius: 6,
                  background: "#fff",
                  color: "#F97316",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Suggested prompts row (compact) when no messages */}
          {messages.length > 0 && messages.length < 4 && (
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
              {SUGGESTED_PROMPTS.slice(0, 3).map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  style={{
                    padding: "4px 12px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 16,
                    background: "#f9fafb",
                    color: "#6b7280",
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Mic button */}
            <button
              onClick={isListening ? stopListening : startListening}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: isListening
                  ? "linear-gradient(135deg,#dc2626,#ef4444)"
                  : "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: isListening ? "0 0 0 4px rgba(220,38,38,0.2)" : "none",
                transition: "all 0.2s",
              }}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? (
                <MicOff size={18} color="#fff" />
              ) : (
                <Mic size={18} color="#6b7280" />
              )}
            </button>

            {/* Text input */}
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask in ${selectedLang.native}…`}
              style={{
                flex: 1,
                padding: "11px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                background: "#f9fafb",
                color: "#111827",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "#F97316";
                (e.target as HTMLInputElement).style.background = "#fff";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "#e5e7eb";
                (e.target as HTMLInputElement).style.background = "#f9fafb";
              }}
            />

            {/* Read aloud toggle */}
            <button
              onClick={() => setReadAloud((r) => !r)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                border: "1px solid",
                borderColor: readAloud ? "#F97316" : "#e5e7eb",
                background: readAloud ? "#fff7ed" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
              title={readAloud ? "Disable read aloud" : "Enable read aloud"}
            >
              {readAloud ? (
                <Volume2 size={16} color="#F97316" />
              ) : (
                <VolumeX size={16} color="#9ca3af" />
              )}
            </button>

            {/* Send button */}
            <button
              onClick={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background:
                  inputText.trim()
                    ? "linear-gradient(135deg,#F97316,#ea6d00)"
                    : "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: inputText.trim() ? "pointer" : "default",
                flexShrink: 0,
                boxShadow: inputText.trim()
                  ? "0 4px 12px rgba(249,115,22,0.35)"
                  : "none",
                transition: "all 0.2s",
              }}
            >
              <Send size={18} color={inputText.trim() ? "#fff" : "#d1d5db"} />
            </button>
          </div>

          <p
            style={{
              fontSize: 11,
              color: "#9ca3af",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            AI responses are for guidance only. Verify with official government portals before acting.
          </p>
        </div>
      </main>
    </div>
  );
}
