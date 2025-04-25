import React from "react";
import burgers from "./burger";
import { ShoppingCart } from "lucide-react";

//função para exibir os hambúrgues na página através de um array onde os itens são inseridos de forma "automática"
function BurgerList({ addToCart }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-6 container mx-auto px-4 xs:px-6 sm:px-8">
      {burgers.map((burger /*busca os itens no array*/) => (
        <div
          className="flex items-center flex-col sm:flex-row gap-5 font-mono bg-white w-full min-h-fit max-h-80 rounded-xl my-4 p-2 shadow-sm"
          key={burger.id}
        >
          {" "}
          {/*cada div possui uma chave igual ao id do item*/}
          <div>
            <img
              className="rounded-2xl h-40 xs:h-48 sm:h-56 object-cover"
              src={burger.image}
              alt={burger.name}
            />
          </div>
          <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
            <h2 className="font-extrabold text-base xl:text-2xl xl:my-6">
              {burger.name}
            </h2>
            <p className="text-base">{burger.description}</p>
            <div className="flex justify-between items-center xm:justify-end">
              <p className="font-semibold xl:my-5">R${burger.price}</p>
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
