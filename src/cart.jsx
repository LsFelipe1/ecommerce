import {
  ChevronLast,
  CircleMinus,
  CirclePlus,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import Notify from "../public/notify";
import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, incrementItem, decreaseItem }) {
  const [expanded, setExpanded] = useState(true);

  //calcula o total do carrinho
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  //salva o carrinho e o total no sessionStorage quando o carrinho é atualizado
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
      sessionStorage.setItem("total", total);
    } else {
      // remove o carrinho e o total do sessionStorage se o carrinho estiver vazio
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("total");
    }
  }, [cart, total]);

  return (
    <>
      <div
        className={`flex p-2 rounded-tl-2xl text-center overflow-auto opacity-97 border-2 fixed right-0 flex-col transition-all duration-400 ${
          expanded
            ? "w-80 h-205 xl:w-115 md:h-500 bg-zinc-300 md:bg-zinc-100"
            : "overflow-hidden w-15 h-25 bg-transparent border-none"
        }`}
      >
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="relative bg-gray-400 cursor-pointer max-w-fit flex flex-col-reverse p-2 max-h-fit rounded-xl text-white transition duration-500 hover:scale-110 hover:bg-gray-100 hover:text-black hover:border hover:border-black"
        >
          {expanded ? <ChevronLast /> : <ShoppingBasket />}
          {/* Notificação posicionada no canto superior direito */}
          {!expanded && <Notify cart={cart} />}
        </button>
        <div className={`${expanded ? "" : "hidden"}`}>
          <h2 className="font-bold text-2xl">Carrinho</h2>
          {cart.length === 0 ? (
            <p className="font-extrabold">O carrinho está vazio.</p>
          ) : (
            <ul>
              <div className="overflow-y-scroll overflow-x-hidden max-h-110">
                {cart.map((burger) => (
                  <div className="flex flex-col md:flex-row justify-start items-center gap-2 my-3 bg-white shadow-md p-2 rounded-xl max-h-100 hover:bg-fuchsia-100 hover:scale-102 trasition duration-350 ease-in-out">
                    <img
                      className="rounded-sm max-w-40 max-h-40"
                      src={burger.image}
                      alt={burger.name}
                    />
                    <li className="my-6" key={burger.id}>
                      <div>
                        <div className="grow">
                          <div className="flex justify-between font-bold">
                            {" "}
                            {/*título & Preço*/}
                            <h1>{burger.name}</h1>
                            <p>
                              R${(burger.price * burger.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="text-start my-2.5">
                            {" "}
                            {/*descrição*/}
                            <p>{burger.description}</p>
                          </div>
                          <div className="flex justify-between">
                            {" "}
                            {/*alterar quantidade & deletar*/}
                            <div className="flex gap-2">
                              <CircleMinus
                                onClick={() => decreaseItem(burger.id)}
                                className="hover:scale-110"
                              />
                              <span className="font-semibold">
                                {burger.quantity}
                              </span>
                              <CirclePlus
                                onClick={() => incrementItem(burger.id)}
                                className="hover:scale-110"
                              />
                            </div>
                            <Trash2
                              onClick={() => removeFromCart(burger.id)}
                              className="text-black hover:scale-110 hover:text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
              </div>
              <li className="my-20">
                {/*faz o calculo do preço dos itens*/}
                <span className="font-extrabold text-2xl">Total: </span>
                <span className="font-bold text-2xl">
                  R${" "}
                  {cart
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </li>
              <Link
                to="/payout/delivery"
                state={{
                  cart,
                  total: cart
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2),
                }} //passa o carrinho para a próxima página
                className="bg-green-500 text-amber-50 font-bold text-base xl:text-xl border-2 border-gray-500 hover:bg-emerald-600 p-2 xl:p-5 rounded-xl xl:rounded-3xl transition duration-300 ease-in-out"
              >
                Finalizar Pedido
              </Link>
              {/*link que leva à página de pagamento*/}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
