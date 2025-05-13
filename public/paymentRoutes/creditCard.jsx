import { useEffect, useState } from "react";

function CreditCardPayment() {
  const [paid, setPaid] = useState(false); // Estado para controlar o pagamento
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [total, setTotal] = useState("0.00");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const storedTotal = sessionStorage.getItem("total");

    if (storedTotal) {
      setTotal(storedTotal);
    }
  }, []);

  const handlePayment = () => {
    setButtonClicked(true); // Ativa animação do botão
    setIsTransitioning(true); // Inicia transição da tela
    setTimeout(() => {
      setButtonClicked(false); // Reseta animação do botão
      setPaid(true); // Muda para tela confirmada
      setIsTransitioning(false); // Finaliza transição
    }, 500); // Duração da animação
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <style>
        {`
          @keyframes draw-check {
            0% { stroke-dashoffset: 36; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes pulse-bg {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes bounce-text {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .animate-draw-check {
            stroke-dasharray: 36;
            stroke-dashoffset: 36;
            animation: draw-check 800ms ease-in-out forwards;
          }
          .animate-pulse-bg {
            animation: pulse-bg 1.5s ease-in-out infinite;
          }
          .animate-bounce-text {
            animation: bounce-text 600ms ease-in-out;
          }
        `}
      </style>
      <div
        className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isTransitioning
            ? paid
              ? "opacity-0 -translate-y-5"
              : "opacity-0 translate-y-0"
            : "opacity-100 translate-y-0"
        }`}
      >
        {paid ? (
          <div className="flex flex-col bg-emerald-400 2xl:absolute -top-80 p-8 rounded-sm items-center justify-center w-[800px] m-0 z-10 h-[718px] gap-10">
            <h1 className="font-bold text-2xl text-white animate-bounce-text">
              Confirmação de pagamento do cartão
            </h1>
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path className="animate-draw-check" d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-bold text-xl text-white animate-bounce-text">
              Pagamento confirmado
            </p>
          </div>
        ) : (
          <div className="flex flex-col bg-blue-400 2xl:absolute -top-80 p-8 rounded-sm items-center justify-center gap-6 w-[800px] m-0 z-10 h-[718px] shadow-lg">
            <h1 className="font-bold text-2xl text-white">
              Confirmação de pagamento do cartão
            </h1>
            <p className="font-bold text-2xl text-white">
              Total à pagar: R$ {total}
            </p>
            <button
              onClick={handlePayment}
              className={`text-white font-bold text-xl bg-blue-500 border-2 rounded-xl shadow-2xl shadow-black border-white p-3 px-6 hover:scale-105 hover:bg-blue-700 transition-all duration-700`}
            >
              Confirmar pagamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreditCardPayment;
