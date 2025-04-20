import { CircleMinus, CirclePlus, ShoppingBasket, Trash2, TrashIcon } from "lucide-react";
import { useState } from "react";
import React from "react";

function Cart ({ cart }) {

    return (
    <>
    <div className="flex p-2 rounded-tl-2xl text-center overflow-auto bg-gray-200 border-2 border-red-300 fixed right-0 flex-col w-115 h-500">
    <button className="bg-gray-400 cursor-pointer max-w-fit p-2 rounded-xl">
        <ShoppingBasket className="scale-120" />
        </button>
    <h2 className="font-bold text-2xl">Carrinho</h2>
    {cart.length === 0 ? (
        <p className="font-extrabold">O carrinho está vazio.</p>
    ) : (<ul>
        {cart.map((burger) => (
            <div className="flex justify-start items-center gap-2 my-3 bg-white shadow-md p-2 rounded-xl max-h-100 hover:bg-fuchsia-100 trasition duration-350 ease-in-out">
                <img className="rounded-sm max-w-40 max-h-40" src={burger.image} alt={burger.name} />
                <li className="my-6" key={burger.id}>
                    <div>
                    <div className="grow">
                        <div className="flex justify-between font-bold"> {/*Tittle & Price*/}
                        <h1>{burger.name}</h1>
                        <p>R${(burger.price * burger.quantity).toFixed(2)}</p>
                        </div>

                        <div className="text-start my-2.5"> {/*Description*/}
                            <p>{burger.description}</p>
                        </div>
                        <div  className="flex justify-between"> {/*Quantity & delete*/}
                            <div className="flex gap-2">
                                <CircleMinus className="hover:scale-110" />
                                <span className="font-semibold">{burger.quantity}</span>
                                <CirclePlus className="hover:scale-110" />
                            </div>
                            <Trash2 className="text-black hover:scale-110 hover:text-red-500" />
                        </div>
                    </div>
                    </div>
                </li>
                </div>
            ))}
        <li className="my-20">
            <span className="font-extrabold text-2xl">Total: </span>
            <span className="font-bold text-2xl">
                R$ {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
        </li>
        <button className="bg-green-500 text-amber-50 font-bold text-xl border-2 border-gray-500 hover:bg-emerald-600 p-5 rounded-3xl transition duration-300 ease-in-out">Finalizar Pagamento</button>
    </ul>)}
    </div>
    </>
    );
};

export default Cart