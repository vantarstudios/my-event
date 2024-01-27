import { z } from 'zod';
import { NotificationType } from './constants';
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

export const userSettingsUpdateSchema = z.object({
    enabledNotifications: z.string().optional().refine((value) => {
        if (!value) return true;
        
        const notifications = value.split(',');
        return notifications.every((notification) => Object.values(NotificationType).includes(notification as NotificationType));
    }),
});

export type UserSettingsUpdatePayload = z.infer<typeof userSettingsUpdateSchema>;
