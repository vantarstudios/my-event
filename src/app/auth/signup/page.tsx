'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next';
import type { ZodError } from 'zod';
import { authAPI } from '@/lib/api/auth';
import { useMutationRequest, useDispatch } from '@/lib/hooks';
import { setProfile } from '@/lib/store/profile';
import { signUpSchema } from '@/types/auth';
import type { SignUpPayload, SignUpErrors } from '@/types/auth';
import type { AccountType } from '@/types';
import { AuthStepper } from '@components/auth';
import { AccountInformations, AccountTypeChooser } from '@components/auth/signup-steps';
import { Button } from '@components/ui/buttons';

const accountTypesRedirections: Partial<Record<AccountType, string>> = {
    organization: '/workspaces/signup',
};

const SignUpPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [step, setStep] = useState<number>(1);
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [formData, setFormData] = useState<SignUpPayload>({} as SignUpPayload);
    const [formErrors, setFormErrors] = useState<SignUpErrors>({} as SignUpErrors);
    
    const { trigger, isMutating } = useMutationRequest(
        'sign-up',
        async (_: string, { arg: data }: { arg: SignUpPayload }) => {
            const { confirmPassword, ...payload } = data;
            const response = await authAPI.signUp(payload);
            
            if (response.data.success) {
                dispatch(setProfile(response.data.data));
            }
            
            return response.data;
        },
        'Your account has been created!'
    );

    const handleStepChange = (step: number) => {
        setStep(step);
    };

    const handleAccountTypeChange = (type: AccountType) => {
        setAccountType((currentType) => {
            if (currentType === type) {
                return null;
            }

            return type;
        });
    };
    
    const handleInputChange = <T extends keyof SignUpPayload>(information: T, value: SignUpPayload[T]) => {
        setFormData((currentFormData) => {
            const newFormData = {
                ...currentFormData,
                [information]: value,
            };
            
            try {
                signUpSchema.parse(newFormData);
                setFormErrors({} as SignUpErrors);
            } catch (error) {
                setFormErrors((previousErrors) => {
                    return {
                        ...previousErrors,
                        [information]: (error as ZodError).formErrors.fieldErrors[information] ?? '',
                    }
                });
            }
            
            return newFormData;
        });
    };

    const goToNextStep = async () => {
        if (accountType === null) {
            return;
        }

        if (Object.keys(accountTypesRedirections).includes(accountType)) {
            router.push(accountTypesRedirections[accountType]!);
            return;
        }

        if (step == signUpSteps.length) {
            try {
                signUpSchema.parse(formData);
                setFormErrors({} as SignUpErrors);
                
                await trigger(formData);
                
                router.push('/dashboard');
            } catch (error) {
                setFormErrors((error as ZodError).formErrors.fieldErrors as SignUpErrors);
            }
            
            return;
        }

        setStep((currentStep) => currentStep + 1);
    };

    const signUpSteps: ReactNode[] = [
        <AccountTypeChooser key={accountType} currentType={accountType} onTypeChange={handleAccountTypeChange} />,
        <AccountInformations key={1} setInformation={handleInputChange} informationsErrors={formErrors} />,
    ];

    return (
        <div className="flex flex-col justify-start items-center gap-10 w-[max(450px,25%)] animate-slide-right">
            <AuthStepper currentStep={step} totalSteps={signUpSteps.length} onStepChange={handleStepChange} />
            <h1 className="text-5xl font-bold">
                Let&apos;s&nbsp;
                <span className="text-5xl text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-5xl text-primary">up!</span>
            </h1>
            {signUpSteps[step - 1]}
            <Button className="w-full hover:bg-primary" onClick={goToNextStep} disabled={isMutating}>
                {
                    isMutating
                        ? 'Loading...'
                        : step === signUpSteps.length ? 'Sign up' : 'Next'
                }
            </Button>
            {step === 2 && (
                <Image
                    src="/images/google.png"
                    alt="Google Auth"
                    width={50}
                    height={50}
                    className="shadow-sm border rounded-full cursor-pointer"
                />
            )}
            <p className="flex justify-center items-center w-full pt-5 pb-20">
                Already have an account?&nbsp;
                <Link href="/auth/signin" className="font-medium text-primary underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
