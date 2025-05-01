import React from "react";
import InputForm from "../../components/inputlabel";

function StreetForm() {
  return (
    <>
      {/* Endereço de entrega */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-bold text-md mb-6">Endereço de entrega</legend>
        <div>
          <InputForm id="street" required name="Street" label="Rua" />
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex-1">
            <InputForm
              id="neiborhood"
              required
              name="Neiborhood"
              label="Bairro"
            />
          </div>
          <div className="flex-1">
            <InputForm id="complement" name="Complement" label="Complemento" />
          </div>
        </div>
        <div>
          <InputForm id="reference" name="Reference" label="Referência" />
        </div>
      </fieldset>
    </>
  );
}

export default StreetForm;
