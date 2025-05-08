import React, { useContext } from "react";
import InputForm from "../../components/inputlabel";
import { FormContext } from "../../components/formContext";

function StreetForm() {
  const { formData, updateFormData, errors } = useContext(FormContext);

  //função para lidar com a mudança de valor dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name.toLowerCase()]: value });
  };

  return (
    <>
      {/* Endereço de entrega */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-bold text-md mb-6">Endereço de entrega</legend>
        <div>
          <InputForm
            id="street"
            required
            name="Street"
            label="Rua"
            value={formData.street}
            onChange={handleChange}
          />
          {errors.street && <p className="text-red-500">{errors.street}</p>}
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex-1">
            <InputForm
              id="neiborhood"
              required
              name="Neiborhood"
              label="Bairro"
              value={formData.neiborhood}
              onChange={handleChange}
            />
            {errors.neiborhood && (
              <p className="text-red-500">{errors.neiborhood}</p>
            )}
          </div>
          <div className="flex-1">
            <InputForm
              id="complement"
              name="Complement"
              label="Complemento"
              value={formData.complement}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <InputForm
            id="reference"
            name="Reference"
            label="Referência"
            value={formData.reference}
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </>
  );
}

export default StreetForm;
