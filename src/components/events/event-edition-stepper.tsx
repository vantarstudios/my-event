import type { FunctionComponent } from 'react';
import { toast } from '@/lib/utils';
import { HoledDisk } from '@components/ui/icons';

interface EventEditionStepperProps {
    currentStepIndex: number;
    onStepClick: (index: number) => void;
    editingSteps: string[];
    canGoToNextStep: boolean;
}

const EventEditionStepper: FunctionComponent<EventEditionStepperProps> = ({
    currentStepIndex,
    onStepClick,
    editingSteps,
    canGoToNextStep,
}) => {
    return (
        <div className="flex flex-wrap justify-between items-center w-full">
            {editingSteps.map((step, index) => (
                <div
                    key={step}
                    onClick={canGoToNextStep || index <= currentStepIndex
                        ? onStepClick.bind(null, index)
                        : () => toast.warning('Please complete the current step')
                    }
                    className="flex justify-center items-center gap-5 cursor-pointer h-full"
                >
                    <HoledDisk
                        className={`w-7 h-7 ${
                            currentStepIndex === index
                                ? 'text-black'
                                : currentStepIndex > index
                                ? 'text-primary'
                                : 'text-gray-300'
                        }`}
                    />
                    <div
                        className={`${currentStepIndex === index ? 'font-bold' : 'font-medium'} ${
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
