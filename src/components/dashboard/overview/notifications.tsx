import type { FunctionComponent } from 'react';
import { leadingZeroFormat } from '@/lib/utils';
import { Button } from '@components/ui/buttons';
import { Card, TitledArea } from '@components/ui/layouts';
import notifications from '@/data/notifications';

const Notifications: FunctionComponent = () => {
    const notificationsToShow = notifications.slice(0, 2);

    return (
        <TitledArea
            title={`Notifications (${leadingZeroFormat(notifications.length)})`}
            className="w-3/5 h-36 px-1.5"
            indicator={
                <Button className="flex justify-center items-end w-fit h-fit px-0 text-sm font-medium text-primary bg-inherit -translate-x-3 hover:underline">
                    See all
                </Button>
            }
        >
            <div className="flex flex-col gap-4 px-1.5 w-full h-full overflow-hidden">
                {notificationsToShow.map(({ subject, description }, index) => (
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
