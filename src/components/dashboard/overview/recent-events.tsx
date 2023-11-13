import type { FunctionComponent } from 'react';
import { EventCard } from '@components/ui';
import { TitledArea } from '@components/ui/layouts';
import events from '@/data/events';

const RecentEvents: FunctionComponent = () => {
    const recentEvents = events.slice(0, 3);

    return (
        <TitledArea title="Recents" className="w-full h-36">
            <div className="flex flex-wrap justify-start gap-10 w-full">
                {recentEvents.map((event, index) => (
                    <EventCard key={index} {...event} format="titled" />
                ))}
            </div>
        </TitledArea>
    );
};

export default RecentEvents;
