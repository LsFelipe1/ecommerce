import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    street: "",
    neiborhood: "",
    complement: "",
    reference: "",
    payment: "",
    nameCard: "",
    numCard: "",
    dateCard: "",
    cvvCard: "",
  });

  const [errors, setErrors] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const validateForm = (currentPath) => {
    const newErrors = {};

    if (currentPath === "delivery") {
      if (!formData.street) {
        newErrors.street = "Rua é um campo obrigatório";
      }
      if (!formData.neiborhood) {
        newErrors.neiborhood = "O bairro é um campo obrigatório";
      }
      if (!formData.payment) {
        newErrors.payment = "Selecione um método de pagamento";
      }
    }

    if (currentPath === "card-info") {
      if (!formData.nameCard) {
        newErrors.nameCard = "Digite o nome do titular do cartão";
      }
      if (!formData.numCard) {
        newErrors.numCard = "Digite o número do cartão";
      } else if (formData.numCard.replace(/\D/g, "").length !== 16) {
        newErrors.numCard = "O número do cartão deve ter 16 dígitos";
      }
      if (!formData.dateCard) {
        newErrors.dateCard = "Digite a data de validade (MM/AA)";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.dateCard)) {
        newErrors.dateCard = "Formato inválido. Use MM/AA";
      }
      if (!formData.cvvCard) {
        newErrors.cvvCard = "Digite o CVV";
      } else if (formData.cvvCard.length !== 3) {
        newErrors.cvvCard = "O CVV deve ter 3 dígitos";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        updateFormData,
        validateForm,
        errors,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
