'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import { EventType } from '@/types/constants';
import type { EventTypeUnion } from '@/types';
import { Button } from '@components/ui/buttons';
import { Radio } from '@components/ui/form';
import { Card } from '@components/ui/layouts';
import { ChevronLeft, Online, Location } from '@components/ui/icons';
import { EditOrCreateEventLayout } from '@components/events';

const eventTypeIcons: Record<EventTypeUnion, ReactNode> = {
    [EventType.ONLINE]: <Online className="w-14 h-14" />,
    [EventType.LIVE]: <Location className="w-12 h-12" />,
};

const DashboardEditCreatePage: NextPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [eventType, setEventType] = useState<EventTypeUnion | null>(EventType.LIVE);
    const [startCreation, setStartCreation] = useState<boolean>(searchParams.has('step'));

    const handleStartCreation = () => {
        if (eventType === null) return;
        setStartCreation(true);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <Button
                className="flex justify-center items-center gap-2 mb-5 bg-inherit text-xl text-black font-bold"
                onClick={() => router.back()}
            >
                <ChevronLeft strokeWidth="regular" className="w-4 h-4" />
                New event
            </Button>
            {!startCreation && (
                <div className="flex flex-col justify-start items-center gap-10 pt-20">
                    <p className="text-2xl text-primary font-bold">What type of event are you creating?</p>
                    <div className="flex justify-between items-center gap-10 py-10">
                        {Object.values(EventType).map((type) => (
                            <Card
                                key={type}
                                onClick={(type !== EventType.ONLINE) ? (() => setEventType(type)) : undefined}
                                className={`flex flex-col justify-center items-center gap-5 h-48 aspect-square rounded-xl shadow-md ${
                                    type === EventType.ONLINE ? 'opacity-50 cursor-not-allowed hover:shadow-md' : 'cursor-pointer'
                                }`}
                            >
                                {eventTypeIcons[type]}
                                <p className="w-fit mx-auto text-xl text-center font-medium">{capitalize(type)}</p>
                                <Radio name="event-type" checked={eventType === type} />
                            </Card>
                        ))}
                    </div>
                    <Button onClick={handleStartCreation} className="px-10" disabled={eventType === null}>
                        Create my event
                    </Button>
                </div>
            )}
            {
                startCreation && eventType !== null && (
                    <div className="pl-10 flex-1">
                        <EditOrCreateEventLayout
                            eventType={eventType}
                            layout="create"
                            onModeToggle={() => router.push('/dashboard/events')}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default DashboardEditCreatePage;
