import { Fragment, type FunctionComponent } from 'react';
import Link from 'next/link';
import { leadingZeroFormat, parseDateTime, monthNumToString } from '@/lib/utils';
import { imagesPlaceholder } from '@/data/images-placeholder';
import { EventStatus } from '@/types/constants';
import type { Event } from '@/types';
import { ImageWithFallback } from '@components/ui';
import EventCardModal from './event-card-modal';
import EventActions from './event-actions';

interface EventCardProps extends Partial<Pick<Event, 'id' | 'title' | 'startingDate' | 'endingDate' | 'status'>> {
    cover: Event['cover'];
    format: 'titled' | 'unconstrained';
    asLink?: boolean;
    withActions?: boolean;
    refreshEvent?: () => void;
}

const EventCard: FunctionComponent<EventCardProps> = ({ id, title, startingDate, endingDate, status, cover, format, refreshEvent, asLink = true, withActions = false }) => {
    const { date, time } = startingDate
        ? parseDateTime(startingDate, 'both')
        : { date: undefined, time: undefined };
    
    const CardImage: FunctionComponent = () => {
        return (
            <Fragment>
                <div className={`relative rounded-3xl overflow-hidden ${
                    format === 'unconstrained' ? 'w-full h-full' : 'w-[250px] h-[170px]'
                }`}>
                    <ImageWithFallback
                        src={cover}
                        alt={title || 'Event cover'}
                        width={format === 'titled' ? 250 : undefined}
                        height={format === 'titled' ? 170 : undefined}
                        fill={format === 'unconstrained'}
                        quality={100}
                        sizes="100%, 100%"
                        placeholder={imagesPlaceholder}
                        className={`min-w-[250px] min-h-[170px] cursor-pointer object-cover object-center transform transition-all duration-500 ease-in-out ${
                            format === 'titled' && 'hover:scale-110'
                        }`}
                    />
                </div>
                {date && (
                    <div
                        className={`absolute top-5 left-6 flex flex-col justify-center items-center h-14 aspect-square text-white rounded-xl ${
                            (status === EventStatus.DRAFT || (endingDate && new Date(endingDate) < new Date())) ? 'bg-gray-500' : 'bg-primary'
                        }`}>
                        <p className="flex justify-center items-center text-2xl font-semibold h-fit">
                            {leadingZeroFormat(date.day)}
                        </p>
                        <p className="flex justify-center items-center text-sm font-light h-fit">
                            {monthNumToString(date.month, true)}
                        </p>
                    </div>
                )}
                {time && (
                    <div
                        className="absolute top-20 left-6 translate-y-1 flex flex-col justify-center items-center w-14 h-8 text-white rounded-lg bg-white">
                        <p className="flex justify-center items-center text-black font-semibold h-fit">
                            {leadingZeroFormat(time.hour)}h
                        </p>
                    </div>
                )}
            </Fragment>
        );
    };
    
    return (
        <div
            className={`relative flex flex-col gap-2 ${format === 'unconstrained' ? 'w-full h-full' : 'w-[250px]'} ${
                !asLink && ''
            }`}
        >
            {
                asLink
                    ? (
                        <Link
                            href={id ? `/dashboard/events/${id}` : ''}
                        className="w-full h-full"
                        >
                            <CardImage />
                        </Link>
                    ) : (
                        <EventCardModal
                            title={title}
                            cover={cover}
                            format={format}
                            cardImage={<CardImage />}
                        />
                    )
            }
            <div className="flex items-start gap-5">
                {title && <div className="flex-1 break-all line-clamp-1 font-semibold">{title}</div>}
                {
                    (withActions && id && title) && (
                        <EventActions
                            eventId={id}
                            eventTitle={title}
                            isPublished={status !== EventStatus.DRAFT}
                            refreshEvent={refreshEvent}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default EventCard;
