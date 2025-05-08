import { CreditCard, MapPinCheck, QrCode } from "lucide-react";
import React, { useContext } from "react";
import { FormContext } from "../../components/formContext"; // Importe o FormContext, não o FormProvider

function PaymentForm() {
  const { formData, updateFormData, errors } = useContext(FormContext); // Use o FormContext correto

  const handlePaymentChange = (event) => {
    updateFormData({ payment: event.target.value });
  };

  return (
    <fieldset className="my-1">
      <legend className="font-bold text-md mb-5">Forma de pagamento</legend>
      <div className="md:mx-5 mx-1 font-semibold flex flex-col md:gap-5 gap-3">
        <div>
          <input
            type="radio"
            name="payment"
            value="pix"
            id="pix"
            checked={formData.payment === "pix"}
            onChange={handlePaymentChange}
            className="hidden peer"
          />
          <label
            htmlFor="pix"
            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <span className="ml-2">Pix</span>
            {formData.payment === "pix" && (
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
            checked={formData.payment === "card"}
            onChange={handlePaymentChange}
            className="hidden peer"
          />
          <label
            htmlFor="card"
            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <span className="ml-2">Cartão</span>
            {formData.payment === "card" && (
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
            checked={formData.payment === "local"}
            onChange={handlePaymentChange}
            className="hidden peer"
          />
          <label
            htmlFor="local"
            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <span className="ml-2">No local</span>
            {formData.payment === "local" && (
              <MapPinCheck className="text-emerald-500 w-7 h-7" />
            )}
          </label>
        </div>
        {errors.payment && <p className="text-red-500">{errors.payment}</p>}
      </div>
    </fieldset>
  );
}

export default PaymentForm;
