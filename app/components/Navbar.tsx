"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBell, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [notifications, setNotifications] = useState(2); // Default notifications
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 🔥 FIXED: Real-time auth checking
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      const cart = localStorage.getItem('cartCount');
      
      console.log("🔍 Navbar checking auth:", { hasToken: !!token, hasUser: !!userData }); // Debug
      
      if (token) {
        setIsLoggedIn(true);
        if (userData) {
          setUser(JSON.parse(userData));
        }
        if (cart) {
          setCartCount(parseInt(cart) || 0);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // Check immediately
    checkAuthStatus();

    // 🔥 LISTEN FOR STORAGE CHANGES (multi-tab + instant updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'user' || e.key === 'cartCount') {
        console.log("🔄 Storage changed:", e.key);
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 🔥 CHECK EVERY 500ms for instant updates (critical fix)
    const interval = setInterval(checkAuthStatus, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cartCount');
    setIsLoggedIn(false);
    setUser(null);
    setCartCount(0);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const handleAddToCart = () => {
    const newCount = cartCount + 1;
    setCartCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());
    toast.success("Added to cart!");
  };

  console.log("🎨 Navbar rendering:", { isLoggedIn, userName: user?.name, cartCount }); // Debug

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-pink-600 text-4xl font-bold hover:scale-105 transition-transform">
          KAYAESSENCE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/categories" className="hover:text-pink-600 transition-all">Categories</Link>
          <Link href="/brands" className="hover:text-pink-600 transition-all">Brands</Link>
          <Link href="/luxe" className="hover:text-pink-600 transition-all">Luxe</Link>
          <Link href="/fashion" className="hover:text-pink-600 transition-all">Fashion</Link>
          <Link href="/beauty-advice" className="hover:text-pink-600 transition-all">Beauty Advice</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-700 text-2xl hover:text-pink-600 transition" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* 🔥 RIGHT SIDE - REAL E-COMMERCE STYLE */}
        <div className="flex items-center gap-3 md:gap-4">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
            >
              Sign In
            </Link>
          ) : (
            <>
              {/* 🔔 NOTIFICATION ICON */}
              <div className="relative group cursor-pointer hover:scale-110 transition-transform">
                <FaBell size={24} className="text-gray-700 hover:text-pink-600 transition-all" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse shadow-sm border-2 border-white">
                    {notifications}
                  </span>
                )}
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-3">
                  <p className="font-semibold text-sm mb-2">Notifications</p>
                  <p className="text-xs text-gray-500">2 new offers available</p>
                </div>
              </div>

              {/* 👤 USER PROFILE ICON */}
              <div className="relative group cursor-pointer hover:scale-110 transition-transform">
                <FaUserCircle size={32} className="text-gray-700 hover:text-pink-600 transition-all" title={user?.name} />
                {user && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 transition">Profile</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 transition">Orders</Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 🛒 CART ICON - E-COMMERCE STYLE */}
          <div className="relative group cursor-pointer hover:scale-110 transition-transform">
            <FaShoppingCart size={24} className="text-gray-700 hover:text-pink-600 transition-all" onClick={handleAddToCart} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-4">
              <p className="font-semibold mb-2">Shopping Cart ({cartCount})</p>
              <p className="text-sm text-gray-500">No items yet. Add some products!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg border-t px-6 py-4 flex flex-col gap-3">
          <Link href="/categories" className="hover:text-pink-600 py-2 transition" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
          <Link href="/brands" className="hover:text-pink-600 py-2 transition" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
          <Link href="/luxe" className="hover:text-pink-600 py-2 transition" onClick={() => setMobileMenuOpen(false)}>Luxe</Link>
          <Link href="/fashion" className="hover:text-pink-600 py-2 transition" onClick={() => setMobileMenuOpen(false)}>Fashion</Link>
          {isLoggedIn && (
            <>
              <Link href="/profile" className="hover:text-pink-600 py-2 transition" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-red-600 hover:text-red-700 py-2 transition text-left">
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
