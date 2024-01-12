import type { FunctionComponent } from 'react';
import { TitledArea } from '@components/ui/layouts';
import { EventsList } from '@components/events';

const RecentEvents: FunctionComponent = () => {
    return (
        <TitledArea title="Recents" className="w-full h-36">
            <div className="flex flex-wrap justify-start gap-10 w-full">
                <EventsList maxEvents={3}/>
            </div>
        </TitledArea>
    );
};

export default RecentEvents;
