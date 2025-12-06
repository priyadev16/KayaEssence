"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// ✅ FIXED: Proper react-icons typing with React.ComponentType
import { 
  FaArrowLeft, 
  FaHeart, 
  FaShoppingCart, 
  FaStar} from "react-icons/fa";
import type { IconType } from "react-icons";

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

  const [mainImage, setMainImage] = useState("/images/lipstick.png");

  const thumbnails = [
    "/images/lipstick.png",
    "/images/lipstick2.jpg",
    "/images/lipstick3.jpg",
  ];

  const brandLogoPath = `/brands/${brand.toLowerCase()}.jpg`;

  // Safely set main image on client
  useEffect(() => {
    const img = document.createElement('img');
    img.src = brandLogoPath;
    img.onload = () => setMainImage(brandLogoPath);
    img.onerror = () => setMainImage("/images/lipstick.png");
  }, [brandLogoPath]);

  const handleImageError = () => setMainImage("/images/lipstick.png");

  const handleAddToCart = () => toast.success("Added to cart!");
  
  const handleBuyNow = () => {
    router.push(
      `/checkout?name=${encodeURIComponent(name)}&brand=${encodeURIComponent(
        brand
      )}&price=${price}&image=${encodeURIComponent(mainImage)}&id=${id}`
    );
  };

  // ✅ FIXED: Proper icon typing helper
  const renderIcon = (IconComponent: IconType, className?: string, size?: number) =>
    React.createElement(IconComponent as React.ComponentType<any>, { className, size });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Toaster position="top-right" />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-pink-600 font-medium transition-colors duration-300"
      >
        {renderIcon(FaArrowLeft, "", 16)}
        Back to {slug} products
      </button>

      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-8">
        <span className="hover:text-gray-700 cursor-pointer transition-colors">Home</span>
        <span>/</span>
        <span className="capitalize hover:text-gray-700 cursor-pointer transition-colors">{slug}</span>
        <span>/</span>
        <span className="text-gray-900 font-semibold line-clamp-1 max-w-xs">{name}</span>
      </div>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 p-8 lg:p-12">
        
        {/* Left: Product Gallery */}
        <div className="space-y-6">
          {/* Main Product Image */}
          <div className="relative group">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white/50 border-4 border-white/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src={mainImage}
                alt={name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-100 group-hover:brightness-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onError={handleImageError}
              />
              {/* Quick view badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                <span className="text-xs font-bold text-gray-700">360° View</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 px-2">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-gray-100 border-4 border-transparent cursor-pointer transition-all duration-300 hover:border-pink-400 hover:shadow-xl hover:scale-105 flex-shrink-0 ${
                  mainImage === thumb ? 'ring-4 ring-pink-400 shadow-xl' : ''
                }`}
                onClick={() => setMainImage(thumb)}
              >
                <Image
                  src={thumb}
                  alt={`${name} variant ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6 lg:pl-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-100 px-3 py-1 rounded-full inline-block max-w-max">
                {type.replace("_", " ")}
              </p>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight line-clamp-2">
                {name}
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-600">by {brand}</p>
                <div className="relative w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-xl shadow-lg p-1">
                  <Image
                    src={brandLogoPath}
                    alt={brand}
                    fill
                    className="object-contain"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
            <button className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl hover:bg-pink-50 hover:text-pink-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 group">
              {renderIcon(FaHeart, "w-5 h-5 group-hover:fill-pink-500 transition-all duration-300", 20)}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                renderIcon(FaStar, 
                  i < Math.round(rating) ? "text-amber-400 fill-current" : "text-gray-300", 
                  16
                )
              ))}
              <span className="ml-2 font-bold text-lg text-gray-900">{rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500 font-medium">({reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-4xl lg:text-5xl font-black text-gray-900 bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 line-through font-medium">
              ₹{(price * 1.3).toLocaleString()}
            </span>
            <span className="text-sm bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-full uppercase tracking-wide">
              30% OFF
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-base lg:text-lg max-w-2xl">
            A long-wear, ultra-comfortable {type} that delivers rich color in a single swipe. 
            Formulated with nourishing ingredients for all-day comfort and stunning results.
          </p>

          {/* Product Specs */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100 hover:shadow-lg transition-all duration-300">
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2">Finish</p>
              <p className="text-lg font-semibold text-rose-600">Soft Matte</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100 hover:shadow-lg transition-all duration-300">
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2">Coverage</p>
              <p className="text-lg font-semibold text-rose-600">Medium to Full</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100 hover:shadow-lg transition-all duration-300">
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2">Skin Type</p>
              <p className="text-lg font-semibold text-rose-600">All Skin Types</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100 hover:shadow-lg transition-all duration-300">
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2">Returns</p>
              <p className="text-lg font-semibold text-rose-600">10-Day Easy</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8">
            <button
              onClick={handleAddToCart}
              className="group relative flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-gray-900 to-black text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-400 hover:from-gray-800 hover:to-gray-900 focus:ring-4 focus:ring-gray-900/20 overflow-hidden border border-transparent"
            >
              <span className="relative z-10">{renderIcon(FaShoppingCart, "group-hover:scale-110 transition-transform duration-300", 20)}</span>
              <span>Add to Cart</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </button>

            <button
              onClick={handleBuyNow}
              className="group relative flex items-center justify-center py-4 px-6 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-400 hover:from-pink-700 hover:via-rose-700 hover:to-purple-700 focus:ring-4 focus:ring-pink-500/30 overflow-hidden border border-transparent"
            >
              <span className="relative z-10">Buy Now - Save ₹{((price * 0.3)).toLocaleString()}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                🚚
              </div>
              <div>
                <p className="font-bold text-lg text-emerald-800">Free Delivery</p>
                <p className="text-sm text-emerald-700">Orders above ₹499 • COD Available</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
            <p>Product ID: <span className="font-semibold text-gray-700">{id}</span></p>
            <p>Category: <span className="font-semibold text-gray-700 capitalize">{slug}</span></p>
            <p>In Stock: <span className="font-semibold text-emerald-600">✓ Ready to ship</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
