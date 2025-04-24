import React from "react";
import burgers from "./burger";
import { ShoppingCart } from "lucide-react";

//função para exibir os hambúrgues na página através de um array onde os itens são inseridos de forma "automática"
function BurgerList({ addToCart }) {
  return (
    <div className="grid grid-cols-2 gap-6 px-50">
      {burgers.map((burger /*busca os itens no array*/) => (
        <div
          className="flex items-center gap-5 md:font-mono bg-white min-w-70 max-h-80 flex-row rounded-xl my-4 shadow-sm"
          key={burger.id}
        >
          {" "}
          {/*cada div possui uma chave igual ao id do item*/}
          <div>
            <img
              className="rounded-2xl min-w-60 min-h-60"
              src={burger.image}
              alt={burger.name}
            />
          </div>
          <div className="">
            <h2 className="font-extrabold text-2xl my-6">{burger.name}</h2>
            <p>{burger.description}</p>
            <p className="font-semibold my-5">R${burger.price}</p>
            <div className="flex h-20 justify-end">
              <button
                className="flex max-h-8 bg-black py-1 px-4 rounded-2xl cursor-pointer text-white shadow-2xl transition duration-500 ease-in-out hover:bg-gray-300 hover:scale-120 hover:text-black "
                onClick={() => addToCart(burger)}
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

export default BurgerList;
