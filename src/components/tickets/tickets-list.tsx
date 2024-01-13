'use client';

import { Fragment, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRequest, useMutationRequest } from '@/lib/hooks';
import { ticketsAPI } from '@/lib/api/tickets';
import type { Mode, Event, Ticket as TicketType } from '@/types';
import { Ticket } from '@components/tickets';
import { DeletionConfirmModal } from '@components/ui/layouts';
import { TicketsListSkeleton } from '@components/ui/skeletons';

interface TicketsListProps {
    mode: Mode;
    event: Event;
    showEmpty?: boolean;
}

const TicketsList: FunctionComponent<TicketsListProps> = ({ mode, event, showEmpty = true }) => {
    const [ticketToDelete, setTicketToDelete] = useState<TicketType | null>(null);
    const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
    
    const { data: eventTickets, error, isLoading, mutate } = useRequest(
        event?.id ? [`event-${event.id}-tickets`, event.id] : null,
        async ([_, eventId]) => {
            const response = await ticketsAPI.getTicketsForEvent(eventId);
            
            if (!response.data.success) {
                throw new Error('Unable to fetch tickets for this event');
            }
            
            return response.data;
        },
        { showError: false }
    );
    
    const { trigger: triggerDelete, isMutating: isDeleting } = useMutationRequest(
        ticketToDelete
            ? `delete-ticket-${ticketToDelete.id}-for-event-${event.id}`
            : null,
        async (
            _: string,
            { arg: { eventId, ticketId } }: { arg: { eventId: Event['id'], ticketId:TicketType['id'] } }
        ) => {
            const response = await ticketsAPI.deleteTicket(eventId, ticketId);
            
            if (!response.data.success) {
                throw new Error('Unable to delete this ticket');
            }
            
            return response.data;
        },
        'Ticket deleted successfully'
    );
    
    const askDeleteTicket = (ticket: TicketType) => async () => {
        setTicketToDelete(ticket);
        setIsDeletionModalOpen(true);
    };
    
    const handleDeleteTicket = async () => {
        if (!ticketToDelete) {
            return;
        }
        
        try {
            await triggerDelete({ eventId: event.id, ticketId: ticketToDelete.id });
            await mutate();
        } catch (error) {
            console.error(error);
        } finally {
            setTicketToDelete(null);
            setIsDeletionModalOpen(false);
        }
    }
    
    return (
        <Fragment>
            {
                isLoading
                    ? <TicketsListSkeleton number={3}/>
                    : error
                        ? <p className="text-sm text-center w-full">Unable to fetch existing tickets</p>
                        : eventTickets?.data && eventTickets.data.length > 0
                            ? eventTickets?.data.map((ticket, index) => (
                                <Ticket
                                    key={index}
                                    ticket={ticket}
                                    mode={mode}
                                    onDelete={askDeleteTicket(ticket)}
                                />
                            ))
                            : (
                                <>
                                    {showEmpty && <p className="text-center w-full mt-10">No tickets available</p>}
                                </>
                            )
            }
            <DeletionConfirmModal
                title={`Delete ticket " ${ticketToDelete?.title} "`}
                description="Are you sure you want to delete this ticket? This action is irreversible."
                isModalOpen={isDeletionModalOpen}
                isDeleting={isDeleting}
                onConfirm={handleDeleteTicket}
                onCancel={() => setIsDeletionModalOpen(false)}
            />
        </Fragment>
    );
};

export default TicketsList;
