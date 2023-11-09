import type { FunctionComponent } from 'react';
import { Card } from '@components/common';
import { TitledArea } from '@components/common/layouts';

type Notification = {
    readonly subject: string;
    readonly description: string;
};

const Notifications: FunctionComponent = () => {
    const notifications: Notification[] = [
        {
            subject: 'AfriTech 2023',
            description: "You've reached a total of 1,000 sold tickets.",
        },
        {
            subject: 'AfriTech 2023',
            description: "You've reached a total of 1,000 sold tickets.",
        },
    ];

    return (
        <TitledArea title={`Notifications (${notifications.length})`} className="relative w-3/5 h-36 px-1.5">
            <button className="absolute top-0 right-0 flex justify-center items-end w-fit h-fit text-sm font-medium text-primary -translate-x-3">
                See all
            </button>
            <div className="flex flex-col gap-4 px-1.5 w-full h-full overflow-hidden">
                {notifications.map(({ subject, description }, index) => (
                    <Card key={index} className="flex flex-col gap-2 w-full">
                        <p className="text-sm font-medium text-stone-900">{subject}</p>
                        <p className="text-sm">{description}</p>
                    </Card>
                ))}
            </div>
        </TitledArea>
    );
};

export default Notifications;
