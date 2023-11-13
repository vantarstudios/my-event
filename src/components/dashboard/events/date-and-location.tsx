'use client';

import { useState } from 'react';
import type { FunctionComponent, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { parseDateTime, serializeDateTime } from '@/lib/utils';
import type { Event, ParsedDateTime } from '@/types';
import { TitledArea } from '@components/ui/layouts';
import { DateInput, TimeInput, LocationInput } from '@components/ui/form';
import { Calendar, Location } from '@components/icons';

interface DateAndLocationProps extends Pick<Event, 'startDate' | 'endDate' | 'location'> {}

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

const DateAndLocation: FunctionComponent<DateAndLocationProps> = ({ startDate, endDate, location }) => {
    const [locationInputValue, setLocation] = useState<Event['location']>(location);
    const [startDateTime, setStartDateTime] = useState<ParsedDateTime>(parseDateTime(startDate, 'both'));
    const [endDateTime, setEndDateTime] = useState<ParsedDateTime>(
        endDate ? parseDateTime(endDate, 'both') : { date: null, time: null },
    );

    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    return (
        <div className="flex flex-wrap justify-start items-start w-full child:pb-10 child:pr-32">
            <TitledArea title="Date:" className="basis-1/2">
                <div className="flex justify-between items-center gap-5 w-full px-10 py-4 shadow-md rounded-full border border-gray-100">
                    <div className="flex items-center gap-5">
                        <Calendar className="w-5 h-5" />
                        <div className="flex flex-col items-start gap-2">
                            <p className="flex justify-start items-center w-full text-primary font-medium">Start</p>
                            <div className="flex justify-start items-center gap-4 h-full">
                                <DateInput
                                    name="startDate"
                                    value={startDateTime.date}
                                    minDate={new Date()}
                                    maxDate={serializeDateTime(endDateTime.date, null)}
                                    onChange={handleChange('date', setStartDateTime)}
                                    onClear={handleClear('date', setStartDateTime)}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="h-1 w-2 bg-black rounded-full" />
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col items-start gap-2">
                            <p className="flex justify-end items-center w-full text-primary font-medium">End</p>
                            <div className="flex justify-end items-center gap-4">
                                <DateInput
                                    name="endDate"
                                    value={endDateTime.date}
                                    minDate={serializeDateTime(startDateTime.date, null, new Date())}
                                    onChange={handleChange('date', setEndDateTime)}
                                    onClear={handleClear('date', setEndDateTime)}
                                />
                            </div>
                        </div>
                        <Calendar className={`w-5 h-5 ${endDateTime.date ? 'text-black' : 'text-gray-300'}`} />
                    </div>
                </div>
            </TitledArea>
            <TitledArea title="Location:" className="basis-1/2">
                <div className="flex justify-between items-center gap-5 w-full px-5 py-4 shadow-md rounded-full border border-gray-100">
                    <Location className="w-5 h-5" />
                    <LocationInput
                        name="location"
                        placeholder="Your event's location"
                        value={locationInputValue}
                        onChange={handleLocationChange}
                        className="w-full min-w-max h-full"
                    />
                </div>
            </TitledArea>
            <TitledArea title="Time:" className="basis-1/3">
                <div className="flex flex-wrap justify-between items-center gap-5 w-full px-5 py-4 shadow-md rounded-full border border-gray-100">
                    <div className="flex justify-between items-center gap-5 w-full">
                        <div className="flex justify-start items-center gap-5 -mr-5">
                            <p className="text-primary font-medium">Start</p>
                            <TimeInput
                                name="startTime"
                                value={startDateTime.time}
                                className="text-lg"
                                onChange={handleChange('time', setStartDateTime)}
                                onClear={handleClear('time', setStartDateTime)}
                            />
                        </div>
                        <hr className="h-1 w-2 bg-black rounded-full" />
                        <div className="flex justify-end items-center">
                            <TimeInput
                                name="endTime"
                                value={endDateTime.time}
                                className="text-lg"
                                onChange={handleChange('time', setEndDateTime)}
                                onClear={handleClear('time', setEndDateTime)}
                            />
                            <p className="text-primary font-medium">End</p>
                        </div>
                    </div>
                </div>
            </TitledArea>
        </div>
    );
};

export default DateAndLocation;
