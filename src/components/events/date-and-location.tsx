'use client';

import { useState } from 'react';
import type { FunctionComponent, ChangeEvent } from 'react';
import { parseDateTime, getISOString, serializeDateTime } from '@/lib/utils';
import { EventType} from '@/types/constants';
import type { CreateEventPayload } from '@/types/events';
import type { Event, ParsedDateTime, Layout } from '@/types';
import { TitledArea } from '@components/ui/layouts';
import { DateRangeInput, TimeRangeInput, LocationInput } from '@components/ui/form';

interface DateAndLocationProps
    extends Partial<Pick<Event, 'startingDate' | 'endingDate' | 'location'>>,
        Pick<Event, 'type'> {
    layout: Layout;
    setOtherData: <T extends keyof CreateEventPayload>(key: T) => (value: CreateEventPayload[T]) => void;
}

const DateAndLocation: FunctionComponent<DateAndLocationProps> = ({ layout, type, startingDate, endingDate, location, setOtherData }) => {
    const [startDateTime, setStartDateTime] = useState<ParsedDateTime>(
        startingDate ? parseDateTime(startingDate, 'both') : { date: null, time: null },
    );
    const [endDateTime, setEndDateTime] = useState<ParsedDateTime>(
        endingDate ? parseDateTime(endingDate, 'both') : { date: null, time: null },
    );
    
    const handleStartDateTimeChange = (key: keyof ParsedDateTime) => (value?: ParsedDateTime[keyof ParsedDateTime]) => {
        const newValue = { ...startDateTime, [key]: value ?? null };
        setStartDateTime(newValue);
        setOtherData('startingDate')(getISOString(newValue));
    };
    
    const handleEndDateTimeChange = (key: keyof ParsedDateTime) => (value?: ParsedDateTime[keyof ParsedDateTime]) => {
        const newValue = { ...endDateTime, [key]: value ?? null };
        setEndDateTime(newValue);
        setOtherData('endingDate')(getISOString(newValue));
    };

    return (
        <div className="flex justify-between items-start gap-40 w-full mb-10">
            <div className="flex flex-col gap-10 basis-2/5">
                <DateRangeInput
                    startDateLabel="Starting date:"
                    endDateLabel="Ending date:"
                    startDate={startDateTime.date}
                    endDate={endDateTime.date}
                    minStartDate={layout === 'create' ? new Date() : undefined}
                    maxStartDate={layout === 'create' ? serializeDateTime(endDateTime.date, null) : undefined}
                    minEndDate={layout === 'create' ? serializeDateTime(startDateTime.date, null, new Date()) : undefined}
                    onStartDateChange={handleStartDateTimeChange('date')}
                    onEndDateChange={handleEndDateTimeChange('date')}
                    onStartDateClear={handleStartDateTimeChange('date')}
                    onEndDateClear={handleEndDateTimeChange('date')}
                />
                <TimeRangeInput
                    startTimeLabel="Starting time:"
                    endTimeLabel="Ending time:"
                    startTime={startDateTime.time}
                    endTime={endDateTime.time}
                    onStartTimeChange={handleStartDateTimeChange('time')}
                    onEndTimeChange={handleEndDateTimeChange('time')}
                    onStartTimeClear={handleStartDateTimeChange('time')}
                    onEndTimeClear={handleEndDateTimeChange('time')}
                />
            </div>
            {type === EventType.LIVE && (
                <TitledArea title="Location:" className="group w-full">
                    <LocationInput
                        name="location"
                        placeholder="Your event's location"
                        enableMap={true}
                        className="font-medium"
                        value={location}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setOtherData('location')(event.target.value);
                        }}
                    />
                </TitledArea>
            )}
        </div>
    );
};

export default DateAndLocation;
