'use client';

import { useState, type FunctionComponent, type HTMLAttributes, Fragment } from 'react';
import moment from 'moment';
import { cn } from '@/lib/utils';
import type { DateObject } from '@/types';
import { ChevronLeft } from '@components/ui/icons';

export interface CalendarProps {
    value: DateObject | null;
    onChange: (newDate: DateObject) => void;
    minDate?: Date;
    maxDate?: Date;
    className: HTMLAttributes<HTMLDivElement>['className'];
}

export const MIN_YEAR = 2024;
export const MAX_YEAR = moment().year() + 25;
export const CURRENT_YEAR = moment().year();
export const CURRENT_MONTH = moment().month();
export const CURRENT_DAY = moment().date();
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

export const getDaysInMonth = (year: number, month: number) => moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth();

const Calendar: FunctionComponent<CalendarProps> = (props) => {
    const [selectedYear, setSelectedYear] = useState<number>(props.value?.year || CURRENT_YEAR);
    const [selectedMonth, setSelectedMonth] = useState<number>(props.value?.month || CURRENT_MONTH);
    const [selectedDay, setSelectedDay] = useState<number>(props.value?.day || CURRENT_DAY);
    
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const monthStartWeekDay = moment(`${selectedYear}-${selectedMonth + 1}-1`, 'YYYY-MM-D').isoWeekday() - 1;
    const currentWeekDay = moment(`${selectedYear}-${selectedMonth + 1}-${selectedDay}`, 'YYYY-MM-DD').isoWeekday() - 1;
    
    const incrementYear = () => {
        setSelectedYear(Math.min(selectedYear + 1, MAX_YEAR));
    };
    
    const decrementYear = () => {
        setSelectedYear(Math.max(selectedYear - 1, MIN_YEAR));
    };
    
    const handleDayClick = (day: number) => () => {
        setSelectedDay(day);
        props.onChange({ year: selectedYear, month: selectedMonth, day });
    };
    
    return (
        <div className={cn('flex flex-col gap-y-2.5 w-80 p-5 bg-white rounded-3xl shadow-lg select-none', props.className)}>
            <div className="relative group flex justify-between w-full h-fit px-10 font-semibold overflow-x-auto overflow-y-hidden">
                {
                    selectedYear > MIN_YEAR ? (
                        <Fragment>
                            <ChevronLeft
                                strokeWidth="regular"
                                className="hidden group-hover:block absolute left-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={decrementYear}
                            />
                            <button
                                className="text-gray-400"
                                onClick={decrementYear}
                            >
                                {selectedYear - 1}
                            </button>
                        </Fragment>
                    ) : <span className="opacity-0">{MIN_YEAR}</span>
                }
                <button className="text-primary text-lg">
                    {selectedYear}
                </button>
                {
                    selectedYear < MAX_YEAR ? (
                        <Fragment>
                            <button
                                className="text-gray-400"
                                onClick={incrementYear}
                            >
                                {selectedYear + 1}
                            </button>
                            <ChevronLeft
                                strokeWidth="regular"
                                className="hidden group-hover:block absolute right-2.5 top-1/2 transform -translate-y-1/2 rotate-180 cursor-pointer"
                                onClick={incrementYear}
                            />
                        </Fragment>
                    ) : <span className="opacity-0">{MAX_YEAR}</span>
                }
            </div>
            <div className="flex flex-no-wrap items-center gap-x-5 w-full overflow-x-auto hidden-scroll">
                {
                    MONTHS.map((month, index) => (
                        <button
                            key={month}
                            onClick={() => setSelectedMonth(index)}
                            className={`text-center font-semibold hover:text-primary ${
                                index === selectedMonth
                                    ? 'relative text-sm text-primary after:content-"" after:w-5/6 after:h-1 after:bg-primary after:absolute after:top-full after:left-0 after:transition-all after:duration-500 after:ease-out'
                                    : 'text-xs'
                            }`}
                        >
                            {month}
                        </button>
                    ))
                }
            </div>
            <div className="grid grid-cols-7 gap-x-5 gap-y-2.5">
                {
                    DAYS.map((day, index) => (
                        <p
                            key={day}
                            className={`text-xs text-center ${
                                index === currentWeekDay && 'text-primary font-medium'
                            }`}
                        >
                            {day}
                        </p>
                    ))
                }
                {
                    Array.from({ length: monthStartWeekDay }, (_, index) => index).map((index) => (
                        <span key={index} />
                    ))
                }
                {
                    Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => (
                        <button
                            key={day}
                            onClick={handleDayClick(day)}
                            className={`flex justify-center items-center text-sm p-0.5 aspect-square rounded-full ${
                                day === selectedDay
                                    ? 'relative text-primary font-bold after:bg-primary after:rounded-full after:w-1.5 after:h-1.5 after:aspect-square after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:content-""'
                                    : 'hover:text-white hover:bg-primary'
                            }`}
                        >
                            {day}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default Calendar;
