'use client';

import type { FunctionComponent } from 'react';
import { useToggle } from '@/lib/hooks';
import type { Mode } from '@/types';
import { EditSaveButton } from '@components/dashboard';
import ProfileInformations from './profile-informations';
import NotificationsSettings from './notifications-settings';
import OtherSettings from './other-settings';

const SettingsTable: FunctionComponent = () => {
    const [mode, toggleMode] = useToggle<Mode>('view', 'edit');

    return (
        <div className="flex flex-col gap-10">
            <EditSaveButton mode={mode} onClick={toggleMode} className="absolute top-0 right-20 translate-y-16" />
            <ProfileInformations mode={mode} />
            <div className="flex flex-wrap child:basis-2/5 w-full">
                <NotificationsSettings />
                <OtherSettings mode={mode} />
            </div>
        </div>
    );
};

export default SettingsTable;
