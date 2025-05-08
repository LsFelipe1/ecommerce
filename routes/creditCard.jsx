import InputForm from "../components/inputlabel";
import { useState } from "react";
import { Calendar, Lock } from "lucide-react";

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  //formata o número do cartão de crédito a cada 4 dígitos
  const formatCardNumber = (value) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, "").slice(0, 16); // Limita a 16 dígitos
    // Adiciona espaços a cada 4 dígitos
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    return formatted;
  };

  //formata a data de expiração para o formato MM/AA
  const formatExpirationDate = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      const month = digits.slice(0, 2);
      const year = digits.slice(2, 4);
      const monthNum = parseInt(month, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        return `${month}/${year}`;
      }
      alert("Mês inválido. Por favor, insira um mês entre 01 e 12.");
      return month; // Não formata se o mês for inválido
    }
    return digits;
  };

  //Atualiza o estado do número do cartão de crédito
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  //Atualiza o estado da data de expiração
  const handleExpirationDateChange = (e) => {
    const formattedValue = formatExpirationDate(e.target.value);
    setExpirationDate(formattedValue);
  };

  //Atualiza o estado do CVV
  const handleCvvChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(digits);
  };

  return {
    cardNumber,
    expirationDate,
    cvv,
    handleCardNumberChange,
    handleExpirationDateChange,
    handleCvvChange,
  };
}

function CreditCard() {
  const {
    cardNumber,
    expirationDate,
    cvv,
    handleCardNumberChange,
    handleExpirationDateChange,
    handleCvvChange,
  } = PaymentForm();

  return (
    <div className="flex flex-col gap-4">
      <legend className="font-bold text-md mb-15">Dados do Cartão</legend>
      <div>
        <InputForm
          id="nameCard"
          type="text"
          name="Nome"
          label="Nome do titular do cartão"
        />
      </div>
      <div>
        <InputForm
          id="numCard"
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxlength={19}
          name="card"
          label="Número do cartão"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div>
          <InputForm
            id="dateCard"
            type="text"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            name="cardDate"
            label="Data de validade"
          />
        </div>
        <div>
          <InputForm
            id="cvvCard"
            type="number"
            maxlength="3"
            value={cvv}
            onChange={handleCvvChange}
            name="cardCVV"
            label="CVV"
          />
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
