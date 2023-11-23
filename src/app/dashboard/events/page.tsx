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
                <Link href="/dashboard/events/create" className="px-8 py-2 rounded-full text-white bg-black">
                    + New event
                </Link>
            </div>
            <div className="flex flex-col justify-between items-end h-full pb-10">
                <div className="flex flex-wrap justify-evenly gap-5 w-full">
                    {events.map(({ id, title, startDate, cover }) => (
                        <EventCard key={id} id={id} title={title} startDate={startDate} cover={cover} format="titled" />
                    ))}
                </div>
                <CreateWorkspaceButton />
            </div>
        </div>
    );
};

export default DashboardEventsPage;
