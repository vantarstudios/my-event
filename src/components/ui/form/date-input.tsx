'use client';

import type { FunctionComponent } from 'react';
import type { DateObject } from '@/types';
import { useToggleVisibility } from '@/lib/hooks';
import { Calendar as CalendarIcon, Cross } from '@components/ui/icons';
import { Calendar } from '@components/ui';
import { MONTHS, MIN_YEAR, MAX_YEAR, CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, getDaysInMonth, type CalendarProps } from '@components/ui/calendar';

interface DateInputProps extends CalendarProps {
    value: DateObject | null;
    onChange: (newDate: DateObject) => void;
    onClear: () => void;
}

const DateInput: FunctionComponent<DateInputProps> = ({ value, onChange, onClear }) => {
    const {
        ref: dayPickerRef,
        isVisible: showDayPicker,
        setIsVisible: setShowDayPicker,
    } = useToggleVisibility<HTMLUListElement>(false);
    const {
        ref: monthPickerRef,
        isVisible: showMonthPicker,
        setIsVisible: setShowMonthPicker,
    } = useToggleVisibility<HTMLUListElement>(false);
    const {
        ref: yearPickerRef,
        isVisible: showYearPicker,
        setIsVisible: setShowYearPicker,
    } = useToggleVisibility<HTMLUListElement>(false);
    const {
        ref: calendarRef,
        isVisible: showCalendar,
        setIsVisible: setShowCalendar,
    } = useToggleVisibility<HTMLDivElement>(false);
    
    const handleChange = <T extends keyof DateObject>(key: T, newValue: DateObject[T]) => () => {
        onChange({
            year: key === 'year' ? newValue : value?.year ?? CURRENT_YEAR,
            month: key === 'month' ? newValue : value?.month ?? CURRENT_MONTH,
            day: key === 'day' ? newValue : value?.day ?? CURRENT_DAY,
        });
    };

    return (
        <div
            ref={calendarRef}
            className="relative flex justify-between items-center gap-4 w-60 px-5 py-1 h-10 bg-gray-100 rounded-full"
        >
            <CalendarIcon
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-4 h-4 text-black cursor-pointer"
            />
            <div className={`flex justify-evenly items-center flex-1 h-full px-2 bg-white rounded-md text-black font-medium ${
                !value && 'text-sm'
            }`}>
                <button
                    onClick={() => setShowDayPicker(!showDayPicker)}
                    className="relative flex justify-between items-center h-full hover:text-primary focus:outline-none"
                >
                    {value?.day ?? 'DD'}
                    {
                        showDayPicker && (
                            <ul
                                ref={dayPickerRef}
                                className="absolute top-full z-40 flex flex-col justify-between items-start max-w-fit h-40 text-black bg-white shadow-md rounded-lg overflow-y-auto"
                            >
                                {
                                    Array.from({ length: getDaysInMonth(value?.year ?? CURRENT_YEAR, value?.month ?? CURRENT_MONTH) }, (_, index) => (
                                        <li
                                            key={index}
                                            onClick={handleChange('day', index + 1)}
                                            className={`flex justify-start items-center w-full p-2 pr-5 text-xs cursor-pointer ${
                                                (index + 1) === value?.day
                                                    ? 'bg-primary bg-opacity-25 hover:bg-opacity-50'
                                                    : 'hover:bg-gray-200'
                                            }`}
                                        >
                                            {index + 1}
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </button>
                <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="relative flex justify-between items-center h-full hover:text-primary focus:outline-none"
                >
                    {value ? MONTHS[value.month]?.slice(0, 3) ?? 'MMM' : 'MMM'}
                    {
                        showMonthPicker && (
                            <ul
                                ref={monthPickerRef}
                                className="absolute top-full z-40 flex flex-col justify-between items-start max-w-fit h-40 text-black bg-white shadow-md rounded-lg overflow-y-auto"
                            >
                                {
                                    MONTHS.map((month, index) => (
                                        <li
                                            key={index}
                                            onClick={handleChange('month', index)}
                                            className={`flex justify-start items-center w-full p-2 pr-5 text-xs cursor-pointer ${
                                                index === (value?.month ?? CURRENT_MONTH)
                                                    ? 'bg-primary bg-opacity-25 hover:bg-opacity-50'
                                                    : 'hover:bg-gray-200'
                                            }`}
                                        >
                                            {month}
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </button>
                <button
                    onClick={() => setShowYearPicker(!showYearPicker)}
                    className="relative flex justify-between items-center h-full  hover:text-primary focus:outline-none"
                >
                    {value?.year ?? 'YYYY'}
                    {
                        showYearPicker && (
                            <ul
                                ref={yearPickerRef}
                                className="absolute top-full z-40 flex flex-col justify-between items-start max-w-fit h-40 text-black bg-white shadow-md rounded-lg overflow-y-auto"
                            >
                                {
                                    Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, index) => (
                                        <li
                                            key={index}
                                            onClick={handleChange('year', MIN_YEAR + index)}
                                            className={`flex justify-start items-center w-full p-2 pr-5 text-xs cursor-pointer ${
                                                (MIN_YEAR + index) === (value?.year ?? CURRENT_YEAR)
                                                    ? 'bg-primary bg-opacity-25 hover:bg-opacity-50'
                                                    : 'hover:bg-gray-200'
                                            }`}
                                        >
                                            {MIN_YEAR + index}
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </button>
            </div>
            <Cross onClick={onClear} className={`w-4 h-4 text-red-500 cursor-pointer ${value === null && 'opacity-0'}`}/>
            <Calendar
                value={value}
                onChange={onChange}
                className={`absolute top-full left-0 mt-2.5 z-30 ${showCalendar ? 'block' : 'hidden'}`}
            />
        </div>
    );
};

export default DateInput;
