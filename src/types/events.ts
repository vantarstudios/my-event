import { z } from 'zod';
import { EventType, EventCategory } from '@/types/constants';
import type { Event } from '@/types';

const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const createEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    startingDate: z.string().refine((value) => dateRegex.test(value)),
    endingDate: z.string().refine((value) => dateRegex.test(value)),
    location: z.string(),
    type: z.nativeEnum(EventType),
    categories: z.array(z.nativeEnum(EventCategory)),
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
