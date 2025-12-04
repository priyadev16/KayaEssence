import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
// import { UserProvider } from "../context/UserContext";

export const metadata = {
  title: "KayaEssence – Beauty & Skincare",
  description: "Spotless beauty for your healthy skin with KayaEssence",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased">
        {/* Wrap everything in UserProvider */}
        <UserProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
