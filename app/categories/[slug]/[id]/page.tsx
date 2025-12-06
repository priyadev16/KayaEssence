"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const name = searchParams.get("name") || "Premium Makeup Product";
  const brand = searchParams.get("brand") || "Lakme";
  const price = Number(searchParams.get("price") || 1299);
  const rating = Number(searchParams.get("rating") || 4.6);
  const reviews = Number(searchParams.get("reviews") || 1523);
  const type = searchParams.get("type") || "makeup";

  const slug = params?.slug as string;
  const id = params?.id as string;

  const handleAddToCart = () => toast.success("Added to cart!");
  const handleBuyNow = () => {
    router.push(
      `/checkout?name=${encodeURIComponent(name)}&brand=${encodeURIComponent(
        brand
      )}&price=${price}&image=${encodeURIComponent(mainImage)}&id=${id}`
    );
  };

  // Thumbnails for variants
  const thumbnails = [
    "/images/lipstick.png",
    "/images/lipstick2.jpg",
    "/images/lipstick3.jpg",
  ];

  // Brand logo path
  const brandLogoPath = `/brands/${brand.toLowerCase()}.jpg`;

  // State for main image
  const [mainImage, setMainImage] = useState(
    typeof window !== "undefined" &&
    document.querySelector(`img[src='${brandLogoPath}']`) // optional check
      ? brandLogoPath
      : "/images/lipstick.png"
  );

  // Ensure main image exists in public folder; fallback handled
  const handleImageError = () => setMainImage("/images/lipstick.png");

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-8 lg:px-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 mb-4 hover:text-gray-900"
        >
          <FaArrowLeft />
          Back to {slug} products
        </button>

        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-6">
          <span>Home</span>
          <span>/</span>
          <span className="capitalize">{slug}</span>
          <span>/</span>
          <span className="text-gray-700 font-medium line-clamp-1">{name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 p-6 md:p-10">
          {/* Left: Product Image */}
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden bg-gray-50 border shadow-lg">
              <Image
                src={mainImage}
                alt={name}
                fill
                style={{ objectFit: "cover" }}
                onError={handleImageError}
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3">
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer"
                  onClick={() => setMainImage(thumb)}
                >
                  <Image
                    src={thumb}
                    alt={`${name} variant ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.15em] text-rose-500 font-semibold">
                  {type.replace("_", " ")}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-medium text-gray-600">by {brand}</p>
                  <div className="relative w-6 h-6">
                    <Image
                      src={brandLogoPath}
                      alt={brand}
                      fill
                      style={{ objectFit: "contain" }}
                      onError={handleImageError}
                    />
                  </div>
                </div>
              </div>

              <button className="p-3 rounded-full bg-white shadow-lg text-gray-400 hover:text-rose-500">
                <FaHeart />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-sm text-gray-700">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(rating) ? "text-amber-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-500">{reviews.toLocaleString()} ratings</span>
            </div>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-black text-gray-900">₹{price.toFixed(0)}</span>
              <span className="text-sm text-gray-400 line-through">
                ₹{(price * 1.3).toFixed(0)}
              </span>
              <span className="text-sm text-emerald-600 font-semibold">30% OFF</span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              A long-wear, ultra-comfortable {type} that delivers rich color in a single swipe.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-rose-50 rounded-2xl p-3">
                <p className="font-semibold text-gray-800">Finish</p>
                <p className="text-gray-600">Soft matte</p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-3">
                <p className="font-semibold text-gray-800">Coverage</p>
                <p className="text-gray-600">Medium to full</p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-3">
                <p className="font-semibold text-gray-800">Skin Type</p>
                <p className="text-gray-600">All skin types</p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-3">
                <p className="font-semibold text-gray-800">Return Policy</p>
                <p className="text-gray-600">10-day easy returns</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition"
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 min-w-[160px] py-3 bg-pink-500 text-white font-semibold rounded-2xl hover:bg-pink-600 transition"
              >
                Buy Now
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Free delivery on orders above ₹499. Cash on Delivery available.
            </p>

            <p className="text-[10px] text-gray-400 mt-2">
              Product ID: {id} • Category: {slug}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
