'use client';

import type { FunctionComponent } from 'react';
import { useToggle } from '@/lib/hooks';
import type { Event, Mode } from '@/types';
import { EditSaveButton } from '@components/dashboard';
import ViewEvent from './view-event';
import EditEvent from './edit-event';

interface EditOrViewEventProps {
    event: Event;
}

const DashboardEditEventPage: FunctionComponent<EditOrViewEventProps> = ({ event }) => {
    const [mode, toggleMode] = useToggle<Mode>('view', 'edit');

    return (
        <div className="relative flex w-full h-full">
            <EditSaveButton mode={mode} onClick={toggleMode} className="absolute bottom-full right-0 -translate-y-8" />
            {mode === 'view' ? <ViewEvent event={event} /> : <EditEvent event={event} />}
        </div>
    );
};

export default DashboardEditEventPage;
