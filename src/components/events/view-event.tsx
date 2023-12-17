import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import type { Event } from '@/types';
import { EventCard, CategoryChip } from '@components/events';
import { TitledArea } from '@components/ui/layouts';
import { TicketType } from '@components/tickets';

interface ViewEventProps {
    event: Event;
}

const ViewEvent: FunctionComponent<ViewEventProps> = ({ event }) => {
    return (
        <Fragment>
            <div className="w-1/3 h-full">
                <EventCard startingDate={event.startingDate} cover={event.cover} format="unconstrained" asLink={false} />
            </div>
            <div className="flex flex-col gap-8 overflow-y-auto w-2/3 h-full pl-10">
                <p className="text-2xl font-semibold">{event.title}</p>
                <p>{event.description}</p>
                <div className="flex flex-wrap justify-start items-center gap-2 w-full h-fit">
                    {event.categories.map((category) => (
                        <CategoryChip key={category} text={category} />
                    ))}
                </div>
                <TitledArea title="Tickets" className="w-full">
                    <div className="flex flex-col justify-start items-center w-full">
                        {event.tickets.map((ticket) => (
                            <TicketType key={ticket.title} ticket={ticket} mode="view" />
                        ))}
                    </div>
                </TitledArea>
            </div>
        </Fragment>
    );
};

export default ViewEvent;
