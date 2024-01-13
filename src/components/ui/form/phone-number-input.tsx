'use client';

import { useState, type FunctionComponent, type ChangeEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import type { PhoneInputProps, CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface PhoneNumberInputProps extends InputWrapperProps {
    value?: HTMLInputElement['value'];
    placeholder?: HTMLInputElement['placeholder'];
    onChange?: (value: string) => void;
    autoComplete?: HTMLInputElement['autocomplete'];
    disabled?: HTMLInputElement['disabled'];
}

const formatPhoneNumber = (value: string, dialCode: CountryData['dialCode']): string => {
    return ['+', dialCode, value.replace(/\s/g, '')].join('');
};

const PhoneNumberInput: FunctionComponent<PhoneNumberInputProps> = ({ onChange, ...props }) => {
    const [value, setValue] = useState<string>(props.value ?? '');
    const [countryData, setCountryData] = useState<CountryData>({
        name: 'Benin',
        dialCode: '229',
        countryCode: 'bj',
        format: '+... ... ... ... ... ..',
    });
    
    const handleCountryCodeChange: PhoneInputProps['onChange'] = (_, data, event) => {
        event.preventDefault();
        setCountryData(data as CountryData);
        onChange && onChange(formatPhoneNumber(
            value,
            (data as CountryData).dialCode ?? countryData.dialCode
        ));
    };
    
    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange && onChange(formatPhoneNumber(
            newValue,
            countryData.dialCode
        ));
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
                        <span
                            className="absolute left-0 top-0 z-20 flex justify-center items-center w-20 h-full text-white bg-black rounded-l-full">
                            +{countryData.dialCode}
                        </span>
                    )
                }
                <PhoneInput
                    onChange={handleCountryCodeChange}
                    placeholder={props.placeholder || ''}
                    country={countryData.countryCode}
                    countryCodeEditable={false}
                    specialLabel={props.label}
                    containerClass="!absolute !left-0 !top-0 !w-full !h-full"
                    buttonClass="!z-30 !w-20 !bg-transparent !border-none first:child:!opacity-0 first:child:!w-full"
                    inputClass="!hidden"
                />
                <input
                    type="number"
                    autoComplete="tel-national"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={handlePhoneNumberChange}
                    className={`absolute top-0 left-20 text-base rounded-r-full pl-5 py-2 w-[calc(100%-10vh)] h-full border-none focus:outline-none ring-transparent ${
                        props.disabled ? 'bg-white' : 'bg-gray-100'
                    }`}
                />
            </div>
        </InputWrapper>
    );
};

export default PhoneNumberInput;
