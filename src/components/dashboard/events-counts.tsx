import type { FunctionComponent, ReactNode } from 'react';
import { leadingZeroFormat } from '@/lib/utils';
import { Card } from '@components/ui/layouts';

interface EventCountsProps {
    moreActions?: ReactNode;
}

const EventsCounts: FunctionComponent<EventCountsProps> = ({ moreActions }) => {
    return (
        <Card className="flex flex-col gap-4 w-fit h-48 py-6 px-12 hover:shadow-md">
            <div className="flex justify-between items-center w-full h-10">
                <p className="text-xl font-bold text-primary">Events</p>
                {moreActions}
            </div>
            <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col justify-center items-center gap-2.5">
                    <p className="text-5xl font-medium">{leadingZeroFormat(5)}</p>
                    <p className="font-medium">Total</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2.5">
                    <p className="text-5xl font-light">{leadingZeroFormat(0)}</p>
                    <p className="font-light">On going</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2.5">
                    <p className="text-5xl font-light">{leadingZeroFormat(2)}</p>
                    <p className="font-light">Up Coming</p>
                </div>
            </div>
        </Card>
    );
};

export default EventsCounts;
