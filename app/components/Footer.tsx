export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">KayaEssence</h3>
          <p className="text-gray-400">
            Premium skincare, makeup, and wellness products delivered to your door.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/categories/skincare" className="hover:text-pink-500 transition">Skincare</a></li>
            <li><a href="/categories/makeup" className="hover:text-pink-500 transition">Makeup</a></li>
            <li><a href="/categories/perfumes" className="hover:text-pink-500 transition">Perfumes</a></li>
            <li><a href="/categories/best-sellers" className="hover:text-pink-500 transition">Best Sellers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/help" className="hover:text-pink-500 transition">Help Center</a></li>
            <li><a href="/shipping" className="hover:text-pink-500 transition">Shipping</a></li>
            <li><a href="/returns" className="hover:text-pink-500 transition">Returns</a></li>
            <li><a href="/contact" className="hover:text-pink-500 transition">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe to get the latest offers and products.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 p-3 rounded-l-xl outline-none border border-gray-700"/>
            <button className="bg-pink-600 px-4 py-3 rounded-r-xl hover:bg-pink-700 transition">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} KayaEssence. All rights reserved.
      </div>
    </footer>
  );
}
