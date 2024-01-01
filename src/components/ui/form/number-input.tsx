import type { FunctionComponent, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface NumberInputProps extends InputWrapperProps {
    value: string;
    onChange: (value: number) => void;
}

const NumberInput: FunctionComponent<NumberInputProps> = ({ value, ...props }) => {
    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            props.onChange(0);
            return;
        }
        props.onChange(parseInt(event.target.value));
    };

    return (
        <InputWrapper {...props}>
            <input
                name={props.name}
                type="number"
                className={cn(
                    'w-full h-full rounded-full px-8 py-2 outline-none ring-transparent font-semibold focus:bg-gray-100',
                    value && 'bg-gray-100',
                )}
                value={value}
                onChange={handleNumberChange}
            />
        </InputWrapper>
    );
};

export default NumberInput;
