import type { FunctionComponent } from 'react';
import TimePicker from 'react-time-picker';
import type { TimePickerProps } from 'react-time-picker';
import type { Value } from 'react-time-picker/dist/esm/shared/types';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { cn } from '@/lib/utils';
import type { ParsedTime } from '@/types';
import { Cross } from '@components/icons';

interface DateInputProps extends Omit<TimePickerProps, 'value' | 'onChange'> {
    value: ParsedTime | null;
    onChange: (newTime: ParsedTime) => void;
    onClear: () => void;
}

const getTimeString = (time: ParsedTime | null): string => {
    return time !== null ? `${time.hour}:${time.minute}` : '';
};

const TimeInput: FunctionComponent<DateInputProps> = ({ value, onChange, onClear, className, ...props }) => {
    const handleChange = (newValue: Value) => {
        if (newValue === null) {
            return;
        }

        const [hour, minute] = newValue.split(':');

        if (!hour || !minute) {
            return;
        }

        onChange({
            hour: +hour,
            minute: +minute,
        });
    };

    return (
        <TimePicker
            {...props}
            value={getTimeString(value)}
            format="HH:mm"
            clockIcon={null}
            shouldOpenClock={() => false}
            clearIcon={value !== null ? <Cross onClick={onClear} className="w-4 h-4" /> : null}
            hourPlaceholder="00"
            minutePlaceholder="00"
            onChange={handleChange}
            onInvalidChange={() => alert('Invalid time')}
            clockClassName="border-0 outline-none"
            className={cn('border-0 focus:outline-none font-medium', className)}
        />
    );
};

export default TimeInput;
