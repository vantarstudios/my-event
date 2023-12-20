'use client';

import type { FunctionComponent } from 'react';
import type { Ticket as TicketType, Event } from '@/types';
import type { CreateTicketPayload } from '@/types/tickets';
import { CreateTicket, TicketsList, Ticket } from '@components/tickets';

interface TicketingProps {
    layout: 'create' | 'edit';
    event?: Event;
    newTickets: CreateTicketPayload[];
    onTicketAdd: (ticket: CreateTicketPayload, toDelete?: boolean) => void;
}

const Ticketing: FunctionComponent<TicketingProps> = ({ layout, event, newTickets, onTicketAdd }) => {
    const CreateTicketComponent = () => {
        return (
            <CreateTicket
                eventStartingDate={event?.startingDate}
                eventEndingDate={event?.endingDate}
                onSave={onTicketAdd}
            />
        )
    };
    
    return (
        <div className="flex flex-col gap-10 w-full h-full">
            {layout === 'edit' && <CreateTicketComponent />}
            <div className="flex flex-col gap-5 px-10">
                { event && <TicketsList mode="edit" event={event}/> }
                {newTickets.map((ticket, index) => (
                    <Ticket
                        key={index}
                        ticket={ticket as TicketType}
                        mode="edit"
                        onDelete={() => onTicketAdd(ticket, true)}
                    />
                ))}
            </div>
            {layout === 'create' && <CreateTicketComponent />}
        </div>
    );
};

export default Ticketing;
