import Timer from "../../components/timer";
import { useEffect, useState } from "react";

function PixPayment() {
  const [discountedTotal, setTotal] = useState("0.00");

  useEffect(() => {
    const storedTotal = sessionStorage.getItem("total");

    if (storedTotal) {
      setTotal(storedTotal);
    }
  }, []);

  return (
    <>
      <h1 className="font-extrabold text-2xl">Pix</h1>
      <div className="flex flex-col items-center justify-center gap-1 mt-10 mb-10">
        <div className="flex flex-col xl:flex-row gap-5">
          <img
            className="h-70 w-70 border-2 border-emerald-500 my-5"
            src="../imagens/qrcode.png"
          ></img>
          <div className="flex flex-col justify-center items-center gap-10">
            <Timer />
            <p
              className="font-bold text-3xl bg-emerald-400 p-3 px-21 flex justify-between border-0 rounded-xl shadow-green-200 shadow-xl border-black"
              title="Total"
            >
              R$ {discountedTotal}
            </p>
            <button className="bg-emerald-400 border-2 p-2 hover:cursor-pointer rounded-xl shadow-green-200 shadow-xl border-black">
              Confirmar pagamento
            </button>
          </div>
        </div>
        <div className="font-bold mb-5">
          <p>Passo a passo:</p>
          <p>1- Abra o aplicativo do seu banco</p>
          <p>2- Clique para escanear código QR ou Pagar com Pix</p>
          <p>3- Aponte para o QR Code ao lado</p>
          <p>4- Efetue o pagamento</p>
        </div>
        <p
          className="font-bold text-2xl border-2 rounded-sm bg-gray-200 p-2 border-emerald-400 w-fit hover:bg-emerald-500 hover:cursor-pointer"
          title="Copiar código"
        >
          https://github.com/LsFelipe1
        </p>
      </div>
    </>
  );
}

export default PixPayment;
