import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  //estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    street: "",
    neiborhood: "",
    complement: "",
    reference: "",
    payment: "",
  });

  //estado para armazenar os erros do formulário
  const [errors, setErrors] = useState({});

  //atualizar os dados do formulário
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  //função para validar os dados do formulário
  const validateForm = (currentPath) => {
    const newErrors = {};

    //validação para a página "Delivery"
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //retorna true se não houver erros
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
