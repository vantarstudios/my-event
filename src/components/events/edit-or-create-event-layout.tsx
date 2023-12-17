'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useMutationRequest } from '@/lib/hooks';
import { toast } from '@/lib/utils/toast';
import { eventsAPI } from '@/lib/api/events';
import { createEventSchema } from '@/types/events';
import type { CreateEventPayload, UpdateEventPayload } from '@/types/events';
import type { EditOrCreateStep, Event, EventTypeUnion } from '@/types';
import { Button } from '@components/ui';
import { Ticketing } from '@/components/tickets';
import EventEditionStepper from './event-edition-stepper';
import NameAndCover from './name-and-cover';
import DateAndLocation from './date-and-location';
import tickets from '@/data/tickets';

interface EditOrCreateEventLayoutProps {
    layout: 'create' | 'edit';
    onModeToggle: () => void;
    eventType: EventTypeUnion;
    event?: Event;
}

const EditOrCreateEventLayout: FunctionComponent<EditOrCreateEventLayoutProps> = ({ layout, onModeToggle, event, eventType }) => {
    const eventTickets = event ? tickets.filter((ticket) => ticket.eventId === event.id) : [];
    
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [formData, setFormData] = useState<CreateEventPayload>({
        title: event?.title || '',
        description: event?.description || '',
        categories: event?.categories || [],
        type: event?.type || eventType,
        startingDate: event?.startingDate || '',
        endingDate: event?.endingDate || '',
        location: event?.location || '',
    });
    
    const { trigger, isMutating } = useMutationRequest(
        'create-event',
        async (_: string, { arg: data }: { arg: CreateEventPayload }) => {
            let response;
            
            if (layout === 'create') {
                response = await eventsAPI.createEvent(data);
            } else {
                response = await eventsAPI.updateEvent(event!.id, data as UpdateEventPayload);
            }
            
            return response.data;
        },
        layout === 'edit'
            ? 'Event updated successfully'
            : 'Event created successfully',
    );
    
    const handleDataChange = <T extends keyof CreateEventPayload>(key: T) => (value: CreateEventPayload[T]) => {
        setFormData((currentData) => ({ ...currentData, [key]: value }));
    };
    
    const steps: EditOrCreateStep[] = [
        {
            title: 'Name & cover',
            content: (
                <NameAndCover
                    {...formData}
                    initialCover={event?.cover}
                    setOtherData={handleDataChange}
                />
            ),
        },
        {
            title: 'Date & location',
            content: (
                <DateAndLocation
                    {...formData}
                    setOtherData={handleDataChange}
                />
            ),
        },
        {
            title: 'Ticketing',
            content: <Ticketing ticketTypes={eventTickets}/>,
        },
    ];

    const handleStepChange = (newIndex: number) => async () => {
        if (newIndex === steps.length) {
            if (isMutating) {
                return;
            }
            
            if (Object.entries(formData)
                .map(([key, value]) => event ? event[key as keyof Event] !== value : true)
                .some(Boolean)
            ) {
                try {
                    const parsedFormData = createEventSchema.parse(formData);

                    await trigger({
                        ...parsedFormData,
                        type: eventType,
                    } as CreateEventPayload);
                } catch (error) {
                    console.log(error);
                    toast.error('An error occurred, please try again later');
                }
            }
            
            onModeToggle();
            return;
        }

        setCurrentStepIndex(newIndex);
    };

    return (
        <div className="flex flex-col gap-8 w-full h-full -mt-5">
            <div className="flex justify-between items-center w-full">
                <p className="text-2xl text-primary font-semibold">Event</p>
                <Button
                    loading={isMutating}
                    onClick={handleStepChange(currentStepIndex + 1)}
                    className="text-sm"
                >
                    {currentStepIndex === steps.length - 1 ? 'Finish' : 'Save and continue'}
                </Button>
            </div>
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
