import { useState } from "react";
import { Link } from "react-router";

const categories = [
  { id: "all", label: "All", icon: "🏠" },
  { id: "business", label: "Business Tips", icon: "💼" },
  { id: "schemes", label: "MSME Schemes", icon: "🏛️" },
  { id: "startup", label: "Startup Stories", icon: "🚀" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "legal", label: "Legal", icon: "⚖️" },
  { id: "export", label: "Export", icon: "📦" },
  { id: "success", label: "Success Stories", icon: "🏆" },
  { id: "events", label: "Events", icon: "📅" },
];

const trendingTopics = [
  "MUDRA Loan 2026",
  "GST Amendment Updates",
  "Startup India Benefits",
  "PM Vishwakarma Scheme",
  "MSME Export Incentives",
];

const videos = [
  {
    id: 1,
    title: "How to Apply for MUDRA Loan Step-by-Step",
    channel: "FinanceGuru India",
    views: "45K",
    date: "2 days ago",
    duration: "8:23",
    category: "Finance",
    categoryId: "finance",
    likes: 1240,
    photo: "1554224155-6726b3ff858f",
  },
  {
    id: 2,
    title: "Startup India Registration Complete Tutorial 2026",
    channel: "StartupHub",
    views: "120K",
    date: "1 week ago",
    duration: "15:42",
    category: "Startup",
    categoryId: "startup",
    likes: 4800,
    photo: "1460925895917-afdab827c52f",
  },
  {
    id: 3,
    title: "GST Filing for MSMEs Made Simple",
    channel: "TaxEase India",
    views: "67K",
    date: "3 days ago",
    duration: "11:15",
    category: "Legal",
    categoryId: "legal",
    likes: 2100,
    photo: "1507679799987-c73779587ccf",
  },
  {
    id: 4,
    title: "Success Story: From ₹50K to ₹2Cr Turnover in 2 Years",
    channel: "MSME Stories",
    views: "203K",
    date: "5 days ago",
    duration: "18:30",
    category: "Success",
    categoryId: "success",
    likes: 9300,
    photo: "1522202176988-66273c2fd55f",
  },
  {
    id: 5,
    title: "Export Documentation: Complete Checklist",
    channel: "TradeIndia",
    views: "34K",
    date: "1 week ago",
    duration: "9:47",
    category: "Export",
    categoryId: "export",
    likes: 870,
    photo: "1578662996442-48f60103fc96",
  },
  {
    id: 6,
    title: "Digital Marketing on ₹5000/month Budget",
    channel: "GrowthLab",
    views: "89K",
    date: "4 days ago",
    duration: "12:20",
    category: "Marketing",
    categoryId: "marketing",
    likes: 3400,
    photo: "1611532736597-de2d4265fba3",
  },
  {
    id: 7,
    title: "How I Raised ₹1Cr Angel Investment",
    channel: "FundedStartups",
    views: "156K",
    date: "2 weeks ago",
    duration: "22:15",
    category: "Finance",
    categoryId: "finance",
    likes: 6700,
    photo: "1559526324-4b87b5e36e44",
  },
  {
    id: 8,
    title: "MSME Udyam Registration: New Rules 2026",
    channel: "ComplianceKaro",
    views: "78K",
    date: "6 days ago",
    duration: "7:55",
    category: "Legal",
    categoryId: "legal",
    likes: 2900,
    photo: "1450101499163-c8848c66ca85",
  },
  {
    id: 9,
    title: "Manufacturing MSME: Zero to ₹10Cr Blueprint",
    channel: "MakInIndia",
    views: "91K",
    date: "3 days ago",
    duration: "31:40",
    category: "Business",
    categoryId: "business",
    likes: 3800,
    photo: "1565514020179-026b92b2d70b",
  },
  {
    id: 10,
    title: "Social Media Strategy for Local Businesses",
    channel: "DigitalDukaan",
    views: "44K",
    date: "5 days ago",
    duration: "13:22",
    category: "Marketing",
    categoryId: "marketing",
    likes: 1600,
    photo: "1516321318423-f06f85e504b3",
  },
  {
    id: 11,
    title: "PM Vishwakarma Scheme: Who Qualifies?",
    channel: "SchemeAlert",
    views: "55K",
    date: "1 week ago",
    duration: "6:18",
    category: "Schemes",
    categoryId: "schemes",
    likes: 2200,
    photo: "1520607162513-77705c0f0d4a",
  },
  {
    id: 12,
    title: "Pitch Deck Masterclass for Indian Startups",
    channel: "PitchPerfect",
    views: "178K",
    date: "10 days ago",
    duration: "28:50",
    category: "Startup",
    categoryId: "startup",
    likes: 7500,
    photo: "1551836022-d5d88e9218df",
  },
];

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
        <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

