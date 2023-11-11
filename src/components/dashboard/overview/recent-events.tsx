import type { FunctionComponent } from 'react';
import { EventCard } from '@components/common';
import { TitledArea } from '@components/common/layouts';
import events from '@/data/events';

const RecentEvents: FunctionComponent = () => {
    const recentEvents = events.slice(0, 3);

    return (
        <TitledArea title="Recents" className="w-full h-36">
            <div className="flex flex-wrap justify-start gap-5 w-full">
                {recentEvents.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </TitledArea>
    );
};

export default RecentEvents;
