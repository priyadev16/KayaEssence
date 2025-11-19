"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/* ============================================
   TYPES
============================================ */
interface SlideText {
  heading: string;
  subheading: string;
}

interface SpotlightItem {
  img: string;
  title: string;
  subtitle: string;
}

interface CategoryItem {
  img: string;
  title: string;
}

interface FeaturedProduct {
  img: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
}

interface PromoBoxProps {
  img: string;
  chips?: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}

interface FeaturedCardProps {
  product: FeaturedProduct;
}

/* ============================================
   PAGE
============================================ */
export default function Home() {
  const slides: string[] = [
    "/image/hero.jpg",
    "/image/herosection.jpg",
    "/image/hs2.jpg",
    "/image/product3.jpg",
  ];

  const slideTexts: SlideText[] = [
    {
      heading: "Spotless beauty for your healthy skin",
      subheading: "Pamper yourself with our skincare products for natural glow.",
    },
    {
      heading: "Radiant Glow, Every Day",
      subheading: "Reveal the best version of your skin with our formulas.",
    },
    {
      heading: "Modern Solutions for Timeless Beauty",
      subheading: "Experience revitalizing care adapted to your lifestyle.",
    },
    {
      heading: "Pure Ingredients, Visible Results",
      subheading: "Trust in nature's best—gentle and effective skincare.",
    },
  ];

  const spotlight: SpotlightItem[] = [
    { img: "/image/product1.jpg", title: "NATURAL", subtitle: "“This is Photoshop’s version..." },
    { img: "/image/product2.jpg", title: "DETOX", subtitle: "“This is Photoshop’s version..." },
    { img: "/image/product3.jpg", title: "SKIN GLOW", subtitle: "“This is Photoshop’s version..." },
  ];

  const categories: CategoryItem[] = [
    { img: "/image/skincare.jpg", title: "Skincare" },
    { img: "/image/cosmetics.jpg", title: "Cosmetics" },
    { img: "/image/haircare.jpg", title: "Hair Care" },
    { img: "/image/bodycare.jpg", title: "Body Care" },
    { img: "/image/fragrance.jpg", title: "Fragrance" },
  ];

  const featuredProducts: FeaturedProduct[] = [
    { img: "/featured/product1.png", name: "Shield Conditioner", price: "$10.00 – $20.00", discount: "-17%" },
    { img: "/featured/product2.png", name: "Perfecting Facial Oil", price: "$20.00" },
    { img: "/featured/product3.png", name: "Enriched Hydrate Body Wash", price: "$22.00", oldPrice: "$24.00", discount: "-8%" },
    { img: "/featured/product4.png", name: "Shield Shampoo", price: "$45.00" },
    { img: "/featured/product5.png", name: "Vitamin C Glow Serum", price: "$30.00" },
    { img: "/featured/product6.png", name: "Hydra Boost Cream", price: "$18.00" },
    { img: "/featured/product7.png", name: "Detox Cleanser", price: "$16.00" },
    { img: "/featured/product8.png", name: "Rose Water Mist", price: "$12.00" },
    { img: "/featured/product9.png", name: "Hair Nourish Oil", price: "$28.00" },
    { img: "/featured/product10.png", name: "Deep Repair Mask", price: "$25.00" },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen">

      {/* HERO SECTION */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="h-screen w-full"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <section
              className="relative h-screen bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url('${image}')` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-xl mx-auto z-10">
                <h1 className="text-5xl font-bold text-white mb-4">
                  {slideTexts[index].heading}
                </h1>
                <h2 className="text-xl text-white/90 mb-6">
                  {slideTexts[index].subheading}
                </h2>

                {index === 0 && (
                  <div className="flex gap-4 justify-center">
                    <Link href="/products">
                      <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
                        Shop Now
                      </button>
                    </Link>
                    <Link href="/about">
                      <button className="bg-white text-pink-600 px-6 py-3 rounded-full hover:bg-pink-50 transition">
                        Read More
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PROMOTIONAL BOXES */}
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <PromoBox img="/image/box1.jpg" title="SAVE 25%" subtitle="ONLY" chips="3 DAYS" />
        <PromoBox img="/image/box2.jpg" title="GLOSSY STAIN" subtitle="This is Photoshop’s version..." />
        <PromoBox img="/image/body.jpg" title="BATH & BODY" subtitle="EVENT" chips="SPRING" dark />
      </div>

      {/* SPOTLIGHT */}
      <div className="container mx-auto py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">In The Spotlight</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlight.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <img src={item.img} alt={item.title} className="rounded-xl w-full h-64 object-cover" />
              <h3 className="text-xl font-bold mt-4">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SHOP BY CATEGORY */}
      <div className="container mx-auto py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop By Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-40 rounded-xl overflow-hidden shadow">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              <p className="mt-2 font-medium">{cat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="container mx-auto py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Our Featured Products
        </h2>
        <p className="text-center text-gray-500 mb-8">Get the skin you want to feel</p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {featuredProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <FeaturedCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* DISCOUNT BANNER */}
      <DiscountBanner />
    </div>
  );
}

/* ============================================
   COMPONENT: PromoBox
============================================ */
function PromoBox({ img, chips, title, subtitle, dark }: PromoBoxProps) {
  return (
    <div
      className="relative rounded-lg overflow-hidden h-80 flex items-end"
      style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className={`absolute inset-0 ${dark ? "bg-black/80" : "bg-black/60"}`}></div>

      <div className="relative z-10 p-6 text-white">
        {chips && <p className="text-xs tracking-widest">{chips}</p>}
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

/* ============================================
   COMPONENT: Featured Product Card
============================================ */
function FeaturedCard({ product }: FeaturedCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition">

      <div className="relative">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        )}

        <img src={product.img} alt={product.name} className="h-56 object-contain" />
      </div>

      {product.oldPrice ? (
        <div className="mt-3">
          <p className="text-gray-400 line-through">{product.oldPrice}</p>
          <p className="font-semibold">{product.price}</p>
        </div>
      ) : (
        <p className="mt-3 font-semibold">{product.price}</p>
      )}

      <h3 className="font-semibold mt-1">{product.name}</h3>
      <div className="flex justify-center mt-2 text-yellow-500">★★★★★</div>
    </div>
  );
}

/* ============================================
   COMPONENT: Discount Banner (FIXED SPACING)
============================================ */
function DiscountBanner() {
  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="w-full relative bg-gradient-to-r from-pink-500 to-pink-400 rounded-3xl flex items-center justify-between px-6 md:px-12 py-6 overflow-hidden shadow-xl">

        {/* GLOWING CIRCLES */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-40 h-40 bg-pink-300/40 blur-2xl rounded-full"></div>
        <div className="absolute left-20 top-10 w-28 h-28 bg-lime-200/40 blur-xl rounded-full"></div>

        {/* CURVED DIVIDER */}
        <div className="absolute left-1/3 top-0 h-full w-20 bg-white/10 rounded-full blur-xl"></div>

        {/* LEFT ICON */}
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 rounded-xl bg-lime-300 flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white text-4xl font-bold">%</span>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lime-100 drop-shadow">
              Get Extra 20% Off
            </h2>
            <p className="text-white text-sm opacity-90">On Your 1st App Order</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end z-10">
          <button className="bg-lime-200 text-black font-extrabold px-6 py-3 rounded-xl shadow hover:bg-lime-100 transition">
            USE CODE EXTRA20%
          </button>
          <span className="text-white text-[10px] mt-1 opacity-70">UP TO ₹300</span>
        </div>

        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="shine"></div>
        </div>
      </div>
      {/* VIDEO SECTION */}
<section className="w-full py-16">
<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">


{/* LEFT SIDE — VIDEO */}
<div className="relative w-full h-[38vh] md:h-[48vh] rounded-3xl overflow-hidden shadow-xl">
<video
className="w-full h-full object-cover"
src="/videos/skincare.mp4"
autoPlay
muted
loop
></video>


{/* Play Button */}
<button className="absolute inset-0 flex items-center justify-center">
<div className="w-20 h-20 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="45" height="45">
<path d="M8 5v14l11-7z" />
</svg>
</div>
</button>
</div>


{/* RIGHT SIDE — TEXT */}
<div className="pr-6">
<p className="uppercase tracking-widest text-gray-400 text-sm mb-2">Special Offer</p>
<h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
Beauty Inspired By <br /> Real Life
</h2>
<p className="text-gray-600 text-lg leading-relaxed mb-6">
Our company introduced a new regime and expertise, to enhance your natural beauty. Bringing among all gentle care and dedication.
</p>


<button className="bg-pink-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-pink-700 transition font-semibold text-lg">
Shop Now
</button>
</div>
</div>
</section>
 
 {/* TESTIMONIALS */}
<section className="mt-16 px-4 md:px-8">
<h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>


<Swiper
modules={[Autoplay, Pagination]}
autoplay={{ delay: 4500 }}
pagination={{ clickable: true }}
loop={true}
spaceBetween={24}
slidesPerView={1}
breakpoints={{
640: { slidesPerView: 2 },
1024: { slidesPerView: 3 },
}}
className="px-2"
>
{[
{
name: 'Asha R.',
role: 'Verified Buyer',
text: "I noticed a visible glow in two weeks — the serum is lightweight and non-greasy. Highly recommend!",
avatar: '/avatars/asha.jpg',
rating: 5,
},
{
name: 'Kiran M.',
role: 'Regular Customer',
text: "Packaging felt premium and the cleanser removed impurities without drying my skin. Will repurchase.",
avatar: '/avatars/kiran.jpg',
rating: 5,
},
{
name: 'Priya S.',
role: 'First-time Buyer',
text: "My skin has never felt softer. The moisturizer absorbed quickly and didn't clog pores.",
avatar: '/avatars/priya.jpg',
rating: 5,
},
].map((t, i) => (
<SwiperSlide key={i}>
<article className="fade-left bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between transform transition duration-500 hover:scale-105">
<div>
<div className="mb-4 text-pink-600 text-3xl">“</div>
<p className="text-gray-700 text-base md:text-lg leading-relaxed">{t.text}</p>
</div>


<div className="mt-6 flex items-center gap-4">
<img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
<div>
<p className="font-semibold">{t.name}</p>
<p className="text-sm text-gray-400">{t.role}</p>
<div className="text-yellow-400 mt-1">★★★★★</div>
</div>
</div>
</article>
</SwiperSlide>
))}
</Swiper>
</section>
      <style>{`
        .shine {
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shineAnim 3s infinite;
        }

        @keyframes shineAnim {
          0% { left: -150%; }
          70% { left: 150%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
}
