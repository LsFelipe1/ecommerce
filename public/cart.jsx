import {
  ChevronLast,
  CircleMinus,
  CirclePlus,
  Frown,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreOpen } from "./openTime";
import DiscountInput from "./voucher";

function Cart({
  cart,
  removeFromCart,
  incrementItem,
  decreaseItem,
  discount,
  applyDiscount,
  expanded,
  setExpanded,
}) {
  const isOpen = useStoreOpen(); //verifica se a loja está aberta ou fechada

  //calcula o total do carrinho
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
  // Aplica o desconto e evita valores negativos
  const discountedTotal = Math.max(0, total - discount + 5);

  //salva o carrinho e o total no sessionStorage quando o carrinho é atualizado
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
      sessionStorage.setItem("total", discountedTotal);
    } else {
      // remove o carrinho e o total do sessionStorage se o carrinho estiver vazio
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("total");
    }
  }, [cart, discountedTotal]);

  const handleLinkClick = (e) => {
    if (!isOpen) {
      e.preventDefault(); // impede a navegação se a loja estiver fechada
      alert("A loja está fechada no momento. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div
        className={`fixed right-0 top-14 flex flex-col bg-white shadow-lg w-[340px] xl:w-[500px] h-screen transition-all duration-300 ${
          expanded ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Barra superior com ícone de fechar */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
          <button
            onClick={() => setExpanded(false)}
            className="text-gray-600 hover:text-red-500 hover:scale-105 transition-all duration-300"
          >
            <ChevronLast size={24} />
          </button>
          <h2 className="text-lg font-semibold">Carrinho</h2>
        </div>

        {/* Conteúdo do carrinho */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <Frown size={40} />
              <p className="mt-4 text-sm">Seu carrinho está vazio.</p>
              <p className="text-xs">Adicione itens para continuar.</p>
            </div>
          ) : (
            <ul>
              <div className="overflow-y-scroll xl:overflow-x-hidden overflow-x-scroll max-h-70 2xl:max-h-90">
                {cart.map((burger) => (
                  <div className="flex flex-col md:flex-row justify-start items-center gap-2 2xl:my-1 my-0 bg-white shadow-md p-2 rounded-xl max-h-100 hover:bg-fuchsia-100 hover:scale-102 trasition duration-350 ease-in-out">
                    <img
                      className="rounded-sm max-w-20 max-h-20"
                      src={burger.image}
                      alt={burger.name}
                    />
                    <li className="my-2" key={burger.id}>
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
              <div className="md:absolute relative bottom-10 xl:right-0 xl:w-125 bg-zinc-100 border-t 2xl:top-112">
                <li className="2xl:my-6 my-5 flex flex-col justify-between gap-2 bg-zinc-200 shadow-md p-2 rounded-xl">
                  <div className="flex justify-between">
                    <span className="font-extrabold text-2xl">Itens: </span>
                    <span className="font-bold text-xl">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    {/*faz o calculo do preço dos itens*/}
                    <span className="font-light text-zinc-600 text-md">
                      Subtotal:{" "}
                    </span>
                    <span className="font-extralight text-zinc-600 text-md">
                      R$ {total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-extrabold text-2xl">Frete: </span>
                    <span className="font-bold text-xl">R$ 5,00</span>
                  </div>
                  <div>
                    {discount > 0 && (
                      <div className="text-green-600 flex justify-between">
                        <span> Desconto: </span>
                        <span>R${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    {/*faz o calculo do preço dos itens*/}
                    <span className="font-extrabold text-2xl">Total: </span>
                    <span className="font-bold text-xl">
                      R${discountedTotal.toFixed(2)} {/* Inclui frete */}{" "}
                    </span>
                  </div>
                </li>
                {/*verifica se a loja está aberta ou fechada*/}
                <div className="flex justify-center text-center">
                  <Link
                    //link que leva à página de pagamento
                    to="/payout/delivery"
                    state={{ cart, discountedTotal }}
                    onClick={handleLinkClick}
                    className={`block p-2 rounded-xl md:rounded-md font-bold text-base md:text-xl border-2 w-50 transition duration-300 ease-in-out ${
                      isOpen
                        ? "bg-green-500 text-amber-50 hover:bg-emerald-600"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    {isOpen ? "Finalizar Pedido" : "Loja Fechada"}
                  </Link>
                </div>
                <DiscountInput applyDiscount={applyDiscount} />
              </div>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
