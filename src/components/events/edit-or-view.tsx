'use client';

import type { FunctionComponent } from 'react';
import { useToggle } from '@/lib/hooks';
import type { Event, Mode } from '@/types';
import ViewEvent from './view-event';
import EditOrCreateEventLayout from './edit-or-create-event-layout';

interface EditOrViewEventProps {
    event: Event;
}

const DashboardEditEventPage: FunctionComponent<EditOrViewEventProps> = ({ event }) => {
    const [mode, toggleMode] = useToggle<Mode>('view', 'edit');

    return (
        <div className="relative flex w-full h-full">
            {
                mode === 'view'
                    ? <ViewEvent
                        event={event}
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
