import React from "react";
import drink from "./drink";
import { ShoppingCart } from "lucide-react";

//função para exibir as bebidas na página através de um array onde os itens são inseridos de forma "automática"
function DrinkList({ addToCart }) {
  return (
    <div className="grid grid-cols-2 gap-6 px-50">
      {drink.map((drink /*busca os itens no array*/) => (
        <div
          className="flex items-center gap-5 md:font-mono bg-white min-w-70 flex-row rounded-xl my-4 shadow-sm"
          key={drink.id}
        >
          {" "}
          {/*cada div possui uma chave igual ao id do item*/}
          <div>
            <img
              className="rounded-2xl max-w-70 max-h-40"
              src={drink.image}
              alt={drink.name}
            />
          </div>
          <div className="">
            <h2 className="font-extrabold text-2xl my-6">{drink.name}</h2>
            <p>{drink.description}</p>
            <div className="flex justify-between w-135 items-center">
              <p className="font-semibold my-5">R${drink.price}</p>
              <button
                className="flex max-h-8 bg-black py-1 px-4 rounded-2xl cursor-pointer text-white shadow-2xl transition-all duration-500 ease-in-out hover:bg-gray-300 hover:scale-120 hover:text-black "
                onClick={() => addToCart(drink)}
              >
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DrinkList;
