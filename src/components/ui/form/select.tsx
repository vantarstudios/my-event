import type { FunctionComponent, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft } from '@components/ui/icons';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface SelectInputProps extends InputWrapperProps {
    value: string;
    options: readonly string[];
    onChange: (value: string) => void;
}

const Select: FunctionComponent<SelectInputProps> = ({ value, options, onChange, ...props }) => {
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <InputWrapper
            {...props}
            wrapperClassName={cn(props.wrapperClassName, 'relative')}
            icon={<ChevronLeft strokeWidth="thin" className="font-thin w-4 h-4 mb-0.5 rotate-180" />}
        >
            <div className="w-full h-full rounded-full px-8 py-2 outline-none ring-transparent font-semibold bg-white drop-shadow-md border border-opacity-5">
                {value}
            </div>
            <select
                name={props.name}
                className="absolute inset-0 w-full h-full rounded-none opacity-0 cursor-pointer px-2 border-none outline-none bg-transparent"
                value={value}
                onChange={handleSelectChange}
            >
                {options.map((option) => (
                    <option key={option} value={option} className="text-sm font-bold">
                        {option}
                    </option>
                ))}
            </select>
        </InputWrapper>
    );
};

export default Select;
