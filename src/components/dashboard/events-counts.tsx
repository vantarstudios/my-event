import type { FunctionComponent, ReactNode } from 'react';
import { Card } from '@/components/common';

interface CardProps {
    moreActions?: ReactNode;
}

const EventsCounts: FunctionComponent<CardProps> = ({ moreActions }) => {
    return (
        <Card className="flex flex-col gap-4 w-2/5 h-48 py-6 px-12 hover:shadow-md">
            <div className="flex justify-between items-center w-full h-10">
                <p className="text-2xl font-bold text-primary">Events</p>
                {moreActions}
            </div>
            <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-5xl font-medium">05</p>
                    <p className="text-sm font-medium">Total</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-5xl font-light">00</p>
                    <p className="text-sm font-light">On going</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-5xl font-light">02</p>
                    <p className="text-sm font-light">Up Coming</p>
                </div>
            </div>
        </Card>
    );
};

export default EventsCounts;
