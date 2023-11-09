import type { FunctionComponent } from 'react';
import Image from 'next/image';

interface EventCardProps {
    title: string;
    date: { day: number; month: string };
    image: string;
}

const EventCard: FunctionComponent<EventCardProps> = ({ title, date, image }) => {
    return (
        <div className="relative flex flex-col gap-2">
            <div className="absolute top-5 left-7 z-20 flex flex-wrap justify-center h-12 aspect-square text-white rounded-xl bg-primary">
                <span className="text-2xl font-semibold">0{date.day}</span>
                {
                    //date.month
                }
            </div>
            <Image
                src={image}
                alt={title}
                width={270}
                height={150}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
            />
            <div className="w-full pl-3 text-sm font-semibold">{title}</div>
        </div>
    );
};

export default EventCard;
