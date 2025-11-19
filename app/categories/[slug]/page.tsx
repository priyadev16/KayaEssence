interface SlugPageProps {
  params: { slug: string };
}

export default function CategorySlugPage({ params }: SlugPageProps) {
  const { slug } = params;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize">{slug}</h1>
      <p className="mt-2 text-gray-600">
        Showing products under <strong>{slug}</strong>.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-3" />
            <h3 className="font-semibold">Product {i}</h3>
            <p className="text-pink-600 font-bold mt-1">$29.99</p>
          </div>
        ))}
      </div>
    </div>
  );
}
