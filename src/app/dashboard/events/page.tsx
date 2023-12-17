import type { NextPage } from 'next';
import Link from 'next/link';
import { ViewTitle, CreateWorkspaceButton } from '@components/dashboard';
import { Calendar } from '@components/ui/icons';
import { EventsList } from '@/components/events';

const DashboardEventsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Calendar}>My events</ViewTitle>
                <Link href="/dashboard/events/create" className="px-8 py-2.5 rounded-full text-sm text-white bg-black">
                    + New event
                </Link>
            </div>
            <div className="flex flex-col justify-between items-end gap-10 h-full pb-10">
                <EventsList />
                <CreateWorkspaceButton />
            </div>
        </div>
    );
};

export default DashboardEventsPage;
