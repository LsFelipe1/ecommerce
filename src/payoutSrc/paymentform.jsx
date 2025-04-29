import { CreditCard, MapPinCheck, QrCode } from "lucide-react";
import React, { useState } from "react";

function PaymentForm() {
  //Estado para rastrear o método de pagamento selecionado
  const [paymentMethod, setPaymentMethod] = useState("");

  //função para atualizar o estado quando um "radio button" for selecionado
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      <fieldset className="my-10">
        <legend className="font-bold text-md mb-15">Forma de pagamento</legend>
        <div className="mx-5 font-semibold flex md:flex-col flex-row md:gap-5 gap-15">
          <label className="flex items-center gap-3 hover:bg-gray-100 transition-all duration-700 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="pix"
              checked={paymentMethod === "pix"}
              onChange={handlePaymentChange}
              className="text-emerald-500"
            />
            <span className="ml-2">Pix</span>{" "}
            {paymentMethod === "pix" && (
              <QrCode className="text-emerald-500 w-7 h-7" />
            )}
          </label>
          <label className="flex items-center gap-3 hover:bg-gray-100 transition-all duration-700 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={handlePaymentChange}
            />
            <span className="ml-2">Cartão</span>{" "}
            {paymentMethod === "card" && (
              <CreditCard className="text-emerald-500 w-7 h-7" />
            )}
          </label>
          <label className="flex items-center gap-3 hover:bg-gray-100 transition-all duration-700 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="local"
              checked={paymentMethod === "local"}
              onChange={handlePaymentChange}
            />
            <span className="ml-2">No local</span>{" "}
            {paymentMethod === "local" && (
              <MapPinCheck className="text-emerald-500 w-7 h-7" />
            )}
          </label>
        </div>
      </fieldset>
    </>
  );
}

export default PaymentForm;
