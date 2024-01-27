'use client';

import type { FunctionComponent, ChangeEvent } from 'react';
import { useRequest, useMutationRequest } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';
import { NotificationType } from '@/types/constants';
import type { UserProfile, UserSettingsUpdatePayload } from '@/types/users';
import { TitledArea } from '@components/ui/layouts';
import { Switch } from '@components/ui/form';
import { Bell } from '@components/ui/icons';

interface NotificationsSettingsProps {
    user: UserProfile;
}

const NotificationsSettings: FunctionComponent<NotificationsSettingsProps> = ({ user }) => {
    const { data: userSettings, isLoading, error, mutate } = useRequest(
        user?.id ? `user-${user.id}-settings` : null,
        async () => {
            const response = await usersAPI.getSettings(user.id);
            
            if (!response.data.success) {
                throw new Error(response.data.error.message);
            }
            
            return response.data;
        }
    );
    
    const { trigger, isMutating } = useMutationRequest(
        user?.id ? `user-${user.id}-notifications` : null,
        async (_: string, { arg: data }: { arg: UserSettingsUpdatePayload['enabledNotifications'][] }) => {
            const response = await usersAPI.updateSettings(user.id, {
                enabledNotifications: data.join(',')
            });
            return response.data;
        },
    );
    
    const handleToggleNotification = (notificationTypes: NotificationType[]) => async (event: ChangeEvent<HTMLInputElement>) => {
        if (isMutating || isLoading || error) return;
        
        const enabledNotifications = userSettings?.data.enabledNotifications || [];
        
        if (event.target.checked) {
            await trigger([...enabledNotifications, ...notificationTypes]);
        } else {
            await trigger(enabledNotifications.filter((type) => !notificationTypes.includes(type)));
        }
        
        await mutate();
    };
    
    const isChecked = (types: NotificationType[]) => types.every((type) => userSettings && userSettings.data.enabledNotifications.includes(type));
    
    return (
        <TitledArea title="Notifications" Icon={Bell}>
            <div className="flex gap-x-14">
                <ul className="flex flex-col gap-5 pt-5">
                    <li className="text-sm min-w-max">
                        <p>All</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Events</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Tickets</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Finance</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Subscription plan</p>
                    </li>
                </ul>
                <ul className="flex flex-col gap-5 pt-5">
                    <li>
                        <Switch
                            checked={isChecked(Object.values(NotificationType))}
                            onChange={handleToggleNotification(Object.values(NotificationType))}
                            loading={isMutating}
                        />
                    </li>
                    <li>
                        <Switch
                            checked={isChecked([NotificationType.EVENTS])}
                            onChange={handleToggleNotification([NotificationType.EVENTS])}
                            loading={isMutating}
                        />
                    </li>
                    <li>
                        <Switch
                            checked={isChecked([NotificationType.TICKETS])}
                            onChange={handleToggleNotification([NotificationType.TICKETS])}
                            loading={isMutating}
                        />
                    </li>
                    <li>
                        <Switch
                            checked={isChecked([NotificationType.FINANCES])}
                            onChange={handleToggleNotification([NotificationType.FINANCES])}
                            loading={isMutating}
                        />
                    </li>
                    <li>
                        <Switch
                            checked={isChecked([NotificationType.SUBSCRIPTION_PLAN])}
                            onChange={handleToggleNotification([NotificationType.SUBSCRIPTION_PLAN])}
                            loading={isMutating}
                        />
                    </li>
                </ul>
            </div>
        </TitledArea>
    );
};

export default NotificationsSettings;
