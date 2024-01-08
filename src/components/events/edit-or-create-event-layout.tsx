'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useMutationRequest } from '@/lib/hooks';
import { toast } from '@/lib/utils';
import { eventsAPI } from '@/lib/api/events';
import { ticketsAPI } from '@/lib/api/tickets';
import { createEventSchema } from '@/types/events';
import type { CreateEventPayload, UpdateEventPayload } from '@/types/events';
import type { CreateTicketPayload } from '@/types/tickets';
import type { EditOrCreateStep, Event, EventTypeUnion } from '@/types';
import { Button } from '@components/ui/buttons';
import { Ticketing } from '@components/tickets';
import EventEditionStepper from './event-edition-stepper';
import NameAndCover from './name-and-cover';
import DateAndLocation from './date-and-location';

interface EditOrCreateEventLayoutProps {
    layout: 'create' | 'edit';
    onModeToggle: () => void;
    eventType: EventTypeUnion;
    event?: Event;
}

const EditOrCreateEventLayout: FunctionComponent<EditOrCreateEventLayoutProps> = ({ layout, onModeToggle, event, eventType }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [newTickets, setNewTickets] = useState<CreateTicketPayload[]>([]);
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
            
            if (response.data.success) {
                const createdEvent = response.data.data;
                
                for (const ticket of newTickets) {
                    await ticketsAPI.createTicket(
                        layout === 'create' ? createdEvent.id : event!.id,
                        ticket
                    );
                }
            }
            
            return response.data;
        },
        layout === 'edit'
            ? newTickets.length > 0
                ? 'Event and tickets updated successfully'
                : 'Event updated successfully'
            : newTickets.length > 0
                ? 'Event and tickets created successfully'
                : 'Event created successfully',
    );
    
    const handleDataChange = <T extends keyof CreateEventPayload>(key: T) => (value: CreateEventPayload[T]) => {
        setFormData((currentData) => ({ ...currentData, [key]: value }));
    };
    
    const handleTicketChange = (ticket: CreateTicketPayload, toDelete: boolean = false) => {
        setNewTickets((currentTickets) => {
            if (toDelete) {
                return currentTickets.filter((currentTicket) => currentTicket.title !== ticket.title);
            }
            
            return [...currentTickets, ticket];
        });
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
            content: <Ticketing
                layout={layout}
                event={event}
                newTickets={newTickets}
                onTicketAdd={handleTicketChange}
            />,
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
                    toast.error('An error occurred, please try again later');
                }
            }
            
            onModeToggle();
            return;
        }

        setCurrentStepIndex(newIndex);
    };

    return (
        <div className="flex flex-col gap-8 w-full h-full">
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
