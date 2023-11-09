import type { NextPage } from 'next';
import { ViewTitle, CreateWorkspaceButton } from '@components/dashboard';
import { EventsList } from '@components/dashboard/events';
import { Button } from '@components/common';
import { Calendar } from '@components/icons';

const DashboardEventsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Calendar}>My events</ViewTitle>
                <Button className="px-8">+ New event</Button>
            </div>
            <div className="flex flex-col justify-between items-end h-1/2">
                <EventsList />
                <CreateWorkspaceButton />
            </div>
        </div>
    );
};

export default DashboardEventsPage;
