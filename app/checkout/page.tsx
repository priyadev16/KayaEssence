"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  // Use URL path for local image in public folder
  const product = {
    id: searchParams.get("id") || "1",
    name: searchParams.get("name") || "Premium Makeup Product",
    brand: searchParams.get("brand") || "Top Brand",
    price: Number(searchParams.get("price") || 1299),
    quantity: 1,
    image: searchParams.get("image") || "/images/lipstick.png", // ✅ public folder path
  };

  const [step, setStep] = useState<"form" | "summary">("form");

  // Shipping & payment states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleConfirmAddress = () => {
    if (!name || !email || !address || !city || !state || !zip) {
      toast.error("Please fill all shipping details!");
      return;
    }
    setStep("summary");
  };

  const handlePlaceOrder = () => {
    toast.success("✅ Your order has been successfully placed!");
    setStep("form");
    setName("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setPaymentMethod("card");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6 md:p-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {step === "form" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Address"
            className="w-full p-3 border rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="City"
              className="flex-1 p-3 border rounded-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              className="flex-1 p-3 border rounded-lg"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full md:w-32 p-3 border rounded-lg"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Payment Method</h2>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit / Debit Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            className="w-full py-4 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 mt-6"
            onClick={handleConfirmAddress}
          >
            Confirm Shipping & Payment
          </button>
        </div>
      )}

      {step === "summary" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="flex items-center gap-4 border-b pb-4">
            {/* ✅ Local image from public folder */}
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg object-cover border"
            />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <p className="text-lg font-bold mt-1">₹{product.price}</p>
              <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold">Subtotal</p>
            <p className="font-bold">₹{product.price * product.quantity}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Shipping</p>
            <p className="font-bold">₹50</p>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <p>Total</p>
            <p>₹{product.price * product.quantity + 50}</p>
          </div>

          <button
            className="w-full py-4 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 mt-6"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

          <button
            className="w-full py-3 text-gray-600 mt-2 hover:underline"
            onClick={() => setStep("form")}
          >
            ← Edit Shipping Details
          </button>
        </div>
      )}
    </div>
  );
}
