"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  name: string;
  slug: string;
  img: string;
  products: number;
  color: string;
}

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const categories: Category[] = [
    { name: "Lipstick", slug: "lipstick", img: "/images/lipstick.png", products: 24, color: "from-rose-500 to-pink-500" },
    { name: "Foundation", slug: "foundation", img: "/images/lipstick2.jpg", products: 18, color: "from-amber-400 to-orange-500" },
    { name: "Eyeshadow", slug: "eyeshadow", img: "/images/lipstick3.jpg", products: 30, color: "from-purple-500 to-indigo-500" },
    { name: "Skincare", slug: "skincare", img: "/images/lipstick4.jpg", products: 15, color: "from-emerald-400 to-teal-500" },
    { name: "Blush", slug: "blush", img: "/images/lipstick2.jpg", products: 12, color: "from-pink-400 to-rose-400" },
    { name: "Mascara", slug: "mascara", img: "/images/lipstick3.jpg", products: 20, color: "from-blue-500 to-cyan-500" },
    { name: "Nail Polish", slug: "nail-polish", img: "/images/lipstick4.jpg", products: 10, color: "from-fuchsia-500 to-violet-500" },
    { name: "Highlighter", slug: "highlighter", img: "/images/lipstick.png", products: 8, color: "from-yellow-400 to-amber-500" },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 lg:py-20 max-w-7xl mx-auto">
        
        {/* HERO HEADER */}
        <div className="text-center mb-16 lg:mb-28">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl mb-8 border border-white/50 mx-auto max-w-max">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-ping" />
            <span className="text-sm font-semibold text-gray-800">Featured Categories</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Shop by Categories
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover premium beauty products curated just for you. From everyday essentials to luxury treatments.
          </p>

          {/* Enhanced Search */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              placeholder="Search makeup categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-3xl shadow-2xl text-lg focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100/50 transition-all duration-300 hover:shadow-3xl"
            />
          </div>
        </div>

        {/* CATEGORIES GRID - FULLY RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {filteredCategories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 overflow-hidden h-full flex flex-col border border-white/50 hover:border-pink-200/50 hover:bg-white"
            >
              {/* Category Image - PUBLIC FOLDER READY */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50/70 to-white/50">
                <Image
                  src={cat.img}
                  alt={`${cat.name} category`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  priority={index < 4}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Product Count Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-2xl text-xs sm:text-sm font-bold text-gray-900 shadow-lg border border-white/50 flex items-center gap-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a1 1 0 110-2 1 1 0 010 2zM3 6a1 1 0 110-2 1 1 0 010 2zM13 12a1 1 0 110-2 1 1 0 010 2zM3 12a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                    {cat.products.toLocaleString()}
                  </span>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 -translate-x-full group-hover:translate-x-full" />
              </div>

              {/* Category Content */}
              <div className="p-5 sm:p-6 lg:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-500 leading-tight">
                    {cat.name}
                  </h3>
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${cat.color} shadow-lg group-hover:scale-125 transition-transform duration-300`} />
                </div>
                
                <div className="space-y-1 sm:space-y-2 flex-1 mb-4 sm:mb-6">
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium leading-relaxed">
                    Premium quality essentials for your daily beauty routine
                  </p>
                </div>

                {/* CTA Button */}
                <button className="group/btn bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-sm lg:text-base relative overflow-hidden w-full">
                  <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                    Explore
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-24 sm:py-32">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">No Categories Found</h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto">
              Try searching for something else or browse all categories above
            </p>
          </div>
        )}

        {/* HERO BANNER */}
        <div className="relative mt-24 lg:mt-40">
          <div className="relative bg-gradient-to-br from-pink-600 via-rose-600 to-purple-600 rounded-4xl shadow-3xl overflow-hidden p-8 sm:p-12 lg:p-20 text-white">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%),radial-gradient(circle_at_80%_80%,white_0%,transparent_50%)]" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-2 rounded-2xl mb-6 sm:mb-8 border border-white/30 max-w-max mx-auto">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm sm:text-base font-semibold text-white">Limited Time Offer</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                Unlock Your Beauty Potential
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Explore 100+ premium beauty categories with exclusive deals just for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/products">
                  <button className="group bg-white text-pink-600 font-black px-8 py-4 sm:px-10 sm:py-5 rounded-3xl text-base sm:text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-2 sm:gap-3">
                    Shop Now
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
                <Link href="/categories" className="font-semibold text-white/90 hover:text-white text-sm sm:text-base transition-colors">
                  View All Categories →
                </Link>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-lg animate-bounce" />
          </div>
        </div>

        {/* TRUST SECTION */}
        <div className="mt-24 lg:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            { icon: "🚚", title: "Lightning Fast Delivery", subtitle: "2-3 days anywhere" },
            { icon: "🔒", title: "100% Secure Checkout", subtitle: "SSL encrypted" },
            { icon: "⭐", title: "Premium Brands Only", subtitle: "Authentic guaranteed" },
            { icon: "💬", title: "24/7 Support", subtitle: "Live chat available" },
          ].map((item, index) => (
            <div key={index} className="group text-center p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3 group-hover:text-pink-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
