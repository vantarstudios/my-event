import { z } from 'zod';
import { InvitationType, dateRegex } from '@/types/constants';
import type { ValidationErrors } from '@/types';

export const createTicketSchema = z.object({
    title: z.string().min(1).max(150),
    description: z.string().min(1).max(500),
    salesEndDate: z.string().min(1, 'Required').refine((value) => dateRegex.test(value)),
    price: z.number().min(0),
    invitationType: z.nativeEnum(InvitationType),
    limited: z.boolean(),
    maxQuantity: z.number().optional(),
    allowedPeople: z.number().min(1).optional(),
});

export type CreateTicketPayload = z.infer<typeof createTicketSchema>;

export type CreateTicketErrors = ValidationErrors<CreateTicketPayload>;
