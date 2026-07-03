import { useState } from "react";
import { Link } from "react-router";

const filters = [
  "All",
  "Business Ideas",
  "Manufacturing",
  "Govt Schemes",
  "Success Stories",
  "Infographics",
  "Startup Life",
  "Export",
];

const galleryItems = [
  {
    id: 1,
    photo: "1559526324-4b87b5e36e44",
    title: "Angel Investment Guide 2026",
    category: "Finance",
    height: "h-64",
  },
  {
    id: 2,
    photo: "1556742049-0cfed4f6a45d",
    title: "MSME Digital Transformation",
    category: "Business Ideas",
    height: "h-48",
  },
  {
    id: 3,
    photo: "1504384308090-c894fdcc538d",
    title: "Startup Office Setup Ideas",
    category: "Startup Life",
    height: "h-56",
  },
  {
    id: 4,
    photo: "1460925895917-afdab827c52f",
    title: "Revenue Growth Dashboard",
    category: "Business Ideas",
    height: "h-40",
  },
  {
    id: 5,
    photo: "1586281380349-632531db7ed4",
    title: "Government Scheme Overview",
    category: "Govt Schemes",
    height: "h-64",
  },
  {
    id: 6,
    photo: "1565514020179-026b92b2d70b",
    title: "Small Factory Setup Guide",
    category: "Manufacturing",
    height: "h-48",
  },
  {
    id: 7,
    photo: "1578662996442-48f60103fc96",
    title: "Export Process Infographic",
    category: "Export",
    height: "h-56",
  },
  {
    id: 8,
    photo: "1522202176988-66273c2fd55f",
    title: "Team Building for Startups",
    category: "Startup Life",
    height: "h-40",
  },
  {
    id: 9,
    photo: "1444653614773-995cb1ef9efa",
    title: "Indian Market Opportunities",
    category: "Business Ideas",
    height: "h-64",
  },
  {
    id: 10,
    photo: "1450101499163-c8848c66ca85",
    title: "GST Compliance Checklist",
    category: "Infographics",
    height: "h-48",
  },
  {
    id: 11,
    photo: "1507679799987-c73779587ccf",
    title: "Tax Planning for MSMEs",
    category: "Finance",
    height: "h-56",
  },
  {
    id: 12,
    photo: "1516321318423-f06f85e504b3",
    title: "Social Commerce Strategy",
    category: "Marketing",
    height: "h-40",
  },
  {
    id: 13,
    photo: "1591696205602-2f950c417cb9",
    title: "Women Entrepreneurs India",
    category: "Success Stories",
    height: "h-64",
  },
  {
    id: 14,
    photo: "1611532736597-de2d4265fba3",
    title: "Digital Marketing ROI",
    category: "Marketing",
    height: "h-48",
  },
  {
    id: 15,
    photo: "1520607162513-77705c0f0d4a",
    title: "Startup India 2026",
    category: "Govt Schemes",
    height: "h-56",
  },
  {
    id: 16,
    photo: "1454165804606-c3d57bc86b40",
    title: "Business Planning Template",
    category: "Business Ideas",
    height: "h-40",
  },
];

const categoryFilterMap: Record<string, string[]> = {
  "All": [],
  "Business Ideas": ["Business Ideas"],
  "Manufacturing": ["Manufacturing"],
  "Govt Schemes": ["Govt Schemes"],
  "Success Stories": ["Success Stories"],
  "Infographics": ["Infographics"],
  "Startup Life": ["Startup Life"],
  "Export": ["Export"],
};

function GalleryCard({
  item,
  saved,
  onSave,
}: {
  item: typeof galleryItems[0];
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="break-inside-avoid mb-4 group relative bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-${item.photo}?w=400&fit=crop&auto=format`}
          alt={item.title}
          className={`w-full object-cover ${item.height} transition-transform duration-300 group-hover:scale-105`}
        />

        {/* Category Tag */}
        <span className="absolute top-2 left-2 z-10 bg-[#F97316] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {item.category}
        </span>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
          <p
            className="text-white font-bold text-sm leading-tight mb-3 line-clamp-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem" }}
          >
            {item.title}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                saved
                  ? "bg-[#F97316] text-white"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              }`}
            >
              ❤️ {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              ⬇️ Download
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              ↗️ Share
            </button>
          </div>
        </div>
      </div>

      {/* Below image info */}
      <div className="px-3 py-2.5">
        <h3
          className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.95rem" }}
        >
          {item.title}
        </h3>
        <p className="text-xs text-[#2563EB] mt-0.5 font-medium">MSME Growth Hub</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedSet, setSavedSet] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredItems = galleryItems.filter((item) => {
    const filterCategories = categoryFilterMap[activeFilter] ?? [];
    const matchesFilter =
      activeFilter === "All" || filterCategories.includes(item.category);
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1
                className="text-xl font-bold text-gray-900 tracking-wide"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Gallery
              </h1>
              <span className="text-sm text-gray-400 font-normal">
                — Visual Resources for MSMEs
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-[#F97316]/10 text-[#F97316] font-semibold px-2 py-0.5 rounded-full text-xs">
                {savedSet.size} saved
              </span>
              <Link
                to="/gallery"
                className="text-[#2563EB] hover:underline font-medium text-xs"
              >
                View All →
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search images, guides, infographics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeFilter === filter
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="font-medium text-lg">No images found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> resources
            </p>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredItems.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  saved={savedSet.has(item.id)}
                  onSave={() => toggleSave(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
