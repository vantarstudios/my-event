'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import type { TicketType as TTicketType } from '@/types';
import { CreateTicket } from '@components/tickets';
import TicketType from './ticket-type';

interface TicketingProps {
    ticketTypes?: TTicketType[];
}

const Ticketing: FunctionComponent<TicketingProps> = ({ ticketTypes }) => {
    const [ticketTypesList, setTicketTypesList] = useState<TTicketType[]>(ticketTypes || []);

    const addTicketType = (ticketType: TTicketType) => {
        setTicketTypesList([...ticketTypesList, ticketType]);
    };

    const deleteTicketType = (ticketTypeTitle: TTicketType['title']) => () => {
        setTicketTypesList(ticketTypesList.filter((tt) => tt.title !== ticketTypeTitle));
    };

    return (
        <div className="flex flex-col gap-10 w-full h-full">
            {ticketTypes && <CreateTicket onSave={addTicketType} />}
            <div className="flex flex-col gap-5 px-10">
                {ticketTypesList.map((ticketType) => (
                    <TicketType
                        key={ticketType.title}
                        ticket={ticketType}
                        mode="edit"
                        onDelete={deleteTicketType(ticketType.title)}
                    />
                ))}
            </div>
            {!ticketTypes && <CreateTicket onSave={addTicketType} />}
        </div>
    );
};

export default Ticketing;
