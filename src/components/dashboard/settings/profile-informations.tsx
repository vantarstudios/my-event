import type { FunctionComponent } from 'react';
import Image from 'next/image';
import type { Mode } from '@/types';
import { Button } from '@components/ui';
import { TitledArea } from '@components/ui/layouts';
import { Input } from '@components/ui/form';
import { Person, Photo } from '@components/ui/icons';
import OrganizerCard from './organizer-card';

interface ProfileInformationsProps {
    mode: Mode;
}

const ProfileInformations: FunctionComponent<ProfileInformationsProps> = ({ mode }) => {
    return (
        <TitledArea title="Profile informations" Icon={Person}>
            <div className="flex flex-wrap justify-center items-start gap-5 pt-5 w-full">
                <div className="relative">
                    <Image src="/dash-profile.svg" alt="User" width={100} height={100} />
                    <Button className="absolute bottom-0 right-0 p-2 aspect-square rounded-full">
                        <Photo />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-5 justify-evenly flex-1 child:w-2/5">
                    <Input
                        name="full-name"
                        label="Full name:"
                        value="Gideon AMOUSSOU-CHOUH"
                        variant="auth"
                        className={`text-sm ${mode === 'view' ? 'bg-white' : ''}`}
                        labelClassName="text-black text-sm font-semibold"
                        disabled={mode === 'view'}
                    />
                    <Input
                        name="phone-number"
                        label="Phone number:"
                        type="tel"
                        value="+229 12345678"
                        variant="auth"
                        className={`text-sm ${mode === 'view' ? 'bg-white' : ''}`}
                        labelClassName="text-sm font-semibold"
                        disabled={mode === 'view'}
                    />
                    <Input
                        name="email"
                        label="Email:"
                        type="email"
                        value="hged04@gmail.com"
                        variant="auth"
                        className={`text-sm ${mode === 'view' ? 'bg-white' : ''}`}
                        labelClassName="text-sm font-semibold"
                        disabled={mode === 'view'}
                    />
                    <Input
                        name="password"
                        label="Password:"
                        type="password"
                        value="MyPassword"
                        variant="auth"
                        className={`text-sm ${mode === 'view' ? 'bg-white' : ''}`}
                        labelClassName="text-sm font-semibold"
                        disabled={mode === 'view'}
                    />
                </div>
                <OrganizerCard
                    firstName="Gideon"
                    lastName="AMOUSSOU-CHOUH"
                    profilePicture="/dash-profile.svg"
                    eventName="Event name"
                />
            </div>
        </TitledArea>
    );
};

export default ProfileInformations;
