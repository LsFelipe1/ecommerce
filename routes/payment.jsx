import { useContext } from "react";
import { FormContext } from "../components/formContext";
import CreditCardPayment from "../public/paymentRoutes/creditCard";
import LocalPayment from "../public/paymentRoutes/local";
import PixPayment from "../public/paymentRoutes/pix";

function Payment() {
  const { validateForm, formData } = useContext(FormContext);
  const payment = formData.payment;

  if (payment === "card") {
    return <CreditCardPayment />;
  }

  if (payment === "pix") {
    return <PixPayment />;
  }
  if (payment === "local") {
    return <LocalPayment />;
  }

  return (
    <>
      <h1>Error</h1>
    </>
  );
}

export default Payment;
