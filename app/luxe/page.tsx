// app/luxe/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

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

  const luxeCollections = [
    { title: "Luxury Makeup", slug: "luxury-makeup", image: "https://images.unsplash.com/photo-1586481280744-634695d0cbbf?auto=format&fit=crop&w=800&q=80" },
    { title: "Designer Perfumes", slug: "designer-perfume", image: "https://images.unsplash.com/photo-1508182311256-e3f7d7d33b36?auto=format&fit=crop&w=800&q=80" },
    { title: "Luxury Skincare", slug: "luxury-skincare", image: "https://images.unsplash.com/photo-1600181954477-e1f5a8d98bd7?auto=format&fit=crop&w=800&q=80" },
    { title: "Exotic Haircare", slug: "luxury-haircare", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80" },
  ];

  // AI chat send
  const sendToAI = async () => {
    if (!aiInput.trim()) return;
    setLoading(true);
    setAiResponse("Thinking…");
    const res = await fetch("/api/ai-luxe", { method: "POST", body: JSON.stringify({ prompt: aiInput }) });
    const data = await res.json();
    setAiResponse(data.reply || "No reply");
    setLoading(false);
  };

  // Skin analyzer helpers
  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result);
      setImagePreview(base64);
      // strip metadata prefix if present
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
    <div className="px-10 py-12 relative">
      <h1 className="text-5xl font-extrabold text-center mb-8">Luxe Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {luxeCollections.map((c) => (
          <Link key={c.slug} href={`/luxe/${c.slug}`} className="block rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src={c.image} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-pink-600 font-semibold">Explore →</p>
            </div>
          </Link>
        ))}
      </div>

      {/* AI buttons */}
      <div className="flex gap-4 justify-center mb-10">
        <button onClick={() => setShowAIChat(true)} className="bg-black text-white px-6 py-3 rounded-full">🤖 Ask AI</button>
        <button onClick={() => setShowSkin(true)} className="bg-pink-600 text-white px-6 py-3 rounded-full">🩺 AI Skin Analyzer</button>
      </div>

      {/* AI CHAT DRAWER */}
      {showAIChat && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white shadow-2xl rounded-tl-xl p-4 border">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">AI Beauty Expert</h3>
            <button onClick={() => setShowAIChat(false)} className="text-gray-600">×</button>
          </div>

          <div className="mt-3 h-56 overflow-auto bg-gray-100 p-3 rounded">
            {loading ? "Thinking…" : aiResponse}
          </div>

          <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="e.g. Best perfume for evening" className="w-full p-2 border rounded mt-3" />
          <button onClick={sendToAI} className="mt-2 w-full bg-black text-white py-2 rounded">Ask AI</button>
        </div>
      )}

      {/* SKIN ANALYZER MODAL */}
      {showSkin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">AI Skin Analyzer</h3>
              <button onClick={() => setShowSkin(false)} className="text-gray-600">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-64 bg-gray-50 rounded border flex items-center justify-center overflow-hidden">
                  {imagePreview ? <img src={imagePreview} className="object-cover w-full h-full" alt="preview" /> : <div className="text-gray-400">Upload a face photo (clear, natural light)</div>}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  className="mt-3"
                />

                <button onClick={analyzeSkin} disabled={analyzing} className="mt-3 bg-pink-600 text-white px-4 py-2 rounded">
                  {analyzing ? "Analyzing…" : "Analyze"}
                </button>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Analysis</h4>
                {!analysis && <p className="text-gray-500">No results yet. Upload a photo and hit Analyze.</p>}

                {analysis && (
                  <div className="space-y-3 text-sm">
                    <div><strong>Skin Type:</strong> {analysis.skinType}</div>
                    <div><strong>Wrinkles:</strong> {analysis.wrinkles?.severity} — {analysis.wrinkles?.notes}</div>
                    <div><strong>Dark Circles:</strong> {analysis.darkCircles?.severity} — {analysis.darkCircles?.notes}</div>
                    <div><strong>Redness:</strong> {analysis.redness?.severity} — {analysis.redness?.notes}</div>
                    <div><strong>Texture:</strong> {analysis.texture?.severity} — {analysis.texture?.notes}</div>

                    <div>
                      <h5 className="font-semibold mt-3">Recommendations</h5>
                      <ul className="list-disc ml-5">
                        {(analysis.recommendations || []).map((r: any, idx: number) => (
                          <li key={idx}>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-gray-600 text-sm">{r.shortReason}</div>
                            <div className="text-gray-500 text-xs mt-1">{r.recommendedRoutine}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
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
