import type { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { leadingZeroFormat, parseDateTime, monthNumToString } from '@/lib/utils';
import { imagesPlaceholder } from '@/data/images-placeholder';
import type { Event } from '@/types';

interface EventCardProps extends Partial<Pick<Event, 'id' | 'title' | 'startingDate'>> {
    cover: Event['cover'];
    format: 'titled' | 'unconstrained';
    asLink?: boolean;
}

const EventCard: FunctionComponent<EventCardProps> = ({ id, title, startingDate, cover, format, asLink = true }) => {
    const { date, time } = startingDate
        ? parseDateTime(startingDate, 'both')
        : { date: undefined, time: undefined };
    
    return (
        <Link
            href={asLink && id ? `/dashboard/events/${id}` : ''}
            className={`relative flex flex-col gap-2 ${format === 'unconstrained' ? 'w-full h-full' : 'w-[250px]'} ${
                !asLink && 'pointer-events-none'
            }`}
        >
            {
                cover
                    ? (
                        <Image
                            src={cover}
                            alt={title || 'Event cover'}
                            width={format === 'titled' ? 250 : undefined}
                            height={format === 'titled' ? 170 : undefined}
                            fill={format === 'unconstrained'}
                            quality={100}
                            placeholder={imagesPlaceholder}
                            className={`min-w-[250px] min-h-[170px] object-cover object-center rounded-3xl ${
                                format === 'unconstrained' ? 'h-full' : 'w-[250px] h-[170px]'
                            }`}
                        />
                    )
                    : (
                        <div
                            className={`min-w-[250px] min-h-[170px] bg-cover bg-center rounded-3xl ${
                                format === 'unconstrained' ? 'h-full' : 'w-[250px] h-[170px]'
                            } ${
                                !cover && ' bg-gradient-to-tl from-primary to-secondary opacity-50'
                            }`}
                        />
                    )
            }
            {date && (
                <div className="absolute top-5 left-6 flex flex-col justify-center items-center h-14 aspect-square text-white rounded-xl bg-primary">
                    <p className="flex justify-center items-center text-2xl font-semibold h-fit">
                        {leadingZeroFormat(date.day)}
                    </p>
                    <p className="flex justify-center items-center text-sm font-light h-fit">
                        {monthNumToString(date.month, true)}
                    </p>
                </div>
            )}
            {time && (
                <div className="absolute top-20 left-6 translate-y-1 flex flex-col justify-center items-center w-14 h-8 text-white rounded-lg bg-white">
                    <p className="flex justify-center items-center text-black font-semibold h-fit">
                        {leadingZeroFormat(time.hour)}h
                    </p>
                </div>
            )}
            {title && <div className="w-full break-words break-before-all font-semibold">{title}</div>}
        </Link>
    );
};

export default EventCard;
