import type { FunctionComponent, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LocationInputProps extends HTMLAttributes<HTMLInputElement> {
    name: HTMLInputElement['name'];
    value?: HTMLInputElement['value'];
    placeholder?: HTMLInputElement['placeholder'];
    onChange?: HTMLAttributes<HTMLInputElement>['onChange'];
}

const LocationInput: FunctionComponent<LocationInputProps> = ({ name, placeholder, className, onChange, ...props }) => {
    return (
        <input
            {...props}
            type="text"
            autoComplete="address-level4"
            name={name}
            placeholder={placeholder ?? 'Location'}
            onChange={onChange}
            className={cn('font-medium focus:outline-none', className)}
        />
    );
};

export default LocationInput;
