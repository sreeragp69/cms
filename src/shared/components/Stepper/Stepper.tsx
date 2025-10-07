import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  stepLabels: string[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepHeaderClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepNavigation?: boolean;
}

export default function Stepper({
  children,
  stepLabels,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepHeaderClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepNavigation = false,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  const handleStepClick = (stepNumber: number) => {
    if (!disableStepNavigation && stepNumber !== currentStep) {
      setDirection(stepNumber > currentStep ? 1 : -1);
      updateStep(stepNumber);
    }
  };

  return (
    <div
      className="flex min-h-full  flex-1 flex-col items-center justify-center p-4"
      {...rest}
    >
      <div
        className={`mx-auto w-full h-full flex flex-col justify-between rounded-4xl p-10 shadow-xl ${stepContainerClassName}`}
      >
        <div className={`${stepHeaderClassName} w-full border-b border-gray-200   py-6`}>
          <div className="flex items-center gap-3 flex-wrap">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isComplete = stepNumber < currentStep;
              const isNotLastStep = index < totalSteps - 1;

              return (
                <React.Fragment key={stepNumber}>
                  <button
                    onClick={() => handleStepClick(stepNumber)}
                    disabled={disableStepNavigation}
                    className={`
                      text-sm font-medium transition-colors duration-200
                      ${isActive ? 'text-gray-900' : ''}
                      ${isComplete ? 'text-gray-600 hover:text-gray-900' : ''}
                      ${!isActive && !isComplete ? 'text-gray-400' : ''}
                      ${!disableStepNavigation && (isActive || isComplete) ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {label}
                  </button>
                  {isNotLastStep && (
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isComplete ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-8 pb-8 ${footerClassName}`}>
            <div className={`mt-10 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`duration-350 rounded px-4 py-2 transition ${
                    currentStep === 1
                      ? 'pointer-events-none opacity-50 text-gray-400'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="duration-350 flex items-center justify-center rounded-lg bg-blue-600 py-2 px-6 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
                {...nextButtonProps}
              >
                {isLastStep ? 'Complete' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = ''
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0
  })
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="py-6 ">{children}</div>;
}
