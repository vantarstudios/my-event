import { z } from 'zod';

export const supportPayloadSchema = z.object({
    email: z.string().email(),
    phone: z.string(),
    organizationName: z.string().optional(),
    message: z.string().refine((val) => val.length > 0),
});

export type SupportPayload = z.infer<typeof supportPayloadSchema>;
