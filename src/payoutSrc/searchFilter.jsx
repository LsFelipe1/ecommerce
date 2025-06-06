import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchBar({ search, setSearch, burgers, drinks }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Filtra sugestões em tempo real com base no que foi digitado
  useEffect(() => {
    if (search) {
      const filteredBurgers = burgers.filter((burger) =>
        burger.name.toLowerCase().includes(search.toLowerCase())
      );
      const filteredDrinks = drinks.filter((drink) =>
        drink.name.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions([...filteredBurgers, ...filteredDrinks].slice(0, 5)); // Limita a 5 sugestões
    } else {
      setSuggestions([]);
    }
  }, [search, burgers, drinks]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon for Mobile */}
      <Link
        to="/search"
        className="md:hidden flex items-center justify-center p-2 text-gray-500"
      >
        <Search size={20} />
        <span className="ml-2">Pesquisar</span>
      </Link>

      {/* Search Input and Suggestions for Desktop */}
      <div className="hidden md:block relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay para permitir cliques nas sugestões
          placeholder="Buscar lanches ou bebidas..."
          className="w-full p-2 pl-10 border-none rounded-md bg-gray-200 focus:outline-none"
        />

        {/* Dropdown de sugestões */}
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border rounded-md mt-1 shadow-lg z-10">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center justify-between"
                onClick={() => {
                  setSearch(item.name);
                  setSuggestions([]);
                  setIsFocused(false);
                }}
              >
                <div className="flex gap-5 items-center">
                  <img className="w-10 h-10" src={item.image} alt={item.name} />
                  <span className="font-sans"> {item.name}</span>{" "}
                </div>
                <span className="font-bold">
                  {" "}
                  R${item.price.replace(".", ",")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
