'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';
import type { EditOrCreateStep } from '@/types';
import EventEditionStepper from './event-edition-stepper';
import { Button } from '@components/ui';

interface EditOrCreateEventLayoutProps {
    steps: EditOrCreateStep[];
    layout: 'create' | 'edit';
}

const EditOrCreateEventLayout: FunctionComponent<EditOrCreateEventLayoutProps> = ({ steps, layout }) => {
    const router = useRouter();
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const handleStepChange = (newIndex: number) => () => {
        if (newIndex === steps.length) {
            router.push('/dashboard/events');
            return;
        }

        setCurrentStepIndex(newIndex);
    };

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            {layout === 'create' && (
                <div className="flex justify-between items-center w-full">
                    <p className="text-2xl text-primary font-semibold">Event</p>
                    <Button onClick={handleStepChange(currentStepIndex + 1)}>
                        {currentStepIndex === steps.length - 1 ? 'Finish' : 'Save and continue'}
                    </Button>
                </div>
            )}
            <EventEditionStepper
                currentStepIndex={currentStepIndex}
                onStepClick={setCurrentStepIndex}
                editingSteps={steps.map(({ title }) => title)}
            />
            {steps[currentStepIndex]!.content}
        </div>
    );
};

export default EditOrCreateEventLayout;
