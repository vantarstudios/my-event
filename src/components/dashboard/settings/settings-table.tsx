'use client';

import { useState, Fragment } from 'react';
import type { FunctionComponent } from 'react';
import { useToggle, useMutationRequest, useUserProfile } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';
import type { UserProfileUpdatePayload } from '@/types/users';
import type { Mode } from '@/types';
import { EditSaveButton } from '@components/dashboard';
import ProfileInformations from './profile-informations';
import NotificationsSettings from './notifications-settings';
import OtherSettings from './other-settings';
import OrganizerCard from './organizer-card';

const SettingsTable: FunctionComponent = () => {
    const { user, error, isLoading, mutate } = useUserProfile();
    
    const [mode, toggleMode] = useToggle<Mode>('view', 'edit');
    const [formData, setFormData] = useState<UserProfileUpdatePayload>({} as UserProfileUpdatePayload);
    
    const { trigger, isMutating } = useMutationRequest(
        user?.data ? `update-user-${user.data.id}` : null,
        async (_: string, { arg: data }: { arg: UserProfileUpdatePayload }) => {
            const response = await usersAPI.updateProfile(user!.data.id, data);
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
                    .map(([key, value]) => user!.data[key as keyof UserProfileUpdatePayload] !== value)
                    .some(Boolean)
                || formData.profilePicture
            )
        ) {
            const newUserProfile = await trigger(formData);
            
            if (newUserProfile.success) {
                setFormData({} as UserProfileUpdatePayload);
                await mutate();
            }
        }
        
        toggleMode();
    };

    return (
        <div className="flex flex-col gap-20">
            <EditSaveButton
                mode={mode}
                loading={isMutating}
                onClick={!isLoading && !error ? handleSave : () => {}}
                className="absolute top-0 right-20 translate-y-16"
            />
            {
                isLoading
                    ? <p>Loading...</p>
                    : (error || !user?.success)
                        ? <p>Sorry, an error occurred while loading your profile.</p>
                        : (
                            <Fragment>
                                <div className="flex flex-wrap xl:justify-between items-center gap-y-5 w-full">
                                    <ProfileInformations mode={mode} user={user.data} setInformation={updateFormData}/>
                                    <div className="mr-10 mt-auto">
                                        <OrganizerCard
                                            firstName={user.data.firstName}
                                            lastName={user.data.lastName}
                                            eventName="Event name"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-start gap-40 w-full">
                                    <NotificationsSettings user={user.data}/>
                                    <OtherSettings mode={mode}/>
                                </div>
                            </Fragment>
                        )
            }
        </div>
    );
};

export default SettingsTable;
