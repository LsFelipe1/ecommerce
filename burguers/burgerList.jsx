import AddOnCart from "../src/AddOnCart";
import burgers from "./burger";
import { ShoppingCart } from 'lucide-react';

function BurgerList() {
    return (
        <div className="grid grid-cols-2 gap-6 px-50">
        {burgers.map(burger => (
            <div className="flex bg-amber-300 min-w-70 flex-row rounded-sm my-4 shadow-sm" key={burger.id}>
                <div>
                <img className="rounded-2xl" src={burger.image} alt={burger.name} />
                </div>
                <div className="">
                <h2 className="font-extrabold text-2xl my-6">{burger.name}</h2>
                <p>{burger.description}</p>
                <p className="font-semibold my-5">Preço: R${burger.price}</p>
                <button className="flex items-end bg-black py-1 px-4 rounded-2xl cursor-pointer text-white" onClick={() => addToCart(burger)}><ShoppingCart /></button>
            </div>
            </div>
        ))}
    </div>
    );
}

export default BurgerList