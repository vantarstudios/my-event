'use client';

import { useState, type FunctionComponent } from 'react';
import { leadingZeroFormat } from '@/lib/utils';
import { useRequest, useMutationRequest } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';
import type { Notification } from '@/types';
import { Button } from '@components/ui/buttons';
import { Cross } from '@components/ui/icons';
import { Card, TitledArea, Modal } from '@components/ui/layouts';

interface NotificationCardProps extends Pick<Notification, 'title' | 'message'> {
    onDeletion?: () => void;
}

const NotificationCard: FunctionComponent<NotificationCardProps> = ({ title, message, onDeletion }) => {
    return (
        <Card className="relative group flex flex-col justify-center items-center gap-2 w-full h-20 p-5 rounded-2xl">
            <p className="w-full font-medium text-stone-900">{title}</p>
            <p className="w-full text-sm">{message}</p>
            <Cross
                onClick={onDeletion}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 p-1 rounded-full bg-red-500 text-white hidden group-hover:block cursor-pointer"
            />
        </Card>
    );
};

const NOTIFICATIONS_PREVIEW_LIMIT = 2;

const Notifications: FunctionComponent = () => {
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    
    const { data: notifications, isLoading, error, mutate } = useRequest(
        'get-my-notifications',
        async () => {
            const response = await usersAPI.getNotifications();
            
            if (!response.data.success) {
                throw new Error('Unable to fetch notifications');
            }
            
            return response.data;
        }
    );
    
    const { trigger: markAsRead } = useMutationRequest(
        'mark-notification-as-read',
        async (_: string, { arg: notificationId }: { arg: Notification['id'] }) => {
            const response = await usersAPI.markNotificationAsRead(notificationId);
            
            if (!response.data.success) {
                throw new Error('Unable to mark notification as read');
            }
            
            return response.data;
        }
    );
    
    const { trigger: markAllAsRead, isMutating } = useMutationRequest(
        'mark-all-notifications-as-read',
        async () => {
            const response = await usersAPI.markAllNotificationsAsRead();
            
            if (!response.data.success) {
                throw new Error('Unable to mark all notifications as read');
            }
            
            return response.data;
        }
    );
    
    const handleMarkAsRead = (notificationId: Notification['id']) => async () => {
        await markAsRead(notificationId);
        await mutate();
    };
    
    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
        await mutate();
    };
    
    return (
        <TitledArea
            title={`Notifications ${(!isLoading && !error && notifications && notifications.data.length > 0)
                ? `(${leadingZeroFormat(notifications.data.length)})`
                : ''
            }`}
            className="w-full lg:w-1/2 px-2"
            indicator={
                (!isLoading && !error && notifications && notifications.data.length > 0) && (
                    <Button
                        onClick={() => setShowNotificationsModal(true)}
                        className="flex justify-center items-end w-fit h-fit px-0 text-sm font-medium text-primary bg-inherit -translate-x-3 hover:underline"
                    >
                        See all
                    </Button>
                )
            }
        >
            {
                (isLoading && !error) && (
                    <div className="flex flex-col gap-4 w-full h-full">
                        <div className="flex flex-col justify-center items-center gap-2 w-full h-20 p-5 rounded-2xl skeleton" />
                        <div className="flex flex-col justify-center items-center gap-2 w-full h-20 p-5 rounded-2xl skeleton" />
                    </div>
                )
            }
            {
                (!isLoading && !error && notifications && notifications.data.length > 0) && (
                    <div className="flex flex-col gap-4 w-full h-full">
                        {notifications.data.slice(0, NOTIFICATIONS_PREVIEW_LIMIT).map(({ id, title, message }, index) => (
                            <NotificationCard
                                key={index}
                                title={title}
                                message={message}
                                onDeletion={handleMarkAsRead(id)}
                            />
                        ))}
                        <Modal isOpened={showNotificationsModal}>
                            <Card className="flex flex-col w-1/3 min-w-max h-[75vh] p-0">
                                <div className="flex flex-col gap-y-4 w-full flex-1 px-10 py-5 my-5 overflow-y-auto">
                                    {notifications.data.map(({ id, title, message }, index) => (
                                        <NotificationCard
                                            key={index}
                                            title={title}
                                            message={message}
                                            onDeletion={handleMarkAsRead(id)}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between w-full px-10 py-5">
                                    <Button
                                        onClick={handleMarkAllAsRead}
                                        loading={isMutating}
                                        className="hover:bg-primary hover:bg-opacity-100"
                                    >
                                        Mark all as read
                                    </Button>
                                    <Button
                                        onClick={() => setShowNotificationsModal(false)}
                                        className=""
                                    >
                                        Close
                                    </Button>
                                </div>
                            </Card>
                        </Modal>
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
