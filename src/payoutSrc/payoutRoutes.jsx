import { Link, useLocation } from "react-router-dom";

// Lista de rotas filhas na ordem desejada
const payoutRoutes = [
  "delivery",
  "card-info",
  "summary",
  "payment",
  "tracking",
];

export default function PayoutNavigation() {
  const location = useLocation();
  // Extrai o último segmento do caminho
  const currentPath = location.pathname.split("/").pop();

  // Encontra o índice da rota atual
  const currentIndex = payoutRoutes.indexOf(currentPath);
  // Determina a próxima rota (se não for a última)
  const nextRoute =
    currentIndex < payoutRoutes.length - 1
      ? payoutRoutes[currentIndex + 1]
      : null;

  //determina a rota anterior (se não for a primeira)
  const previousRoute =
    currentIndex > 0 ? payoutRoutes[currentIndex - 1] : null;

  //rendereiza o link de navegação
  return (
    <div className="flex flex-row justify-between items-center w-full mt-5 mb-5">
      {previousRoute && (
        <Link
          to={`/payout/${previousRoute}`}
          className="flex self-start bg-emerald-300 w-fit p-2 shadow-xl font-bold rounded-sm hover:text-white hover:scale-105 hover:bg-emerald-500 transition-all duration-500"
        >
          Voltar
        </Link>
      )}
      {/* Renderiza o link apenas se houver uma próxima rota */}
      {nextRoute && (
        <Link
          to={`/payout/${nextRoute}`}
          className="flex self-end bg-emerald-300 w-fit p-2 shadow-xl font-bold rounded-sm hover:text-white hover:scale-105 hover:bg-emerald-500 transition-all duration-500"
        >
          Avançar
        </Link>
      )}
    </div>
  );
}
