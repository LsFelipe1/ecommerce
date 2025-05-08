import {
  ChevronLast,
  CircleMinus,
  CirclePlus,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import Notify from "./notify";
import { Link } from "react-router-dom";
import { useStoreOpen } from "./openTime";

function Cart({ cart, removeFromCart, incrementItem, decreaseItem }) {
  const [expanded, setExpanded] = useState(true);
  const isOpen = useStoreOpen(); //verifica se a loja está aberta ou fechada

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

  const handleLinkClick = (e) => {
    if (!isOpen) {
      e.preventDefault(); // impede a navegação se a loja estiver fechada
      alert("A loja está fechada no momento. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div
        className={`flex p-2 rounded-tl-2xl text-center overflow-hidden opacity-97 border-2 fixed right-0 flex-col transition-h duration-400 ${
          expanded
            ? "md:w-[30vw]  w-[70vw] max-w-[30rem] h-[100vh] bg-zinc-200 sm:bg-zinc-100"
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
              <div className="overflow-y-scroll xl:overflow-x-hidden overflow-x-scroll max-h-70 2xl:max-h-110">
                {cart.map((burger) => (
                  <div className="flex flex-col md:flex-row justify-start items-center gap-2 2xl:my-2 my-0 bg-white shadow-md p-2 rounded-xl max-h-100 hover:bg-fuchsia-100 hover:scale-102 trasition duration-350 ease-in-out">
                    <img
                      className="rounded-sm max-w-40 max-h-40"
                      src={burger.image}
                      alt={burger.name}
                    />
                    <li className="my-5" key={burger.id}>
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
              <div className="md:absolute relative bottom-10 xl:right-0 2xl:top-166">
                <li className="2xl:my-20 my-5">
                  {/*faz o calculo do preço dos itens*/}
                  <span className="font-extrabold text-2xl">Total: </span>
                  <span className="font-bold text-2xl">
                    R${" "}
                    {cart
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </li>
                {/*verifica se a loja está aberta ou fechada*/}
                <Link
                  //link que leva à página de pagamento
                  to="/payout/delivery"
                  state={{ cart, total }}
                  onClick={handleLinkClick}
                  className={`block p-2 md:px-47 rounded-xl md:rounded-none font-bold text-base md:text-xl border-2 border-gray-500 transition duration-300 ease-in-out ${
                    isOpen
                      ? "bg-green-500 text-amber-50 hover:bg-emerald-600"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {isOpen ? "Finalizar Pedido" : "Loja Fechada"}
                </Link>
              </div>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
