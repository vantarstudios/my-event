'use client';

import type { FunctionComponent, MouseEvent } from 'react';
import Image from 'next/image';
import type { Event } from '@/types';

interface EventCardProps extends Omit<Event, 'id'> {
    onClick?: () => void;
}

const EventCard: FunctionComponent<EventCardProps> = ({ title, date, image, onClick }) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (onClick) {
            onClick();
        }
    };

    return (
        <div onClick={handleClick} className="relative flex flex-col gap-2 cursor-pointer">
            <div className="absolute top-5 left-6 h-[50px] aspect-square text-white rounded-xl bg-primary">
                <p className="flex justify-center items-center text-2xl leading-relaxed font-semibold h-fit">
                    0{date.day}
                </p>
                <p className="flex justify-center items-center leading-1 text-sm font-thin h-fit">{date.month}</p>
            </div>
            <Image src={image} alt={title} width={270} height={150} />
            <div className="w-full pl-3 text-sm font-semibold">{title}</div>
        </div>
    );
};

export default EventCard;
