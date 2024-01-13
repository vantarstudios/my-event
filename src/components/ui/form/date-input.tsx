import type { FunctionComponent } from 'react';
import DatePicker from 'react-date-picker';
import type { DatePickerProps } from 'react-date-picker';
import type { Value } from 'react-date-picker/dist/esm/shared/types';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { cn, parseDateTime, serializeDateTime } from '@/lib/utils';
import type { ParsedDate } from '@/types';
import { Cross } from '@components/ui/icons';

interface DateInputProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
    value: ParsedDate | null;
    onChange: (newDate: ParsedDate) => void;
    onClear: () => void;
}

const getDateString = (date: ParsedDate | null): Date | undefined => {
    return serializeDateTime(date, null);
};

const DateInput: FunctionComponent<DateInputProps> = ({ value, onChange, onClear, className, ...props }) => {
    const handleChange = (newValue: Value) => {
        if (newValue === null) {
            return;
        }
        onChange(parseDateTime((newValue as Date).toISOString(), 'date'));
    };
    
    const handleClear = () => {
        onClear();
    };

    return (
        <DatePicker
            {...props}
            value={getDateString(value)}
            format="dd/MM/yyyy"
            calendarIcon={null}
            showLeadingZeros={true}
            clearIcon={<Cross onClick={handleClear} className={`w-4 h-4 ${value === null && 'opacity-0'}`} />}
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
            onChange={handleChange}
            onInvalidChange={() => {}}
            calendarClassName="border-0 outline-none"
            className={cn('border-0 focus:outline-none font-medium', className)}
        />
    );
};

export default DateInput;
