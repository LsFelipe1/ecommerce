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
      <fieldset className="my-1">
        <legend className="font-bold text-md mb-5">Forma de pagamento</legend>
        <div className="md:mx-5 mx-1 font-semibold flex flex-col md:gap-5 gap-3">
          <div>
            <input
              type="radio"
              name="payment"
              value="pix"
              id="pix"
              checked={paymentMethod === "pix"}
              onChange={handlePaymentChange}
              className="hidden peer"
            />
            <label
              htmlFor="pix"
              className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-emerald-600  peer-checked:text-emerald-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="ml-2">Pix</span>{" "}
              {paymentMethod === "pix" && (
                <QrCode className="text-emerald-500 w-7 h-7" />
              )}
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="payment"
              value="card"
              id="card"
              checked={paymentMethod === "card"}
              onChange={handlePaymentChange}
              className="hidden peer"
            />
            <label
              htmlFor="card"
              className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-emerald-600  peer-checked:text-emerald-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="ml-2">Cartão</span>{" "}
              {paymentMethod === "card" && (
                <CreditCard className="text-emerald-500 w-7 h-7" />
              )}
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="payment"
              value="local"
              id="local"
              checked={paymentMethod === "local"}
              onChange={handlePaymentChange}
              className="hidden peer"
            />
            <label
              htmlFor="local"
              className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-emerald-600  peer-checked:text-emerald-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="ml-2">No local</span>{" "}
              {paymentMethod === "local" && (
                <MapPinCheck className="text-emerald-500 w-7 h-7" />
              )}
            </label>
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default PaymentForm;
