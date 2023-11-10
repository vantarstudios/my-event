import type { NextPage } from 'next';
import { ViewTitle } from '@components/dashboard';
import { Plans } from '@components/plan';
import { Button } from '@components/common';
import { Planning } from '@components/icons';

const DashboardPlanPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Planning}>My plan</ViewTitle>
                <Button className="px-10">Compare</Button>
            </div>
            <Plans layout="left" />
        </div>
    );
};

export default DashboardPlanPage;
