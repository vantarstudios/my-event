import { Fragment } from 'react';
import type { NextPage } from 'next';
import { ViewTitle, CreateWorkspaceButton, PeriodFilter, EventsCounts, CardWithTitle } from '@components/dashboard';
import { Stats } from '@components/icons';

const DashboardAnalyticsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Stats}>Analytics</ViewTitle>
                <CreateWorkspaceButton />
            </div>
            <PeriodFilter />
            <div className="flex justify-start items-start gap-40">
                <EventsCounts />
                <CardWithTitle
                    title="Tickets"
                    middle={
                        <Fragment>
                            <p>54,569</p>
                            <p className="text-lg font-medium text-green-700">+2.5%</p>
                        </Fragment>
                    }
                    bottom={<p className="font-medium">Total</p>}
                    corner={<Stats className="w-5" />}
                />
            </div>
            <p className="fixed bottom-20 right-20 w-80 px-10 py-5 rounded-2xl text-sm text-black bg-grey bg-opacity-5">
                Get more data on each event and your finances with a&nbsp;
                <span className="underline font-medium">full-package plan.</span>
            </p>
        </div>
    );
};

export default DashboardAnalyticsPage;
