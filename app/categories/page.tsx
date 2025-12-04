"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
  img: string;
  products: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 px-6 md:px-14 py-14">

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Shop by Categories</h1>
          <p className="text-gray-600 mt-2">
            Explore our full range of beauty products based on category.
          </p>
        </div>

        <input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-3 border border-gray-300 rounded-xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h3 className="text-xl font-semibold group-hover:text-pink-600 transition">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                {cat.products} Products
              </p>

              <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm w-full group-hover:bg-pink-700 transition">
                Explore
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredCategories.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No categories found.
        </p>
      )}

      {/* BANNER SECTION */}
      <div className="mt-20 relative rounded-3xl shadow-xl overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 p-10 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Discover Your Beauty Essentials
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-xl">
          Shop from our exclusive range of beauty categories curated just for you.
        </p>
        <Link href="/products">
          <button className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-pink-100 transition">
            Shop All Products
          </button>
        </Link>

        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* INFO SECTION */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold">100% Genuine Products</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          All our products are sourced from trusted brands, ensuring top quality and safety.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          <InfoCard title="Fast Delivery" icon="🚚" />
          <InfoCard title="Secure Payment" icon="💳" />
          <InfoCard title="Premium Brands" icon="⭐" />
          <InfoCard title="Customer Support" icon="📞" />
        </div>
      </div>
    </div>
  );
}

/* Reusable Info Card Component */
function InfoCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
