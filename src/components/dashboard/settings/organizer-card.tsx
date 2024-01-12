import type { FunctionComponent } from 'react';
import Image from 'next/image';
import type { User, Event } from '@/types';
import { Card, ProfilePicture } from '@components/ui/layouts';

interface OrganizerCardProps {
    firstName: User['firstName'];
    lastName: User['lastName'];
    eventName: Event['title'];
}

const OrganizerCard: FunctionComponent<OrganizerCardProps> = ({ firstName, lastName, eventName }) => {
    return (
        <Card className="relative flex flex-col justify-between px-8 py-4 w-80 h-40 cursor-pointer">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start w-full h-full">
                    <p className="text-primary font-medium">ORGANIZER</p>
                    <p>{eventName}</p>
                </div>
                <div className="relative w-16 h-16 overflow-hidden">
                    <Image
                        src="/images/qr-code.png"
                        alt="QR Code"
                        quality={100}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvvVmPQAG9gK2nSziaQAAAABJRU5ErkJggg=="
                        fill
                        className="object-center object-cover"
                    />
                </div>
            </div>
            <div className="flex justify-start items-center gap-5 w-full">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <ProfilePicture asLink={false} showSignUp={false}/>
                </div>
                <div className="flex flex-col justify-center items-start h-full">
                    <p>{firstName}</p>
                    <p className="font-medium">{lastName}</p>
                </div>
            </div>
        </Card>
    );
};

export default OrganizerCard;
