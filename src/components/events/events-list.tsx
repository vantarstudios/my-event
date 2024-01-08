'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import { useRequest, useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';
import { eventsAPI } from '@/lib/api/events';
import { Role } from '@/types/constants';
import { EventCard } from '@components/events';
import { Loader } from '@components/ui';

interface EventsListProps {
    maxEvents?: number;
}

const EventsList: FunctionComponent<EventsListProps> = ({ maxEvents }) => {
    const userProfile = useSelector(selectProfile);
    
    const { data: events, error, isLoading } = useRequest(
        userProfile?.id ? [`${userProfile.id}-events`, userProfile.id] : null,
        async ([_, organizerId]) => {
            let response;
            
            if (userProfile.role === Role.ADMIN) {
                response = await eventsAPI.getAllEvents();
            } else {
                response = await eventsAPI.getAllEventsForOrganizer(organizerId);
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
                (isLoading) && (
                    <Loader />
                )
            }
            {
                (!isLoading && !error && events && events.data.length > 0) && (
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
                    <p className="w-full mt-10 text-gray-500">No events found</p>
                )
            }
            {
                (!isLoading && error) && (
                    <p className="w-full my-10 text-gray-500">Something went wrong</p>
                )
            }
        </Fragment>
    );
};

export default EventsList;
