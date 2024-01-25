import type { FunctionComponent } from 'react';
import { TitledArea } from '@components/ui/layouts';
import { EventsList } from '@components/events';

const RecentEvents: FunctionComponent = () => {
    return (
        <TitledArea title="Recents" className="w-full">
            <div className="flex flex-wrap gap-x-5 xl:gap-x-10 gap-y-5 w-full">
                <EventsList maxEvents={3}/>
            </div>
        </TitledArea>
    );
};

export default RecentEvents;
