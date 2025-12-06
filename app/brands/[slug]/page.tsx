import Link from "next/link";
import Image from "next/image";

interface BrandPageProps {
  params: { slug: string };
}

export default function BrandProductsPage({ params }: BrandPageProps) {
  const { slug } = params;

  // Brand specific details
  const brandDetails = {
    lakme: {
      name: "Lakmé",
      tagline: "India's No.1 Colour Cosmetics Brand",
      founded: "1952",
      rating: 4.7,
      productsCount: 127,
      description: "Lakmé is India's leading cosmetics brand offering a wide range of makeup, skincare, and haircare products. Trusted by millions of Indian women for over 70 years.",
      story: "Founded in 1952 by Mrs. Simone Tata, Lakmé was created to provide Indian women with international quality beauty products at affordable prices. Today, it stands as a symbol of beauty and elegance.",
      popularFor: ["Lipsticks", "Kajal", "Foundations", "Eyeliners"],
      image: "/brands/lakme.png"
    },
    maybelline: {
      name: "Maybelline",
      tagline: "Maybe she's born with it. Maybe it's Maybelline.",
      founded: "1915",
      rating: 4.6,
      productsCount: 89,
      description: "New York’s iconic makeup brand loved worldwide for bold, innovative products that empower every woman.",
      story: "Founded in 1915, Maybelline revolutionized mascara and became the world's most loved makeup brand. Known for affordable luxury and trendsetting innovation.",
      popularFor: ["Mascaras", "Lip Products", "Eyeshadows", "BB Creams"],
      image: "/brands/maybelline.png"
    },
    mamaearth: {
      name: "Mamaearth",
      tagline: "Gentle Organics, Happy Skin",
      founded: "2016",
      rating: 4.8,
      productsCount: 156,
      description: "Toxin-free, Made Safe certified natural beauty for you and baby. Clean ingredients you can trust.",
      story: "Mamaearth was born from a mother's quest to find safe products for her baby. Now India's leading toxin-free beauty brand with dermatologically tested products.",
      popularFor: ["Face Washes", "Shampoos", "Body Lotions", "Baby Care"],
      image: "/brands/mamaearth.png"
    },
    loreal: {
      name: "L'Oréal Paris",
      tagline: "Because You're Worth It",
      founded: "1909",
      rating: 4.5,
      productsCount: 234,
      description: "Global beauty leader with cutting-edge innovation across haircare, skincare, and makeup categories.",
      story: "Founded in 1909, L'Oréal is the world's largest beauty company with 36 brands serving 1 billion consumers worldwide.",
      popularFor: ["Hair Colors", "Serums", "Shampoos", "Anti-Aging"],
      image: "/brands/loreal.png"
    },
    "kay-beauty": {
      name: "Kay Beauty",
      tagline: "Beauty Beyond Boundaries",
      founded: "2020",
      rating: 4.6,
      productsCount: 67,
      description: "Katrina Kaif's cruelty-free, clean beauty revolution with high-performance formulas.",
      story: "Co-created by Bollywood superstar Katrina Kaif, Kay Beauty focuses on inclusivity, clean ingredients, and long-lasting glamour.",
      popularFor: ["Lipsticks", "Foundations", "Eyeliners", "Highlighters"],
      image: "/brands/kaybeauty.png"
    }
  };

  const brand = brandDetails[slug as keyof typeof brandDetails] || brandDetails.lakme;

  // Brand specific products
  const products = [
    {
      id: 1,
      name: `${brand.name} Absolute Foundation`,
      price: 499,
      originalPrice: 699,
      image: "/products/foundation.png",
      rating: 4.8,
      discount: 28
    },
    {
      id: 2,
      name: `${brand.name} Velvet Matte Lipstick`,
      price: 299,
      originalPrice: 450,
      image: "/products/lipstick.png",
      rating: 4.7,
      discount: 33
    },
    {
      id: 3,
      name: `${brand.name} Hydrating Moisturizer`,
      price: 399,
      originalPrice: 550,
      image: "/products/moisturizer.png",
      rating: 4.9,
      discount: 27
    },
    {
      id: 4,
      name: `${brand.name} Vitamin C Serum`,
      price: 599,
      originalPrice: 850,
      image: "/products/serum.png",
      rating: 4.6,
      discount: 29
    },
    {
      id: 5,
      name: `${brand.name} Kajal`,
      price: 249,
      originalPrice: 350,
      image: "/products/kajal.png",
      rating: 4.8,
      discount: 28
    },
    {
      id: 6,
      name: `${brand.name} BB Cream`,
      price: 449,
      originalPrice: 599,
      image: "/products/bbcream.png",
      rating: 4.7,
      discount: 25
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Brand Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-3 flex items-center justify-center shadow-lg">
              <Image 
                src={brand.image} 
                alt={brand.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {brand.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">{brand.tagline}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm mb-8">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl backdrop-blur-sm">
              <span className="text-2xl font-bold text-yellow-400">★</span>
              <span>{brand.rating}</span>
              <span className="text-gray-500">(12.5K)</span>
            </div>
            <div className="bg-white/60 px-4 py-2 rounded-2xl backdrop-blur-sm">
              {brand.productsCount}+ Products
            </div>
            <div className="bg-white/60 px-4 py-2 rounded-2xl backdrop-blur-sm">
              Founded {brand.founded}
            </div>
          </div>

          <Link
            href={`/brands/${slug}/products`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Brand Story Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About {brand.name}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{brand.description}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{brand.story}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                {brand.popularFor.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl text-center font-semibold text-purple-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-12 backdrop-blur-sm border border-purple-200/50">
                <Image 
                  src={brand.image} 
                  alt={brand.name}
                  width={300}
                  height={300}
                  className="w-full h-80 object-contain mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Featured {brand.name} Products
            </h2>
            <Link href={`/brands/${slug}/all`} className="text-purple-600 hover:text-purple-700 font-semibold text-lg">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/brands/${slug}/products/${product.id}`}
                className="group relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden hover:bg-white"
              >
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.discount}% OFF
                  </div>
                )}
                
                <div className="relative mb-4">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={120}
                    height={160}
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>{product.rating > 4.5 ? '★' : '☆'}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 1000) + 100} reviews)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="pt-4">
                  <span className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-sm">
                    Quick View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
