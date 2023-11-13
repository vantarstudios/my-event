'use client';

import type { NextPage } from 'next';
import { ChevronLeft } from '@components/icons';
import { EditOrView } from '@components/dashboard/events';
import events from '@/data/events';

interface DashboardEditEventPageProps {
    params: { id: string };
}

const DashboardEditEventLayout: NextPage<DashboardEditEventPageProps> = ({ params }) => {
    const event = events.find(({ id }) => id === params.id);

    return (
        <div className="w-full h-full">
            {event ? (
                <div className="flex flex-col gap-10 w-full h-full">
                    <div className="flex justify-start items-center gap-10 text-2xl font-medium">
                        <ChevronLeft onClick={() => window.history.back()} className="w-5 h-5 cursor-pointer" />
                        {event.title}
                    </div>
                    <EditOrView event={event} />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full text-4xl font-medium">
                    &lt; Event not found &gt;
                </div>
            )}
        </div>
    );
};

export default DashboardEditEventLayout;
