import { Fragment, type FunctionComponent } from 'react';
import type { Event } from '@/types';
import { EventCard, CategoryChip } from '@components/events';
import { EditSaveButton } from '@components/dashboard';
import { TitledArea } from '@components/ui/layouts';
import { TicketsList } from '@components/tickets';

interface ViewEventProps {
    event: Event;
    onModeToggle: () => void;
}

const ViewEvent: FunctionComponent<ViewEventProps> = ({ event, onModeToggle }) => {
    return (
        <Fragment>
            <EditSaveButton mode="view" onClick={onModeToggle}
                            className="absolute bottom-full right-0 -translate-y-8"/>
            <div className="w-1/3 h-full">
                <EventCard
                    startingDate={event.startingDate}
                    cover={event.cover}
                    format="unconstrained"
                    asLink={false}
                />
            </div>
            <div className="flex flex-col gap-8 overflow-y-auto w-2/3 h-full pl-10">
                <p className="text-2xl font-semibold">{event.title}</p>
                <p>{event.description}</p>
                <div className="flex flex-wrap justify-start items-center gap-2 w-full h-fit">
                    {event.categories.map((category) => (
                        <CategoryChip key={category} category={`#${category}`} />
                    ))}
                </div>
                <TitledArea title="Tickets" className="w-full">
                    <div className="flex flex-col justify-start items-center gap-5 w-full">
                        <TicketsList mode="view" event={event}/>
                    </div>
                </TitledArea>
            </div>
        </Fragment>
    );
};

export default ViewEvent;
