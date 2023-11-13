import type { FunctionComponent } from 'react';
import type { TicketType as TTicketType } from '@/types';
import { Button } from '@components/ui';
import TicketType from './ticket-type';

interface TicketingProps {
    ticketTypes: TTicketType[];
}

const Ticketing: FunctionComponent<TicketingProps> = ({ ticketTypes }) => {
    return (
        <div className="flex flex-col gap-10 w-full h-full">
            <Button className="px-8">+ Add a ticket</Button>
            <div className="flex flex-col gap-5 px-10">
                {ticketTypes.map((ticketType) => (
                    <TicketType key={ticketType.name} ticket={ticketType} mode="edit" />
                ))}
            </div>
        </div>
    );
};

export default Ticketing;
