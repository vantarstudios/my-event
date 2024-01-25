'use client';

import type { FunctionComponent } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Event, Mode } from '@/types';
import { EventDetailsSkeleton } from '@components/ui/skeletons';
import ViewEvent from './view-event';
import EditOrCreateEventLayout from './edit-or-create-event-layout';

interface EditOrViewEventProps {
    event: Event;
    eventIsLoading: boolean;
    eventError: boolean;
}

const EditOrView: FunctionComponent<EditOrViewEventProps> = ({ event, eventIsLoading, eventError }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const mode = searchParams.has('mode')
        ? searchParams.get('mode') as Mode
        : 'view';
    
    const toggleMode = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('mode', mode === 'view' ? 'edit' : 'view');
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <div className="relative flex w-full h-full">
            {
                eventIsLoading
                    ? <EventDetailsSkeleton/>
                    : eventError
                        ? (
                            <div className="flex justify-center items-center w-full h-full text-xl font-medium">
                                Sorry, something went wrong
                            </div>
                        )
                        : !event
                            ? (
                                <div className="flex justify-center items-center w-full h-full text-xl font-medium">
                                    Event not found
                                </div>
                            )
                            : mode === 'view'
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

export default EditOrView;
