import './App.css'
import BurgerList from '../burguers/burgerList'
import Cart from './cart'
import React, { useState } from 'react';

const AddOnCart = (burger, setCart) => {
  const formattedItem = {
    ...burger,
    quantity: 1,
    price: parseFloat(burger.price.replace(",", ".")),
    formattedPrice: `R$${burger.price}`,
  };

  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === burger.id);
    if (existingItem) {
      return prevCart.map((item) =>
      item.id === burger.id
    ? {...item, quantity: item.quantity + 1 }
  : item
      );
    }
    return [...prevCart, formattedItem];
  });
};

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
    <nav>
      <Cart cart={cart} />
    </nav>
    <div className='flex justify-center flex-col items-center m-auto w-screen h-104 bg-[url(../imagens/bg.png)] text-white'>
    <h1 className='font-extrabold my-10 text-xl'>Hamburgui</h1>
    <p>Rua TakakinaVara, 87, Centro</p>
    <div className='bg-emerald-400 p-3 rounded-2xl my-10'>
      <h3>Seg à Sab - 18h às 23h </h3>
    </div>
    </div>
    <div className='flex flex-col items-center justify-center w-screen my-10'>
      <h1 className='font-bold text-3xl my-4'>Conheça nosso menu!</h1>
        <div className='w-screen'> <h1 className='font-semibold text-3xl text-center mt-10 mb-2'>Lanches</h1>
          <BurgerList addToCart={(burger) => AddOnCart(burger, setCart)} />
        </div>
        <div className='w-screen'> <h1 className='font-semibold text-3xl text-center mt-10 mb-2'>Bebidas</h1>
          <BurgerList addToCart={(burger) => AddOnCart(burger, setCart)} />
        </div>
    </div>
    </>
  )
}

export default App
