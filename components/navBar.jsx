import Notify from "../public/notify";
import SearchBar from "../src/payoutSrc/searchFilter";
import {
  GlassWater,
  PhoneCall,
  Pizza,
  ShoppingBasket,
  UserRound,
} from "lucide-react";

function NavBar() {
  return (
    <>
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
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-row items-center justify-between w-20">
        <UserRound
          title="Perfil"
          aria-label="Perfil"
          className="p-1 rounded-3xl cursor-pointer hover:bg-zinc-200 scale-140 hover-text-emerald-500 hover:scale-160 transition-all duration-500"
        />
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
      </div>
    </>
  );
}

export default NavBar;
