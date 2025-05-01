import { useEffect, useState } from "react";

function OrderSummary() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("0.00");

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    const storedTotal = sessionStorage.getItem("total");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedTotal) {
      setTotal(storedTotal);
    }
  }, []);

  return (
    <>
      <span>
        {item.name} {item.quantity === 1 ? "" : `(x${item.quantity})`}
      </span>
    </>
  );
}

export default OrderSummary;
