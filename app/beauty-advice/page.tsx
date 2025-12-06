"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";

const Heart = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Eye = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Share = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="2" r="3"/>
    <circle cx="6" cy="11" r="3"/>
    <circle cx="18" cy="20" r="3"/>
    <line x1="18.7" y1="4.3" x2="5.3" y2="12.7"/>
    <line x1="18.7" y1="19.7" x2="5.3" y2="13.3"/>
  </svg>
);

const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const Send = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 2L11 13"/>
    <path d="M22 2l-7 20 3-7 7-7-6-6z"/>
  </svg>
);

// All blog posts data
const ALL_BLOG_POSTS = [
  {
    id: 1,
    title: "10 Vitamin C Serums That Actually Work in 2025",
    excerpt: "After testing 47 serums, these 10 deliver real brightening results without irritation.",
    author: "Dr. Priya Sharma",
    avatar: "/avatars/priya.png",
    date: "Dec 5, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    likes: 2847,
    views: 12500,
    category: "Skincare",
    type: "article"
  },
  {
    id: 2,
    title: "How I Cleared My Acne in 60 Days (With Proof)",
    excerpt: "My before/after photos + exact routine using affordable Indian pharmacy products.",
    author: "Neha K.",
    avatar: "/avatars/neha.png",
    date: "Dec 4, 2025",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1628075605576-7ec819b73caa?w=800",
    likes: 3921,
    views: 28400,
    category: "Skincare",
    type: "story"
  },
  {
    id: 3,
    title: "Bridal Makeup Lookbook: 5 Trending Styles",
    excerpt: "From subtle glow to dramatic glam - complete product lists + step-by-step tutorials.",
    author: "Riya Makeup",
    avatar: "/avatars/riya.png",
    date: "Dec 3, 2025",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1538108149393-4ba0e6e3e9aa?w=800",
    likes: 1567,
    views: 8900,
    category: "Makeup",
    type: "tutorial"
  },
  {
    id: 4,
    title: "The Ordinary vs Minimalist: Honest Comparison",
    excerpt: "Which Indian brand copies The Ordinary better? Lab-tested ingredients + price breakdown.",
    author: "SkinLab India",
    avatar: "/avatars/skinlab.png",
    date: "Dec 2, 2025",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1600181954477-e1f5a8d98bd7?w=800",
    likes: 2189,
    views: 15600,
    category: "Skincare",
    type: "review"
  },
  {
    id: 5,
    title: "K-Beauty Routine for Indian Skin (₹1500 Budget)",
    excerpt: "7-step routine adapted for humid climate + drugstore dupes for expensive K-beauty.",
    author: "K-Pop Skin",
    avatar: "/avatars/kpop.png",
    date: "Dec 1, 2025",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1586481280744-634695d0cbbf?w=800",
    likes: 3421,
    views: 21300,
    category: "Skincare",
    type: "routine"
  },
  {
    id: 6,
    title: "Best Red Lipsticks for Indian Skin Tones",
    excerpt: "Tested 25 shades on 5 skin tones - perfect matches for every undertone.",
    author: "Lipstick Queen",
    avatar: "/avatars/lipstick.png",
    date: "Nov 30, 2025",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    likes: 4567,
    views: 34500,
    category: "Makeup",
    type: "review"
  },
  {
    id: 7,
    title: "Winter Haircare Routine for Dry Scalp",
    excerpt: "Complete guide with oiling schedule, masks, and salon treatments for monsoon-damaged hair.",
    author: "HairDoc India",
    avatar: "/avatars/hairdoc.png",
    date: "Nov 29, 2025",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1611100481087-2eb83e5f3bea?w=800",
    likes: 1890,
    views: 12300,
    category: "Haircare",
    type: "routine"
  },
  {
    id: 8,
    title: "My ₹5000 Skincare Routine (Drugstore Only)",
    excerpt: "Luxury results on budget - full routine breakdown with before/after progress photos.",
    author: "Budget Glow",
    avatar: "/avatars/budget.png",
    date: "Nov 28, 2025",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    likes: 5234,
    views: 45600,
    category: "Skincare",
    type: "story"
  }
];

const POSTS_PER_PAGE = 6;

export default function BeautyBlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newType, setNewType] = useState<"question" | "tip" | "review">("tip");

  // Filter posts based on category and search
  const filterPosts = (posts: any[]) => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeTab === "all" || post.category.toLowerCase() === activeTab;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredPosts = filterPosts(ALL_BLOG_POSTS);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ["All", "Skincare", "Makeup", "Haircare", "Routine", "Review"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
            Beauty Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real reviews • Expert advice • Community stories • Trending beauty secrets
          </p>
          <p className="text-lg text-gray-500 mt-2">Page {currentPage} of {totalPages}</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search skincare, makeup, routines..."
              className="w-full p-6 pl-14 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <div className="flex gap-3 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                  activeTab === cat.toLowerCase()
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1"
                }`}
                onClick={() => {
                  setActiveTab(cat.toLowerCase());
                  setCurrentPage(1);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Create Post Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-4xl shadow-2xl border border-white/50 mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Plus className="w-8 h-8 text-pink-600" />
            Write Your Beauty Story
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input
                placeholder="Post Title (e.g., 'My 30-day glow-up journey')"
                className="w-full p-4 border border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-pink-200"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
              <select
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-200"
                value={newType}
                onChange={(e) => setNewType(e.target.value as "question" | "tip" | "review")}
              >
                <option value="tip">Beauty Tip 💡</option>
                <option value="question">Ask Community ❓</option>
                <option value="review">Product Review ⭐</option>
              </select>
            </div>
            <div className="space-y-3">
              <textarea
                placeholder="Share your story, routine, or question..."
                className="w-full p-4 h-32 border border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-pink-200"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-purple/50 transition-all duration-300">
                Publish Post
              </button>
            </div>
          </div>
        </div>

        {/* Blog Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {currentPosts.map((post) => (
            <article key={post.id} className="group bg-white/80 backdrop-blur-sm rounded-4xl overflow-hidden shadow-2xl hover:shadow-pink/25 transition-all duration-500 hover:-translate-y-4 border border-white/50">
              {/* Featured Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold ${
                  post.category === "Skincare" ? "bg-emerald-100 text-emerald-800" :
                  post.category === "Makeup" ? "bg-pink-100 text-pink-800" :
                  "bg-purple-100 text-purple-800"
                }`}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Image src={post.avatar} alt={post.author} width={32} height={32} className="rounded-full" />
                    <span className="font-semibold text-gray-900">{post.author}</span>
                    <span>• {post.date}</span>
                    <span>• {post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <button className="flex items-center gap-2 hover:text-rose-600 transition-colors p-2 -m-2 rounded-xl group-hover:bg-rose-50">
                      <Heart className="w-5 h-5" /> <span>{post.likes.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-700 transition-colors p-2 -m-2 rounded-xl group-hover:bg-gray-50">
                      <Eye className="w-5 h-5" /> <span>{post.views.toLocaleString()}</span>
                    </button>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dynamic Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-20 px-4">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = currentPage <= 3 
                ? i + 1 
                : currentPage >= totalPages - 2 
                ? totalPages - (4 - i) 
                : i === 0 ? currentPage - 2 
                : i === 1 ? currentPage - 1 
                : i === 2 ? currentPage 
                : i === 3 ? currentPage + 1 
                : currentPage + 2;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105"
                      : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 hover:bg-purple-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Page Info */}
            <span className="text-sm text-gray-500 hidden md:block">
              Showing {startIndex + 1}-{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} posts
            </span>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or category filters</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
                setCurrentPage(1);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl hover:shadow-purple/50 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
