import Cart from "../src/cart";
import App from "../src/App";

function Payout() {
  return (
    <>
      <div className="">
        <h1>Payout Sys</h1>
        <h2 className="font-extrabold text-4xl">Endereço de entrega</h2>
        <div className="grid grid-cols-2 p-6 gap-5 border-2">
          <p>
            Rua:
            <input type="text" placeholder="Digite algo" />{" "}
          </p>
          <p>
            Bairro:
            <input type="text" placeholder="Digite algo" />{" "}
          </p>
          <p>
            Complemento:
            <input type="text" placeholder="Digite algo" />
          </p>
          <p>
            Ponto de referência:
            <input type="text" placeholder="Digite algo" />{" "}
          </p>
        </div>
        <h2 className="my-10">Forma de pagamento</h2>
        <div>
          <h3>Pix</h3> <input type="radio" />
          <h3>Cartão</h3> <input type="radio" />
          <h3>No local</h3> <input type="radio" />
        </div>
      </div>
    </>
  );
}

export default Payout;
