import type { FunctionComponent } from 'react';
import { eventTypes } from '@/types';
import type { EditOrCreateStep } from '@/types';
import { Ticketing } from '@components/tickets';
import EditOrCreateEventLayout from './edit-or-create-event-layout';
import NameAndCover from './name-and-cover';
import DateAndLocation from './date-and-location';

interface CreateEventProps {
    type: (typeof eventTypes)[number];
}

const CreateEvent: FunctionComponent<CreateEventProps> = ({ type }) => {
    const creationSteps: EditOrCreateStep[] = [
        { title: 'Name & cover', content: <NameAndCover /> },
        { title: 'Date & location', content: <DateAndLocation type={type} /> },
        { title: 'Ticketing', content: <Ticketing /> },
    ];

    return (
        <div className="pl-10">
            <EditOrCreateEventLayout steps={creationSteps} layout="create" />
        </div>
    );
};

export default CreateEvent;
