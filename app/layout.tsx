import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KayaEssence – Beauty & Skincare",
  description: "Spotless beauty for your healthy skin with KayaEssence",
};

// Navbar Component
function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white py-3 px-6 shadow-sm">
      <div className="flex items-center gap-12">
        <Link href="/" className="block">
          <span
            className="text-pink-600 text-4xl font-bold tracking-wider"
            style={{ fontFamily: "Kapakana, sans-serif" }}
          >
            KAYAESSENCE
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-lg">
          <Link href="/categories" className="font-semibold text-black hover:text-pink-600">
            Categories
          </Link>
          <Link href="/brands" className="font-semibold text-black hover:text-pink-600">
            Brands
          </Link>
          <Link href="/luxe" className="font-semibold text-black hover:text-pink-600">
            Luxe
          </Link>
          <Link href="/fashion" className="font-semibold text-black hover:text-pink-600">
            KayaEssence Fashion
          </Link>
          <Link href="/beauty-advice" className="font-semibold text-black hover:text-pink-600">
            Beauty Advice
          </Link>
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search on KayaEssence"
          className="px-4 py-2 rounded border border-gray-300 outline-none w-60"
        />
        <button className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-pink-700 transition">
          Sign in
        </button>

        <Link href="/cart" className="ml-2">
          <span className="inline-block text-2xl text-gray-700">&#128722;</span>
        </Link>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4">KayaEssence</h3>
          <p className="text-gray-400">
            Spotless beauty for your healthy skin. Pamper yourself with our skincare and beauty products.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/categories/skincare" className="hover:text-pink-500">Skincare</Link></li>
            <li><Link href="/categories/makeup" className="hover:text-pink-500">Makeup</Link></li>
            <li><Link href="/categories/perfumes" className="hover:text-pink-500">Perfumes</Link></li>
            <li><Link href="/categories/best-sellers" className="hover:text-pink-500">Best Sellers</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/about" className="hover:text-pink-500">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-pink-500">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-pink-500">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-pink-500">Contact</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#" className="hover:text-pink-500">Instagram</Link></li>
            <li><Link href="#" className="hover:text-pink-500">Facebook</Link></li>
            <li><Link href="#" className="hover:text-pink-500">Twitter</Link></li>
            <li><Link href="#" className="hover:text-pink-500">YouTube</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} KayaEssence. All rights reserved.
      </div>
    </footer>
  );
}

// Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
