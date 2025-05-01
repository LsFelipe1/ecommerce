import { useEffect, useState } from "react";

function Summary() {
  // Estado para armazenar o carrinho e o total
  // O carrinho é um array de objetos, onde cada objeto representa um item no carrinho
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("0.00");

  useEffect(() => {
    // Recupera o carrinho e o total do sessionStorage quando o componente é montado
    // e atualiza o estado do carrinho e do total
    // para que eles sejam exibidos corretamente na página de resumo
    const storedCart = sessionStorage.getItem("cart");
    const storedTotal = sessionStorage.getItem("total");

    // Verifica se o carrinho e o total estão armazenados no sessionStorage
    // Se estiverem, converte o carrinho de volta para um array de objetos
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedTotal) {
      setTotal(storedTotal);
    }
  }, []);
  return (
    <>
      <h2 className="font-bold text-2xl">Resumo do Pedido</h2>
      {cart.length === 0 ? (
        <p>O carrinho está Vazio.</p>
      ) : (
        <ul>
          {cart.map(
            (
              item // Para cada item no carrinho, renderiza um elemento de lista
            ) => (
              <li key={item.id}>
                <div className="flex justify-between mb-2 bg-gray-200 py-2 px-4 rounded-lg font-bold text-gray-900 shadow-md">
                  <span>
                    {item.name}{" "}
                    {item.quantity === 1 ? "" : `(x${item.quantity})`}
                  </span>
                  <span>R$ {item.price.toFixed(2)}</span>
                </div>
              </li>
            )
          )}
          <li className="my-20">
            <span className="font-extrabold text-2xl">Total: </span>
            <span className="font-bold text-2xl">R$ {total}</span>
          </li>
        </ul>
      )}
    </>
  );
}

export default Summary;
