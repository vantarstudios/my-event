import type { NextPage } from 'next';
import Link from 'next/link';
import { ViewTitle, FiltersAndSearch } from '@components/dashboard';
import { Calendar } from '@components/ui/icons';
import { EventsList } from '@components/events';
import { PrimaryButton } from '@components/ui/buttons';

const DashboardEventsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-5 h-full">
            <div className="flex justify-between items-center mb-5">
                <ViewTitle Icon={Calendar}>My events</ViewTitle>
                <Link href="/dashboard/events/create" className="w-fit">
                    <PrimaryButton>
                        + New event
                    </PrimaryButton>
                </Link>
            </div>
            <FiltersAndSearch
                withSearch
                searchPlaceholder="Search for events"
                searchValue=""
            />
            <div className="flex flex-col justify-between items-end gap-10 h-full mt-5 pb-10">
                <div className="flex flex-wrap gap-x-5 xl:gap-x-10 gap-y-5 w-full">
                    <EventsList/>
                </div>
                {/*<CreateWorkspaceButton />*/}
            </div>
        </div>
    );
};

export default DashboardEventsPage;
