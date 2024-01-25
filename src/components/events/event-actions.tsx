'use client';

import { Fragment, useState, type FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';
import { useToggleVisibility, useMutationRequest } from '@/lib/hooks';
import { eventsAPI } from '@/lib/api/events';
import { EventStatus } from '@/types/constants';
import type { Event } from '@/types';
import { ConfirmModal } from '@components/ui/layouts';
import { Dots, Loader } from '@components/ui/icons';

interface EventActionsProps {
    eventId: Event['id'];
    eventTitle: Event['title'];
    isPublished: boolean;
    refreshEvent?: () => void;
}

const EventActions: FunctionComponent<EventActionsProps> = ({ eventId, eventTitle, isPublished, refreshEvent }) => {
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const { ref, isVisible, setIsVisible } = useToggleVisibility<HTMLButtonElement>(false);
    
    const { trigger: changeEventVisibility, isMutating: isPublishing } = useMutationRequest(
        `changeEventVisibility-${eventId}`,
        async (_: string, { arg: newStatus }: { arg: Event['status']}) => {
            const response = await eventsAPI.updateEvent(eventId, { status: newStatus });
            return response.data;
        },
        isPublished ? 'Event unpublished successfully' : 'Event published successfully',
    );
    
    const { trigger: deleteEvent, isMutating: isDeleting } = useMutationRequest(
        `deleteEvent-${eventId}`,
        async () => {
            const response = await eventsAPI.deleteEvent(eventId);
            return response.data;
        },
        'Event deleted successfully',
    );
    
    const handlePublishEvent = async () => {
        await changeEventVisibility(isPublished ? EventStatus.NOT_PUBLISHED : EventStatus.PUBLISHED);
        setShowPublishModal(false);
        refreshEvent && refreshEvent();
    };
    
    const handleDeleteEvent = async () => {
        await deleteEvent();
        setShowDeleteModal(false);
        refreshEvent && refreshEvent();
    };
    
    return (
        <Fragment>
            
            <button
                ref={ref}
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="relative cursor-pointer"
            >
                {
                    (isPublishing || isDeleting)
                        ? <Loader className="w-5 h-5 animate-spin"/>
                        : <Dots className="w-10"/>
                }
                <ul className={`absolute top-full right-0 bg-white z-10 shadow-md rounded-lg overflow-hidden ${
                    isVisible ? 'block' : 'hidden'
                }`}>
                    <li
                        onClick={() => router.push(`/dashboard/events/${eventId}?mode=edit`)}
                        className="flex items-center min-w-max w-full py-2 px-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Edit event
                    </li>
                    <li
                        onClick={() => setShowPublishModal(true)}
                        className="flex items-center min-w-max w-full py-2 px-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        {isPublished ? 'Unpublish' : 'Publish'}
                    </li>
                    <li
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center min-w-max w-full py-2 px-4 text-left text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white"
                    >
                        Delete event
                    </li>
                </ul>
            </button>
            <ConfirmModal
                title={`Delete event " ${eventTitle} "`}
                description="Are you sure you want to delete this event? This action is irreversible."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                isModalOpen={showDeleteModal}
                isConfirming={isDeleting}
                onConfirm={handleDeleteEvent}
                onCancel={() => setShowDeleteModal(false)}
            />
            <ConfirmModal
                title={isPublished
                    ? `Unpublish event " ${eventTitle} "`
                    : `Publish event " ${eventTitle} "`
                }
                description={isPublished
                    ? 'Are you sure you want to unpublish this event?'
                    : 'Are you sure you want to publish this event?'
                }
                confirmText={isPublished ? 'Unpublish' : 'Publish'}
                cancelText="Cancel"
                variant={isPublished ? 'danger' : 'success'}
                isModalOpen={showPublishModal}
                isConfirming={isPublishing}
                onConfirm={handlePublishEvent}
                onCancel={() => setShowPublishModal(false)}
            />
        </Fragment>
    )
};

export default EventActions;
