import { useState } from "react";
import { Link } from "react-router";
import { Star, MapPin, Filter, Search, CheckCircle2, X } from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const products = [
  {
    id: 1,
    name: "Credit Counselling",
    supplier: "RMSOEE FinAdvisors",
    location: "IIT Kharagpur",
    rating: 4.8,
    verified: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
    category: "Financial Services",
  },
  {
    id: 2,
    name: "Wealth Management",
    supplier: "RMSOEE Wealth Partners",
    location: "Kolkata",
    rating: 4.7,
    verified: true,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop",
    category: "Financial Services",
  },
  {
    id: 3,
    name: "Taxation Advice",
    supplier: "KGP Tax Associates",
    location: "Mumbai",
    rating: 4.6,
    verified: false,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop",
    category: "Consultancy",
  },
  {
    id: 4,
    name: "Legal and Regulatory Setup",
    supplier: "RMSOEE Legal Cell",
    location: "Delhi",
    rating: 4.9,
    verified: true,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
    category: "Legal",
  },
  {
    id: 5,
    name: "Business Strategy Consulting",
    supplier: "KGP Mentor Network",
    location: "Bangalore",
    rating: 4.8,
    verified: true,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop",
    category: "Consultancy",
  },
  {
    id: 6,
    name: "Digital Marketing & GTM Setup",
    supplier: "GrowthHub Marketing Agency",
    location: "Remote",
    rating: 4.5,
    verified: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    category: "Marketing",
  },
];

const businesses = [
  {
    id: 1,
    name: "Ananya Textiles",
    initials: "AT",
    industry: "Textile & Apparel",
    location: "Tirupur, Tamil Nadu",
    description: "Export-ready garment manufacturer specializing in sustainable cotton fabrics and bulk apparel production.",
    verified: true,
    color: "bg-orange-500",
  },
  {
    id: 2,
    name: "MetalPro Works",
    initials: "MW",
    industry: "Manufacturing",
    location: "Pune, Maharashtra",
    description: "Precision engineering components manufacturer with ISO 9001 certification serving automotive and industrial sectors.",
    verified: true,
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "Kala Pottery",
    initials: "KP",
    industry: "Handicrafts",
    location: "Jaipur, Rajasthan",
    description: "Traditional artisan pottery collective blending Rajasthani craft heritage with contemporary design aesthetics.",
    verified: true,
    color: "bg-teal-600",
  },
  {
    id: 4,
    name: "GreenFarm Agro",
    initials: "GF",
    industry: "Agri-Tech",
    location: "Nashik, Maharashtra",
    description: "Organic produce and farm supply company connecting farmers directly to retail and export markets.",
    verified: false,
    color: "bg-green-600",
  },
  {
    id: 5,
    name: "TechNest Solutions",
    initials: "TN",
    industry: "IT Services",
    location: "Hyderabad, Telangana",
    description: "Software development firm specializing in affordable ERP and digital transformation solutions for MSMEs.",
    verified: true,
    color: "bg-purple-600",
  },
  {
    id: 6,
    name: "Spice Garden Exports",
    initials: "SG",
    industry: "Food & Beverages",
    location: "Kochi, Kerala",
    description: "Certified organic spice exporter supplying premium blends to retail chains and international buyers.",
    verified: true,
    color: "bg-red-600",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
      <Star size={14} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}

function FilterSidebar({
  verifiedOnly,
  setVerifiedOnly,
}: {
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
}) {
  return (
    <aside className="w-56 shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-500" />
          <span
            className="font-bold tracking-wide text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem" }}
          >
            FILTERS
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">All India</option>
            <option>Tamil Nadu</option>
            <option>Maharashtra</option>
            <option>Rajasthan</option>
            <option>Punjab</option>
            <option>Kerala</option>
            <option>Gujarat</option>
            <option>Telangana</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">All Categories</option>
            <option>Financial Services</option>
            <option>Consultancy</option>
            <option>Legal</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Industry</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">All Industries</option>
            <option>Textile & Apparel</option>
            <option>Agri-Tech</option>
            <option>IT Services</option>
            <option>Manufacturing</option>
            <option>Handicrafts</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Price Range</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">Any Price</option>
            <option>Under ₹100</option>
            <option>₹100 – ₹500</option>
            <option>₹500 – ₹5,000</option>
            <option>Above ₹5,000</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min Rating</label>
          <div className="flex flex-col gap-1.5">
            {[4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" name="rating" className="accent-orange-500" />
                <span className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: r }).map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" />
                  ))}
                </span>
                <span className="text-gray-400 text-xs">& up</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-orange-500 w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Verified Only</span>
          </label>
        </div>
      </div>
    </aside>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col justify-between h-[360px]">
      <div>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop";
            }}
          />
          {product.verified && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <CheckCircle2 size={11} />
              Verified
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">{product.category}</span>
            <StarRating rating={product.rating} />
          </div>
          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-2">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin size={11} />
            <span>
              {product.supplier} · {product.location}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
          Request Service
        </button>
      </div>
    </div>
  );
}

function BusinessCard({ biz }: { biz: (typeof businesses)[0] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0",
            biz.color
          )}
        >
          {biz.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">{biz.name}</h3>
          <p className="text-xs text-blue-600 font-medium">{biz.industry}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <MapPin size={11} />
        <span>{biz.location}</span>
      </div>

      {biz.verified && (
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full w-fit border border-green-200">
          <CheckCircle2 size={11} />
          MSME Verified
        </span>
      )}

      <p className="text-sm text-gray-600 leading-relaxed flex-1">{biz.description}</p>

      <div className="flex gap-2 mt-auto pt-1">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
          View Profile
        </button>
        <button className="flex-1 border border-gray-300 hover:border-orange-400 hover:text-orange-500 text-gray-700 text-sm font-semibold py-2 rounded-lg transition-colors">
          Contact
        </button>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (verifiedOnly && !p.verified) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sticky Page Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
            >
              Services
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              MSME Growth Hub &nbsp;&middot;&nbsp; Professional Services &nbsp;&middot;&nbsp; Business Advisory
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
          >
            &#8592; Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        <FilterSidebar verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} />

        <div className="flex-1 min-w-0">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredProducts.length}
            </span>{" "}
            services
            {verifiedOnly && " · Verified only"}
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-3 text-center py-16 text-gray-400 text-sm">
                No services match your filters.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 mt-4">
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          &#8592; Back to Home
        </Link>
      </div>
    </div>
  );
}
