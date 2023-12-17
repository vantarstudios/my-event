'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useRequest } from '@/lib/hooks';
import { eventsAPI } from '@/lib/api/events';
import { ChevronLeft } from '@components/ui/icons';
import { EditOrView } from '@components/events';

interface DashboardEditEventPageProps {
    params: { id: string };
}

const DashboardEditEventLayout: NextPage<DashboardEditEventPageProps> = ({ params }) => {
    const router = useRouter();
    
    const { data: event, error, isLoading } = useRequest(
        `event-${params.id}`,
        async () => {
            const response = await eventsAPI.getEvent(params.id);
            
            if (response.data.success === false) {
                throw new Error(response.data.error.message);
            }
            
            return response.data;
        }
    );

    return (
        <div className="w-full h-full">
            {
                (!isLoading && !error) && (
                    event ? (
                        <div className="flex flex-col gap-10 w-full h-full">
                            <div className="flex justify-start items-center gap-10 text-2xl font-medium">
                                <ChevronLeft
                                    onClick={() => router.back()}
                                    strokeWidth="bold"
                                    className="w-5 h-5 cursor-pointer"
                                />
                                {event.data.title}
                            </div>
                            <EditOrView event={event.data}/>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full h-full text-4xl font-medium">
                            &lt; Event not found &gt;
                        </div>
                    )
                )
            }
        </div>
    );
};

export default DashboardEditEventLayout;
