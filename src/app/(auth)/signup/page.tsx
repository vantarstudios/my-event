'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import { AuthStepper } from '@components/auth';
import { AccountInformations, AccountType, Plan } from '@components/auth/signup-steps';
import { Button } from '@components/common';

const signUpSteps: ReactNode[] = [<AccountType key={0} />, <AccountInformations key={1} />, <Plan key={2} />];

const SignUpPage: NextPage = () => {
    const [step, setStep] = useState<number>(1);

    const goToNextStep = () => {
        setStep((currentStep) => {
            if (currentStep > 4) {
                return currentStep;
            }

            return currentStep + 1;
        });
    };

    return (
        <div className="flex flex-col items-center">
            <AuthStepper step={step} />

            <h1 className="my-12 text-5xl font-bold">
                Let&apos;s&nbsp;
                <span className="text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-primary">up!</span>
            </h1>

            {signUpSteps[step - 1]}

            <Button className="w-full mt-8" onClick={goToNextStep}>
                Next
            </Button>

            <p className="my-12">
                Already have an account?&nbsp;
                <Link href="/signin" className="font-medium text-primary underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
