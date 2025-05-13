import { useState } from "react";

const validCoupons = [
  { code: "DESCONTO10", discount: 10 }, // R$10 de desconto
  { code: "PROMO20", discount: 20 }, // R$20 de desconto
  { code: "BURGER50", discount: 50 }, // R$50 de desconto
];

export default function DiscountInput({ applyDiscount }) {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const handleApplyCoupon = () => {
    const coupon = validCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (coupon) {
      applyDiscount(coupon.discount);
      setMessage(
        `Cupom ${coupon.code} aplicado! Desconto de R$${coupon.discount}`
      );
      setCouponCode("");
    } else {
      applyDiscount(0);
      setMessage("Cupom inválido. Tente novamente.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApplyCoupon();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <label
        htmlFor="coupon"
        className="block text-sm font-medium text-gray-700"
      >
        Inserir Cupom de Desconto
      </label>
      <div className="flex gap-2 mt-1">
        <input
          type="text"
          id="coupon"
          value={couponCode}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Ex: DESCONTO10"
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Aplicar
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("inválido") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
