import type { NextPage } from 'next';
import { ViewTitle } from '@components/dashboard';
import { SettingsTable } from '@components/dashboard/settings';
import { Button } from '@components/ui';
import { Gear } from '@components/icons';

const DashboardSettingsPage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full max-w-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Gear}>Settings</ViewTitle>
                <Button className="px-10">Upgrade plan to full-package</Button>
            </div>
            <SettingsTable />
        </div>
    );
};

export default DashboardSettingsPage;
