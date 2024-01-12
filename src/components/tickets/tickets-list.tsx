import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import { useRequest } from '@/lib/hooks';
import { ticketsAPI } from '@/lib/api/tickets';
import type { Mode, Event, Ticket as TicketType } from '@/types';
import { Ticket } from '@components/tickets';
import { TicketsListSkeleton } from '@components/ui/skeletons';

interface TicketsListProps {
    mode: Mode;
    event: Event;
}

const TicketsList: FunctionComponent<TicketsListProps> = ({ mode, event }) => {
    const { data: eventTickets, error, isLoading } = useRequest(
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
    
    const deleteTicket = (ticketId: TicketType['id']) => () => {
        console.log(ticketId)
    };
    
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
                                    onDelete={deleteTicket(ticket.id)}
                                />
                            ))
                            : <p className="text-center w-full mt-10">No tickets available</p>
            }
        </Fragment>
    );
};

export default TicketsList;
