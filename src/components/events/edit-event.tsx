import type { FunctionComponent } from 'react';
import type { Event, EditOrCreateStep } from '@/types';
import { Ticketing } from '@components/tickets';
import NameAndCover from './name-and-cover';
import DateAndLocation from './date-and-location';
import EditOrCreateEventLayout from './edit-or-create-event-layout';

interface EditEventProps {
    event: Event;
}

const EditEvent: FunctionComponent<EditEventProps> = ({ event }) => {
    const editingSteps: EditOrCreateStep[] = [
        {
            title: 'Name & cover',
            content: (
                <NameAndCover
                    cover={event.cover}
                    title={event.title}
                    description={event.description}
                    categories={event.categories}
                />
            ),
        },
        {
            title: 'Date & location',
            content: (
                <DateAndLocation
                    type={event.type}
                    startingDate={event.startingDate}
                    endingDate={event.endingDate}
                    location={event.location}
                />
            ),
        },
        {
            title: 'Ticketing',
            content: <Ticketing ticketTypes={event.tickets} />,
        },
    ];

    return <EditOrCreateEventLayout steps={editingSteps} layout="edit" />;
};

export default EditEvent;
