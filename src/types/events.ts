import { z } from 'zod';
import { EventType, EventCategory, EventStatus, Country, dateRegex } from '@/types/constants';
import type { Event } from '@/types';

export const createEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    startingDate: z.string().refine((value) => dateRegex.test(value)),
    endingDate: z.string().refine((value) => dateRegex.test(value)),
    location: z.string(),
    type: z.nativeEnum(EventType),
    categories: z.array(z.nativeEnum(EventCategory)),
    status: z.nativeEnum(EventStatus),
    cover: z.instanceof(File).optional(),
});

export type CreateEventPayload = z.infer<typeof createEventSchema>;

export type UpdateEventPayload = Partial<CreateEventPayload>;

export const eventDataFields = [
    'id',
    'title',
    'description',
    'categories',
    'startingDate',
    'endingDate',
    'location',
    'cover',
    'organizerName',
    'country',
    'mapUrl',
    'status',
    'type',
    'isPrivate',
    'likesCount',
    'attendeesCount',
    'followersCount',
    'createdAt',
    'updatedAt',
    'deletedAt',
] as const;

export type EventData = Pick<Event, (typeof eventDataFields)[number]>;

export type EventQuery = Partial<{
    page: number;
    perPage: number;
    isPrivate: boolean;
    type: EventType | EventType[];
    categories: EventCategory | EventCategory[];
    status: EventStatus | EventStatus[];
    country: Country | Country[];
}>;
