'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useRequest } from '@/lib/hooks';
import { eventsAPI } from '@/lib/api/events';
import type { Event } from '@/types';
import { ChevronLeft } from '@components/ui/icons';
import { EditOrView } from '@components/events';
import { EventTitleSkeleton } from '@components/ui/skeletons';

interface DashboardEditEventPageProps {
    params: { id: string };
}

const DashboardEventPage: NextPage<DashboardEditEventPageProps> = ({ params }) => {
    const router = useRouter();
    
    const { data: event, error, isLoading } = useRequest(
        params?.id ? [`event-${params.id}`, params.id] : null,
        async ([_, eventId]) => {
            const response = await eventsAPI.getEvent(eventId);
            return response.data;
        }
    );

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-10 w-full h-full">
                <div
                    onClick={() => router.back()}
                    className="flex justify-start items-center gap-10 text-2xl font-medium cursor-pointer"
                >
                    <ChevronLeft
                        strokeWidth="bold"
                        className="w-5 h-5"
                    />
                    {
                        isLoading
                            ? <EventTitleSkeleton/>
                            : (!error && event) && (event.title)
                    }
                </div>
                <EditOrView
                    event={event || {} as Event}
                    eventError={Boolean(error)}
                    eventIsLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default DashboardEventPage;
