"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaFilter,
  FaSort,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

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
  image: string; // per-product dummy image
}

interface CategorySlugPageProps {
  params: Promise<{ slug: string }>;
}

// Realistic dummy images mapped to card titles/types
const DUMMY_PRODUCTS: Product[] = [
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
    image:
      "https://images.unsplash.com/photo-1572417884843-7fdb3ebc56d7?w=800&h=900&fit=crop", // lipstick
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
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&h=900&fit=crop", // lipstick tube
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
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=900&fit=crop", // eyeliner
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
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa2?w=800&h=900&fit=crop", // mascara / eye
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
    image:
      "https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?w=800&h=900&fit=crop", // foundation
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

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
    products = products.filter(
      (p) => p.type.toLowerCase() === slug.toLowerCase()
    );
  }
  if (filters.brand) {
    products = products.filter(
      (p) => p.brand.toLowerCase() === filters.brand.toLowerCase()
    );
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

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 pt-20 pb-16">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-black mb-3">
            {categoryName}
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
            Discover premium {slug === "makeup" ? "makeup" : slug} products
            from top brands.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:px-8 -mt-12 relative z-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
            >
              <FaFilter className="text-rose-500" />
              <span className="font-semibold text-gray-800">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </span>
            </button>

            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border">
              <FaSort className="text-gray-500" />
              <select
                value={filters.sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="bg-transparent border-none outline-none font-medium text-gray-800 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative p-3 bg-white rounded-full shadow-lg cursor-pointer">
            <FaShoppingCart className="text-xl text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => updateFilters({ brand: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">All Brands</option>
                  {brandOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products grid */}
        <p className="text-lg font-semibold text-gray-700 mb-6">
          Showing <span className="text-rose-500">{products.length}</span> products
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleCardClick(product)}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute z-10 top-3 right-3 p-2 rounded-full bg-white shadow ${
                  wishlist[product.id]
                    ? "text-rose-500"
                    : "text-gray-300 hover:text-rose-400"
                }`}
              >
                <FaHeart />
              </button>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {product.badge}
                </div>
              )}

              {/* Product-specific dummy image */}
              <div className="relative h-52 bg-gray-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wide text-rose-500 font-semibold">
                  {product.type.replace("_", " ")}
                </p>
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-xs font-medium text-gray-600 capitalize">
                  {product.brand}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(product.rating)
                          ? "text-amber-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-1">
                    {product.rating.toFixed(1)} • {product.reviews} reviews
                  </span>
                </div>

                <p className="text-pink-600 font-extrabold text-lg">
                  ₹{product.price.toFixed(0)}
                </p>

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(product);
                    }}
                    className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-rose-500 text-rose-600 hover:bg-rose-50 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
