import { type FunctionComponent, type HTMLAttributes, useEffect, useRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { map } from '@/lib/api/map';
import { Location } from '@components/ui/icons';
import InputWrapper, { type InputWrapperProps } from './input-wrapper';

interface LocationInputProps extends HTMLAttributes<HTMLInputElement>, InputWrapperProps {
    name: HTMLInputElement['name'];
    value?: HTMLInputElement['value'];
    placeholder?: HTMLInputElement['placeholder'];
    onChange?: HTMLAttributes<HTMLInputElement>['onChange'];
    className?: HTMLAttributes<HTMLInputElement>['className'];
    register?: UseFormRegisterReturn;
    disabled?: HTMLInputElement['disabled'];
    enableMap: boolean;
}

const LocationInput: FunctionComponent<LocationInputProps> = ({ name, placeholder, className, onChange, enableMap, ...props }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (enableMap && mapRef.current) {
            map.createMap(mapRef.current);
        }
    }, []);
    
    return (
        <InputWrapper
            label={props.label}
            name={name}
            iconPosition="left"
            trailing={props.trailing}
            labelClassName={props.labelClassName}
            iconClassName={cn('top-3.5', props.iconClassName)}
            icon={<Location className="w-5 h-5" />}
            errors={props.errors}
        >
            <input
                id={name}
                type="text"
                autoComplete="address-level4"
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={!props.register ? (props.value ?? '') : undefined}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                defaultValue={props.defaultValue}
                {...props.register}
                className={cn('w-full rounded-full pl-12 py-2 h-10 bg-gray-100 focus:outline-none ring-transparent', className)}
            />
            {enableMap && (
                <div ref={mapRef} className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 w-3/5 aspect-square rounded-2xl"/>
            )}
        </InputWrapper>
    );
};

export default LocationInput;
