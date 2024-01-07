import type { FunctionComponent, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { useToggleVisibility } from '@/lib/hooks';
import { ChevronLeft } from '@components/ui/icons';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface SelectInputProps extends InputWrapperProps {
    value: string;
    options: readonly string[];
    onChange: (value: string) => void;
}

const Select: FunctionComponent<SelectInputProps> = ({ value, options, onChange, ...props }) => {
    const { ref, isVisible: isExpanded, setIsVisible: setIsExpanded } = useToggleVisibility<HTMLDivElement>(false);

    const handleSelect = (option: string) => (event: MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();
        setIsExpanded(false);
        onChange(option);
    };

    return (
        <InputWrapper
            {...props}
            wrapperClassName={cn(props.wrapperClassName, 'relative')}
            icon={<ChevronLeft strokeWidth="thin" className="font-thin w-3 h-3 mb-0.5 rotate-180" />}
        >
            <div
                ref={ref}
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full h-full rounded-full px-8 py-2 outline-none ring-transparent font-medium bg-gray-100"
            >
                {value}
            </div>
            <ul className={`absolute top-full left-0 translate-y-2.5 z-50 w-full h-fit max-h-96 py-2 bg-white border rounded-xl cursor-pointer overflow-x-hidden overflow-y-auto transition-all ${
                !isExpanded && 'hidden'}`}
            >
                {options.map((option) => (
                    <li
                        key={option}
                        onClick={handleSelect(option)}
                        className={`text-sm font-medium p-2 transition-all hover:bg-gray-100 ${
                            option === value && 'bg-gray-200'
                        }`}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </InputWrapper>
    );
};

export default Select;
