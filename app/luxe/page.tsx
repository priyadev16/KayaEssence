"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LuxePage() {
  // AI chat state
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("Ask anything about luxury beauty.");
  const [loading, setLoading] = useState(false);

  // Skin analyzer state
  const [showSkin, setShowSkin] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const luxeBrands = [
    { 
      name: "Chanel", 
      slug: "chanel", 
      image: "/brands/luxury/chanel.png",
      category: "Makeup & Perfume",
      rating: 4.9,
      founded: "1910",
      tagline: "Timeless elegance since 1910"
    },
    { 
      name: "Dior", 
      slug: "dior", 
      image: "/brands/luxury/dior.png",
      category: "Skincare & Makeup", 
      rating: 4.8,
      founded: "1946",
      tagline: "Haute couture beauty"
    },
    { 
      name: "Tom Ford", 
      slug: "tom-ford", 
      image: "/brands/luxury/tomford.png",
      category: "Perfume & Makeup",
      rating: 4.9,
      founded: "2006",
      tagline: "Luxury for the senses"
    },
    { 
      name: "La Mer", 
      slug: "la-mer", 
      image: "/brands/luxury/lamer.png",
      category: "Skincare",
      rating: 4.7,
      founded: "1965",
      tagline: "Miracle Broth™ skincare"
    },
    { 
      name: "Guerlain", 
      slug: "guerlain", 
      image: "/brands/luxury/guerlain.png",
      category: "Perfume & Makeup",
      rating: 4.8,
      founded: "1828",
      tagline: "French perfume mastery"
    },
    { 
      name: "Jo Malone", 
      slug: "jo-malone", 
      image: "/brands/luxury/jomalone.png",
      category: "Perfume",
      rating: 4.9,
      founded: "1990",
      tagline: "British olfactory art"
    },
    { 
      name: "Augustinus Bader", 
      slug: "augustinus-bader", 
      image: "/brands/luxury/augustinus.png",
      category: "Skincare",
      rating: 4.9,
      founded: "2018",
      tagline: "Stem cell technology"
    },
    { 
      name: "Yves Saint Laurent", 
      slug: "ysl", 
      image: "/brands/luxury/ysl.png",
      category: "Makeup & Perfume",
      rating: 4.8,
      founded: "1961",
      tagline: "Rock & roll chic"
    }
  ];

  const luxurySalons = [
    { 
      name: "Borghese Salon", 
      slug: "borghese-salon", 
      image: "/salons/borghese.png",
      location: "Mumbai - Bandra",
      rating: 4.9,
      services: "Luxury Spa & Makeup"
    },
    { 
      name: "Juice Salon", 
      slug: "juice-salon", 
      image: "/salons/juice.png",
      location: "Delhi - GK2", 
      rating: 4.8,
      services: "Celebrity Hair & Makeup"
    },
    { 
      name: "Looks Salon", 
      slug: "looks-salon", 
      image: "/salons/looks.png",
      location: "Bangalore - MG Road",
      rating: 4.7,
      services: "Premium Beauty Services"
    }
  ];

  const luxuryStores = [
    { 
      name: "Nykaa Luxe", 
      slug: "nykaa-luxe", 
      image: "/stores/nykaa-luxe.png",
      location: "Online + 100+ Stores",
      rating: 4.8,
      specialties: "Curated Luxury Brands"
    },
    { 
      name: "Tira Beauty", 
      slug: "tira-beauty", 
      image: "/stores/tira.png",
      location: "Reliance Retail Luxury",
      rating: 4.7,
      specialties: "Premium Multi-brand"
    }
  ];

  // AI chat send (keeping existing functionality)
  const sendToAI = async () => {
    if (!aiInput.trim()) return;
    setLoading(true);
    setAiResponse("Thinking…");
    const res = await fetch("/api/ai-luxe", { method: "POST", body: JSON.stringify({ prompt: aiInput }) });
    const data = await res.json();
    setAiResponse(data.reply || "No reply");
    setLoading(false);
  };

  // Skin analyzer helpers (keeping existing functionality)
  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result);
      setImagePreview(base64);
      const b = base64.split(",")[1] ?? base64;
      setImageBase64(b);
    };
    reader.readAsDataURL(file);
  };

  const analyzeSkin = async () => {
    if (!imageBase64) return alert("Please upload a photo first.");
    setAnalyzing(true);
    const res = await fetch("/api/skin-analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, note: "User uploaded for skin analysis" }),
    });
    const json = await res.json();
    if (json.analysis) setAnalysis(json.analysis);
    else alert("AI could not analyze: " + (json.raw ?? json.error));
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{backgroundImage: "radial-gradient(circle at 25% 25%, #f093fb 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f5576c 0%, transparent 50%)"}} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-pink-300 to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight">
            LUXE BEAUTY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the world's most exclusive beauty brands, luxury salons, and premium stores. 
            Indulge in opulence.
          </p>
        </div>

        {/* Luxury Brands */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 17H9v-6H7l4-4 4 4h-2v6zm1-5V9.707l-.293-.293L10 7 8.293 8.414.293.293L0 1.586 1.586 0l8.707 8.707L16 14.414V12h2v6a1 1 0 01-1 1h-6z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white">Luxury Brands</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {luxeBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/luxe/brands/${brand.slug}`}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold/25 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white/80 rounded-3xl p-4 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Image 
                      src={brand.image} 
                      alt={brand.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                    {brand.name}
                  </h3>
                  
                  <p className="text-gold-400 font-semibold mb-1">{brand.category}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                    <span>({brand.rating})</span>
                  </div>
                  
                  <span className="text-xs text-gray-400 bg-black/30 px-3 py-1 rounded-full">
                    Since {brand.founded}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Luxury Salons & Stores */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Luxury Salons */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white">Luxury Salons</h2>
            </div>
            
            <div className="space-y-6">
              {luxurySalons.map((salon) => (
                <Link
                  key={salon.slug}
                  href={`/luxe/salons/${salon.slug}`}
                  className="group flex items-center gap-6 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 hover:shadow-gold/25 transition-all duration-500 hover:translate-x-4"
                >
                  <div className="w-20 h-20 bg-white/80 rounded-2xl p-3 flex-shrink-0">
                    <Image src={salon.image} alt={salon.name} width={60} height={60} className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors mb-1">
                      {salon.name}
                    </h3>
                    <p className="text-gray-400 mb-2">{salon.services}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex text-yellow-400">★★★★★</div>
                      <span className="text-gray-300">({salon.rating})</span>
                      <span className="text-gold-400 font-semibold">{salon.location}</span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gold-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>

          {/* Luxury Stores */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11a2 2 0 002 2h6a2 2 0 002-2v-6h4V7z"/>
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white">Luxury Stores</h2>
            </div>
            
            <div className="space-y-6">
              {luxuryStores.map((store) => (
                <Link
                  key={store.slug}
                  href={`/luxe/stores/${store.slug}`}
                  className="group flex items-center gap-6 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 hover:shadow-gold/25 transition-all duration-500 hover:translate-x-4"
                >
                  <div className="w-20 h-20 bg-white/80 rounded-2xl p-3 flex-shrink-0">
                    <Image src={store.image} alt={store.name} width={60} height={60} className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors mb-1">
                      {store.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{store.specialties}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex text-yellow-400">★★★★★</div>
                      <span className="text-gray-300">({store.rating})</span>
                      <span className="text-gold-400 font-semibold">{store.location}</span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gold-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* AI Tools Section */}
        <section className="text-center mb-24">
          <h2 className="text-4xl font-bold text-white mb-12">Luxury Beauty Concierge</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <button 
              onClick={() => setShowAIChat(true)} 
              className="group flex items-center justify-center gap-3 bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/30 text-white font-semibold py-6 px-12 rounded-3xl text-lg shadow-2xl hover:shadow-gold/50 transition-all duration-500 hover:scale-105"
            >
              <span className="text-2xl">🤖</span>
              <span>AI Beauty Concierge</span>
            </button>
            <button 
              onClick={() => setShowSkin(true)} 
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 px-12 rounded-3xl text-lg shadow-2xl hover:shadow-pink/50 transition-all duration-500 hover:scale-105"
            >
              <span className="text-2xl">🩺</span>
              <span>Luxe Skin Analysis</span>
            </button>
          </div>
        </section>
      </div>

      {/* AI CHAT DRAWER & SKIN ANALYZER MODALS - Keeping existing functionality */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-black/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 border border-gold-500/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-xl flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Luxe AI Concierge
            </h3>
            <button onClick={() => setShowAIChat(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
          </div>
          <div className="h-56 overflow-auto bg-white/5 backdrop-blur-xl p-4 rounded-2xl mb-4 text-white text-sm">
            {loading ? "Analyzing luxury recommendations…" : aiResponse}
          </div>
          <input 
            value={aiInput} 
            onChange={(e) => setAiInput(e.target.value)} 
            placeholder="Best Dior lipstick for evening gala?" 
            className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-gold-400" 
          />
          <button 
            onClick={sendToAI} 
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-black font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-gold/50 transition-all duration-300"
          >
            {loading ? "Consulting..." : "Consult Luxe AI"}
          </button>
        </div>
      )}

      {/* Enhanced Skin Analyzer Modal */}
      {showSkin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/95 backdrop-blur-2xl w-full max-w-4xl rounded-3xl p-8 border border-gold-500/30 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent flex items-center gap-3">
                🩺 Luxe Skin Analysis
              </h3>
              <button onClick={() => setShowSkin(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            {/* Rest of skin analyzer content - keeping existing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload section */}
              <div>
                <div className="h-80 bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center overflow-hidden mb-6">
                  {imagePreview ? <img src={imagePreview} className="object-cover w-full h-full rounded-2xl" alt="preview" /> : 
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-4">📸</div>
                      Upload clear face photo (natural light)
                    </div>}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-2xl file:bg-gold-500 file:text-black file:font-semibold file:py-3 file:px-6 file:rounded-xl file:border-0 file:mr-4 hover:file:bg-gold-600"
                />
                <button 
                  onClick={analyzeSkin} 
                  disabled={analyzing || !imageBase64}
                  className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-emerald/50 transition-all duration-300 disabled:opacity-50"
                >
                  {analyzing ? "🔬 Analyzing Luxury Skin..." : "✨ Analyze My Skin"}
                </button>
              </div>
              
              {/* Results section - keeping existing analysis display */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-4">✨ Luxe Analysis Results</h4>
                {!analysis && <p className="text-gray-400 text-lg">Upload photo and analyze to reveal your luxury skincare routine.</p>}
                {analysis && (
                  <div className="space-y-4 text-sm bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                    <div className="grid grid-cols-2 gap-4 text-white">
                      <div><strong>Skin Type:</strong> {analysis.skinType}</div>
                      <div><strong>Primary Concern:</strong> {analysis.primaryConcern || 'Hydration'}</div>
                    </div>
                    {/* Additional analysis fields - keeping structure */}
                    {analysis.recommendations && (
                      <div>
                        <h5 className="font-bold text-gold-400 mb-3">💎 Luxe Recommendations</h5>
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                          {(analysis.recommendations || []).map((r: any, idx: number) => (
                            <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/20">
                              <div className="font-semibold text-white">{r.name}</div>
                              <div className="text-gray-300 text-sm mt-1">{r.shortReason}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
