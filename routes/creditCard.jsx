import InputForm from "../components/inputlabel";
import { useContext } from "react";
import { FormContext } from "../components/formContext";

function CreditCard() {
  const { formData, updateFormData, errors } = useContext(FormContext);

  // Formata o número do cartão de crédito a cada 4 dígitos
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    return formatted;
  };

  // Formata a data de expiração para o formato MM/AA
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
      return month;
    }
    return digits;
  };

  // Handlers para atualizar o formData
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    updateFormData({ numCard: formattedValue });
    validateForm("card-info");
  };

  const handleExpirationDateChange = (e) => {
    const formattedValue = formatExpirationDate(e.target.value);
    updateFormData({ dateCard: formattedValue });
  };

  const handleCvvChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    updateFormData({ cvvCard: digits });
  };

  return (
    <div className="flex flex-col gap-4">
      <legend className="font-bold text-md mb-15">Dados do Cartão</legend>
      <div>
        <InputForm
          id="nameCard"
          type="text"
          name="nameCard"
          label="Nome do titular do cartão"
          value={formData.nameCard}
          onChange={(e) => updateFormData({ nameCard: e.target.value })}
        />
        {errors.nameCard && <p className="text-red-500">{errors.nameCard}</p>}
      </div>
      <div>
        <InputForm
          id="numCard"
          type="text"
          value={formData.numCard}
          onChange={handleCardNumberChange}
          maxLength={19}
          name="numCard"
          label="Número do cartão"
        />
        {errors.numCard && <p className="text-red-500">{errors.numCard}</p>}
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div>
          <InputForm
            id="dateCard"
            type="text"
            value={formData.dateCard}
            onChange={handleExpirationDateChange}
            name="dateCard"
            label="Data de validade"
          />
          {errors.dateCard && <p className="text-red-500">{errors.dateCard}</p>}
        </div>
        <div>
          <InputForm
            id="cvvCard"
            type="text" // Mudei para text para garantir que maxLength funcione
            maxLength="3"
            value={formData.cvvCard}
            onChange={handleCvvChange}
            name="cvvCard"
            label="CVV"
          />
          {errors.cvvCard && <p className="text-red-500">{errors.cvvCard}</p>}
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
