'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import { useRequest, useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/states/profile';
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
    const userProfile = useSelector(selectProfile);
    
    const { data: events, error, isLoading, mutate } = useRequest(
        userProfile?.id ? [`${userProfile.id}-events`, userProfile.id, filter] : null,
        async ([_, organizerId, params]) => {
            let response;
            
            if (userProfile.role === Role.ADMIN) {
                response = await eventsAPI.getAllEvents();
            } else {
                response = await eventsAPI.getAllEventsForOrganizer(organizerId, params);
            }
            
            if (response.data.success === false) {
                throw new Error(response!.data.error.message);
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
                (!isLoading && !error && events && events.data.length > 0) && (
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
                (!isLoading && !error && events?.data.length === 0) && (
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
