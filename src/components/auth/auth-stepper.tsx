import type { FunctionComponent } from 'react';
import { motion } from 'framer-motion';

interface AuthStepperProps {
    currentStep: number;
    totalSteps: number;
    onStepChange?: (step: number) => void;
}

const toPercent = (value: number, min: number, max: number) => {
    return (100 * (value - min)) / (max - min);
};

const AuthStepper: FunctionComponent<AuthStepperProps> = ({ currentStep, totalSteps, onStepChange }) => {
    return (
        <div className="relative" style={{ width: 48 * (2 * totalSteps - 1) }}>
            <div
                className="absolute top-1/2 my-auto h-1 origin-center bg-black"
                style={{ width: 48 * (2 * totalSteps - 2) }}
            >
                <motion.div
                    className="relative h-1 bg-primary"
                    initial={false}
                    animate={{
                        width: `${toPercent(currentStep, 1, totalSteps)}%`,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                ></motion.div>
            </div>
            <div className="relative flex w-full items-center justify-between">
                {new Array(totalSteps).fill(0).map((_, index) => (
                    <div
                        key={index}
                        onClick={currentStep >= index + 1 ? () => onStepChange && onStepChange(index + 1) : undefined}
                        className={`flex w-12 aspect-square items-center justify-center rounded-full text-xl text-white ${
                            currentStep >= index + 1 ? 'bg-primary cursor-pointer' : 'bg-black cursor-not-allowed'
                        }`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthStepper;
