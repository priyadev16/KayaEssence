"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 🔥 COMPLETE FALLBACK DATA with ALL images
const FALLBACK_DATA = {
  slides: [
    {
      img: "https://images.unsplash.com/photo-1687360443913-820894ee4725?w=1600&q=90",
      heading: "Discover Your Perfect Glow",
      subheading: "Premium skincare crafted with nature's finest ingredients"
    },
    {
      img: "https://images.unsplash.com/photo-1608068549325-23af5db2c3de?w=1600&q=90",
      heading: "Luxury for Your Skin",
      subheading: "Experience the ultimate in beauty and wellness"
    }
  ],
  spotlight: [
    {
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=85",
      title: "Hydra Glow Serum",
      subtitle: "24hr hydration boost"
    },
    {
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=85",
      title: "Vitamin C Brightener",
      subtitle: "Even skin tone fast"
    },
    {
      img: "https://images.unsplash.com/photo-1615486368063-b8d8f1df5d4e?w=500&q=85",
      title: "Retinol Night Cream",
      subtitle: "Anti-aging powerhouse"
    }
  ],
  categories: [
    { img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=85", title: "Skincare" },
    { img: "https://images.unsplash.com/photo-1625772310782-18449f77a954?w=400&q=85", title: "Haircare" },
    { img: "https://images.unsplash.com/photo-1588744441996-6aaed65a0b4e?w=400&q=85", title: "Makeup" },
    { img: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=85", title: "Fragrance" },
    { img: "https://images.unsplash.com/photo-1606890658317-7d4e69c64864?w=400&q=85", title: "Bodycare" }
  ],
  featuredProducts: [
    {
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=85",
      name: "Rose Hydrating Serum",
      price: "$49.99",
      oldPrice: "$69.99",
      discount: "30% OFF"
    },
    {
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=85",
      name: "Vitamin C Serum",
      price: "$59.99",
      discount: "NEW"
    },
    {
      img: "https://images.unsplash.com/photo-1615486368063-b8d8f1df5d4e?w=400&q=85",
      name: "Retinol Night Cream",
      price: "$79.99",
      oldPrice: "$99.99",
      discount: "20% OFF"
    }
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Beauty Blogger",
      text: "Transformed my skin in just 2 weeks! Glowy, hydrated, and flawless.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=85",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Skincare Enthusiast",
      text: "Best serums I've ever used. My skin feels amazing!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=85",
      rating: 5
    }
  ]
};

// ... interfaces remain the same ...

export default function Home() {
  const [slides, setSlides] = useState(FALLBACK_DATA.slides);
  const [spotlight, setSpotlight] = useState(FALLBACK_DATA.spotlight);
  const [categories, setCategories] = useState(FALLBACK_DATA.categories);
  const [featuredProducts, setFeaturedProducts] = useState(FALLBACK_DATA.featuredProducts);
  const [testimonials, setTestimonials] = useState(FALLBACK_DATA.testimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => {
        setSlides(data.slides || FALLBACK_DATA.slides);
        setSpotlight(data.spotlight || FALLBACK_DATA.spotlight);
        setCategories(data.categories || FALLBACK_DATA.categories);
        setFeaturedProducts(data.featuredProducts || FALLBACK_DATA.featuredProducts);
        setTestimonials(data.testimonials || FALLBACK_DATA.testimonials);
      })
      .catch((err) => console.log("Using fallback data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* HERO SECTION - Already fixed */}
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} loop className="h-screen w-full">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('${slide.img}')` }}>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black mb-6">{slide.heading}</h1>
                <p className="text-2xl mb-8">{slide.subheading}</p>
                {index === 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/categories"><button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50">Shop Now</button></Link>
                    <Link href="/about"><button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-pink-600">Discover More</button></Link>
                  </div>
                )}
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PROMO BOXES */}
      <div className="container mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <PromoBox img="https://images.unsplash.com/photo-1591183056951-6b9b0df7e8bb?w=800&q=90" title="SAVE 25%" subtitle="ONLY 3 DAYS" chips="LIMITED" dark={undefined} />
        <PromoBox img="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&q=90" title="GLOSSY STAIN" subtitle="Limited Edition" chips={undefined} dark={undefined} />
        <PromoBox img="https://images.unsplash.com/photo-1611885265418-1a5f3b78e1f3?w=800&q=90" title="BATH & BODY" subtitle="Event Special" chips="SPRING" dark />
      </div>

      {/* SPOTLIGHT */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">In The Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlight.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <img src={item.img} alt={item.title} className="w-full h-80 object-cover rounded-2xl mb-6" />
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {categories.map((cat, index) => (
            <Link key={index} href="/categories" className="group">
              <div className="w-full h-52 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <p className="mt-4 text-xl font-bold text-center text-gray-900 group-hover:text-pink-600">{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600">Discover our best sellers</p>
        </div>
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop spaceBetween={30} slidesPerView={1} breakpoints={{640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 }}} className="pb-20">
          {featuredProducts.map((product, index) => (
            <SwiperSlide key={index}><FeaturedCard product={product} /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔥 SALE BANNER - RESTORED */}
      <section className="container mx-auto py-20 px-4">
        <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 md:p-20 text-white text-center md:text-left flex flex-col lg:flex-row items-center justify-between shadow-2xl overflow-hidden">
          <div className="lg:max-w-lg mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-2xl">🔥 Flash Sale! Up to 50% Off</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95">Hurry! Limited time offer on our most popular skincare products.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <button className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-xl hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">🛒 Shop Now</button>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=30')] bg-cover bg-center opacity-10"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl -mt-36"></div>
        </div>
      </section>

      {/* 🔥 BRAND VIDEO - RESTORED */}
      <section className="container mx-auto py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="relative w-full h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black">
              <video 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" 
                src="https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-3975-large.mp4"
                autoPlay 
                muted 
                loop 
                poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              <button className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl hover:bg-white/30 transition-all duration-300">
                  <svg className="w-12 h-12 lg:w-16 lg:h-16 ml-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-pink-600 bg-clip-text text-transparent">
              Experience the Essence of Beauty
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our brand combines nature's finest ingredients with cutting-edge science to deliver skincare that transforms. 
              Feel the difference with every application.
            </p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔥 TESTIMONIALS - RESTORED */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Loved by Thousands
          </h2>
          <p className="text-center text-xl text-gray-600 mb-20 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop spaceBetween={30} slidesPerView={1} breakpoints={{640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }}} className="px-4">
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md mx-auto h-80 flex flex-col justify-between hover:shadow-3xl transition-all duration-300">
                  <div>
                    <div className="text-6xl text-pink-500 mb-6">"</div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover shadow-lg" />
                    <div>
                      <p className="font-bold text-xl text-gray-900">{t.name}</p>
                      <p className="text-gray-500">{t.role}</p>
                      <div className="flex gap-1 text-2xl text-yellow-400 mt-1">★★★★★</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

// All your existing component functions (PromoBox, FeaturedCard, etc.) go here - they remain the SAME
function PromoBox({ img, chips, title, subtitle, dark }: { img: string; chips?: string; title: string; subtitle: string; dark?: boolean }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden h-80 flex items-end shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2" style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className={`absolute inset-0 ${dark ? "bg-black/80" : "bg-black/60"}`}></div>
      <div className="relative z-10 p-8 text-white">
        {chips && <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-2">{chips}</span>}
        <h3 className="text-3xl font-black">{title}</h3>
        <p className="text-xl">{subtitle}</p>
      </div>
    </div>
  );
}

function FeaturedCard({ product }: { product: typeof FALLBACK_DATA.featuredProducts[0] }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center max-w-sm mx-auto">
      <div className="relative mb-6 h-64 flex items-center justify-center bg-gray-50 rounded-2xl">
        {product.discount && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-xl font-bold text-sm shadow-lg">
            {product.discount}
          </span>
        )}
        <img src={product.img} alt={product.name} className="h-48 w-48 object-contain hover:scale-110 transition-transform duration-300" />
      </div>
      {product.oldPrice && <p className="text-sm text-gray-400 line-through mb-1">{product.oldPrice}</p>}
      <p className="text-2xl font-bold text-gray-900 mb-2">{product.price}</p>
      <h3 className="font-semibold text-lg mb-4">{product.name}</h3>
      <div className="flex justify-center mb-6 text-yellow-400 text-2xl">★★★★★</div>
      <Link href="/products" className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-bold hover:shadow-xl transition-all">Add to Cart</Link>
    </div>
  );
}
