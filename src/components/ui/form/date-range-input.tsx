import type { FunctionComponent } from 'react';
import type { ParsedDate } from '@/types';
import { DateInput } from '@components/ui/form';

interface DateRangeInputProps {
    startDate: ParsedDate | null;
    endDate: ParsedDate | null;
    minStartDate?: Date;
    maxStartDate?: Date;
    minEndDate?: Date;
    maxEndDate?: Date;
    startDateLabel?: string;
    endDateLabel?: string;
    onStartDateChange: (newValue: ParsedDate) => void;
    onEndDateChange: (newValue: ParsedDate) => void;
    onStartDateClear: (newValue?: ParsedDate) => void;
    onEndDateClear: (newValue?: ParsedDate) => void;
}

const DateRangeInput: FunctionComponent<DateRangeInputProps> = ({
    startDate,
    endDate,
    minStartDate,
    maxStartDate,
    minEndDate,
    maxEndDate,
    startDateLabel = 'Start',
    endDateLabel = 'End',
    onStartDateChange,
    onEndDateChange,
    onStartDateClear,
    onEndDateClear,
}) => {
    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex justify-between items-center gap-5 w-full">
                <div className="flex flex-col justify-center items-start gap-3">
                    <p className="flex justify-start items-center w-full text-primary font-semibold">{startDateLabel}</p>
                    <DateInput
                        value={startDate}
                        minDate={minStartDate}
                        maxDate={maxStartDate}
                        onChange={onStartDateChange}
                        onClear={onStartDateClear}
                    />
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                    <p className="flex justify-start items-center w-full text-primary font-semibold">{endDateLabel}</p>
                    <DateInput
                        value={endDate}
                        minDate={minEndDate}
                        maxDate={maxEndDate}
                        onChange={onEndDateChange}
                        onClear={onEndDateClear}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateRangeInput;
