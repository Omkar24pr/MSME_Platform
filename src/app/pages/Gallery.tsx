import { useState } from "react";
import { Link } from "react-router";
import { Play, X, Download, Share2, Heart, Search, Film, Image } from "lucide-react";

const CATEGORIES = [
  "All",
  "Event Photos",
  "Workshops",
  "Training Highlights",
  "Video Gallery",
];

const galleryItems = [
  {
    id: 1,
    photo: "1540575467063-178a50c2df87",
    title: "National MSME Summit 2026",
    category: "Event Photos",
    height: "h-64",
    desc: "Keynote sessions and delegation assembly at the main auditorium.",
  },
  {
    id: 2,
    photo: "1531482615713-2afd69097998",
    title: "Startup Pitch Preparation Workshop",
    category: "Workshops",
    height: "h-48",
    desc: "Mentors helping early stage founders refine their market offerings.",
  },
  {
    id: 3,
    photo: "1524178232363-1fb2b075b655",
    title: "RMSOEE Cohort Training Session",
    category: "Training Highlights",
    height: "h-56",
    desc: "Lecture on business model canvas validations.",
  },
  {
    id: 4,
    photo: "1515187029135-18ee286d815b",
    title: "MoU Signing Ceremony with SIDBI",
    category: "Event Photos",
    height: "h-40",
    desc: "Partnership launch for interest subvention support.",
  },
  {
    id: 5,
    photo: "1556761175-5973dc0f32e7",
    title: "Financial Planning & GST Workshop",
    category: "Workshops",
    height: "h-64",
    desc: "MSMEs learning bookkeeping compliance hacks.",
  },
  {
    id: 6,
    photo: "1427504494785-3a9ca7044f45",
    title: "Product Engineering Boot Camp",
    category: "Training Highlights",
    height: "h-48",
    desc: "Hands-on product development session for tech startups.",
  },
  {
    id: 7,
    videoUrl: "5K17H8H-3a4",
    title: "Venture Debt & Equity Fundraising Guide",
    category: "Video Gallery",
    height: "h-56",
    desc: "Dynamic video discussion on capital raise strategies.",
  },
  {
    id: 8,
    photo: "1517245386807-bb43f82c33c4",
    title: "Exhibition Panel - Women in MSME",
    category: "Event Photos",
    height: "h-40",
    desc: "Showcasing home-grown consumer brands founded by women.",
  },
  {
    id: 9,
    videoUrl: "Yn_vM6rRzts",
    title: "Step-by-Step Online Udyam Registration Guide",
    category: "Video Gallery",
    height: "h-64",
    desc: "How to register your MSME under the government portal.",
  },
  {
    id: 10,
    photo: "1517048676732-d65bc937f952",
    title: "Operations & Logistics Masterclass",
    category: "Workshops",
    height: "h-48",
    desc: "Group case studies on supply-chain improvements.",
  },
  {
    id: 11,
    videoUrl: "Yn_vM6rRzts",
    title: "Exporters Playbook & Customs Regulations",
    category: "Video Gallery",
    height: "h-56",
    desc: "Video breakdown of international market entries.",
  },
  {
    id: 12,
    photo: "1522202176988-66273c2fd55f",
    title: "Pitching to Venture Capitalists",
    category: "Training Highlights",
    height: "h-40",
    desc: "Feedback loops on pitch decks with active angel investors.",
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedSet, setSavedSet] = useState<Set<number>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const toggleSave = (id: number) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredItems = galleryItems.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050510]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header Banner */}
      <div className="relative w-full overflow-hidden py-16 border-b border-white/5 bg-space-spotlight">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050510]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Visual Ecosystem
          </div>
          <h1
            className="text-4xl md:text-6xl font-800 uppercase text-white leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            MSME <span className="text-primary">Ecosystem Gallery</span>
          </h1>
          <p className="mt-3 text-white/60 text-base max-w-xl mx-auto">
            Explore photos and video highlights of our events, entrepreneurship training, government workshops, and success stories.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Tab Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide shrink-0">
            {CATEGORIES.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search events, workshops, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Masonry-Style Responsive Layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-5xl mb-4">🖼️</p>
            <p className="font-semibold text-lg">No gallery items found</p>
            <p className="text-sm mt-1">Try a different search or filter category</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-white/20 transition-all duration-300 group cursor-pointer relative"
              >
                {/* Media Section */}
                <div className="relative overflow-hidden">
                  {item.videoUrl ? (
                    /* Video Thumbnail Layout */
                    <div className={`relative ${item.height} bg-[#0b0c1b] flex items-center justify-center`}>
                      <img
                        src={`https://img.youtube.com/vi/${item.videoUrl}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <button
                        onClick={() => setActiveVideo(item.videoUrl)}
                        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 z-10"
                      >
                        <Play size={20} className="fill-current ml-1" />
                      </button>
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Film size={10} /> VIDEO
                      </span>
                    </div>
                  ) : (
                    /* Photo Layout */
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-${item.photo}?w=600&fit=crop&auto=format`}
                        alt={item.title}
                        className={`w-full object-cover ${item.height} transition-transform duration-500 group-hover:scale-105`}
                      />
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Image size={10} /> PHOTO
                      </span>
                    </div>
                  )}

                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 z-10 bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>

                  {/* Action buttons on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p
                      className="text-white font-bold leading-tight mb-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.15rem" }}
                    >
                      {item.title}
                    </p>
                    <p className="text-white/60 text-xs mb-4 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(item.id);
                        }}
                        className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          savedSet.has(item.id)
                            ? "bg-primary text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        <Heart size={12} className={savedSet.has(item.id) ? "fill-white" : ""} />
                        {savedSet.has(item.id) ? "Saved" : "Save"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("System: Starting image/video download.");
                        }}
                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        <Download size={12} />
                        Get
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(window.location.href);
                          alert("Ecosystem link copied to clipboard!");
                        }}
                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        <Share2 size={12} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info panel below image (for general view) */}
                <div className="p-4 border-t border-white/5">
                  <h3
                    className="text-white font-bold leading-snug truncate"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-1 mt-1 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white/70 hover:text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/10"
            >
              <X size={20} />
            </button>

            {/* Embedded video player */}
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Ecosystem Video Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
