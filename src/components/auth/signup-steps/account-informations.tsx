'use client';

import type { ChangeEvent } from 'react';
import type { FunctionComponent, } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from '@/lib/hooks';
import type { SignUpPayload, SignUpErrors } from '@/types/auth';
import { Input, PhoneNumberInput } from '@components/ui/form';
import { Eye, EyeOff } from '@components/ui/icons';

interface AccountInformationsProps {
    setInformation: <T extends keyof SignUpPayload>(information: T, value: SignUpPayload[T]) => void;
    informationsErrors: SignUpErrors;
}

const AccountInformations: FunctionComponent<AccountInformationsProps> = ({ setInformation, informationsErrors }) => {
    const [isPasswordVisible, toggleIsPasswordVisible] = useToggle<boolean>(false, true);
    const [isConfirmPasswordVisible, toggleIsConfirmPasswordVisible] = useToggle<boolean>(false, true);
    const { register } = useForm<SignUpPayload>();
    
    const handleInputChange = <T extends keyof SignUpPayload>(key: T) => (event: ChangeEvent<HTMLInputElement>) => {
        setInformation(key, event.target.value);
    };
    
    return (
        <form className="relative flex flex-col justify-start gap-5 w-full">
            <Input
                register={register('firstName', {
                    required: true,
                    onChange: handleInputChange('firstName')
                })}
                errors={informationsErrors.firstName}
                name="first-name"
                label="First name"
                trailing="*"
                autoComplete="given-name"
                variant="auth"
                autoFocus
            />
            <Input
                register={register('lastName', {
                    required: true,
                    onChange: handleInputChange('lastName')
                })}
                errors={informationsErrors.lastName}
                name="last-name"
                label="Last name"
                trailing="*"
                autoComplete="family-name"
                variant="auth"
            />
            <Input
                register={register('email', {
                    required: true,
                    onChange: handleInputChange('email')
                })}
                errors={informationsErrors.email}
                name="email"
                label="Email"
                trailing="*"
                autoComplete="email"
                type="email"
                variant="auth"
            />
            <Input
                register={register('username', {
                    required: true,
                    onChange: handleInputChange('username')
                })}
                errors={informationsErrors.username}
                name="username"
                label="Username"
                trailing="*"
                autoComplete="username"
                type="text"
                variant="auth"
            />
            <PhoneNumberInput
                onChange={(value) => setInformation('phoneNumber', value)}
                errors={informationsErrors.phoneNumber}
                name="phone-number"
                label="Phone number"
                trailing="*"
                autoComplete="tel"
            />
            <Input
                register={register('password', {
                    required: true,
                    onChange: handleInputChange('password')
                })}
                errors={informationsErrors.password}
                name="password"
                label="Password"
                trailing="*"
                wrapperClassName="peer"
                autoComplete="new-password"
                type={isPasswordVisible ? 'text' : 'password'}
                variant="auth"
                icon={
                    isPasswordVisible ? (
                        <Eye className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible}/>
                    ) : (
                        <EyeOff className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible}/>
                    )
                }
            />
            <Input
                register={register('confirmPassword', {
                    required: true,
                    onChange: handleInputChange('confirmPassword')
                })}
                errors={informationsErrors.confirmPassword}
                name="password-confirm"
                label="Confirm password"
                trailing="*"
                wrapperClassName="peer"
                autoComplete="new-password"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                variant="auth"
                icon={
                    isConfirmPasswordVisible ? (
                        <Eye className="w-4 h-4 cursor-pointer" onClick={toggleIsConfirmPasswordVisible}/>
                    ) : (
                        <EyeOff className="w-4 h-4 cursor-pointer" onClick={toggleIsConfirmPasswordVisible}/>
                    )
                }
            />
            <div className="absolute right-full bottom-0 mr-10 p-8 text-white bg-black rounded-3xl w-max h-fit hidden peer-focus-within:block">
                <p>Password must contain:</p>
                <ul className="pl-5 list-disc">
                    <li>Capital character</li>
                    <li>Number & special characters</li>
                    <li>Minimum 8 characters</li>
                </ul>
            </div>
        </form>
    );
};

export default AccountInformations;
