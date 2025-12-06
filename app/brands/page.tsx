import Link from "next/link";
import Image from "next/image";

export default function BrandsPage() {
  const brands = [
    { 
      name: "Lakme", 
      slug: "lakme", 
      image: "/brands/lakme.png",
      description: "Premium beauty products for every Indian woman",
      productsCount: 127
    },
    { 
      name: "Maybelline", 
      slug: "maybelline", 
      image: "/brands/maybelline.png",
      description: "New York’s iconic makeup brand loved worldwide",
      productsCount: 89
    },
    { 
      name: "Mamaearth", 
      slug: "mamaearth", 
      image: "/brands/mamaearth.png",
      description: "Toxin-free, natural beauty for you and baby",
      productsCount: 156
    },
    { 
      name: "Loreal", 
      slug: "loreal", 
      image: "/brands/loreal.png",
      description: "Because you're worth it - global beauty leader",
      productsCount: 234
    },
    { 
      name: "Kay Beauty", 
      slug: "kay-beauty", 
      image: "/brands/kaybeauty.png",
      description: "Katrina's cruelty-free, clean beauty revolution",
      productsCount: 67
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Discover Your Beauty Brands
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore premium beauty brands with authentic products, exclusive deals, and fast delivery across India
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {brands.map((brand, index) => (
            <Link
              href={`/brands/${brand.slug}`}
              key={brand.slug}
              className="group relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden hover:bg-white"
            >
              {/* Badge for featured brands */}
              {index < 2 && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Popular
                </div>
              )}
              
              {/* Brand Logo */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg">
                <Image 
                  src={brand.image} 
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="object-contain group-hover:drop-shadow-lg"
                  priority
                />
              </div>

              {/* Brand Name */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3 group-hover:text-purple-600 transition-colors">
                {brand.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center leading-relaxed mb-6 line-clamp-2">
                {brand.description}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-1 text-purple-600 font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  4.8+
                </div>
                <div className="text-gray-500">•</div>
                <span className="text-gray-900 font-semibold">
                  {brand.productsCount}+ Products
                </span>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <span className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold py-4 px-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Shop {brand.name}
                </span>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 p-12 bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Glow?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Join 1M+ happy customers discovering their perfect beauty routine
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Browse All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
