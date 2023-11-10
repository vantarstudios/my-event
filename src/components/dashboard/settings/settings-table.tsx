'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { Button } from '@components/common';
import ProfileInformations from './profile-informations';
import NotificationsSettings from './notifications-settings';
import OtherSettings from './other-settings';

const SettingsTable: FunctionComponent = () => {
    const [mode, setMode] = useState<'edit' | 'view'>('view');

    return (
        <div className="flex flex-col gap-10">
            <Button
                onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}
                className="absolute top-0 right-20 translate-y-16 px-8 py-1 border-2 border-black text-black bg-white hover:outline-none hover:text-white hover:bg-black"
            >
                {mode === 'edit' ? 'Save' : 'Edit'}
            </Button>
            <ProfileInformations mode={mode} />
            <div className="flex flex-wrap child:basis-2/5 w-full">
                <NotificationsSettings />
                <OtherSettings mode={mode} />
            </div>
        </div>
    );
};

export default SettingsTable;
