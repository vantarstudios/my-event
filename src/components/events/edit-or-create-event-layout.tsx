'use client';

import { useState, type FunctionComponent, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname, type ReadonlyURLSearchParams } from 'next/navigation';
import { useMutationRequest } from '@/lib/hooks';
import { toast } from '@/lib/utils';
import { eventsAPI } from '@/lib/api/events';
import { ticketsAPI } from '@/lib/api/tickets';
import { EventStatus } from '@/types/constants';
import { createEventSchema, type CreateEventPayload, type UpdateEventPayload } from '@/types/events';
import type { CreateTicketPayload, UpdateTicketPayload } from '@/types/tickets';
import type {
    EditOrCreateStep,
    Event,
    EventTypeUnion,
    Ticket,
    Layout,
    ApiResponse,
} from '@/types';
import { Button } from '@components/ui/buttons';
import { Ticketing } from '@components/tickets';
import { Stepper } from '@components/ui/form';
import NameAndCover from './name-and-cover';
import DateAndLocation from './date-and-location';

interface EditOrCreateEventLayoutProps {
    layout: Layout;
    onModeToggle: () => void;
    eventType: EventTypeUnion;
    event?: Event;
}

type MutationPayload = CreateEventPayload & {
    tickets: CreateTicketPayload[],
    eventChanged: boolean,
    ticketsChanged: boolean
};

const currentStepIndexSetterFactory = (router: ReturnType<typeof useRouter>, pathname: string, searchParams: ReadonlyURLSearchParams) => (newIndex: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('step', String(newIndex));
    router.replace(`${pathname}?${newSearchParams.toString()}`);
};

const EditOrCreateEventLayout: FunctionComponent<EditOrCreateEventLayoutProps> = ({ layout, onModeToggle, event, eventType }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const setCurrentStepIndex = currentStepIndexSetterFactory(router, pathname, searchParams);
    
    const currentStepIndex = searchParams.has('step')
        ? Number(searchParams.get('step'))
        : 0;
    
    useEffect(() => {
        if (!searchParams.has('step')) {
            setCurrentStepIndex(0);
        }
    }, [searchParams]);
    
    const toBePublished = (
        layout === 'create'
        || (layout === 'edit' && event?.status === EventStatus.DRAFT)
    );
    
    const [newTickets, setNewTickets] = useState<CreateTicketPayload[]>([]);
    const [formData, setFormData] = useState<CreateEventPayload>({
        title: event?.title || '',
        description: event?.description || '',
        categories: event?.categories || [],
        type: event?.type || eventType,
        startingDate: event?.startingDate || '',
        endingDate: event?.endingDate || '',
        location: event?.location || '',
        status: event?.status || EventStatus.DRAFT,
    });
    
    const { trigger: createOrUpdateEvent, isMutating: isCreatingOrUpdatingEvent } = useMutationRequest(
        'create-event',
        async (_: string, { arg: { eventChanged, ticketsChanged, tickets, ...payload } }: { arg: MutationPayload }) => {
            let response;
            
            if (eventChanged) {
                if (layout === 'create') {
                    response = await eventsAPI.createEvent(payload);
                } else {
                    response = await eventsAPI.updateEvent(event!.id, payload as UpdateEventPayload);
                }
            } else {
                response = {
                    data: {
                        success: true,
                        data: event,
                        timestamp: new Date().toISOString()
                    } as ApiResponse<Event>
                };
            }
            
            if (ticketsChanged && response.data.success) {
                const createdEvent = response.data.data;
                
                for (const ticket of tickets) {
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
    
    const { trigger: updateTicket, isMutating: isUpdatingTicket } = useMutationRequest(
        'update-ticket',
        async (
            _: string,
            {
                arg: { ticketId, data, eventId }
            }: { arg: { ticketId: Ticket['id'], data: UpdateTicketPayload, eventId: Event['id'] } }
        ) => {
            const response = await ticketsAPI.updateTicket(eventId, ticketId, data);
            
            if (!response.data.success) {
                throw new Error('Unable to update this ticket');
            }
            
            return response.data;
        },
        'Ticket updated successfully'
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
    
    const handleTicketEdit = async (ticketId: Ticket['id'], data: UpdateTicketPayload, hasChanged: boolean) => {
        if (!hasChanged) {
            return;
        }
        
        await updateTicket({ ticketId, data, eventId: event!.id });
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
            isCompleted: formData.title !== ''
                && formData.description !== ''
                && formData.categories.length > 0
                && formData.cover !== undefined,
        },
        {
            title: 'Date & location',
            content: (
                <DateAndLocation
                    layout={layout}
                    {...formData}
                    setOtherData={handleDataChange}
                />
            ),
            isCompleted: formData.startingDate !== '' && formData.endingDate !== '' && formData.location !== '',
        },
        {
            title: 'Ticketing',
            content: <Ticketing
                layout={layout}
                event={{ ...event, startingDate: formData.startingDate, endingDate: formData.endingDate } as Event}
                newTickets={newTickets}
                isUpdating={isUpdatingTicket}
                onTicketEdit={handleTicketEdit}
                onTicketAdd={handleTicketChange}
            />,
            isCompleted: true,
        },
    ];

    const handleStepChange = (newIndex: number, eventStatus?: EventStatus) => async () => {
        if (newIndex === steps.length) {
            if (isCreatingOrUpdatingEvent || isUpdatingTicket) {
                return;
            }
            
            const data = { ...formData, status: eventStatus || formData.status };
            
            const eventChanged = Object.entries(data)
                .map(([key, value]) => event ? event[key as keyof Event] !== value : true)
                .some(Boolean);
            
            const ticketsChanged = newTickets.length > 0;
            
            if (eventChanged || ticketsChanged) {
                try {
                    const parsedFormData = createEventSchema.parse(data);

                    await createOrUpdateEvent({
                        ...parsedFormData,
                        type: eventType,
                        tickets: newTickets,
                        eventChanged,
                        ticketsChanged,
                    } as MutationPayload);
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
                <div className="flex items-center gap-5">
                    <Button
                        loading={isCreatingOrUpdatingEvent && !toBePublished}
                        onClick={handleStepChange(currentStepIndex + 1)}
                        disabled={layout === 'create' && !steps[currentStepIndex]!.isCompleted}
                        className="text-sm"
                    >
                        {currentStepIndex === steps.length - 1 ? 'Save' : 'Save and continue'}
                    </Button>
                    {
                        (currentStepIndex === steps.length - 1 && toBePublished) && (
                            <Button
                                loading={isCreatingOrUpdatingEvent}
                                onClick={handleStepChange(currentStepIndex + 1, EventStatus.PUBLISHED)}
                                disabled={layout === 'create' && !steps[currentStepIndex]!.isCompleted}
                                className="text-sm"
                            >
                                Publish
                            </Button>
                        )
                    }
                </div>
            </div>
            <Stepper
                currentStepIndex={currentStepIndex}
                onStepClick={setCurrentStepIndex}
                steps={steps.map(({ title }) => title)}
                canGoToNextStep={layout === 'create'
                    ? steps[currentStepIndex]!.isCompleted
                    : true
                }
            />
            {steps[currentStepIndex]!.content}
        </div>
    );
};

export default EditOrCreateEventLayout;
