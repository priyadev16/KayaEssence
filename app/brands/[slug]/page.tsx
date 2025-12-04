import Link from "next/link";

interface BrandPageProps {
  params: { slug: string };
}

export default function BrandProductsPage({ params }: BrandPageProps) {
  const { slug } = params;

  const products = [
    {
      id: 1,
      name: `${slug} Foundation`,
      price: 499,
      image: "/products/foundation.png",
    },
    {
      id: 2,
      name: `${slug} Lipstick`,
      price: 299,
      image: "/products/lipstick.png",
    },
    {
      id: 3,
      name: `${slug} Moisturizer`,
      price: 399,
      image: "/products/moisturizer.png",
    },
    {
      id: 4,
      name: `${slug} Serum`,
      price: 599,
      image: "/products/serum.png",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize mb-4">{slug} Products</h1>
      <p className="text-gray-600 mb-8">
        Showing best products from <strong>{slug}</strong>.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/brands/${slug}/${p.id}`}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition block"
          >
            <img src={p.image} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-pink-600 font-bold mt-1">₹{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
