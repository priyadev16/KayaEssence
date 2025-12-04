import Link from "next/link";

export default function BrandsPage() {
  const brands = [
    { name: "Lakme", slug: "lakme", image: "/brands/lakme.png" },
    { name: "Maybelline", slug: "maybelline", image: "/brands/maybelline.png" },
    { name: "Mamaearth", slug: "mamaearth", image: "/brands/mamaearth.png" },
    { name: "Loreal", slug: "loreal", image: "/brands/loreal.png" },
    { name: "Kay Beauty", slug: "kay-beauty", image: "/brands/kaybeauty.png" },
  ];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">All Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            href={`/brands/${brand.slug}`}
            key={brand.slug}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
              <img src={brand.image} alt={brand.name} className="w-16 h-16" />
            </div>
            <span className="text-lg font-semibold">{brand.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