function VideoCard({ video, liked, bookmarked, onLike, onBookmark }: {
  video: typeof videos[0];
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative group cursor-pointer">
        <img
          src={`https://images.unsplash.com/photo-${video.photo}?w=400&h=225&fit=crop&auto=format`}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <PlayButton />
        <span className="absolute top-2 left-2 bg-[#F97316] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {video.category}
        </span>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3
          className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem" }}
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span className="font-medium text-[#2563EB]">{video.channel}</span>
          <span>·</span>
          <span>{video.views} views</span>
          <span>·</span>
          <span>{video.date}</span>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
          <button
            onClick={onLike}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
              liked ? "text-[#F97316] bg-orange-50" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            👍 <span>{liked ? video.likes + 1 : video.likes}</span>
          </button>
          <button
            onClick={onBookmark}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
              bookmarked ? "text-[#2563EB] bg-blue-50" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            🔖
          </button>
          <button className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            ↗️
          </button>
          <button className="ml-auto flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#F97316] text-white font-semibold hover:bg-orange-600 transition-colors">
            ▶ Watch
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContentHub() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedSet, setLikedSet] = useState<Set<number>>(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredVideos = videos.filter((v) => {
    const matchesCategory = activeCategory === "all" || v.categoryId === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingVideos = videos.slice(0, 4);
  const forYouVideos = filteredVideos;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              </div>
              <h1
                className="text-xl font-bold text-gray-900 tracking-wide"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Content Hub
              </h1>
            </div>
            <div className="flex-1 relative">
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
                placeholder="Search videos, channels, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-[#F97316] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col gap-4 w-56 flex-shrink-0">
          {/* Trending Now */}
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2
              className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
            >
              🔥 Trending Now
            </h2>
            <ul className="space-y-2">
              {trendingTopics.map((topic, i) => (
                <li key={topic} className="flex items-center gap-2 cursor-pointer hover:text-[#F97316] transition-colors">
                  <span className="text-xs font-bold text-gray-400 w-4">#{i + 1}</span>
                  <span className="text-sm text-gray-700 hover:text-[#F97316]">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Saved Videos */}
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2
              className="text-base font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
            >
              🔖 Saved Videos
            </h2>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">
                <span className="bg-[#2563EB] text-white text-xs font-bold px-2 py-0.5 rounded-full mr-1">
                  {bookmarkedSet.size}
                </span>
                saved
              </span>
            </div>
            <Link
              to="/gallery"
              className="block w-full text-center text-sm font-semibold text-[#2563EB] bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors"
            >
              View Saved →
            </Link>
          </div>

          {/* Upload Button */}
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2
              className="text-sm font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Share Your Knowledge
            </h2>
            <p className="text-xs text-gray-500 mb-3">Upload tutorials, tips & success stories</p>
            <button className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Content
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-8">
          {/* Trending This Week */}
          <section>
            <h2
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              🔥 Trending This Week
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trendingVideos.map((video) => (
                <div key={video.id} className="flex-shrink-0 w-72">
                  <VideoCard
                    video={video}
                    liked={likedSet.has(video.id)}
                    bookmarked={bookmarkedSet.has(video.id)}
                    onLike={() => toggleLike(video.id)}
                    onBookmark={() => toggleBookmark(video.id)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* For You */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                ✨ For You
              </h2>
              <span className="text-sm text-gray-500">{forYouVideos.length} videos</span>
            </div>

            {forYouVideos.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">🎬</div>
                <p className="font-medium">No videos found</p>
                <p className="text-sm mt-1">Try a different search or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {forYouVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    liked={likedSet.has(video.id)}
                    bookmarked={bookmarkedSet.has(video.id)}
                    onLike={() => toggleLike(video.id)}
                    onBookmark={() => toggleBookmark(video.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
