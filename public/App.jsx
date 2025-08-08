import { useContext, useState } from "react";
import "./App.css";
import BurgerList from "../burguers/burgerList";
import Cart from "./cart";
import DrinkList from "../burguers/drinkList";
import IsStoreOpen from "../public/openTime";
import Notify from "./notify";
import SearchBar from "../src/payoutSrc/searchFilter";
import burgers from "../burguers/burger"; // Importe os dados
import drink from "../burguers/drink";
import {
  GlassWater,
  LogOut,
  PhoneCall,
  Pizza,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../backend/authContext";

// Funções de carrinho
const AddOnCart = (item, setCart) => {
  const parsedPrice = parseFloat(item.price.replace(",", ".")); // Converte "10,00" para 10.00
  const formattedItem = {
    ...item,
    quantity: 1,
    price: parsedPrice, // Armazena como número
    formattedPrice: `R$${parsedPrice.toFixed(2).replace(".", ",")}`, // Para exibição
  };
  setCart((prevCart) => {
    const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...prevCart, formattedItem];
  });
};

function incrementItem(id, setCart) {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
}

function decreaseItem(id, setCart) {
  setCart((prevCart) =>
    prevCart
      .map((item) => {
        if (item.id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0)
  );
}
function App() {
  const { user, logout } = useContext(AuthContext); // Obtém user e logout do AuthContext
  const [isOpenProfile, setIsOpenProfile] = useState(false); // Estado para abrir o perfil do usuário
  const [expanded, setExpanded] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState(""); // Estado para busca
  const [discount, setDiscount] = useState(0); // Estado para o desconto

  // Filtra hambúrgueres e bebidas com base no termo de busca
  const filteredBurgers = burgers.filter((burger) =>
    burger.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredDrinks = drink.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const applyDiscount = (discountValue) => {
    const numericDiscount = Number(discountValue); // Converte para número
    setDiscount(isNaN(numericDiscount) ? 0 : numericDiscount); // Fallback para 0 se NaN
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <nav className="flex justify-between items-center fixed bottom-0 2xl:bottom-[94%] md:bottom-[93%] w-screen py-2 px-7 bg-zinc-100 border-t xl:border-b">
        <div className="flex flex-row items-center justify-center gap-5">
          <a
            href="#burger"
            className="xl:text-xm xl:font-bold flex flex-col-reverse items-center hover:text-emerald-500 transition-all duration-300"
          >
            <span className="xl:text-xm text-sm">Lanches</span>
            <Pizza className="xl:hidden block" />
          </a>
          <a
            href="#drink"
            className="xl:text-xm xl:font-bold flex flex-col-reverse items-center hover:text-emerald-500 transition-all duration-300"
          >
            <span className="xl:text-xm text-sm">Bebidas</span>
            <GlassWater className="xl:hidden block" />
          </a>
          <a
            href="#contact"
            className="xl:text-xm xl:font-bold flex flex-col-reverse items-center hover:text-emerald-500 transition-all duration-300"
          >
            <span className="xl:text-xm text-sm">Contato</span>
            <PhoneCall className="xl:hidden block" />
          </a>
        </div>
        <SearchBar
          search={search}
          setSearch={setSearch}
          burgers={burgers}
          drinks={drink}
        />
        <div className="flex flex-row items-center justify-between w-40">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpenProfile((curr) => !curr)}
                className="flex items-center gap-2"
              >
                <UserRound
                  title="Perfil"
                  aria-label="Perfil"
                  className="p-1 rounded-3xl cursor-pointer hover:bg-zinc-200 scale-140 hover:text-emerald-500 hover:scale-160 transition-all duration-500"
                />
              </button>
              {isOpenProfile && (
                <div className="absolute md:top-8 top-[-10rem] right-0 bg-zinc-200 border border-gray-300 rounded-lg shadow-2xl py-4 w-[160px] text-center flex flex-col z-10">
                  <p className="text-sm py-2">Olá, {user.name}!</p>
                  <Link
                    to="/Profile"
                    onClick={() => setIsOpenProfile(false)} // Fecha o dropdown ao clicar no perfil
                    className="text-sm hover:bg-zinc-300 border-t-1 py-2 cursor-pointer"
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpenProfile(false); // Fecha o dropdown ao fazer logout
                    }}
                    className="text-sm justify-center flex gap-1 hover:bg-zinc-300 border-t-1 text-red-600 border-black py-2 cursor-pointer"
                  >
                    <LogOut size={20} /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/SingUp">
              <UserRound
                title="Perfil"
                aria-label="Perfil"
                className="p-1 rounded-3xl cursor-pointer hover:bg-zinc-200 scale-140 hover:text-emerald-500 hover:scale-160 transition-all duration-500"
              />
            </Link>
          )}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="relative hover:p-2 hover:bg-zinc-200 cursor-pointer p-2 rounded-xl text-black hover:scale-110 hover:text-emerald-500 transition-all duration-500"
          >
            <ShoppingBasket />
            <Notify cart={cart} />
            {cart.length > 0 && (
              <span
                title={`Total: R$ ${total}`} // Tooltip com o preço total
                className="absolute -top-2 -right-6 bg-gray-800 text-white text-xs font-bold rounded px-1 py-0.5"
              ></span>
            )}
          </button>
        </div>{" "}
      </nav>
      <Cart
        cart={cart}
        setCart={setCart} // Passa setCart como prop
        removeFromCart={removeFromCart}
        incrementItem={(id) => incrementItem(id, setCart)} // Passa setCart para a função
        decreaseItem={(id) => decreaseItem(id, setCart)} // Passa setCart para a função
        discount={discount}
        applyDiscount={applyDiscount}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <div className="flex justify-center flex-col items-center w-screen h-104 bg-[url(../imagens/bg.png)] text-white">
        <h1 className="font-extrabold my-10 text-xl">Burguer Bonanza</h1>
        <p>Rua das Acácias, 123</p>
        <IsStoreOpen />
      </div>
      <div className="flex flex-col items-center justify-center w-screen my-10">
        <h1 className="font-bold text-3xl my-4">Conheça nosso menu!</h1>
        <div className="w-screen">
          <section id="burger">
            <h1 className="font-semibold text-3xl text-center mt-10 mb-2">
              Lanches
            </h1>
            <BurgerList
              addToCart={(burger) => AddOnCart(burger, setCart)}
              burgers={filteredBurgers} // Passa dados filtrados
            />
          </section>
        </div>
        <div className="w-screen">
          <section id="drink">
            <h1 className="font-semibold text-3xl text-center mt-10 mb-2">
              Bebidas
            </h1>
            <DrinkList
              addToCart={(drink) => AddOnCart(drink, setCart)}
              drinks={filteredDrinks} // Passa dados filtrados
            />
          </section>
        </div>
      </div>
      <section id="contact">
        <div className="bg-zinc-400 w-screen my-10 h-20 opacity-10"></div>
        <footer className="w-screen flex justify-center items-center">
          <Footer />
        </footer>
      </section>
    </>
  );
}

export default App;
