'use client';

import type { FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';
import { EventCard } from '@components/common';
import events from '@/data/events';

const EventsList: FunctionComponent = () => {
    const router = useRouter();

    return (
        <div className="flex flex-wrap justify-between w-full">
            {events.map((event) => (
                <EventCard key={event.id} onClick={() => router.push(`/dashboard/events/${event.id}`)} {...event} />
            ))}
        </div>
    );
};

export default EventsList;
