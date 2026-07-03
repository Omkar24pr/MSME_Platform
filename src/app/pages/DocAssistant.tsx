import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  FileUp,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image,
  Sparkles,
  Copy,
  Download,
  Volume2,
  Languages,
  CheckSquare,
  Square,
  Send,
  X,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DocFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: "pdf" | "docx" | "xlsx" | "pptx" | "img";
  pages?: number;
}

interface QAPair {
  question: string;
  answer: string;
}

interface ActionItem {
  id: string;
  text: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const RECENT_DOCS: DocFile[] = [
  { id: "1", name: "GST Registration Certificate.pdf", size: "2.1 MB", date: "June 20, 2026", type: "pdf", pages: 4 },
  { id: "2", name: "Business Plan Q3 2026.docx", size: "890 KB", date: "June 18, 2026", type: "docx", pages: 22 },
  { id: "3", name: "MUDRA Loan Application.pdf", size: "1.4 MB", date: "June 15, 2026", type: "pdf", pages: 12 },
  { id: "4", name: "Financial Projections.xlsx", size: "560 KB", date: "June 12, 2026", type: "xlsx", pages: 6 },
  { id: "5", name: "Pitch Deck v4.pptx", size: "8.2 MB", date: "June 10, 2026", type: "pptx", pages: 28 },
];

const ACTION_ITEMS: ActionItem[] = [
  { id: "a1", text: "Verify GSTIN on GST portal", priority: "High", dueDate: "June 28, 2026" },
  { id: "a2", text: "File pending GSTR returns", priority: "High", dueDate: "July 20, 2026" },
  { id: "a3", text: "Update GST details in business profile", priority: "Medium", dueDate: "July 5, 2026" },
  { id: "a4", text: "Set GST return filing reminders", priority: "Low", dueDate: "July 10, 2026" },
];

const INITIAL_QA: QAPair[] = [
  {
    question: "What is the GSTIN?",
    answer: "The GSTIN (Goods and Services Tax Identification Number) on this certificate is 27AADCB2230M1Z3. This is a 15-digit unique identifier assigned to your business under the GST regime.",
  },
  {
    question: "When was this issued?",
    answer: "This GST Registration Certificate was issued on 15-Apr-2025. The registration is currently active under the Regular Taxpayer category.",
  },
];

const SUGGESTED_QUESTIONS = [
  "What is the GSTIN?",
  "When was this issued?",
  "What type of taxpayer?",
];

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];

const HINDI_SUMMARY = `यह जीएसटी पंजीकरण प्रमाणपत्र भारत सरकार द्वारा जारी किया गया है। इस दस्तावेज़ में व्यापार का GSTIN नंबर 27AADCB2230M1Z3 है। पंजीकरण की तारीख 15 अप्रैल 2025 है और व्यापार की श्रेणी "नियमित करदाता" है। यह प्रमाणपत्र वैध है और सभी GST लेनदेन के लिए उपयोग किया जा सकता है।`;

const OCR_TEXT = `GOVERNMENT OF INDIA
GOODS AND SERVICES TAX REGISTRATION CERTIFICATE
Certificate No.: AA271000000001
GSTIN: 27AADCB2230M1Z3
Legal Name of Business: ADITYA COMMERCIAL ENTERPRISES
Trade Name (if any): ADITYA ENTERPRISES
Constitution of Business: Proprietorship
Date of Liability: 01-Apr-2025
Date of Registration: 15-Apr-2025`;

// ─── File type helpers ────────────────────────────────────────────────────────

