//função que cria um componente de contagem regressiva
import { interval } from "date-fns";
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(900); // 5 minutos em segundos
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (seconds < 0 && !isExpired) {
      clearInterval(interval);
      alert("O tempo acabou!");
      setIsExpired(true); // Marca como expirado para evitar repetição
    }
  }, [seconds, isExpired]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    //adicionar alerta quando o tempo acabar

    return () => clearInterval(interval);
  }, []);

  if (seconds >= 0) {
    return (
      <div
        className={`flex flex-col items-center justify-centerfont-bold text-2xl ${
          seconds < 60 ? "bg-red-500" : "bg-emerald-400"
        } p-3 px-6 border-0 rounded-xl shadow-green-200 shadow-xl border-black`}
      >
        <h2 className="font-extrabold">Código expirará em:</h2>
        <p className="font-semibold">{`${Math.floor(seconds / 60)
          .toString()
          .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`}</p>
      </div>
    );
  } else
    return (
      <div
        className={`flex flex-col items-center justify-centerfont-bold text-2xl ${"bg-red-500"} p-3 px-6 border-2 rounded-xl shadow-green-200 shadow-xl border-black`}
      >
        <h2 className="font-extrabold">Código expirou</h2>
      </div>
    );
}

export default Timer;
