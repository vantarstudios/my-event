'use client';

import { useState } from 'react';
import type { FunctionComponent, HTMLAttributes, ChangeEvent } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { TextArea } from '@components/ui/form';
import TitledArea from './titled-area';

interface TitledTextAreaProps {
    title: string;
    value?: HTMLTextAreaElement['value'];
    onChange?: (value: string) => void;
    placeholder?: HTMLTextAreaElement['placeholder'];
    maxLength?: HTMLTextAreaElement['maxLength'];
    rows?: HTMLTextAreaElement['rows'];
    register?: UseFormRegisterReturn;
    errors?: string | string[];
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

const TitledTextArea: FunctionComponent<TitledTextAreaProps> = ({
    title,
    value,
    onChange,
    placeholder,
    maxLength,
    rows,
    register,
    errors,
    className,
}) => {
    const [valueLength, setValueLength] = useState<number>(value?.length || 0);
    
    const registerOnChangeEvent = register?.onChange;

    const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;

        if (maxLength && value.length > maxLength) {
            return;
        }

        setValueLength(value.length);
        onChange && onChange(event.target.value);
    };

    return (
        <TitledArea
            title={title}
            className="w-full"
            indicator={
                <span className="text-sm text-primary font-medium">
                    {valueLength} / {maxLength}
                </span>
            }
        >
            <div className="flex flex-col justify-center gap-2 w-full h-fit">
                <TextArea
                    name={title}
                    value={value}
                    placeholder={placeholder}
                    spellCheck={false}
                    rows={rows}
                    onChange={!register ? handleValueChange : undefined}
                    register={register && {
                        ...register,
                        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
                            registerOnChangeEvent && registerOnChangeEvent(event);
                            handleValueChange(event);
                        }
                    } as UseFormRegisterReturn}
                    className={cn('w-full', className)}
                />
                {
                    errors && (
                        Array.isArray(errors)
                            ? (
                                <ul className="text-sm text-red-500">
                                    {
                                        errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))
                                    }
                                </ul>
                            )
                            : <p className="text-sm text-red-500">{errors}</p>
                    )
                }
            </div>
        </TitledArea>
    );
};

export default TitledTextArea;
