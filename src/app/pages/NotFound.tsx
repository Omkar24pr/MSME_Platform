import { Link, useNavigate } from "react-router";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-muted/30 flex items-center justify-center px-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1d4ed8,#F97316)" }}>
          <Sparkles size={36} className="text-white" />
        </div>

        <div className="text-8xl font-800 leading-none mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#F97316" }}>
          404
        </div>

        <h1 className="text-3xl font-700 uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Page Not Found
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved. Try navigating back or use the links below.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 border-2 border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary/40 transition-colors text-sm"
          >
            <ArrowLeft size={15} /> Go Back
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm shadow-md shadow-orange-100"
          >
            <Home size={15} /> Back to Home
          </Link>
          <Link
            to="/ai-search"
            className="flex items-center justify-center gap-2 border-2 border-accent text-accent font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            <Search size={15} /> AI Search
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Quick Links</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Services", href: "/services" },
              { label: "Mentorship", href: "/mentorship" },
              { label: "Schemes & Support", href: "/schemes" },
              { label: "Finance & Loans", href: "/finance" },
              { label: "AI Assistant", href: "/ai-assistant" },
              { label: "Knowledge Center", href: "/knowledge-center" },
              { label: "Content Hub", href: "/content-hub" },
              { label: "Smart Dashboard", href: "/smart-dashboard" },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-muted-foreground hover:text-primary hover:bg-orange-50 px-3 py-2 rounded-xl border border-border hover:border-primary/30 transition-all text-left"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
