import type { FunctionComponent, MouseEvent } from 'react';
import { useToggleVisibility } from '@/lib/hooks';
import { ChevronLeft } from '@components/ui/icons';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface SelectInputProps extends InputWrapperProps {
    value: string;
    placeholder?: string;
    options: readonly string[];
    onChange: (value: string) => void;
}

const Select: FunctionComponent<SelectInputProps> = ({ value, placeholder, options, onChange, ...props }) => {
    const { ref, isVisible: isExpanded, setIsVisible: setIsExpanded } = useToggleVisibility<HTMLDivElement>(false);

    const handleSelect = (option: string) => (event: MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();
        setIsExpanded(false);
        onChange(option);
    };

    return (
        <InputWrapper
            {...props}
            wrapperClassName={props.wrapperClassName}
            icon={<ChevronLeft
                strokeWidth="thin"
                className={`font-thin w-3 h-3 mb-1 transition-transform transform ${
                    isExpanded ? '-rotate-90' : '-rotate-180'
                }`}
            />}
        >
            <div
                ref={ref}
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center w-full h-10 rounded-full px-8 py-2 outline-none ring-transparent font-medium bg-gray-100"
            >
                {value}
                {
                    !value && (
                        <p className="text-sm text-gray-500">{placeholder}</p>
                    )
                }
            </div>
            <ul className={`absolute top-full left-0 translate-y-2.5 z-50 w-full h-fit max-h-48 py-2 bg-white border rounded-xl cursor-pointer overflow-x-hidden overflow-y-auto transition-all ${
                !isExpanded && 'hidden'}`}
            >
                {options.map((option) => (
                    <li
                        key={option}
                        onClick={handleSelect(option)}
                        className={`font-medium p-2 transition-all hover:bg-gray-100 ${
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
