import type { ParsedDate, ParsedTime, ParsedDateTime } from '@/types';

type ParsingResult<T extends 'date' | 'time' | 'both'> = T extends 'date'
    ? ParsedDate
    : T extends 'time'
    ? ParsedTime
    : ParsedDateTime;

export function parseDateTime<T extends 'date' | 'time' | 'both'>(
    datetimeISOString: string,
    only: T,
): ParsingResult<T> {
    try {
        const dateObject = new Date(datetimeISOString);

        const date: ParsedDate = {
            day: dateObject.getDate(),
            month: dateObject.getMonth(),
            year: dateObject.getFullYear(),
        };

        const time: ParsedTime = {
            hour: dateObject.getHours(),
            minute: dateObject.getMinutes(),
        };

        return {
            date,
            time,
            both: { date, time },
        }[only] as ParsingResult<T>;
    } catch (error) {
        throw new Error('Invalid datetime string');
    }
}

export function serializeDateTime(date: ParsedDate | null, time: ParsedTime | null, fallback?: Date): Date | undefined {
    if (date !== null && time === null) {
        return new Date(date.year, date.month, date.day);
    }

    if (date === null && time !== null) {
        throw new Error('Date cannot be null when time is not');
    }

    return fallback;
}

export function getISOString(dateTime: ParsedDateTime): string {
    if (dateTime.date === null && dateTime.time === null) {
        return '';
    }
    
    const now = new Date();
    
    const date = dateTime.date ?? parseDateTime(now.toISOString(), 'date');
    
    const time = dateTime.time ?? parseDateTime(now.toISOString(), 'time');
    
    return new Date(date.year, date.month, date.day, time.hour, time.minute).toISOString();
}


export function hasSameDate(date1: string, date2: string) {
    return date1.split('T')[0] === date2.split('T')[0];
}
