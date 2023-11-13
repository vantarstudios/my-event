'use client';

import { useState } from 'react';
import type { FunctionComponent, HTMLAttributes, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { TextArea } from '@components/ui/form';
import TitledArea from './titled-area';

interface TitledTextAreaProps {
    title: string;
    value: HTMLTextAreaElement['value'];
    maxLength?: HTMLTextAreaElement['maxLength'];
    rows?: HTMLTextAreaElement['rows'];
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

const TitledTextArea: FunctionComponent<TitledTextAreaProps> = ({ title, value, maxLength, rows, className }) => {
    const [valueLength, setValueLength] = useState<number>(value.length);

    const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValueLength(event.target.value.length);
    };

    return (
        <TitledArea title={title} className="w-full">
            <div className="relative flex justify-between items-center gap-5 mb-4 w-full h-fit">
                <span className="absolute bottom-full right-0 -translate-y-5 text-sm text-primary font-medium">
                    {valueLength} / {maxLength}
                </span>
                <TextArea
                    value={value}
                    spellCheck={false}
                    rows={rows}
                    onChange={handleValueChange}
                    className={cn('w-full', className)}
                />
            </div>
        </TitledArea>
    );
};

export default TitledTextArea;
