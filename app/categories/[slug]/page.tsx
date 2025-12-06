"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// ✅ FIXED: Direct imports work with proper tsconfig
import { 
  FaHeart as FaHeartIcon,
  FaShoppingCart as FaShoppingCartIcon,
  FaStar as FaStarIcon,
  FaFilter as FaFilterIcon,
  FaSort as FaSortIcon
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  type: string;
  rating: number;
  reviews: number;
  badge?: string;
  discount?: number;
  image: string;
}

interface CategorySlugPageProps {
  params: Promise<{ slug: string }>;
}

const DUMMY_PRODUCTS: Product[] = [
  // ... (same products array as before)
  {
    id: 1,
    name: "Matte Revolution Lipstick - Velvet Rose",
    price: 1299,
    brand: "MAC Cosmetics",
    type: "lipstick",
    rating: 4.7,
    reviews: 2345,
    badge: "Bestseller",
    discount: 15,
    image: "https://images.unsplash.com/photo-1572417884843-7fdb3ebc56d7?w=800&h=900&fit=crop",
  },
  {
    id: 2,
    name: "Super Stay Matte Ink - Heart Beat",
    price: 899,
    brand: "Maybelline",
    type: "lipstick",
    rating: 4.5,
    reviews: 1892,
    badge: "Limited",
    discount: 20,
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&h=900&fit=crop",
  },
  {
    id: 3,
    name: "Liquid Liner Pro - Ultra Black",
    price: 699,
    brand: "NYX Professional",
    type: "eyeliner",
    rating: 4.6,
    reviews: 1567,
    badge: "New",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=900&fit=crop",
  },
  {
    id: 4,
    name: "Lash Sensational Sky High Mascara",
    price: 799,
    brand: "Maybelline",
    type: "mascara",
    rating: 4.8,
    reviews: 4567,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?w=800&h=900&fit=crop",
  },
  {
    id: 5,
    name: "Fit Me Matte + Poreless Foundation",
    price: 599,
    brand: "Maybelline",
    type: "foundation",
    rating: 4.4,
    reviews: 3214,
    badge: "Value Pick",
    discount: 25,
    image: "https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?w=800&h=900&fit=crop",
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

// ✅ FIXED: Type-safe icon renderer using React.createElement
const Icon = ({ icon: IconComponent, ...props }: { icon: any; [key: string]: any }) => {
  return <IconComponent {...props} />;
};

export default function CategorySlugPage({ params }: CategorySlugPageProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [filters, setFilters] = useState({
    brand: "",
    sort: "featured",
  });
  const [showFilters, setShowFilters] = useState(true);

  const categoryName =
    slug === "makeup"
      ? "Makeup"
      : slug.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const brandOptions = Array.from(
    new Set(DUMMY_PRODUCTS.map((p) => p.brand))
  ).sort();

  let products = [...DUMMY_PRODUCTS];
  if (slug !== "makeup") {
    products = products.filter((p) => p.type.toLowerCase() === slug.toLowerCase());
  }
  if (filters.brand) {
    products = products.filter((p) => p.brand.toLowerCase() === filters.brand.toLowerCase());
  }
  switch (filters.sort) {
    case "price-low":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      products.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      products.sort((a, b) => b.rating - a.rating);
      break;
  }

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateFilters = (partial: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleCardClick = (product: Product) => {
    const query = new URLSearchParams({
      name: product.name,
      brand: product.brand,
      price: String(product.price),
      rating: String(product.rating),
      reviews: String(product.reviews),
      type: product.type,
      image: product.image,
    }).toString();
    router.push(`/categories/${slug}/${product.id}?${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 pt-20 pb-16">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-3 drop-shadow-2xl">{categoryName}</h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-lg">
            Discover premium {slug === "makeup" ? "makeup" : slug} products from top brands.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:px-8 -mt-12 relative z-10">
        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* ✅ FIXED: Using Icon wrapper */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="group flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:bg-white"
            >
              <Icon icon={FaFilterIcon} className="text-rose-500 group-hover:scale-110 transition-transform" size={18} />
              <span className="font-bold text-gray-800 text-sm">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </span>
            </button>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <Icon icon={FaSortIcon} className="text-gray-500" size={16} />
              <select
                value={filters.sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="bg-transparent border-none outline-none font-semibold text-gray-800 text-sm cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative p-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Icon icon={FaShoppingCartIcon} className="text-xl text-gray-800 group-hover:text-rose-500 transition-colors" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-8 mb-12 hover:shadow-3xl transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3 tracking-wide">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => updateFilters({ brand: e.target.value })}
                  className="w-full p-4 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-rose-100/50 focus:border-rose-400 focus:outline-none transition-all duration-300 text-lg shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
                >
                  <option value="">All Brands</option>
                  {brandOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products Count */}
        <p className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          Showing <span className="text-rose-600 text-2xl">{products.length}</span> products
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleCardClick(product)}
              className="group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 cursor-pointer hover:border-rose-200/50"
            >
              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute z-20 top-4 right-4 p-3 rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ${
                  wishlist[product.id]
                    ? "text-rose-500 bg-rose-50 shadow-rose-200"
                    : "text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                }`}
              >
                <Icon icon={FaHeartIcon} className="w-5 h-5" size={20} />
              </button>

              {/* Badges */}
              {product.badge && (
                <div className="absolute z-10 top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg">
                  {product.badge}
                </div>
              )}
              {product.discount && (
                <div className="absolute z-10 top-4 right-16 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg">
                  -{product.discount}%
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-56 lg:h-60 bg-gradient-to-br from-gray-50 to-white/50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-50 px-3 py-1 rounded-xl inline-block max-w-max">
                  {product.type.replace("_", " ")}
                </p>
                <h3 className="font-bold text-base lg:text-lg line-clamp-2 text-gray-900 group-hover:text-rose-600 transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-gray-700 capitalize">{product.brand}</p>

                {/* Rating Stars */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon={FaStarIcon}
                        className={i < Math.round(product.rating) ? "text-amber-400 fill-current" : "text-gray-300"}
                        size={12}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {product.rating.toFixed(1)} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-rose-600 font-black text-xl lg:text-2xl">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.discount && (
                    <span className="text-xs text-gray-400 line-through font-medium">
                      ₹{Math.round(product.price * 1.2).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="group flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gray-900 to-black text-white text-xs font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <Icon icon={FaShoppingCartIcon} className="group-hover:scale-110" size={14} />
                    <span>Add</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(product);
                    }}
                    className="py-3 text-xs font-bold rounded-2xl border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl flex items-center justify-center">
              <Icon icon={FaFilterIcon} className="text-rose-400" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Try adjusting your filters or browse other categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
