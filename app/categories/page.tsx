 import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    "makeup",
    "skincare",
    "haircare",
    "fragrance",
    "bodycare",
    "wellness"
  ];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat}`}
            className="border rounded-xl p-6 text-lg font-semibold 
                       hover:bg-pink-50 hover:border-pink-400 transition"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
