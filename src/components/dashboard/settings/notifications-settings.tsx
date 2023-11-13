import type { FunctionComponent } from 'react';
import { TitledArea } from '@components/ui/layouts';
import { Switch } from '@components/ui/form';
import { Bell } from '@components/icons';

const NotificationsSettings: FunctionComponent = () => {
    return (
        <TitledArea title="Notifications" Icon={Bell}>
            <ul className="flex flex-col gap-5 pt-5 pr-60">
                <li className="flex justify-between items-center text-sm">
                    <p>All</p>
                    <Switch />
                </li>
                <li className="flex justify-between items-center text-sm">
                    <p>Events</p>
                    <Switch />
                </li>
                <li className="flex justify-between items-center text-sm">
                    <p>Analytics</p>
                    <Switch />
                </li>
                <li className="flex justify-between items-center text-sm">
                    <p>Finance</p>
                    <Switch />
                </li>
                <li className="flex justify-between items-center text-sm">
                    <p>Subscription plan</p>
                    <Switch />
                </li>
            </ul>
        </TitledArea>
    );
};

export default NotificationsSettings;
