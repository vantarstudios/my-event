'use client';

import { useState, type FunctionComponent } from 'react';
import PhoneInput from 'react-phone-input-2';
import type { PhoneInputProps, CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface PhoneNumberInputProps extends InputWrapperProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    autoComplete?: HTMLInputElement['autocomplete'];
    disabled?: HTMLInputElement['disabled'];
}

const PhoneNumberInput: FunctionComponent<PhoneNumberInputProps> = ({ onChange, ...props }) => {
    const [countryData, setCountryData] = useState<CountryData>({
        name: 'Benin',
        dialCode: '229',
        countryCode: 'bj',
        format: '+... ... ... ... ... ..',
    });
    
    const handleChange: PhoneInputProps['onChange'] = (value, data, event, formattedValue) => {
        event.preventDefault();
        setCountryData(data as CountryData);
        onChange && onChange(formattedValue ?? value ?? '');
    };
    
    return (
        <InputWrapper
            name={props.name}
            label={props.label}
            trailing={props.trailing}
            icon={props.icon}
            iconPosition={props.iconPosition}
            errors={props.errors}
            wrapperClassName={props.wrapperClassName}
            labelClassName={props.labelClassName}
        >
            <div className="relative w-full h-10 rounded-full">
                {
                    !props.disabled && (
                        <span className="absolute left-0 top-0 z-20 flex justify-center items-center w-20 h-full text-white bg-black rounded-l-full">
                            +{countryData.dialCode}
                        </span>
                    )
                }
                <PhoneInput
                    value={props.value}
                    onChange={handleChange}
                    placeholder={props.placeholder || ''}
                    country={countryData.countryCode}
                    countryCodeEditable={false}
                    specialLabel={props.label}
                    buttonClass="!z-30 !w-20 !bg-transparent !border-none first:child:!opacity-0 first:child:!w-full"
                    inputClass={`!w-full !text-base !rounded-full !py-2 !h-10 !border-none !focus:outline-none !ring-transparent ${
                        props.disabled ? '!pl-3 !bg-white' : '!pl-24 !bg-gray-100'
                    }`}
                />
            </div>
        </InputWrapper>
    );
};

export default PhoneNumberInput;
