"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image_link: string;
  brand: string;
  product_type: string;
}

interface CategorySlugPageProps {
  params: Promise<{ slug: string }>;
}

const TYPES = [
  "lipstick",
  "eyeliner",
  "mascara",
  "foundation",
  "blush",
  "eyeshadow",
  "lip_gloss",
  "nail_polish",
  "bronzer",
  "highlighter",
];

export default function CategorySlugPage({ params }: CategorySlugPageProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("");
  const [ptype, setPtype] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [cartCount, setCartCount] = useState(0);
  const [brandOptions, setBrandOptions] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://makeup-api.herokuapp.com/api/v1/products.json"
        );
        const data: any[] = await res.json();

        // Filter only products with valid image, name, and price
        const validProducts: Product[] = data
          .filter(
            (p: any) =>
              p.image_link &&
              p.image_link.startsWith("http") &&
              p.name &&
              p.price !== null &&
              p.brand
          )
          .map((p: any) => ({
            id: p.id,
            name: p.name,
            brand: p.brand?.trim() || "Unknown Brand",
            price: parseFloat(p.price) || 0,
            image_link: p.image_link,
            product_type: p.product_type || "unknown",
          }))
          .slice(0, 50); // Show first 50 valid products

        setProducts(validProducts);

        // Dynamic brand options
        const uniqueBrands: string[] = Array.from(
          new Set(validProducts.map((p: Product) => p.brand))
        ).sort();
        setBrandOptions(uniqueBrands);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setBrandOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${productName} added to cart!`);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = products.filter((p) => {
    const priceNum = p.price;
    const brandMatch = !brand || p.brand === brand;
    const typeMatch = !ptype || p.product_type.toLowerCase() === ptype.toLowerCase();
    const minMatch = !minPrice || priceNum >= minPrice;
    const maxMatch = !maxPrice || priceNum <= maxPrice;
    return brandMatch && typeMatch && minMatch && maxMatch;
  });

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-2xl animate-pulse text-gray-600">
          Loading makeup products...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold capitalize bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {slug} Collection
        </h1>
        <div className="relative cursor-pointer p-3 bg-white rounded-full shadow-lg">
          <FaShoppingCart size={24} className="text-gray-800" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border">
        <select
          className="border border-gray-300 p-3 rounded-xl w-48 bg-white shadow-sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brandOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-3 rounded-xl w-48 bg-white shadow-sm"
          value={ptype}
          onChange={(e) => setPtype(e.target.value)}
        >
          <option value="">All Types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replace("_", " ")}
            </option>
          ))}
        </select>

        <input
          className="border border-gray-300 p-3 rounded-xl w-24 bg-white shadow-sm"
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value ? +e.target.value : "")}
        />
        <input
          className="border border-gray-300 p-3 rounded-xl w-24 bg-white shadow-sm"
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value ? +e.target.value : "")}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-2xl text-gray-500 mb-2">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
            >
              {/* Wishlist Heart */}
              <div
                className={`absolute top-3 right-3 z-10 cursor-pointer text-xl ${
                  wishlist[product.id] ? "text-red-500" : "text-gray-300 hover:text-red-400"
                }`}
                onClick={() => toggleWishlist(product.id)}
              >
                <FaHeart />
              </div>

              {/* Image */}
              <div className="relative w-full h-44 md:h-52 rounded-t-2xl overflow-hidden">
                <Image
                  src={product.image_link}
                  alt={`${product.brand} ${product.name}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.png"; // fallback image
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col items-center text-center space-y-1">
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-gray-700 capitalize">{product.brand}</p>
                <p className="text-pink-600 font-extrabold text-lg md:text-xl">
                  ₹{product.price.toFixed(0)}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 p-3">
                <button
                  onClick={() => handleAddToCart(product.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition transform hover:scale-105"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  onClick={() => router.push(`/categories/${slug}/${product.id}`)}
                  className="flex-1 py-2 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600 transition transform hover:scale-105"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
