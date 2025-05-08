import { getDay, getHours } from "date-fns";
import { useEffect, useState } from "react";

// Hook personalizado para verificar se a loja está aberta
export function useStoreOpen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = getDay(currentDate);
  const hour = getHours(currentDate);
  const openDay = [1, 2, 3, 4, 5, 6];
  const isOpenHour = hour >= 8 && hour <= 22;

  return openDay.includes(day) && isOpenHour;
}

// Componente para exibir o status da loja
function IsStoreOpen() {
  const isOpen = useStoreOpen();

  return (
    <div
      className={`p-3 rounded-2xl my-10 text-center ${
        isOpen ? "bg-emerald-400" : "bg-red-400"
      }`}
    >
      <p>Seg à Sab - 18h às 23h</p>
      <p>{isOpen ? "Aberto" : "Fechado"}</p>
    </div>
  );
}

export default IsStoreOpen;
