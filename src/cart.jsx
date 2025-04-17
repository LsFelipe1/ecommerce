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
    <div className="flex flex-col">
    <ShoppingBasket />
    <BurgerList addToCart={addToCart} />
    <AddOnCart cart={cart} setCart={setCart}/>
    </div>
    </>
    )
};

export default Cart