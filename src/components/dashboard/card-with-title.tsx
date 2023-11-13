import type { FunctionComponent, ReactNode } from 'react';
import { Card } from '@components/ui';

interface CardProps {
    title: string;
    middle: ReactNode;
    bottom: ReactNode;
    corner?: ReactNode;
}

const EventsCounts: FunctionComponent<CardProps> = ({ title, middle, bottom, corner }) => {
    return (
        <Card className="flex flex-col gap-4 w-2/5 h-48 py-6 px-12 min-w-fit hover:shadow-md">
            <div className="flex justify-between items-center w-full h-10">
                <p className="text-2xl font-bold text-primary">{title}</p>
                {corner}
            </div>
            <div className="flex justify-between items-center text-5xl">{middle}</div>
            <div className="flex justify-between items-center text-sm font-light">{bottom}</div>
        </Card>
    );
};

export default EventsCounts;
