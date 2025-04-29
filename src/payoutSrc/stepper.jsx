import { Check, CircleCheck } from "lucide-react";

function Step({ name, step, index, totalSteps, activeStepIndex }) {
  const isActive = step === "active";
  const isCompleted = index <= activeStepIndex;
  const isLastStep = index === totalSteps - 1;

  return (
    <div className="relative md:flex hidden items-center py-2">
      {/* Linha vertical (exceto no primeiro passo) */}
      {index > 0 && !isLastStep && (
        <div
          className={`absolute left-[14px] w-1 top-[-20px] h-[calc(100%+40px)] md:rotate-0 rotate-90 ${
            isActive ? "bg-emerald-500" : "bg-gray-300"
          }`}
        />
      )}
      {/* Círculo do passo */}
      <div
        className={`relative w-8 h-8 rounded-full flex items-center justify-center mr-3 border-2 ${
          isActive || isCompleted
            ? "border-emerald-500 bg-emerald-500 text-white p-1"
            : "border-gray-300 bg-gray-100 text-gray-500"
        }`}
      >
        {isActive ? <Check /> : index + 1}
      </div>
      {/* Nome do passo */}
      <div
        className={`text-sm ${
          isActive ? "text-black font-semibold" : "text-gray-500"
        }`}
        data-step={step}
        aria-current={isActive ? "step" : undefined}
      >
        {name}
      </div>
    </div>
  );
}

export default Step;
