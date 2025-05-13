export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(ev) => setSearch(ev.target.value)}
      placeholder="Buscar lanches ou bebidas..."
      className="w-3/4 max-w-md p-2 mb-4 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
    />
  );
}
