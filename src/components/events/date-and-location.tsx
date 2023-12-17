'use client';

import { useState } from 'react';
import type { FunctionComponent, ChangeEvent } from 'react';
import Image from 'next/image';
import { parseDateTime, getISOString } from '@/lib/utils';
import { EventType} from '@/types/constants';
import type { Event, ParsedDateTime } from '@/types';
import { TitledArea } from '@components/ui/layouts';
import { DateRangeInput, TimeRangeInput, LocationInput } from '@components/ui/form';
import { Location } from '@components/ui/icons';
import type { CreateEventPayload } from '../../types/events';

interface DateAndLocationProps
    extends Partial<Pick<Event, 'startingDate' | 'endingDate' | 'location'>>,
        Pick<Event, 'type'> {
    setOtherData: <T extends keyof CreateEventPayload>(key: T) => (value: CreateEventPayload[T]) => void;
}

const DateAndLocation: FunctionComponent<DateAndLocationProps> = ({ type, startingDate, endingDate, location, setOtherData }) => {
    const [startDateTime, setStartDateTime] = useState<ParsedDateTime>(
        startingDate ? parseDateTime(startingDate, 'both') : { date: null, time: null },
    );
    const [endDateTime, setEndDateTime] = useState<ParsedDateTime>(
        endingDate ? parseDateTime(endingDate, 'both') : { date: null, time: null },
    );
    
    const handleStartDateTimeChange = (key: keyof ParsedDateTime) => (value?: ParsedDateTime[keyof ParsedDateTime]) => {
        setStartDateTime((currentValue) => {
            const newValue = { ...currentValue, [key]: value ?? null };
            setOtherData('startingDate')(getISOString(newValue));
            return newValue;
        });
    };
    
    const handleEndDateTimeChange = (key: keyof ParsedDateTime) => (value?: ParsedDateTime[keyof ParsedDateTime]) => {
        setEndDateTime((currentValue) => {
            const newValue = { ...currentValue, [key]: value ?? null };
            setOtherData('endingDate')(getISOString(newValue));
            return newValue;
        });
    }

    return (
        <div className="flex flex-wrap justify-between items-start w-full pb-5">
            <div className="basis-1/4">
                <DateRangeInput
                    startDate={startDateTime.date}
                    endDate={endDateTime.date}
                    startDateLabel="Starting date:"
                    endDateLabel="Ending date:"
                    onStartDateChange={handleStartDateTimeChange('date')}
                    onEndDateChange={handleEndDateTimeChange('date')}
                    onStartDateClear={handleStartDateTimeChange('date')}
                    onEndDateClear={handleEndDateTimeChange('date')}
                />
            </div>
            {type === EventType.LIVE && (
                <TitledArea title="Location:" className="basis-1/3">
                    <div className="flex flex-col justify-start items-center gap-5 w-full">
                        <div className="flex justify-between items-center gap-5 w-full h-10 px-8 rounded-full bg-gray-100">
                            <Location className={`w-4 h-4 ${location ? 'text-black' : 'text-gray-400'}`} />
                            <LocationInput
                                name="location"
                                placeholder="Your event's location"
                                value={location}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setOtherData('location')(event.target.value);
                                }}
                                className="w-full min-w-max bg-inherit"
                            />
                        </div>
                        <div className="relative w-full aspect-square">
                            <Image src="/images/map.png" alt="Event location" fill={true} />
                        </div>
                    </div>
                </TitledArea>
            )}
            <div className="basis-1/4">
                <TimeRangeInput
                    startTime={startDateTime.time}
                    endTime={endDateTime.time}
                    startTimeLabel="Starting time:"
                    endTimeLabel="Ending time:"
                    onStartTimeChange={handleStartDateTimeChange('time')}
                    onEndTimeChange={handleEndDateTimeChange('time')}
                    onStartTimeClear={handleStartDateTimeChange('time')}
                    onEndTimeClear={handleEndDateTimeChange('time')}
                />
            </div>
        </div>
    );
};

export default DateAndLocation;
