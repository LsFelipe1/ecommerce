import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import BurgerList from "../burguers/burgerList";

import AddOnCart from "./AddOnCart";

const Cart = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (burguer) => {
        setCart((prevCart) => [...prevCart, burguer]);
    };

    return (
    <>
    <div className="flex text-center bg-amber-300 fixed right-0 flex-col w-85 h-500">
    <ShoppingBasket />
    <AddOnCart cart={cart} setCart={setCart}/>
    <h2 className="text-2xl flex justify-between">Total: $500</h2>
    </div>
    </>
    )
};

export default Cart