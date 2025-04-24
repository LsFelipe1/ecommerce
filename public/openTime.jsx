import { getDay, getHours } from "date-fns";
import { useEffect, useState } from "react";

function IsStoreOpen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer); // Limpa o intervalo
  }, []);

  //horário que a loja se encontra aberta
  const day = getDay(currentDate);
  const hour = getHours(currentDate);
  const openDay = [1, 2, 3, 4, 5, 6];
  const isOpenHour = hour >= 18 && hour <= 22;

  //muda dinamicamente o horário da loja, verde = aberto | vermelho = fechado
  if (openDay.includes(day) && isOpenHour) {
    return (
      <>
        <div className="bg-emerald-400 p-3 rounded-2xl my-10 text-center">
          <p>Seg à Sab - 18h às 23h </p>
          <p>aberto</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-red-400 p-3 rounded-2xl my-10 text-center">
          <p>Seg à Sab - 18h às 23h </p>
          <p>Fechado</p>
        </div>
      </>
    );
  }
}

export default IsStoreOpen;
