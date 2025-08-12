import React from 'react';
import { IconType } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

interface Step {
  status: StepStatus;
  icon: IconType;
  label: string;
  hasError?: boolean;
}

interface StepperProps {
  steps: Step[];
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, onStepClick }) => {
  return (
    <div className="w-full py-4">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.label} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`} onClick={() => onStepClick(stepIdx + 1)}>
              {step.status === 'complete' && !step.hasError ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-green-500" />
                  </div>
                  <div className="relative w-6 h-6 flex items-center justify-center bg-green-500 rounded-full">
                    <step.icon className="w-3 h-3 text-white" aria-hidden="true" />
                  </div>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className={`relative w-6 h-6 flex items-center justify-center bg-white border-2 ${step.hasError ? 'border-red-500' : 'border-indigo-600'} rounded-full`}>
                    <step.icon className={`w-3 h-3 ${step.hasError ? 'text-red-500' : 'text-indigo-600'}`} aria-hidden="true" />
                  </div>
                </>
              ) : step.hasError ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-red-500" />
                  </div>
                  <div className="relative w-6 h-6 flex items-center justify-center bg-red-500 rounded-full">
                    <FiAlertCircle className="w-3 h-3 text-white" aria-hidden="true" />
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="relative w-6 h-6 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                    <step.icon className="w-3 h-3 text-gray-400" aria-hidden="true" />
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
