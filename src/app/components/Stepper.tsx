import React from 'react';
import { IconType } from 'react-icons';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

interface Step {
  status: StepStatus;
  icon: IconType;
  label: string;
}

interface StepperProps {
  steps: Step[];
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, onStepClick }) => {
  const getStepAppearance = (status: StepStatus, originalIcon: IconType) => {
    switch (status) {
      case 'complete':
        return {
          connectorClass: 'bg-green-500',
          circleClass: 'bg-green-500',
          IconToShow: FiCheck,
          iconClass: 'text-white',
          isClickable: true,
        };
      case 'error':
        return {
          connectorClass: 'bg-red-500',
          circleClass: 'bg-red-500',
          IconToShow: FiAlertCircle,
          iconClass: 'text-white',
          isClickable: true,
        };
      case 'current':
        return {
          connectorClass: 'bg-gray-200',
          circleClass: 'bg-white border-2 border-indigo-600',
          IconToShow: originalIcon,
          iconClass: 'text-indigo-600',
          isClickable: false,
        };
      case 'upcoming':
      default:
        return {
          connectorClass: 'bg-gray-200',
          circleClass: 'bg-white border-2 border-gray-300',
          IconToShow: originalIcon,
          iconClass: 'text-gray-400',
          isClickable: false,
        };
    }
  };

  return (
    <div className="w-full py-4">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const appearance = getStepAppearance(step.status, step.icon);
          const isLastStep = stepIdx === steps.length - 1;

          return (
            <li
              key={step.label}
              className={`relative ${!isLastStep ? 'flex-1' : ''} ${appearance.isClickable ? 'cursor-pointer' : ''}`}
              onClick={appearance.isClickable ? () => onStepClick(stepIdx + 1) : undefined}
            >
              <div className="flex justify-center">
                <div
                  className={`relative w-8 h-8 flex items-center justify-center rounded-full ${appearance.circleClass} transition-colors duration-300`}
                  aria-current={step.status === 'current' ? 'step' : undefined}
                >
                  <appearance.IconToShow className={`w-4 h-4 ${appearance.iconClass}`} aria-hidden="true" />
                </div>
              </div>
              {!isLastStep && (
                <div className="absolute top-4 left-1/2 w-full" aria-hidden="true">
                  <div className={`h-0.5 w-full ${appearance.connectorClass} transition-colors duration-300`} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Stepper;
