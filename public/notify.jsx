import React from "react";

export default function Notify({ cart, className = "" }) {
  if (cart.length === 0) return null;

  return (
    <span
      className={`absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${className} transition-all duration-300 ${
        cart.length > 0 ? "scale-100" : "scale-0"
      }`}
    >
      {cart.length}
    </span>
  );
}
