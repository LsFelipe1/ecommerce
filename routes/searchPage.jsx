import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchPage({ search, setSearch }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow">
        <Link to="/" className="text-gray-500">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="ml-4 text-lg font-semibold">Pesquisar</h1>
      </div>

      {/* Input de busca */}
      <div className="p-4">
        <div className="relative w-full max-w-md mx-auto">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={20} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder="Buscar lanches ou bebidas..."
            className="w-full p-2 pl-10 border-none rounded-md bg-gray-200 focus:outline-none"
            autoFocus
          />
        </div>
      </div>

      {/* Mostra resultados */}
      <div className="p-4">
        {search ? (
          <p>
            Resultados para: <strong>{search}</strong>
          </p>
        ) : (
          <p>Digite para buscar lanches ou bebidas...</p>
        )}
      </div>
    </div>
  );
}
