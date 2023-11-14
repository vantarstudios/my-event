'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next';
import type { AccountType } from '@/types';
import { AuthStepper } from '@components/auth';
import { AccountInformations, AccountTypeChooser } from '@components/auth/signup-steps';
import { Button } from '@components/ui';
import { ArrowLeft } from '@components/icons';

const accountTypesRedirections: Partial<Record<AccountType, string>> = {
    organization: '/workspaces/signup',
};

const SignUpPage: NextPage = () => {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [accountType, setAccountType] = useState<AccountType | null>(null);

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

    const goToNextStep = () => {
        if (accountType === null) {
            return;
        }

        if (Object.keys(accountTypesRedirections).includes(accountType)) {
            router.push(accountTypesRedirections[accountType]!);
            return;
        }

        if (step == signUpSteps.length) {
            alert('Successfully signed up!');

            router.push('/signin');

            return;
        }

        setStep((currentStep) => currentStep + 1);
    };

    const signUpSteps: ReactNode[] = [
        <AccountTypeChooser key={accountType} currentType={accountType} onTypeChange={handleAccountTypeChange} />,
        <AccountInformations key={1} />,
    ];

    return (
        <div className="flex flex-col justify-start items-center gap-12 w-[max(450px,25%)]">
            <Button
                className="absolute top-10 left-10 flex items-center gap-2 text-xl text-black bg-inherit"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-6 h-6" />
                Back
            </Button>
            <AuthStepper currentStep={step} totalSteps={signUpSteps.length} onStepChange={handleStepChange} />
            <h1 className="text-5xl font-bold">
                Let&apos;s&nbsp;
                <span className="text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-primary">up!</span>
            </h1>
            {signUpSteps[step - 1]}
            <Button className="w-full hover:bg-primary" onClick={goToNextStep}>
                {step === signUpSteps.length ? 'Sign up' : 'Next'}
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
            <p className="flex justify-center items-center w-full pb-20">
                Already have an account?&nbsp;
                <Link href="/signin" className="font-medium text-primary underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
