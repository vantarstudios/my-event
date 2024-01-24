'use client';

import { useState, Fragment, type FunctionComponent, type ChangeEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import type { PhoneInputProps, CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface PhoneNumberInputProps extends InputWrapperProps {
    value?: HTMLInputElement['value'];
    placeholder?: HTMLInputElement['placeholder'];
    onChange?: (value: string) => void;
    autoComplete?: HTMLInputElement['autocomplete'];
    disabled?: HTMLInputElement['disabled'];
}

const formatPhoneNumber = (value: string, dialCode: CountryData['dialCode'], spaceDial: boolean = false): string => {
    return [
        '+',
        dialCode,
        spaceDial ? ' ' : '',
        value.replace(/\s/g, '')
    ].join('');
};

const PhoneNumberInput: FunctionComponent<PhoneNumberInputProps> = ({ onChange, ...props }) => {
    const parsedPhoneNumber = parsePhoneNumber(props.value ?? '', {
        defaultCountry: 'BJ',
        defaultCallingCode: '229',
    });
    const [value, setValue] = useState<string>(parsedPhoneNumber?.nationalNumber ?? '');
    const [countryData, setCountryData] = useState<CountryData>({
        name: '',
        dialCode: parsedPhoneNumber?.countryCallingCode ?? '',
        countryCode: parsedPhoneNumber?.country?.toLowerCase() ?? '',
        format: '',
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
                        <Fragment>
                            <span
                                className="absolute left-0 top-0 z-20 flex justify-center items-center w-20 h-full text-white bg-black rounded-l-full">
                                +{countryData.dialCode}
                            </span>
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
                        </Fragment>
                    )
                }
                <input
                    type={props.disabled ? 'text' : 'number'}
                    autoComplete="tel-national"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.disabled
                        ? formatPhoneNumber(value, countryData.dialCode, true)
                        : value
                    }
                    disabled={props.disabled}
                    onChange={handlePhoneNumberChange}
                    className={`absolute top-0 text-base rounded-r-full py-2 h-full border-none focus:outline-none ring-transparent ${
                        props.disabled ? 'left-0 w-full pl-3 bg-white' : 'left-20 w-[calc(100%-10vh)] pl-5 bg-gray-100'
                    }`}
                />
            </div>
        </InputWrapper>
    );
};

export default PhoneNumberInput;
