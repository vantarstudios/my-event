import type { FunctionComponent } from 'react';
import type { ParsedTime } from '@/types';
import { TimeInput } from '@components/ui/form';

interface TimeRangeInputProps {
    startTime: ParsedTime | null;
    endTime: ParsedTime | null;
    startTimeLabel?: string;
    endTimeLabel?: string;
    onStartTimeChange: (newValue: ParsedTime) => void;
    onEndTimeChange: (newValue: ParsedTime) => void;
    onStartTimeClear: () => void;
    onEndTimeClear: () => void;
}

const TimeRangeInput: FunctionComponent<TimeRangeInputProps> = ({
    startTime,
    endTime,
    startTimeLabel = 'Start',
    endTimeLabel = 'End',
    onStartTimeChange,
    onEndTimeChange,
    onStartTimeClear,
    onEndTimeClear,
}) => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-5 w-full">
            <div className="flex justify-between items-center gap-3 w-full">
                <div className="flex flex-col justify-start items-center gap-3">
                    <p className="text-primary font-semibold w-full">{startTimeLabel}</p>
                    <TimeInput
                        name="startTime"
                        value={startTime}
                        className="text-lg"
                        onChange={onStartTimeChange}
                        onClear={onStartTimeClear}
                    />
                </div>
                <div className="flex flex-col justify-start items-center gap-3">
                    <p className="text-primary font-semibold w-full">{endTimeLabel}</p>
                    <TimeInput
                        name="endTime"
                        value={endTime}
                        className="text-lg"
                        onChange={onEndTimeChange}
                        onClear={onEndTimeClear}
                    />
                </div>
            </div>
        </div>
    );
};

export default TimeRangeInput;
