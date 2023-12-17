import { z } from 'zod';
import type { User } from './index';

const userProfileFields = [
    'id',
    'email',
    'username',
    'firstName',
    'lastName',
    'phoneNumber',
    'country',
    'role',
    'bio',
    'profilePicture',
    'isSuspended',
    'isActivated',
    'createdAt',
    'updatedAt',
    'followersCount'
] as const;

export type UserProfile = Pick<User, (typeof userProfileFields)[number]>;

export const userProfileUpdateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string().optional(),
    phoneNumber: z.string().optional(),
    bio: z.string().optional(),
    profilePicture: z.instanceof(File).optional(),
});

export type UserProfileUpdatePayload = z.infer<typeof userProfileUpdateSchema>;
