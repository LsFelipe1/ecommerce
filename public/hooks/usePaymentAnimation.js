import { useState } from "react";

export function usePaymentAnimation({
  animationDuration = 500,
  onPaymentConfirmed = () => {},
} = {}) {
  const [paid, setPaid] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handlePayment = () => {
    setButtonClicked(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setButtonClicked(false);
      setPaid(true);
      setIsTransitioning(false);
      onPaymentConfirmed();
    }, animationDuration);
  };

  return {
    paid,
    isTransitioning,
    buttonClicked,
    handlePayment,
  };
}
