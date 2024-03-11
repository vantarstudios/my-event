import { Fragment } from 'react';
import type { NextPage } from 'next';
import { thousandsCommaFormat } from '@/lib/utils';
import { ViewTitle, CreateWorkspaceButton, FiltersAndSearch, EventsCounts } from '@components/dashboard';
import { CardWithTitle } from '@components/ui/layouts';
import { Stats } from '@components/ui/icons';

const DashboardAnalyticsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Stats}>Analytics</ViewTitle>
                <CreateWorkspaceButton />
            </div>
            <FiltersAndSearch />
            <div className="flex flex-wrap justify-start items-start gap-10 w-full">
                <EventsCounts />
                <CardWithTitle
                    title="Tickets"
                    middle={
                        <Fragment>
                            <p className="text-4xl">{thousandsCommaFormat(54569)}</p>
                            <p className="text-lg font-medium text-green-700">+2.5%</p>
                        </Fragment>
                    }
                    bottom={<p className="font-medium">Total</p>}
                    corner={<Stats className="w-5" />}
                />
            </div>
            <p className="fixed bottom-20 right-20 w-80 px-10 py-5 rounded-2xl text-sm text-black bg-gray-100">
                Get more data on each event and your finances with a&nbsp;
                <span className="underline font-medium">full-package plan.</span>
            </p>
        </div>
    );
};

export default DashboardAnalyticsPage;
