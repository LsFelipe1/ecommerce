import InputForm from "../components/inputlabel";

function CreditCard() {
  return (
    <div className="flex flex-col gap-4">
      <legend className="font-bold text-md mb-15">Dados do Cartão</legend>
      <div>
        <InputForm
          id="numCard"
          type="number"
          maxlength={16}
          name="card"
          label="Credit Card Number"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div>
          <InputForm
            id="dateCard"
            type="date"
            name="cardDate"
            label="Expiration Date"
          />
        </div>
        <div>
          <InputForm
            id="cvvCard"
            type="number"
            maxlength="3"
            name="cardCVV"
            label="CVV"
          />
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
