import type { FunctionComponent } from 'react';
import { serializeDateTime } from '@/lib/utils';
import type { ParsedDate } from '@/types';
import { DateInput } from '@components/ui/form';
import { Calendar } from '@components/ui/icons';

interface DateRangeInputProps {
    startDate: ParsedDate | null;
    endDate: ParsedDate | null;
    startDateLabel?: string;
    endDateLabel?: string;
    onStartDateChange: (newValue: ParsedDate) => void;
    onEndDateChange: (newValue: ParsedDate) => void;
    onStartDateClear: () => void;
    onEndDateClear: () => void;
}

const DateRangeInput: FunctionComponent<DateRangeInputProps> = ({
    startDate,
    endDate,
    startDateLabel = 'Start',
    endDateLabel = 'End',
    onStartDateChange,
    onEndDateChange,
    onStartDateClear,
    onEndDateClear,
}) => {
    return (
        <div className="flex justify-between items-center gap-5 w-full">
            <div className="flex flex-col justify-center items-start gap-3">
                <p className="flex justify-start items-center w-full text-primary font-semibold">{startDateLabel}</p>
                <div className="flex justify-between items-center gap-4 px-8 h-12 bg-gray-100 rounded-full">
                    <Calendar className={`w-5 h-5 ${endDate ? 'text-black' : 'text-gray-400'}`} />
                    <DateInput
                        name="startDate"
                        value={startDate}
                        minDate={new Date()}
                        maxDate={serializeDateTime(endDate, null)}
                        onChange={onStartDateChange}
                        onClear={onStartDateClear}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
                <p className="flex justify-start items-center w-full text-primary font-semibold">{endDateLabel}</p>
                <div className="flex justify-between items-center gap-4 px-8 h-12 bg-gray-100 rounded-full">
                    <Calendar className={`w-5 h-5 ${endDate ? 'text-black' : 'text-gray-400'}`} />
                    <DateInput
                        name="endDate"
                        value={endDate}
                        minDate={serializeDateTime(startDate, null, new Date())}
                        onChange={onEndDateChange}
                        onClear={onEndDateClear}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateRangeInput;
