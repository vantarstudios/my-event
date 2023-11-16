import type { FunctionComponent } from 'react';
import { HoledDisk } from '@components/ui/icons';

interface EventEditionStepperProps {
    currentStepIndex: number;
    onStepClick: (index: number) => void;
    editingSteps: string[];
}

const EventEditionStepper: FunctionComponent<EventEditionStepperProps> = ({
    currentStepIndex,
    onStepClick,
    editingSteps,
}) => {
    return (
        <div className="flex flex-wrap justify-between items-center w-full">
            {editingSteps.map((step, index) => (
                <div
                    key={step}
                    onClick={onStepClick.bind(null, index)}
                    className="flex justify-center items-center gap-5 cursor-pointer h-full"
                >
                    <HoledDisk
                        className={`w-8 h-8 ${
                            currentStepIndex === index
                                ? 'text-black'
                                : currentStepIndex > index
                                ? 'text-primary'
                                : 'text-gray-300'
                        }`}
                    />
                    <div
                        className={`text-lg ${currentStepIndex === index ? 'font-bold' : 'font-medium'} ${
                            currentStepIndex >= index ? 'text-black' : 'text-gray-300'
                        }`}
                    >
                        {step}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventEditionStepper;
