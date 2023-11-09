import type { FunctionComponent } from 'react';
import { EventCard } from '@components/common';
import { TitledArea } from '@components/common/layouts';

const events = [
    {
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_1.png',
    },
    {
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_2.png',
    },
    {
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_3.png',
    },
    {
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_3.png',
    },
];

const RecentEvents: FunctionComponent = () => {
    return (
        <TitledArea title="Recents" className="w-full h-36">
            <div className="flex gap-5 w-full overflow-hidden">
                {events.map(({ title, date, image }, index) => (
                    <EventCard key={index} title={title} date={date} image={image} />
                ))}
            </div>
        </TitledArea>
    );
};

export default RecentEvents;
