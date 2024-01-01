import type { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { leadingZeroFormat, parseDateTime, monthNumToString } from '@/lib/utils';
import type { Event } from '@/types';

interface EventCardProps extends Partial<Pick<Event, 'id' | 'title' | 'startingDate'>> {
    cover: Event['cover'];
    format: 'titled' | 'unconstrained';
    asLink?: boolean;
}

const EventCard: FunctionComponent<EventCardProps> = ({ id, title, startingDate, cover, format, asLink = true }) => {
    const date = startingDate ? parseDateTime(startingDate, 'date') : undefined;

    return (
        <Link
            href={asLink && id ? `/dashboard/events/${id}` : ''}
            className={`relative flex flex-col gap-2 ${format === 'unconstrained' ? 'w-full h-full' : 'w-[250px]'} ${
                !asLink && 'pointer-events-none'
            }`}
        >
            {date && (
                <div className="absolute top-5 left-6 h-[50px] aspect-square text-white rounded-xl bg-primary">
                    <p className="flex justify-center items-center text-2xl leading-relaxed font-semibold h-fit">
                        {leadingZeroFormat(date.day)}
                    </p>
                    <p className="flex justify-center items-center leading-1 text-sm font-thin h-fit">
                        {monthNumToString(date.month, true)}
                    </p>
                </div>
            )}
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
            {title && <div className="w-full break-words break-before-all text-sm font-semibold">{title}</div>}
        </Link>
    );
};

export default EventCard;
