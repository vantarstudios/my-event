import type { NextPage } from 'next';
import { ViewTitle, CreateWorkspaceButton } from '@components/dashboard';
import { Button, EventCard } from '@components/ui';
import { Calendar } from '@components/icons';
import events from '@/data/events';

const DashboardEventsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Calendar}>My events</ViewTitle>
                <Button className="px-8">+ New event</Button>
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
