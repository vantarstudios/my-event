import { useState } from 'react';
import type { FunctionComponent, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileUpdateSchema } from '@/types/users';
import type { UserProfile, UserProfileUpdatePayload } from '@/types/users';
import type { Mode } from '@/types';
import { ProfilePicture, TitledArea } from '@components/ui/layouts';
import { Input, PhoneNumberInput } from '@components/ui/form';
import { Person, Photo } from '@components/ui/icons';
import OrganizerCard from './organizer-card';

interface ProfileInformationsProps {
    mode: Mode;
    user: UserProfile;
    setInformation: <T extends keyof UserProfileUpdatePayload>(key: T) => (value: UserProfileUpdatePayload[T]) => void;
}

const ProfileInformations: FunctionComponent<ProfileInformationsProps> = ({ mode, user, setInformation }) => {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const { register } = useForm<UserProfileUpdatePayload>({
        resolver: zodResolver(userProfileUpdateSchema),
    });
    
    const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePicture(file);
            setInformation('profilePicture')(file);
        }
    };
    
    return (
        <TitledArea title="Profile informations" Icon={Person}>
            <form className="flex flex-wrap justify-center items-start gap-5 pt-5 w-full">
                <div className="relative">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden">
                        {
                            profilePicture
                                ? (
                                    <Image
                                        src={URL.createObjectURL(profilePicture)}
                                        alt="Profile picture"
                                        fill
                                        quality={100}
                                        className="object-center object-cover"
                                    />
                                )
                                : <ProfilePicture asLink={false} showSignUp={false}/>
                        }
                    </div>
                    {
                        mode === 'edit' && (
                            <div
                                className="absolute bottom-0 right-0 w-fit aspect-square text-white bg-black rounded-full overflow-hidden hover:bg-opacity-90">
                                <div className="relative flex justify-center items-center w-full h-full p-3">
                                    <Photo/>
                                    <input
                                        onChange={handleProfilePictureChange}
                                        type="file"
                                        name="profile-picture"
                                        accept="image/*"
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 flex-1">
                    <Input
                        name="full-name"
                        label="Full name:"
                        value={`${user.firstName} ${user.lastName}`}
                        variant="auth"
                        className="pl-3 w-full bg-white"
                        labelClassName="text-black font-semibold"
                        wrapperClassName="w-full"
                        disabled={true}
                    />
                    <PhoneNumberInput
                        onChange={(value) => setInformation('phoneNumber')(value)}
                        value={user.phoneNumber}
                        name="phone-number"
                        label="Phone number:"
                        labelClassName="font-semibold"
                        wrapperClassName="w-full"
                        disabled={mode === 'view'}
                    />
                    <Input
                        name="email"
                        label="Email:"
                        type="email"
                        value={user.email}
                        variant="auth"
                        className="pl-3 w-full bg-white"
                        labelClassName="font-semibold"
                        wrapperClassName="w-full"
                        disabled={true}
                    />
                    <Input
                        register={register('username', {
                            onChange: (event) => setInformation('username')(event.target.value),
                        })}
                        defaultValue={user.username}
                        name="text"
                        label="Username:"
                        type="text"
                        variant="auth"
                        className={`pl-3 w-full ${mode === 'view' ? 'bg-white' : ''}`}
                        labelClassName="font-semibold"
                        wrapperClassName="w-full"
                        disabled={mode === 'view'}
                    />
                </div>
                <OrganizerCard
                    firstName={user.firstName}
                    lastName={user.lastName}
                    eventName="Event name"
                />
            </form>
        </TitledArea>
    );
};

export default ProfileInformations;
