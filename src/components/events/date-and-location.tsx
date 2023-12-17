'use client';

import { useState } from 'react';
import type { FunctionComponent, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { parseDateTime } from '@/lib/utils';
import type { Event, ParsedDateTime } from '@/types';
import { TitledArea } from '@components/ui/layouts';
import { DateRangeInput, TimeRangeInput, LocationInput } from '@components/ui/form';
import { Location } from '@components/ui/icons';

interface DateAndLocationProps
    extends Partial<Pick<Event, 'startingDate' | 'endingDate' | 'location'>>,
        Pick<Event, 'type'> {}

const handleChange = <T extends 'date' | 'time'>(
    key: T,
    setKey: Dispatch<SetStateAction<ParsedDateTime>>,
): ((newValue: ParsedDateTime[T]) => void) => {
    return (newValue: ParsedDateTime[T]) => {
        setKey((previousValue) => {
            return {
                ...previousValue,
                [key]: newValue,
            };
        });
    };
};

const handleClear = <T extends 'date' | 'time'>(
    key: T,
    setKey: Dispatch<SetStateAction<ParsedDateTime>>,
): (() => void) => {
    return () => {
        setKey((currentValue) => {
            return {
                ...currentValue,
                [key]: null,
            };
        });
    };
};

const DateAndLocation: FunctionComponent<DateAndLocationProps> = ({ type, startingDate, endingDate, location }) => {
    const [locationInputValue, setLocation] = useState<Event['location']>(location || '');
    const [startDateTime, setStartDateTime] = useState<ParsedDateTime>(
        startingDate ? parseDateTime(startingDate, 'both') : { date: null, time: null },
    );
    const [endDateTime, setEndDateTime] = useState<ParsedDateTime>(
        endingDate ? parseDateTime(endingDate, 'both') : { date: null, time: null },
    );

    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    return (
        <div className="flex flex-wrap justify-between items-start w-full pb-5">
            <div className="basis-1/4">
                <DateRangeInput
                    startDate={startDateTime.date}
                    endDate={endDateTime.date}
                    startDateLabel="Starting date:"
                    endDateLabel="Ending date:"
                    onStartDateChange={handleChange('date', setStartDateTime)}
                    onEndDateChange={handleChange('date', setEndDateTime)}
                    onStartDateClear={handleClear('date', setStartDateTime)}
                    onEndDateClear={handleClear('date', setEndDateTime)}
                />
            </div>
            {type === 'live' && (
                <TitledArea title="Location:" className="basis-1/3">
                    <div className="flex flex-col justify-start items-center gap-5 w-full">
                        <div className="flex justify-between items-center gap-5 w-full h-10 px-8 rounded-full bg-gray-100">
                            <Location className={`w-4 h-4 ${locationInputValue ? 'text-black' : 'text-gray-400'}`} />
                            <LocationInput
                                name="location"
                                placeholder="Your event's location"
                                value={locationInputValue}
                                onChange={handleLocationChange}
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
                    onStartTimeChange={handleChange('time', setStartDateTime)}
                    onEndTimeChange={handleChange('time', setEndDateTime)}
                    onStartTimeClear={handleClear('time', setStartDateTime)}
                    onEndTimeClear={handleClear('time', setEndDateTime)}
                />
            </div>
        </div>
    );
};

export default DateAndLocation;
