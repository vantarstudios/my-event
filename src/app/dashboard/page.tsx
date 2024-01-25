import type { NextPage } from 'next';
import Link from 'next/link';
import { Greetings, CreateWorkspaceButton, EventsCounts } from '@components/dashboard';
import { Notifications, RecentEvents, DraftEvents } from '@components/dashboard/overview';

const DashboardPage: NextPage = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-5">
                <Greetings/>
                <CreateWorkspaceButton/>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-0 w-full lg:mb-10">
                <Notifications/>
                <EventsCounts
                    moreActions={
                        <Link href="/dashboard/events" className="text-primary text-sm font-medium">
                            Explore
                        </Link>
                    }
                />
            </div>
            <div className="flex flex-col gap-5">
                <RecentEvents/>
                <DraftEvents/>
            </div>
        </div>
    );
};

export default DashboardPage;
