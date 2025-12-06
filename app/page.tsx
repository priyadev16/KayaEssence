"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slide { img: string; heading: string; subheading: string; }
interface Spotlight { img: string; title: string; subtitle: string; }
interface Category { img: string; title: string; }
interface FeaturedProduct { img: string; name: string; price: string; oldPrice?: string; discount?: string; }
interface Testimonial { name: string; role: string; text: string; avatar: string; rating: number; }
interface SaleBanner { title: string; subtitle: string; buttonText: string; buttonLink: string; bgGradient: string; }
interface BrandVideo { title: string; description: string; videoSrc: string; buttonText: string; buttonLink: string; }

export default function Home() {
  const slides: Slide[] = [
    { img: "/images/slides/slide1.jpg", heading: "Spotless beauty for your healthy skin", subheading: "Pamper yourself with our skincare products for natural glow." },
    { img: "/images/slides/slide2.jpg", heading: "Radiant Glow, Every Day", subheading: "Reveal the best version of your skin with our formulas." },
    { img: "/images/slides/slide3.jpg", heading: "Modern Solutions for Timeless Beauty", subheading: "Experience revitalizing care adapted to your lifestyle." },
    { img: "/images/slides/slide4.jpg", heading: "Pure Ingredients, Visible Results", subheading: "Trust in nature's best—gentle and effective skincare." },
  ];

  const spotlight: Spotlight[] = [
    { img: "/images/spotlight/spotlight3.jpg", title: "Natural", subtitle: "Eco-friendly and chemical-free skincare products." },
    { img: "/images/spotlight/spotlight2.jpg", title: "Detox", subtitle: "Detoxify and rejuvenate your skin naturally." },
    { img: "/images/spotlight/spotlight3.jpg", title: "Skin Glow", subtitle: "Enhance your natural glow with nourishing care." },
  ];

  const categories: Category[] = [
    { img: "/images/categories/skincare.jpg", title: "Skincare" },
    { img: "/images/categories/cosmetics.jpg", title: "Cosmetics" },
    { img: "/images/categories/haircare.jpg", title: "Hair Care" },
    { img: "/images/categories/bodycare.jpg", title: "Body Care" },
    { img: "/images/categories/fragrance.jpg", title: "Fragrance" },
  ];

  const featuredProducts: FeaturedProduct[] = [
    { img: "/images/featured/hydrating.jpg", name: "Hydrating Facial Cream", price: "$25.00", oldPrice: "$30.00", discount: "-17%" },
    { img: "/images/featured/vitaminc.jpg", name: "Vitamin C Serum", price: "$35.00" },
    { img: "/images/featured/shampoo.jpg", name: "Natural Shampoo", price: "$15.00", oldPrice: "$20.00", discount: "-25%" },
    { img: "/images/featured/mask.jpg", name: "Glow Face Mask", price: "$12.00" },
  ];

  const testimonials: Testimonial[] = [
    { name: "Asha R.", role: "Verified Buyer", text: "I noticed a visible glow in two weeks — the serum is lightweight and non-greasy. Highly recommend!", avatar: "/images/testimonials/user1.jpg", rating: 5 },
    { name: "Kiran M.", role: "Regular Customer", text: "Packaging felt premium and the cleanser removed impurities without drying my skin. Will repurchase.", avatar: "/images/testimonials/user2.jpg", rating: 5 },
    { name: "Priya S.", role: "First-time Buyer", text: "My skin has never felt softer. The moisturizer absorbed quickly and didn't clog pores.", avatar: "/images/testimonials/user3.jpg", rating: 5 },
  ];

  const saleBanner: SaleBanner = {
    title: "Flash Sale! Up to 50% Off",
    subtitle: "Hurry! Limited time offer on our most popular skincare products.",
    buttonText: "Shop Now",
    buttonLink: "/products",
    bgGradient: "from-pink-500 to-pink-400",
  };

  const brandVideo: BrandVideo = {
    title: "Experience the Essence of Our Brand",
    description: "Our brand combines nature and science to deliver skincare that nourishes your skin deeply.",
    videoSrc: "/videos/brand.mp4",
    buttonText: "Shop Now",
    buttonLink: "/products",
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* ✅ BULLETPROOF HERO SLIDER */}
      <div className="relative h-screen w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full w-full"
          style={{ height: '100vh' }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-screen w-full flex items-center justify-center">
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.img}
                    alt={slide.heading}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-cover object-center !brightness-75 w-full h-full"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
                <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto w-full flex flex-col items-center justify-center h-full py-12">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 drop-shadow-2xl leading-tight">
                    {slide.heading}
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-12 sm:mb-16 drop-shadow-xl max-w-2xl mx-auto leading-relaxed">
                    {slide.subheading}
                  </p>
                  {i === 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                      <Link href="/categories">
                        <button className="bg-white text-pink-600 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-pink-50 hover:shadow-2xl transition-all duration-500 shadow-xl">
                          🛒 Shop Now
                        </button>
                      </Link>
                      <Link href="/about">
                        <button className="border-4 border-white/90 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-white hover:text-pink-600 transition-all duration-500 backdrop-blur-xl shadow-2xl">
                          Discover More
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ PERFECT PROMO BANNER */}
      <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/products">
              <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[470px] rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-700 cursor-pointer">
                <Image
                  src="/images/banners/my-banner.jpg"
                  alt="Discount Banner"
                  fill
                  className="object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent/50 to-black/40 rounded-3xl" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 lg:px-12 py-8">
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-pink-600 font-black px-6 py-3 rounded-full shadow-2xl text-lg sm:text-xl">
                    -50% OFF
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl mb-4 sm:mb-6 max-w-2xl leading-tight">
                    Mega Skincare Sale
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/95 drop-shadow-lg mb-8 sm:mb-10 max-w-xl">
                    Limited Time Offer on Best Sellers
                  </p>
                  <button className="bg-white text-pink-600 px-8 py-4 sm:px-10 sm:py-4 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:scale-105 transition-all duration-400 shadow-xl">
                    Shop Now →
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ PERFECT CATEGORIES */}
      <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/50">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
            Shop By Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore our premium collections</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <Link key={i} href="/categories" className="group relative block h-48 sm:h-56 lg:h-64 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <Image 
                src={cat.img} 
                alt={cat.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-100 group-hover:brightness-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                priority={i < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-xl bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm px-4 py-2 rounded-2xl">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ PERFECT FEATURED PRODUCTS */}
      <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">Discover our best sellers</p>
        </div>
        <Swiper 
          modules={[Navigation, Pagination, Autoplay]} 
          navigation 
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop 
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3.5, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 32 }
          }}
          className="max-w-7xl mx-auto"
        >
          {featuredProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <FeaturedCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ✅ SALE BANNER */}
      <section className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className={`relative bg-gradient-to-r ${saleBanner.bgGradient} rounded-4xl p-8 sm:p-12 lg:p-16 text-white text-center lg:text-left shadow-2xl overflow-hidden`}>
          <div className="lg:max-w-lg mb-8 lg:mb-0 lg:pr-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">{saleBanner.title}</h2>
            <p className="text-lg sm:text-xl mb-8 opacity-95 leading-relaxed">{saleBanner.subtitle}</p>
            <Link href={saleBanner.buttonLink}>
              <button className="bg-white text-pink-600 px-8 py-4 rounded-3xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:scale-105 transition-all duration-400 shadow-xl inline-flex items-center gap-2">
                🛒 {saleBanner.buttonText} →
              </button>
            </Link>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 lg:w-80 lg:h-80 bg-white/20 rounded-full blur-3xl -mt-20 lg:-mt-28" />
        </div>
      </section>

      {/* ✅ BRAND VIDEO - NO PLAY ICON */}
      <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              {brandVideo.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-lg">{brandVideo.description}</p>
            <Link href={brandVideo.buttonLink}>
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 sm:px-10 sm:py-4 rounded-3xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:scale-105 transition-all duration-400 shadow-xl">
                {brandVideo.buttonText} →
              </button>
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full h-72 sm:h-80 lg:h-[400px] rounded-4xl overflow-hidden shadow-2xl">
              <video 
                src={brandVideo.videoSrc} 
                className="w-full h-full object-cover rounded-4xl" 
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/placeholder-video.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 rounded-4xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">Don't just take our word for it</p>
          </div>
          <Swiper 
            modules={[Autoplay, Pagination]} 
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop 
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
            }}
            className="max-w-5xl mx-auto"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-400 h-72 sm:h-80 flex flex-col justify-between">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <Image 
                      src={t.avatar} 
                      alt={t.name} 
                      width={56} 
                      height={56} 
                      className="rounded-full object-cover shadow-lg w-14 h-14 sm:w-16 sm:h-16"
                    />
                    <div>
                      <p className="font-bold text-lg sm:text-xl text-gray-900">{t.name}</p>
                      <p className="text-gray-500 text-sm sm:text-base">{t.role}</p>
                      <div className="flex gap-1 text-yellow-400 text-lg mt-1">{"★".repeat(t.rating)}</div>
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

// ✅ PERFECT FEATURED CARD
function FeaturedCard({ product }: { product: FeaturedProduct }) {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 h-full max-w-sm mx-auto border border-white/50 hover:border-pink-200/50">
      <div className="relative p-6 pt-12 pb-4 h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white/50 rounded-2xl mx-2 -mt-4">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg backdrop-blur-sm">
            {product.discount}
          </span>
        )}
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          className="object-contain group-hover:scale-105 transition-transform duration-500 mx-auto max-h-48"
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>
      <div className="p-6">
        {product.oldPrice && (
          <p className="text-sm text-gray-400 line-through mb-1 font-medium">₹{product.oldPrice}</p>
        )}
        <p className="text-2xl font-black text-gray-900 mb-2 leading-tight">{product.price}</p>
        <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-4 line-clamp-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        <div className="flex justify-center mb-6 text-yellow-400 text-2xl">★★★★★</div>
        <Link href="/products" className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-bold text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all duration-400 shadow-xl text-center">
          Add to Cart →
        </Link>
      </div>
    </div>
  );
}
