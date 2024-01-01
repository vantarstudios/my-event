'use client';

import type { FunctionComponent } from 'react';
import { useRequest, useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';
import { eventsAPI } from '@/lib/api/events';
import { Role } from '@/types/constants';
import { EventCard } from '@components/events';

interface EventsListProps {
    maxEvents?: number;
}

const EventsList: FunctionComponent<EventsListProps> = ({ maxEvents }) => {
    const userProfile = useSelector(selectProfile);
    
    const { data: events, error, isLoading } = useRequest(
        `my-events`,
        async () => {
            let response;
            
            if (userProfile.role === Role.ADMIN) {
                response = await eventsAPI.getAllEvents();
            } else {
                response = await eventsAPI.getAllEventsForOrganizer(userProfile.id);
            }
            
            if (response.data.success === false) {
                throw new Error(response!.data.error.message);
            }
            
            return response.data;
        }
    );
    
    return (
        <>
            {
                (!isLoading && !error && events) && (
                    <div className="grid grid-cols-4 gap-5 w-full">
                        {
                            events.data.slice(0, maxEvents).map(({ id, title, startingDate, cover }) => (
                                <EventCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    startingDate={startingDate}
                                    cover={cover}
                                    format="titled"
                                />
                            ))
                        }
                    </div>
                )
            }
            {
                (!isLoading && !error && events?.data.length === 0) && (
                    <p className="w-full text-sm text-gray-500">No events found</p>
                )
            }
        </>
    );
};

export default EventsList;
