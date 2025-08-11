import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps, stepLabels }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    isCompleted ? 'bg-green-500' : isActive ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  {isCompleted ? '✔' : step}
                </div>
                <p className={`mt-2 text-sm text-center ${isActive ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
                  {stepLabels[index]}
                </p>
              </div>
              {step < totalSteps && (
                <div className={`flex-1 h-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
