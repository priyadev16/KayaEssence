"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FashionPage() {
  // AI Fashion Assistant States
  const [showAI, setShowAI] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("Describe your style or upload an outfit photo!");
  const [loading, setLoading] = useState(false);
  
  // Image Upload for AI Analysis
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Style Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<any>({});

  const fashionStores = [
    { 
      name: "Zara", 
      slug: "zara",
      image: "/fashion/zara.png",
      category: "Fast Fashion",
      rating: 4.6,
      stores: "500+ India",
      specialties: ["Trendy", "Affordable", "Daily Wear"]
    },
    { 
      name: "H&M", 
      slug: "hm",
      image: "/fashion/hm.png", 
      category: "Streetwear",
      rating: 4.5,
      stores: "300+ India",
      specialties: ["Basics", "Collaborations", "Sustainable"]
    },
    { 
      name: "Mango", 
      slug: "mango",
      image: "/fashion/mango.png",
      category: "European Chic",
      rating: 4.7,
      stores: "150+ India",
      specialties: ["Office", "Elegant", "Quality"]
    },
    { 
      name: "Forever 21", 
      slug: "forever21",
      image: "/fashion/forever21.png",
      category: "Trendy Youth",
      rating: 4.4,
      stores: "80+ India",
      specialties: ["Party", "Accessories", "Budget"]
    },
    { 
      name: "ASOS", 
      slug: "asos",
      image: "/fashion/asos.png",
      category: "Online Fashion",
      rating: 4.8,
      stores: "Online Only",
      specialties: ["Designer Dupes", "Plus Size", "Global"]
    },
    { 
      name: "Myntra", 
      slug: "myntra",
      image: "/fashion/myntra.png",
      category: "Multi-brand",
      rating: 4.7,
      stores: "Online + POP",
      specialties: ["Brands", "Fast Delivery", "Sales"]
    }
  ];

  const fashionReels = [
    {
      id: 1,
      title: "Office Chic Outfits",
      thumbnail: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      duration: "0:45",
      views: "12K"
    },
    {
      id: 2,
      title: "Casual Street Style",
      thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", 
      duration: "1:02",
      views: "25K"
    },
    {
      id: 3,
      title: "Party Wear Trends",
      thumbnail: "https://images.unsplash.com/photo-1538108149393-4ba0e6e3e9aa?w=400",
      duration: "0:58",
      views: "18K"
    }
  ];

  // AI Fashion Assistant
  const sendToFashionAI = async () => {
    if (!aiInput.trim() && !imageBase64) return;
    setLoading(true);
    setAiResponse("🔍 Analyzing your style...");
    
    const formData = new FormData();
    formData.append("prompt", aiInput);
    if (imageBase64) formData.append("image", imageBase64);
    
    const res = await fetch("/api/fashion-ai", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setAiResponse(data.reply || "Style analysis complete! Here's your personalized fashion guide:");
    setLoading(false);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result);
      setImagePreview(base64);
      setImageBase64(base64.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  // Style Quiz
  const quizQuestions = [
    "What's your go-to occasion?",
    "Preferred color palette?",
    "Body type comfort?",
    "Budget range?",
    "Style personality?"
  ];

  const quizOptions = [
    ["Office", "Party", "Casual", "Gym"],
    ["Neutral", "Bright", "Pastels", "Bold"],
    ["Fitted", "Oversized", "Balanced", "Flowy"],
    ["Budget", "Mid-range", "Premium", "Luxury"],
    ["Classic", "Trendy", "Bohemian", "Minimalist"]
  ];

  const nextQuizStep = (answer: string) => {
    setQuizAnswers({...quizAnswers, [quizStep]: answer});
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setShowQuiz(false);
      setAiInput(`Create my wardrobe: ${Object.values(quizAnswers).join(', ')} + ${answer}`);
      setShowAI(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            FASHION AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't know fashion? Let AI be your personal stylist. Upload photos, take style quiz, or chat with Fashion AI!
          </p>
          
          {/* AI Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setShowAI(true)}
              className="group flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-6 px-12 rounded-3xl text-lg shadow-2xl hover:shadow-rose/50 transition-all duration-500 hover:scale-105"
            >
              <span className="text-2xl">✨</span>
              Chat with Fashion AI
            </button>
            <button 
              onClick={() => setShowQuiz(true)}
              className="group flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-6 px-12 rounded-3xl text-lg shadow-2xl hover:shadow-purple/50 transition-all duration-500 hover:scale-105"
            >
              <span className="text-2xl">📝</span>
              Take Style Quiz
            </button>
          </div>
        </div>

        {/* Fashion Stores Grid */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a2 2 0 002 2h6a2 2 0 002-2v-6h4V7z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Top Fashion Stores
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {fashionStores.map((store) => (
              <Link
                key={store.slug}
                href={`/fashion/${store.slug}`}
                className="group relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden hover:bg-white"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-4 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Image 
                      src={store.image} 
                      alt={store.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {store.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-yellow-400 text-sm mb-3">
                    ★★★★★
                    <span className="text-gray-600">({store.rating})</span>
                  </div>
                  
                  <span className="text-xs bg-gradient-to-r from-rose-100 to-pink-100 px-3 py-1 rounded-full font-semibold text-rose-700">
                    {store.stores}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Fashion Reels Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Trending Fashion Reels
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fashionReels.map((reel) => (
              <div key={reel.id} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-rose/25 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                  <Image 
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-xl backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-1">{reel.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>▶️ {reel.duration}</span>
                      <span>👀 {reel.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI Fashion Assistant Modal */}
      {showAI && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-2xl w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                ✨ Fashion AI Stylist
              </h3>
              <button onClick={() => setShowAI(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            {/* Image Upload */}
            <div className="mb-6 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border-2 border-dashed border-rose-200">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files?.[0]!)}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-3 p-8 text-center hover:bg-white rounded-2xl transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-2xl shadow-lg" />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center text-4xl">
                    📸
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">Upload Outfit Photo</p>
                  <p className="text-sm text-gray-600">AI will analyze & recommend similar styles</p>
                </div>
              </button>
            </div>

            {/* Chat Input */}
            <div className="space-y-4 mb-8">
              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g., 'Casual office look under ₹3000' or 'Similar to this dress for wedding'"
                className="w-full p-6 bg-white border border-gray-200 rounded-3xl text-lg resize-none focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 h-32"
              />
              <button
                onClick={sendToFashionAI}
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-6 px-8 rounded-3xl text-lg shadow-xl hover:shadow-rose/50 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "🎨 Creating Your Style Guide..." : "✨ Get Fashion Recommendations"}
              </button>
            </div>

            {/* AI Response */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-200 min-h-[200px]">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{aiResponse}</div>
            </div>
          </div>
        </div>
      )}

      {/* Style Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full max-h-[70vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Style Quiz
              </h3>
              <p className="text-gray-600">Step {quizStep + 1} of {quizQuestions.length}</p>
            </div>
            
            <h4 className="text-xl font-semibold mb-6 text-gray-900">{quizQuestions[quizStep]}</h4>
            
            <div className="grid gap-3">
              {quizOptions[quizStep].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => nextQuizStep(option)}
                  className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 rounded-2xl font-semibold text-left transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowQuiz(false)}
              className="mt-8 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-2xl transition-all"
            >
              Skip Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
