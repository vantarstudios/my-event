'use client';

import type { FunctionComponent } from 'react';
import type { Ticket as TicketType, Event, Layout } from '@/types';
import type { CreateTicketPayload } from '@/types/tickets';
import { CreateTicket, TicketsList, Ticket } from '@components/tickets';
import { TitledArea } from '@components/ui/layouts';
import { Input } from '@components/ui/form';

interface TicketingProps {
    layout: Layout;
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
        <div className="relative flex flex-col gap-10 w-full h-full">
            {layout === 'edit' && <CreateTicketComponent />}
            <div className="flex flex-col gap-5 px-10 overflow-y-auto">
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
            <TitledArea title="Add SMI code" className="sticky bottom-0 left-0 w-fit">
                <Input
                    type="text"
                    name="smiCode"
                    placeholder="SMI code"
                    className=""
                    variant="auth"
                />
            </TitledArea>
        </div>
    );
};

export default Ticketing;
