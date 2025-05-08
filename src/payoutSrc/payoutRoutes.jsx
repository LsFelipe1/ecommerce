import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormContext } from "../../components/formContext";

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
  const navigate = useNavigate();
  //verifica a validação do formulário
  const { validateForm, formData } = useContext(FormContext);

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

  //função para validar o formulário antes de avançar
  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm(currentPath)) {
      const payment = formData.payment;

      if (currentPath === "delivery") {
        if (payment === "card") {
          navigate(`/payout/card-info`);
        } else {
          navigate("/payout/summary");
        }
      } else {
        navigate(`/payout/${nextRoute}`);
      }
    }
  };

  //rendereiza o link de navegação
  return (
    <div className="flex flex-row justify-end gap-5 items-center w-full mt-5 mb-5">
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
          onClick={handleNext}
          className="flex bg-emerald-300 w-fit p-2 shadow-xl font-bold rounded-sm hover:text-white hover:scale-105 hover:bg-emerald-500 transition-all duration-500"
        >
          Avançar
        </Link>
      )}
    </div>
  );
}
