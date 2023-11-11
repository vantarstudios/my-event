import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/types';

interface EventCardProps extends Pick<Event, 'id' | 'title' | 'date' | 'image'> {}

const EventCard: FunctionComponent<EventCardProps> = ({ id, title, date, image }) => {
    return (
        <Link href={`/dashboard/events/${id}`} className="relative flex flex-col gap-2 cursor-pointer">
            <div className="absolute top-5 left-6 h-[50px] aspect-square text-white rounded-xl bg-primary">
                <p className="flex justify-center items-center text-2xl leading-relaxed font-semibold h-fit">
                    0{date.day}
                </p>
                <p className="flex justify-center items-center leading-1 text-sm font-thin h-fit">{date.month}</p>
            </div>
            <Image src={image} alt={title} width={270} height={170} className="w-[270px] h-[170px]" />
            <div className="w-full pl-3 text-sm font-semibold">{title}</div>
        </Link>
    );
};

export default EventCard;
