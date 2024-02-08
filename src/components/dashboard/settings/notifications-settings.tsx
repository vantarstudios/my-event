'use client';

import type { FunctionComponent, ChangeEvent } from 'react';
import { useRequest, useMutationRequest } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';
import { NotificationType } from '@/types/constants';
import type { UserSettingsUpdatePayload } from '@/types/users';
import { TitledArea } from '@components/ui/layouts';
import { Switch } from '@components/ui/form';
import { Bell } from '@components/ui/icons';

const NotificationsSettings: FunctionComponent = () => {
    const { data: userSettings, isLoading, error, mutate } = useRequest(
        'get-my-notifications-settings',
        async () => {
            const response = await usersAPI.getSettings();
            
            if (!response.data.success) {
                throw new Error('Unable to fetch user settings');
            }
            
            return response.data;
        }
    );
    
    const { trigger, isMutating } = useMutationRequest(
        'update-my-notifications-settings',
        async (_: string, { arg: data }: { arg: UserSettingsUpdatePayload['enabledNotifications'][] }) => {
            const response = await usersAPI.updateSettings({
                enabledNotifications: data.join(',')
            });
            return response.data;
        },
    );
    
    const handleToggleNotification = (notificationTypes: NotificationType[]) => async (event: ChangeEvent<HTMLInputElement>) => {
        if (isMutating || isLoading || error) return;
        
        const enabledNotifications = userSettings?.data?.enabledNotifications || [];
        
        if (event.target.checked) {
            await trigger([...enabledNotifications, ...notificationTypes]);
        } else {
            await trigger(enabledNotifications.filter((type) => !notificationTypes.includes(type)));
        }
        
        await mutate();
    };
    
    const isChecked = (types: NotificationType[]) => types.every((type) => userSettings?.data && userSettings.data.enabledNotifications.includes(type));
    
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
                        <p>Followers</p>
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
                            checked={isChecked([NotificationType.ORGANIZER_EVENTS])}
                            onChange={handleToggleNotification([NotificationType.ORGANIZER_EVENTS])}
                            loading={isMutating}
                        />
                    </li>
                    <li>
                        <Switch
                            checked={isChecked([NotificationType.ORGANIZER_TICKETS])}
                            onChange={handleToggleNotification([NotificationType.ORGANIZER_TICKETS])}
                            loading={isMutating}
                        />
                    </li>
                    <li>
                        <Switch
                            checked={isChecked([NotificationType.ORGANIZER_FOLLOWERS])}
                            onChange={handleToggleNotification([NotificationType.ORGANIZER_FOLLOWERS])}
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
