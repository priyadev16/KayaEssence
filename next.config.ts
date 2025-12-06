/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash
      { protocol: "https", hostname: "images.unsplash.com" },

      // Shopify
      { protocol: "https", hostname: "cdn.shopify.com" },

      // RackCDN
      {
        protocol: "https",
        hostname:
          "3bc01d2807fb1bc0d25c-a86d2521f1af8989841b9619f5314be5.ssl.cf1.rackcdn.com",
      },

      // User avatars
      { protocol: "https", hostname: "randomuser.me" },

      // Placeholder
      { protocol: "https", hostname: "via.placeholder.com" },

      // Pinterest
      { protocol: "https", hostname: "i.pinimg.com" },

      // Amazon images
      { protocol: "https", hostname: "m.media-amazon.com" },

      // Beauty magazines
      { protocol: "https", hostname: "media.allure.com" },

      // W3Schools (your lipstick image)
      {
        protocol: "https",
        hostname: "www.w3schools.com",
        pathname: "/w3images/**",
      },

      // Optional fallback
      { protocol: "https", hostname: "example.com" },
    ],
  },
};

module.exports = nextConfig;
