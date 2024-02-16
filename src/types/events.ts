import { z } from 'zod';
import { EventType, EventCategory, EventStatus, Country, SortOrder, dateRegex } from '@/types/constants';
import { BaseQuery } from '@/types';

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

export type EventQuery = BaseQuery & Partial<{
    isPrivate: boolean;
    types: EventType[];
    categories: EventCategory[];
    statuses: EventStatus[];
    countries: Country[];
    'orderBy[likesCount]': SortOrder;
}>;
