"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailsPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Matte Lipstick",
    brand: "Maybelline",
    price: 599,
    rating: 4.5,
    reviews: 120,
    image_link: "https://www.w3schools.com/w3images/lipstick.jpg", // sample image
    description:
      "A long-lasting matte lipstick with rich color payoff. Available in multiple shades. Smooth texture and comfortable wear all day.",
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Toaster position="top-right" />

      {/* Back Button */}
      <button
        className="mb-4 text-gray-700 hover:text-pink-600 font-medium"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden border shadow-lg">
          <Image
            src={product.image_link}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e: any) => (e.target.src = "/placeholder.png")}
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700 capitalize font-semibold">{product.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">★ {product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <p className="text-pink-600 font-extrabold text-2xl">₹{product.price}</p>

          {/* Description */}
          <p className="text-gray-600 mt-2">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-xl">
              <button
                className="px-3 py-1 hover:bg-gray-100 rounded-l-xl"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-3 py-1 hover:bg-gray-100 rounded-r-xl"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => toast.success(`${product.name} added to cart!`)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold"
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              onClick={() => router.push(`/checkout/${product.id}`)}
              className="flex-1 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition font-semibold"
            >
              Buy Now
            </button>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setWishlist(!wishlist)}
            className={`flex items-center gap-2 mt-4 font-semibold ${
              wishlist ? "text-red-500" : "text-gray-700 hover:text-red-500"
            }`}
          >
            <FaHeart /> {wishlist ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Recommended Products (Optional) */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You may also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src="https://www.w3schools.com/w3images/lipstick.jpg"
                  alt="Related product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">Lipstick Shade {i}</h3>
                <p className="text-xs text-gray-500">Maybelline</p>
                <p className="text-pink-600 font-bold">₹499</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
