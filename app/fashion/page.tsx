"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Heart } from "lucide-react";

const categories = [
  "All",
  "Luxury Dresses",
  "Makeup Looks",
  "Outfits",
  "Skincare Routines",
  "Celebrity Styles",
  "Accessories",
];

const items = [
  {
    id: 1,
    title: "Red Carpet Glam Makeup",
    category: "Makeup Looks",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4d8f753?auto=format",
  },
  {
    id: 2,
    title: "Luxury Summer Outfit",
    category: "Outfits",
    image:
      "https://images.unsplash.com/photo-1520975928316-1ebcac35a0e1?auto=format",
  },
  {
    id: 3,
    title: "Glass Skin Skincare Routine",
    category: "Skincare Routines",
    image:
      "https://images.unsplash.com/photo-1582004531564-50f300aae039?auto=format",
  },
  {
    id: 4,
    title: "Celebrity Party Look",
    category: "Celebrity Styles",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format",
  },
  {
    id: 5,
    title: "Gold Statement Accessories",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1583393931288-9c77e2e1c9e9?auto=format",
  },
];

export default function FashionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filtered =
    selectedCategory === "All"
      ? items
      : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="p-8 space-y-10">

      {/* -------------------------- HEADER --------------------------- */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        Fashion & Beauty Inspiration
      </motion.h1>

      {/* -------------------------- SEARCH + FILTER --------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row gap-4 justify-between items-center"
      >
        <div className="flex items-center gap-2 border p-3 rounded-xl w-full md:w-1/2 bg-white shadow-sm">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            placeholder="Search looks, styles, makeup ideas..."
            className="w-full outline-none"
          />
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl shadow hover:bg-gray-900 transition">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </motion.div>

      {/* -------------------------- CATEGORY FILTERS --------------------------- */}
      <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* -------------------------- ITEMS GRID --------------------------- */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((item) => (
          <motion.div
            layout
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer group"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover group-hover:opacity-90 transition"
              />

              {/* LIKE button */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* -------------------------- AI FASHION SECTION --------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 bg-black text-white p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold">AI Fashion Stylist</h2>
        <p className="text-gray-300 mt-3 max-w-xl">
          Upload your picture — AI suggests outfits, makeup looks, skincare
          routines, and luxury styles based on your features.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
          Try AI Fashion Stylist
        </button>
      </motion.div>
    </div>
  );
}
