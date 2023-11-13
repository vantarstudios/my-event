import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { Card } from '@components/ui';

interface OrganizerCardProps {
    firstName: string;
    lastName: string;
    profilePicture: string;
    eventName: string;
}

const OrganizerCard: FunctionComponent<OrganizerCardProps> = ({ firstName, lastName, profilePicture, eventName }) => {
    return (
        <Card className="flex flex-col gap-5 px-8 py-4 w-80 h-40 cursor-pointer">
            <div className="flex justify-between items-center w-full h-full">
                <div className="flex flex-col justify-between items-start w-full h-full">
                    <p className="text-primary font-medium">ORGANIZER</p>
                    <p className="text-sm">{eventName}</p>
                </div>
                <Image src="/images/qr-code.png" alt="QR Code" width={50} height={50} />
            </div>
            <div className="flex justify-start items-center gap-5 w-full h-full">
                <Image src={profilePicture} alt="User" width={50} height={50} />
                <div className="flex flex-col justify-between items-start h-full">
                    <p className="text-sm">{firstName}</p>
                    <p className="text-sm font-medium">{lastName}</p>
                </div>
            </div>
        </Card>
    );
};

export default OrganizerCard;
