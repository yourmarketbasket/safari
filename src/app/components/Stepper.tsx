import React from 'react';
import { IconType } from 'react-icons';

export type StepStatus = 'complete' | 'current' | 'upcoming';

interface Step {
  status: StepStatus;
  icon: IconType;
  label: string;
}

interface StepperProps {
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className="w-full py-4">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.label} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
              {step.status === 'complete' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-indigo-600" />
                  </div>
                  <div className="relative w-4 h-4 flex items-center justify-center bg-indigo-600 rounded-full">
                    <step.icon className="w-2 h-2 text-white" aria-hidden="true" />
                  </div>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="relative w-4 h-4 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                    <step.icon className="w-2 h-2 text-indigo-600" aria-hidden="true" />
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="relative w-4 h-4 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                    <step.icon className="w-2 h-2 text-gray-400" aria-hidden="true" />
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Stepper;
