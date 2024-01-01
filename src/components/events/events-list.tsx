'use client';

import { useContext } from 'react';
import type { FunctionComponent } from 'react';
import { UserContext } from '@/contexts/user-context';
import { useRequest } from '@/lib/hooks';
import { eventsAPI } from '@/lib/api/events';
import { Role } from '@/types/constants';
import { EventCard } from '@components/events';

interface EventsListProps {
    maxEvents?: number;
}

const EventsList: FunctionComponent<EventsListProps> = ({ maxEvents }) => {
    const { userProfile } = useContext(UserContext);
    
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
        <div className="grid grid-cols-4 gap-5 w-full">
            {
                (!isLoading && !error && events) && (
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
                )
            }
        </div>
    );
};

export default EventsList;
