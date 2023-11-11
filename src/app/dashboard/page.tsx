import type { NextPage } from 'next';
import Link from 'next/link';
import { ViewTitle, CreateWorkspaceButton, EventsCounts } from '@components/dashboard';
import { Notifications, RecentEvents } from '@components/dashboard/overview';

const DashboardPage: NextPage = () => {
    return (
        <div className="flex flex-col gap-10 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle>Hi, Gideon!</ViewTitle>
                <CreateWorkspaceButton />
            </div>
            <div className="flex flex-wrap justify-between items-start w-full gap-10">
                <Notifications />
                <EventsCounts
                    moreActions={
                        <Link href="/dashboard/events" className="text-primary text-sm font-medium">
                            Explore
                        </Link>
                    }
                />
            </div>
            <RecentEvents />
        </div>
    );
};

export default DashboardPage;
