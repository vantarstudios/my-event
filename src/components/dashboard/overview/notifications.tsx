'use client';

import type { FunctionComponent } from 'react';
import { leadingZeroFormat } from '@/lib/utils';
import { useRequest } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';
import { Button } from '@components/ui/buttons';
import { Card, TitledArea } from '@components/ui/layouts';

const Notifications: FunctionComponent = () => {
    const { data: notifications, isLoading, error } = useRequest(
        'get-my-notifications',
        async () => {
            const response = await usersAPI.getNotifications();
            
            if (!response.data.success) {
                throw new Error('Unable to fetch notifications');
            }
            
            return response.data;
        }
    );
    
    return (
        <TitledArea
            title={`Notifications ${(!isLoading && !error && notifications && notifications.data.length > 0)
                ? `(${leadingZeroFormat(notifications.data.length)})`
                : ''
            }`}
            className="w-full lg:w-1/2 px-2"
            indicator={
                (!isLoading && !error && notifications && notifications.data.length > 0) && (
                    <Button className="flex justify-center items-end w-fit h-fit px-0 text-sm font-medium text-primary bg-inherit -translate-x-3 hover:underline">
                        See all
                    </Button>
                )
            }
        >
            {
                (isLoading && !error) && (
                    <p>Loading...</p>
                )
            }
            {
                (!isLoading && !error && notifications && notifications.data.length > 0) && (
                    <div className="flex flex-col gap-4 px-2 w-full h-full">
                        {notifications.data.slice(0, 2).map(({ title, message }, index) => (
                            <Card key={index} className="flex flex-col gap-2 w-full rounded-2xl">
                                <p className="font-medium text-stone-900">{title}</p>
                                <p className="text-sm">{message}</p>
                            </Card>
                        ))}
                    </div>
                )
            }
            {
                (!isLoading && !error && notifications?.data.length === 0) && (
                    <p className="w-full my-10 text-gray-500">No notifications</p>
                )
            }
            {
                (!isLoading && error) && (
                    <p className="w-full my-10 text-gray-500">Sorry, something went wrong</p>
                )
            }
        </TitledArea>
    );
};

export default Notifications;
