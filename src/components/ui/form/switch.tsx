import type { FunctionComponent, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
    checked: HTMLInputElement['checked'];
    disabled?: HTMLInputElement['disabled'];
    loading?: boolean;
}

const Switch: FunctionComponent<SwitchProps> = ({ className, ...props }) => {
    return (
        <label className={`relative inline-flex items-center cursor-pointer ${
            props.loading && 'cursor-wait'
        }`}>
            <input
                {...props}
                type="checkbox"
                className={cn('sr-only peer', className)}
            />
            <div className="w-8 h-4 bg-grey bg-opacity-30 rounded-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 peer-checked:bg-primary peer-checked:after:left-auto peer-checked:after:right-0.5 "></div>
        </label>
    );
};

export default Switch;
