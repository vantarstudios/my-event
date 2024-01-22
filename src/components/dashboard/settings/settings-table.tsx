'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useToggle, useMutationRequest, useSelector, useDispatch } from '@/lib/hooks';
import { selectProfile, setProfile } from '@/lib/store/states/profile';
import { usersAPI } from '@/lib/api/users';
import type { UserProfileUpdatePayload } from '@/types/users';
import type { Mode } from '@/types';
import { EditSaveButton } from '@components/dashboard';
import ProfileInformations from './profile-informations';
import NotificationsSettings from './notifications-settings';
import OtherSettings from './other-settings';

const SettingsTable: FunctionComponent = () => {
    const userProfile = useSelector(selectProfile);
    const dispatch = useDispatch();
    
    const [mode, toggleMode] = useToggle<Mode>('view', 'edit');
    const [formData, setFormData] = useState<UserProfileUpdatePayload>({} as UserProfileUpdatePayload);
    
    const { trigger, isMutating } = useMutationRequest(
        `update-user-${userProfile.id}`,
        async (_: string, { arg: data }: { arg: UserProfileUpdatePayload }) => {
            const response = await usersAPI.updateProfile(userProfile.id, data);
            return response.data;
        },
        'Profile updated successfully!'
    );
    
    const updateFormData = <T extends keyof UserProfileUpdatePayload>(key: T) => (value: UserProfileUpdatePayload[T]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    
    const handleSave = async () => {
        if (
            mode === 'edit'
            && !isMutating
            && (
                Object.entries(formData)
                    .map(([key, value]) => userProfile[key as keyof UserProfileUpdatePayload] !== value)
                    .some(Boolean)
                || formData.profilePicture
            )
        ) {
            const newUserProfile = await trigger(formData);
            
            if (newUserProfile.success) {
                dispatch(setProfile(newUserProfile.data));
                setFormData({} as UserProfileUpdatePayload);
                
                if (window) {
                    window.location.reload();
                }
            }
        }
        
        toggleMode();
    };

    return (
        <div className="flex flex-col gap-20">
            <EditSaveButton
                mode={mode}
                loading={isMutating}
                onClick={handleSave}
                className="absolute top-0 right-20 translate-y-16"
            />
            <ProfileInformations mode={mode} user={userProfile} setInformation={updateFormData} />
            <div className="flex justify-start gap-40 w-full">
                <NotificationsSettings />
                <OtherSettings mode={mode} />
            </div>
        </div>
    );
};

export default SettingsTable;
