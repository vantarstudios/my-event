'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import { useRequest, useUserProfile } from '@/lib/hooks';
import { eventsAPI } from '@/lib/api/events';
import { Role } from '@/types/constants';
import type { EventQuery } from '@/types/events';
import { EventCard } from '@components/events';
import { EventsListSkeleton } from '@components/ui/skeletons';

interface EventsListProps {
    maxEvents?: number;
    filter?: EventQuery;
}

const EventsList: FunctionComponent<EventsListProps> = ({ maxEvents, filter }) => {
    const { user: userProfile } = useUserProfile();
    
    const { data: events, error, isLoading, mutate } = useRequest(
        userProfile ? [`${userProfile.id}-events`, userProfile.id, filter] : null,
        async ([_, organizerId, params]) => {
            let response;
            
            if (userProfile!.role === Role.ADMIN) {
                response = await eventsAPI.getAllEvents();
            } else {
                response = await eventsAPI.getAllEventsForOrganizer(organizerId, params);
            }
            
            return response.data;
        },
        { showError: false }
    );
    
    return (
        <Fragment>
            {
                (isLoading && !error) && (
                    <EventsListSkeleton number={maxEvents || 4} cardFormat="titled"/>
                )
            }
            {
                (!isLoading && !error && events && events.total > 0) && (
                    <Fragment>
                        {
                            events.data.slice(0, maxEvents).map(({ id, title, startingDate, status, cover }) => (
                                <EventCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    startingDate={startingDate}
                                    status={status}
                                    cover={cover}
                                    format="titled"
                                    withActions={true}
                                    refreshEvent={mutate}
                                />
                            ))
                        }
                    </Fragment>
                )
            }
            {
                (!isLoading && !error && events && events.total === 0) && (
                    <p className="w-full my-10 text-gray-500">No events found</p>
                )
            }
            {
                (!isLoading && error) && (
                    <p className="w-full my-10 text-gray-500">Sorry, something went wrong</p>
                )
            }
        </Fragment>
    );
};

export default EventsList;
