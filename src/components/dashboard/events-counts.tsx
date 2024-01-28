'use client';

import type { FunctionComponent, ReactNode } from 'react';
import { leadingZeroFormat } from '@/lib/utils';
import { useRequest, useUserProfile } from '@/lib/hooks';
import { eventsAPI } from '@/lib/api/events';
import { Card } from '@components/ui/layouts';
import { Loader } from '@components/ui/icons';

interface EventCountsProps {
    moreActions?: ReactNode;
}

const EventsCounts: FunctionComponent<EventCountsProps> = ({ moreActions }) => {
    const { user, isLoading: userLoading, error: userError } = useUserProfile();
    
    const { data: eventsCounts, isLoading, error } = useRequest(
        user?.data.id ? [`events-counts-${user.data.id}`, user.data.id] : null,
        async ([_, organizerId]: [string, string]) => {
            const response = await eventsAPI.getEventsCounts(organizerId);
            
            if (!response.data.success) {
                throw new Error('Unable to fetch events counts');
            }
            
            return response.data;
        },
        { showError: false }
    );
    
    return (
        <Card className="flex flex-col gap-4 w-fit h-48 py-6 px-12 hover:shadow-md">
            <div className="flex justify-between items-center w-full h-10">
                <p className="text-xl font-bold text-primary">Events</p>
                {moreActions}
            </div>
            <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col justify-center items-center gap-2.5">
                    {
                        (isLoading || userLoading)
                            ? <Loader className="w-10 h-10 animate-spin"/>
                            : (
                                <p className="text-5xl font-medium">
                                    {leadingZeroFormat((error || userError || !eventsCounts) ? 0 : eventsCounts.data.total)}
                                </p>
                            )
                    }
                    <p className="font-medium">Total</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2.5">
                    {
                        (isLoading || userLoading)
                            ? <Loader className="w-10 h-10 animate-spin"/>
                            : (
                                <p className="text-5xl font-medium">
                                    {leadingZeroFormat((error || userError || !eventsCounts) ? 0 : eventsCounts.data.onGoing)}
                                </p>
                            )
                    }
                    <p className="font-light">On going</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2.5">
                    {
                        (isLoading || userLoading)
                            ? <Loader className="w-10 h-10 animate-spin"/>
                            : (
                                <p className="text-5xl font-medium">
                                    {leadingZeroFormat((error || userError || !eventsCounts) ? 0 : eventsCounts.data.upComing)}
                                </p>
                            )
                    }
                    <p className="font-light">Up Coming</p>
                </div>
            </div>
        </Card>
    );
};

export default EventsCounts;
