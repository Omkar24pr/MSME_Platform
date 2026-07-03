import { useState } from "react";
import { Link } from "react-router";
import { Search, ArrowRight, Calendar, User, ChevronLeft, ChevronRight, X } from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const CATEGORIES = ["All", "Business", "Finance", "Marketing", "Technology", "MSME Schemes", "Startup", "Government Policies", "Operations"];

const ALL_ARTICLES = [
  { id: 1, title: "How to Structure Your First MSME for Tax Benefits", category: "Finance", date: "June 18, 2026", author: "Ananya Krishnan", summary: "A practical guide to entity types, DPIIT registration, and the tax exemptions available to early-stage MSMEs in India.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop&auto=format" },
  { id: 2, title: "The 5 GTM Mistakes Every Startup Makes in Year One", category: "Marketing", date: "June 10, 2026", author: "Rohan Agarwal", summary: "From targeting too broad to skipping customer discovery — the most common go-to-market errors and how to avoid them.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format" },
  { id: 3, title: "Building Resilient Operations: Lessons from Scaling to 5,000 Cities", category: "Operations", date: "June 3, 2026", author: "Meera Iyer", summary: "What MSMEs can learn from hyper-growth playbooks — operational discipline at any stage of the journey.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop&auto=format" },
  { id: 4, title: "SIDBI MSME Loan Scheme 2026-27: Complete Application Guide", category: "MSME Schemes", date: "May 28, 2026", author: "Suresh Krishnamurthy", summary: "Step-by-step instructions for applying to SIDBI's flagship MSME loan scheme, including eligibility, documents, and timelines.", image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=300&fit=crop&auto=format" },
  { id: 5, title: "Why Your Startup Needs a Fractional CFO Before Series A", category: "Finance", date: "May 22, 2026", author: "Rohan Agarwal", summary: "How bringing in a part-time financial expert at the right time can mean the difference between a successful raise and a failed one.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop&auto=format" },
  { id: 6, title: "Digital Transformation for Traditional MSMEs: Where to Start", category: "Technology", date: "May 15, 2026", author: "Vikram Sinha", summary: "A practical roadmap for brick-and-mortar businesses transitioning to digital-first operations without breaking the bank.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop&auto=format" },
  { id: 7, title: "Startup India Seed Fund 2026: ₹20L Grants — Who Qualifies?", category: "Government Policies", date: "May 9, 2026", author: "Ananya Krishnan", summary: "Breaking down the eligibility criteria, application process, and selection methodology for the Startup India Seed Fund.", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=300&fit=crop&auto=format" },
  { id: 8, title: "Building a Brand on ₹5 Lakhs: D2C Marketing Playbook", category: "Marketing", date: "May 2, 2026", author: "Priya Bansal", summary: "How Indian D2C founders can build a recognizable brand and customer acquisition engine with a lean budget.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&auto=format" },
  { id: 9, title: "Understanding the ONDC Network for Small Businesses", category: "MSME Schemes", date: "Apr 25, 2026", author: "Amit Joshi", summary: "ONDC demystified — how small sellers and service providers can join India's open digital commerce network and reach national audiences.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop&auto=format" },
  { id: 10, title: "Hiring Your First 10 Engineers: A Founder's Guide", category: "Startup", date: "Apr 18, 2026", author: "Vikram Sinha", summary: "From writing the right job description to structuring equity offers — how to build a world-class early-stage engineering team.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop&auto=format" },
  { id: 11, title: "Cap Table 101: Avoiding the Mistakes That Kill Fundraising", category: "Finance", date: "Apr 10, 2026", author: "Rohan Agarwal", summary: "The most common cap table errors founders make and why institutional investors walk away from them — with a clean template to follow.", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=300&fit=crop&auto=format" },
  { id: 12, title: "How the PLI Scheme Can Benefit Your Manufacturing MSME", category: "Government Policies", date: "Apr 3, 2026", author: "Suresh Krishnamurthy", summary: "A breakdown of Production Linked Incentive schemes applicable to MSMEs in textiles, electronics, food processing, and pharma.", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=300&fit=crop&auto=format" },
];

const PER_PAGE = 6;

const CATEGORY_COLORS: Record<string, string> = {
  "Finance": "#2563EB", "Marketing": "#7C3AED", "Operations": "#059669",
  "MSME Schemes": "#F97316", "Technology": "#0891B2", "Startup": "#DC2626",
  "Government Policies": "#D97706", "Business": "#64748B", "All": "#64748B",
};

export default function Articles() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = ALL_ARTICLES.filter((a) => {
    const matchCat = category === "All" || a.category === category;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-muted/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Page header */}
      <div className="bg-white border-b border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border font-medium text-accent border-blue-200 bg-blue-50 mb-4">Knowledge Hub</span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-[clamp(36px,5vw,72px)] font-800 uppercase leading-tight text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Articles &amp; <span className="text-accent">Insights.</span>
              </h1>
              <p className="mt-2 text-muted-foreground text-sm max-w-lg">
                Expert-authored guides, scheme breakdowns, and tactical playbooks for MSME founders and entrepreneurs.
              </p>
            </div>
            <div className="text-xs font-mono text-muted-foreground">{ALL_ARTICLES.length} articles published</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles, authors, topics..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 border border-border rounded-xl bg-white text-sm focus:outline-none focus:border-accent transition-colors"
            />
            {search && (
              <button onClick={() => handleSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={category}
            onChange={(e) => handleFilter(e.target.value)}
            className="border border-border rounded-xl px-4 py-3 bg-white text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={cn(
                "text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all",
                category === cat
                  ? "text-white border-transparent"
                  : "border-border text-muted-foreground hover:text-foreground bg-white"
              )}
              style={category === cat ? { background: CATEGORY_COLORS[cat] ?? "#F97316", borderColor: CATEGORY_COLORS[cat] ?? "#F97316" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-xs text-muted-foreground font-mono mb-6">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
          {category !== "All" && ` in ${category}`}
        </p>

        {paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginated.map((a) => {
              const catColor = CATEGORY_COLORS[a.category] ?? "#64748B";
              return (
                <article key={a.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                  <div className="h-44 bg-muted overflow-hidden shrink-0">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full" style={{ color: catColor, background: `${catColor}12`, border: `1px solid ${catColor}25` }}>
                        {a.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Calendar size={9} /> {a.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-700 text-foreground mb-2 leading-snug flex-1">{a.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{a.summary}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User size={11} /> {a.author}
                      </span>
                      <button className="flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all">
                        Read More <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <p className="text-muted-foreground mb-3">No articles match your search.</p>
            <button onClick={() => { handleSearch(""); handleFilter("All"); }} className="text-sm text-accent font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <ChevronLeft size={15} /> Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn("w-9 h-9 rounded-lg text-sm font-semibold border transition-all", page === p ? "bg-accent text-white border-accent" : "border-border text-muted-foreground hover:border-accent/40 bg-white")}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-white border-2 border-accent/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-800 uppercase mb-2 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Stay in the loop.
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Get weekly insights, scheme updates, and expert articles delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" />
            <button className="bg-accent text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </div>
  );
}
