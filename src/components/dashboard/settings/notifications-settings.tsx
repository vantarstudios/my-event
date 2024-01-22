import type { FunctionComponent } from 'react';
import { TitledArea } from '@components/ui/layouts';
import { Switch } from '@components/ui/form';
import { Bell } from '@components/ui/icons';

const NotificationsSettings: FunctionComponent = () => {
    return (
        <TitledArea title="Notifications" Icon={Bell}>
            <div className="flex gap-x-14">
                <ul className="flex flex-col gap-5 pt-5">
                    <li className="text-sm min-w-max">
                        <p>All</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Events</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Analytics</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Finance</p>
                    </li>
                    <li className="text-sm min-w-max">
                        <p>Subscription plan</p>
                    </li>
                </ul>
                <ul className="flex flex-col gap-5 pt-5">
                    <li>
                        <Switch/>
                    </li>
                    <li>
                        <Switch/>
                    </li>
                    <li>
                        <Switch/>
                    </li>
                    <li>
                        <Switch/>
                    </li>
                    <li>
                        <Switch/>
                    </li>
                </ul>
            </div>
        </TitledArea>
    );
};

export default NotificationsSettings;
