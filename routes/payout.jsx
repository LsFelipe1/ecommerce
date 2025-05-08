import Step from "../src/payoutSrc/stepper";
import { ChevronLeft } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import PayoutNavigation from "../src/payoutSrc/payoutRoutes";
import { FormProvider } from "../components/formContext";

function Payout() {
  const location = useLocation();

  let steps = [
    {
      name: "Detalhes da entrega",
      route: "/payout/delivery",
      status: "off",
    },
    {
      name: "Informações do cartão",
      route: "/payout/card-info",
      status: "off",
    },
    { name: "Resumo do pedido", route: "/payout/summary", status: "off" },
    {
      name: "Finalização do pagamento",
      route: "/payout/payment",
      status: "off",
    },
    { name: "Acompanhe a entrega", route: "/payout/tracking", status: "off" },
  ];

  // Determina o índice da etapa atual com base na rota
  const activeStepIndex = steps.findIndex(
    (step) => step.route === location.pathname
  );

  // Atualiza o status de cada etapa com base no activeStepIndex
  const updatedSteps = steps.map((step, index) => ({
    ...step,
    status:
      index <= activeStepIndex // Etapas até a atual são "active"
        ? "active"
        : "off", // Etapas futuras são "off"
  }));

  return (
    <FormProvider>
      <title>Payout</title>
      <div className="flex md:justify-center md:items-center bg-amber-50 md:w-screen h-screen">
        <div className="flex flex-col xl:flex-row md:h-180 shadow-2xl bg-transparent rounded-2xl">
          <div className="flex flex-col justify-center bg-emerald-50 pr-15 pl-15 space-y-3 rounded-s-2xl">
            <a
              href="/"
              className="pointer xl:absolute top-35 hover:scale-130 transition-all duration-700"
            >
              <ChevronLeft />
            </a>
            {updatedSteps.map((step, index) => (
              <Step
                key={index}
                name={step.name}
                step={step.status}
                index={index}
                totalSteps={steps.length}
                activeStepIndex={activeStepIndex}
              />
            ))}
          </div>
          <main className="flex flex-col md:justify-between bg-zinc-100 w-screen md:w-200 rounded-e-2xl p-5">
            <Outlet />
            <PayoutNavigation />
          </main>
        </div>
      </div>
    </FormProvider>
  );
}

export default Payout;