const FILE_TYPE_CONFIG = {
  pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-50", label: "PDF" },
  docx: { icon: FileText, color: "text-blue-600", bg: "bg-blue-50", label: "DOCX" },
  xlsx: { icon: FileSpreadsheet, color: "text-green-600", bg: "bg-green-50", label: "XLSX" },
  pptx: { icon: Presentation, color: "text-orange-500", bg: "bg-orange-50", label: "PPTX" },
  img: { icon: Image, color: "text-purple-500", bg: "bg-purple-50", label: "IMG" },
};

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocAssistant() {
  const [selectedDoc, setSelectedDoc] = useState<DocFile>(RECENT_DOCS[0]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [docQuestion, setDocQuestion] = useState("");
  const [docAnswer, setDocAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [qaHistory, setQaHistory] = useState<QAPair[]>(INITIAL_QA);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const simulateUpload = (fileName: string) => {
    setUploadProgress(0);
    setUploadSuccess(false);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        clearInterval(iv);
        setUploadProgress(100);
        setTimeout(() => {
          setUploadSuccess(true);
          setUploadProgress(null);
        }, 500);
      } else {
        setUploadProgress(Math.min(p, 99));
      }
    }, 120);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file.name);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file.name);
  };

  const typeAnswer = (answer: string) => {
    setIsTyping(true);
    setDocAnswer("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDocAnswer(answer.slice(0, i));
      if (i >= answer.length) {
        clearInterval(iv);
        setIsTyping(false);
      }
    }, 18);
  };

  const handleQuestion = (q: string) => {
    if (!q.trim()) return;
    const existing = qaHistory.find(qa => qa.question.toLowerCase() === q.toLowerCase());
    if (existing) {
      typeAnswer(existing.answer);
      setDocQuestion("");
      return;
    }
    const mockAnswer = `Based on the document "${selectedDoc.name}", here is the relevant information regarding your query: "${q}". The document contains comprehensive details about the GST registration, including all relevant tax identifiers, taxpayer classification, and registration validity. Please consult a tax advisor for compliance-specific questions.`;
    setQaHistory(prev => [...prev, { question: q, answer: mockAnswer }]);
    typeAnswer(mockAnswer);
    setDocQuestion("");
  };

  const toggleAction = (id: string) => {
    setCompletedActions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(OCR_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const fileConfig = FILE_TYPE_CONFIG[selectedDoc.type];
  const FileIcon = fileConfig.icon;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Page Header */}
      <div className="bg-white border-b border-border px-6 py-5">
        <div className="max-w-screen-xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">AI Document Assistant</span>
          </nav>
          <h1
            className="text-4xl font-bold uppercase tracking-wide text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            AI Document Assistant
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Upload · Analyze · Translate · Ask Questions
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">

        {/* ── Left Panel ────────────────────────────────────────────── */}
        <aside className="w-full lg:w-96 flex flex-col gap-4 flex-shrink-0">

          {/* Upload Zone */}
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2
              className="text-lg font-bold uppercase tracking-wide mb-3 text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Upload Document
            </h2>

            <div
              className={`relative border-2 border-dashed rounded-2xl bg-muted/20 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragging ? "border-primary bg-orange-50" : "border-border hover:border-primary/50"}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInput}
                accept=".pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg" />
              <FileUp size={36} className="text-primary mb-3" />
              <p className="font-semibold text-foreground text-sm text-center">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1 text-center">PDF · DOCX · Excel · PPT · Images</p>
              <p className="text-xs text-muted-foreground">Max size: 25 MB</p>

              {/* Format icons */}
              <div className="flex gap-2 mt-4">
                {(["pdf","docx","xlsx","pptx","img"] as const).map(t => {
                  const cfg = FILE_TYPE_CONFIG[t];
                  const Ic = cfg.icon;
                  return (
                    <div key={t} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg ${cfg.bg}`}>
                      <Ic size={16} className={cfg.color} />
                      <span className={`text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress */}
            {uploadProgress !== null && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Uploading…</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle2 size={16} />
                File uploaded successfully!
              </div>
            )}
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2
              className="text-lg font-bold uppercase tracking-wide mb-3 text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Recent Documents
            </h2>
            <div className="flex flex-col gap-2">
              {RECENT_DOCS.map(doc => {
                const cfg = FILE_TYPE_CONFIG[doc.type];
                const Ic = cfg.icon;
                const isActive = selectedDoc.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isActive ? "border-primary bg-orange-50" : "border-border hover:border-primary/30 hover:bg-muted/30"}`}
                    onClick={() => { setSelectedDoc(doc); setDocAnswer(""); setTranslatedText(null); }}
                  >
                    <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                      <Ic size={18} className={cfg.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size} · {doc.date}</p>
                    </div>
                    <button
                      className="text-xs font-semibold text-primary px-2 py-1 rounded-lg hover:bg-primary hover:text-white transition-colors flex-shrink-0"
                      onClick={e => { e.stopPropagation(); setSelectedDoc(doc); }}
                    >
                      Analyze
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Right Panel ───────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col gap-4 min-w-0">

          {/* Document Info Bar */}
          <div className="bg-white rounded-2xl border border-border px-5 py-4 flex flex-wrap items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${fileConfig.bg} flex items-center justify-center`}>
              <FileIcon size={20} className={fileConfig.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{selectedDoc.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedDoc.pages} pages · Language detected: <span className="font-medium text-foreground">English</span>
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl border border-border hover:border-accent hover:text-accent transition-colors"
                onClick={() => setTranslatedText(HINDI_SUMMARY)}
              >
                <Languages size={15} /> Translate
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl border border-border hover:border-primary hover:text-primary transition-colors">
                <Volume2 size={15} /> Read Aloud
              </button>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-accent" />
              <h3
                className="text-base font-bold uppercase tracking-wide text-accent"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                AI Summary
              </h3>
            </div>
            <div className="text-sm text-foreground space-y-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p>This GST Registration Certificate is an official document issued by the Goods and Services Tax Network (GSTN) of India. It serves as legal proof that your business is registered under the Goods and Services Tax regime and is authorized to collect and remit GST.</p>
              <p>The certificate contains essential business identification details, including the unique GSTIN, the legal name and trade name of the business, the constitution type, and the principal place of business. It also specifies the category of taxpayer and the effective date of registration.</p>
              <p>As a Regular Taxpayer, the registered entity is required to file monthly or quarterly GST returns (GSTR-1, GSTR-3B) as applicable and maintain proper books of accounts. The certificate must be displayed at the principal and additional places of business.</p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "GSTIN", value: "27AADCB2230M1Z3" },
                { label: "Registration Date", value: "15-Apr-2025" },
                { label: "Business Type", value: "Regular Taxpayer" },
              ].map(f => (
                <div key={f.label} className="bg-white rounded-xl border border-blue-200 px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{f.label}</p>
                  <p className="text-sm font-semibold text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OCR / Text Extraction */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3
              className="text-base font-bold uppercase tracking-wide text-foreground mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              OCR / Text Extraction
            </h3>
            <div className="bg-muted/40 rounded-xl border border-border p-4 font-mono text-xs text-foreground leading-relaxed overflow-x-auto whitespace-pre">
              {OCR_TEXT.slice(0, 200)}…
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                onClick={handleCopy}
              >
                <Copy size={14} /> {copied ? "Copied!" : "Copy Text"}
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                <Download size={14} /> Download TXT
              </button>
            </div>
          </div>

          {/* Ask Questions */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3
              className="text-base font-bold uppercase tracking-wide text-foreground mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ask Questions
            </h3>

            {/* Suggested chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {SUGGESTED_QUESTIONS.map(q => (
                <button
                  key={q}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary hover:bg-orange-50 transition-colors"
                  onClick={() => handleQuestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={docQuestion}
                onChange={e => setDocQuestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleQuestion(docQuestion)}
                placeholder="Ask a question about this document…"
                className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary bg-muted/20"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button
                className="bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                onClick={() => handleQuestion(docQuestion)}
              >
                <Send size={16} />
              </button>
            </div>

            {/* Typing answer */}
            {(docAnswer || isTyping) && (
              <div className="mt-3 bg-blue-50 rounded-xl border border-blue-200 p-4 text-sm text-foreground leading-relaxed">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles size={13} className="text-accent" />
                  <span className="text-xs font-semibold text-accent">AI Answer</span>
                </div>
                {docAnswer}
                {isTyping && <span className="inline-block w-1 h-4 bg-accent ml-0.5 animate-pulse" />}
              </div>
            )}

            {/* Pre-answered Q&As */}
            <div className="mt-4 flex flex-col gap-3">
              {qaHistory.map((qa, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <div className="bg-muted/30 px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Q: {qa.question}
                  </div>
                  <div className="px-4 py-3 text-sm text-foreground leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-base font-bold uppercase tracking-wide text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                AI-Generated Action Items
              </h3>
              <span className="text-xs text-muted-foreground">
                {completedActions.size}/{ACTION_ITEMS.length} completed
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {ACTION_ITEMS.map(item => {
                const done = completedActions.has(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${done ? "border-border bg-muted/20 opacity-60" : "border-border hover:border-primary/30"}`}
                  >
                    <button onClick={() => toggleAction(item.id)} className="flex-shrink-0 text-primary">
                      {done ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <p className={`flex-1 text-sm ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.text}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColors[item.priority]}`}>
                      {item.priority}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{item.dueDate}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Translation */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3
              className="text-base font-bold uppercase tracking-wide text-foreground mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Translate Document
            </h3>
            <div className="flex gap-3 flex-wrap">
              <select
                value={selectedLang}
                onChange={e => { setSelectedLang(e.target.value); setTranslatedText(null); }}
                className="text-sm px-3 py-2.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:border-primary"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
              <button
                className="bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2"
                onClick={() => setTranslatedText(HINDI_SUMMARY)}
              >
                <Languages size={15} /> Translate
              </button>
            </div>
            {translatedText && (
              <div className="mt-4 bg-muted/20 rounded-xl border border-border p-4 text-sm text-foreground leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">{selectedLang} Translation (AI-generated)</p>
                {translatedText}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
