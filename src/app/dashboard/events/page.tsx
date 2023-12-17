import type { NextPage } from 'next';
import Link from 'next/link';
import { ViewTitle, CreateWorkspaceButton } from '@components/dashboard';
import { EventCard } from '@components/events';
import { Calendar } from '@components/ui/icons';
import events from '@/data/events';

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
                <div className="grid grid-cols-4 gap-5 w-full">
                    {events.map(({ id, title, startingDate, cover }) => (
                        <EventCard key={id} id={id} title={title} startingDate={startingDate} cover={cover} format="titled" />
                    ))}
                </div>
                <CreateWorkspaceButton />
            </div>
        </div>
    );
};

export default DashboardEventsPage;
