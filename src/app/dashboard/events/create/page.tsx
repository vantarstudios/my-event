'use client';

import { ReactNode, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import { eventTypes } from '@/types';
import { Button } from '@components/ui';
import { Radio } from '@components/ui/form';
import { Card } from '@components/ui/layouts';
import { ChevronLeft, Online, Location } from '@components/ui/icons';
import { CreateEvent } from '@components/events';

const eventTypeIcons: Record<(typeof eventTypes)[number], ReactNode> = {
    online: <Online className="w-16 h-16" />,
    live: <Location className="w-14 h-14" />,
};

const DashboardEditCreatePage: NextPage = () => {
    const router = useRouter();
    const [eventType, setEventType] = useState<(typeof eventTypes)[number] | null>(null);
    const [startCreation, setStartCreation] = useState<boolean>(false);

    const handleStartCreation = () => {
        if (eventType === null) return;
        setStartCreation(true);
    };

    return (
        <div className="w-full h-full">
            <Button
                className="flex justify-center items-center gap-2 mb-5 bg-inherit text-3xl text-black font-bold"
                onClick={() => router.back()}
            >
                <ChevronLeft strokeWidth="regular" className="w-5 h-5" />
                New event
            </Button>
            {!startCreation && (
                <div className="flex flex-col justify-start items-center gap-10">
                    <p className="text-4xl text-primary font-bold">What type of event are you creating?</p>
                    <div className="flex justify-between items-center gap-10 py-10">
                        {eventTypes.map((type) => (
                            <Card
                                key={type}
                                onClick={() => setEventType(type)}
                                className="flex flex-col justify-center items-center gap-5 h-48 aspect-square rounded-xl shadow-md cursor-pointer"
                            >
                                {eventTypeIcons[type]}
                                <p className="text-2xl font-medium">{capitalize(type)}</p>
                                <Radio name="event-type" checked={eventType === type} />
                            </Card>
                        ))}
                    </div>
                    <Button onClick={handleStartCreation} className="px-10">
                        Create my event
                    </Button>
                </div>
            )}
            {startCreation && eventType !== null && <CreateEvent type={eventType} />}
        </div>
    );
};

export default DashboardEditCreatePage;
