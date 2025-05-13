import { useState } from "react";

const ChangeRequest = () => {
  const [needsChange, setNeedsChange] = useState(false); // Estado para controlar se precisa de troco
  const [changeAmount, setChangeAmount] = useState(""); // Estado para o valor do troco
  const [error, setError] = useState(""); // Estado para mensagens de erro

  // Função para validar o valor do troco
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setChangeAmount(value);

    if (value && (isNaN(value) || value <= 0)) {
      setError("Por favor, insira um valor válido maior que zero.");
    } else {
      setError("");
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Você precisa de troco?</h2>
      <div className="flex flex-col gap-4">
        {/* Radio Buttons */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="needsChange"
              value="yes"
              checked={needsChange}
              onChange={() => setNeedsChange(true)}
              className="w-5 h-5 text-green-500 focus:ring-green-500"
            />
            <span className="text-gray-700">Sim</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="needsChange"
              value="no"
              checked={!needsChange}
              onChange={() => {
                setNeedsChange(false);
                setChangeAmount("");
                setError("");
              }}
              className="w-5 h-5 text-green-500 focus:ring-green-500"
            />
            <span className="text-gray-700">Não</span>
          </label>
        </div>

        {/* Input condicional para o valor do troco */}
        {needsChange && (
          <div className="mt-2 animate-fadeIn">
            <label
              htmlFor="changeAmount"
              className="block text-gray-700 font-medium mb-1"
            >
              Qual o valor do troco?
            </label>
            <input
              type="number"
              id="changeAmount"
              value={changeAmount}
              onChange={handleAmountChange}
              placeholder="Ex.: 50.00"
              min="0"
              step="0.01"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] [&::-moz-inner-spin-button]:hidden ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeRequest;
