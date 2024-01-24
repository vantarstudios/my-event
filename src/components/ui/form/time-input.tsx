'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import TimePicker from 'react-time-picker';
import type { TimePickerProps } from 'react-time-picker';
import type { Value } from 'react-time-picker/dist/esm/shared/types';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { cn, leadingZeroFormat } from '@/lib/utils';
import type { ParsedTime } from '@/types';
import { Cross } from '@components/ui/icons';

interface DateInputProps extends Omit<TimePickerProps, 'value' | 'onChange'> {
    value: ParsedTime | null;
    onChange: (newTime: ParsedTime) => void;
    onClear: () => void;
}

type AmPmType = 'am' | 'pm';

const convert24to12 = (hour24: string | number): [number, AmPmType] => {
    const hour12 = Number(hour24) % 12 || 12;

    return [hour12, Number(hour24) < 12 ? 'am' : 'pm'];
};

const convert12to24 = (hour12: number, amPm: AmPmType): number => {
    let hour24 = Number(hour12);

    if (amPm === 'am' && hour24 === 12) {
        hour24 = 0;
    } else if (amPm === 'pm' && hour24 < 12) {
        hour24 += 12;
    }

    return hour24;
};

const getTimeString = (time: ParsedTime | null): Value => {
    return time !== null ? `${
        leadingZeroFormat(convert24to12(time.hour)[0])
    }:${
        leadingZeroFormat(time.minute)
    }` : '';
};

const TimeInput: FunctionComponent<DateInputProps> = ({ value, onChange, onClear, className, ...props }) => {
    const [initialHour, initialAmPm] = value !== null ? convert24to12(value.hour) : [12, 'am' as AmPmType];
    const initialMinute = value !== null ? value.minute : 0;

    const [time, setTime] = useState<ParsedTime | null>(
        value !== null ? { hour: initialHour, minute: initialMinute } : null,
    );
    const [showClear, setShowClear] = useState<boolean>(value !== null);
    const [amPm, setAmPm] = useState<AmPmType>(initialAmPm);

    const handleChange = (newValue: Value) => {
        if (newValue === null) {
            return;
        }

        setShowClear(true);
        const [hour, minute] = newValue.split(':');

        if (!hour || !minute) {
            return;
        }

        setTime({
            hour: +hour,
            minute: +minute,
        });
        saveChange();
    };

    const handleAmPmChange = (newAmPm: AmPmType) => () => {
        setAmPm(newAmPm);
        saveChange();
    };

    const handleClear = () => {
        setTime(null);
        setShowClear(false);
        saveChange();
        onClear();
    };

    const saveChange = () => {
        if (time === null) {
            return;
        }

        onChange({
            hour: convert12to24(time.hour, amPm),
            minute: time.minute,
        });
    };

    return (
        <div className="relative flex justify-between items-center gap-4 px-5 h-10 bg-gray-100 rounded-full min-w-max w-full">
            <TimePicker
                {...props}
                id={props.name}
                format="HH:mm"
                value={getTimeString(time)}
                clockIcon={null}
                shouldOpenClock={() => false}
                clearIcon={showClear ? <Cross onClick={handleClear} className="size-4 text-red-500"/> : null}
                hourPlaceholder="00"
                minutePlaceholder="00"
                onChange={handleChange}
                onInvalidChange={() => {}}
                clockClassName="border-0 outline-none"
                className={cn('border-0 focus:outline-none font-medium', className)}
            />
            <div className="flex gap-3 child:cursor-pointer">
                <span
                    onClick={handleAmPmChange('am')}
                    className={`text-gray-400 ${amPm === 'am' && 'text-primary font-semibold'}`}
                >
                    AM
                </span>
                <span
                    onClick={handleAmPmChange('pm')}
                    className={`text-gray-400 ${amPm === 'pm' && 'text-primary font-semibold'}`}
                >
                    PM
                </span>
            </div>
        </div>
    );
};

export default TimeInput;
