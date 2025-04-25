import "./App.css";
import BurgerList from "../burguers/burgerList";
import Cart from "./cart";
import React, { useState } from "react";
import DrinkList from "../burguers/drinkList";
import IsStoreOpen from "../public/openTime";

//função de adicionar itens ao carrinho
const AddOnCart = (burger, setCart) => {
  //formatação do preço para incluir a vírgula(",")
  const formattedItem = {
    ...burger,
    quantity: 1,
    price: parseFloat(burger.price.replace(",", ".")),
    formattedPrice: `R$${burger.price}`,
  };

  //adiciona um à quantidade de itens no carrinho, se já houver, é acrescentado mais um
  setCart((prevCart) => {
    //verifica se o item clicado já está no carrinho por meio do id
    const existingItem = prevCart.find((item) => item.id === burger.id);
    //se for verdadeiro, é adicionado mais um no carrinho
    if (existingItem) {
      return prevCart.map((item) =>
        item.id === burger.id
          ? { ...item, quantity: item.quantity + 1 }
          : //caso não, é adicionado o primeiro
            item
      );
    }
    //retorna o carrinho com os novos itens/preço formatado
    return [...prevCart, formattedItem];
  });
};

//função para adicionar um na quantidade do item no carrinho por meio do botão
function incrementItem(id, setCart) {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
}

//similar ao de adicionar, porém reduzindo um na quantidade
function decreaseItem(id, setCart) {
  setCart((prevCart) => {
    return prevCart.map((item) => {
      if (item.id === id) {
        //validação para não ser possível ir além do 0, caso a quantidade for menor que zero, exibe um alerta e é adicionado mais 1 na quantidade
        if (item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          alert("Não é possível subtrair de zero!");
          return { ...item, quantity: item.quantity + 1 };
        }
      }
      return item;
    });
  });
}

function App() {
  const [cart, setCart] = useState([]);

  //"remove" os itens do carrinho por meio de um filtro
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
      <nav>
        {/*todas as funções do carrinho ficam nessa tag*/}
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          incrementItem={(id) => incrementItem(id, setCart)}
          decreaseItem={(id) => decreaseItem(id, setCart)}
        />
      </nav>
      <div className="flex justify-center flex-col items-center w-screen h-104 bg-[url(../imagens/bg.png)] text-white">
        <h1 className="font-extrabold my-10 text-xl">Hamburgui</h1>
        <p>Rua TakakinaVara, 87, Centro</p>
        <IsStoreOpen />
      </div>
      <div className="flex flex-col items-center justify-center w-screen my-10">
        <h1 className="font-bold text-3xl my-4">Conheça nosso menu!</h1>
        <div className="w-screen">
          {" "}
          <h1 className="font-semibold text-3xl text-center mt-10 mb-2">
            Lanches
          </h1>
          <BurgerList addToCart={(burger) => AddOnCart(burger, setCart)} />
        </div>
        <div className="w-screen">
          {" "}
          <h1 className="font-semibold text-3xl text-center mt-10 mb-2">
            Bebidas
          </h1>
          <DrinkList addToCart={(drink) => AddOnCart(drink, setCart)} />
        </div>
      </div>
    </>
  );
}

export default App;
