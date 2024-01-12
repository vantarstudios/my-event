'use client';

import type { FunctionComponent } from 'react';
import { useToggle } from '@/lib/hooks';
import type { Event, Mode } from '@/types';
import ViewEvent from './view-event';
import EditOrCreateEventLayout from './edit-or-create-event-layout';

interface EditOrViewEventProps {
    event: Event;
    eventIsLoading: boolean;
    eventError: boolean;
}

const DashboardEditEventPage: FunctionComponent<EditOrViewEventProps> = ({ event, eventIsLoading, eventError }) => {
    const [mode, toggleMode] = useToggle<Mode>('view', 'edit');

    return (
        <div className="relative flex w-full h-full">
            {
                mode === 'view'
                    ? <ViewEvent
                        event={event}
                        eventIsLoading={eventIsLoading}
                        eventError={eventError}
                        onModeToggle={toggleMode}
                    />
                    : <EditOrCreateEventLayout
                        layout="edit"
                        event={event}
                        eventType={event.type}
                        onModeToggle={toggleMode}
                    />
            }
        </div>
    );
};

export default DashboardEditEventPage;
