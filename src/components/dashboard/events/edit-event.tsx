'use client';

import { useState } from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import type { Event } from '@/types';
import EventEditionStepper from './event-edition-stepper';
import NameAndCover from './name-and-cover';
import DateAndLocation from './date-and-location';
import Ticketing from './ticketing';

interface EditEventProps {
    event: Event;
}

type EditingStep = {
    title: string;
    content: ReactNode;
};

const EditEvent: FunctionComponent<EditEventProps> = ({ event }) => {
    const editingSteps: EditingStep[] = [
        {
            title: 'Name & cover',
            content: (
                <NameAndCover
                    cover={event.cover}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
                />
            ),
        },
        {
            title: 'Date & location',
            content: <DateAndLocation startDate={event.startDate} endDate={event.endDate} location={event.location} />,
        },
        {
            title: 'Ticketing',
            content: <Ticketing ticketTypes={event.ticketTypes} />,
        },
    ];
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <EventEditionStepper
                currentStepIndex={currentStepIndex}
                onStepClick={setCurrentStepIndex}
                editingSteps={editingSteps.map(({ title }) => title)}
            />
            {editingSteps[currentStepIndex]!.content}
        </div>
    );
};

export default EditEvent;
