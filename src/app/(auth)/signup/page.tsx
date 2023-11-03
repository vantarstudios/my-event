'use client';

import AuthStepper from '@/components/auth-stepper/auth-stepper';
import React, { useEffect, useState } from 'react';
import Button from '@/components/button/button';
import Link from 'next/link';
import AccountTypeStep from '@/components/auth/signup-steps/account-type-step';
import AccountInformationsStep from '@/components/auth/signup-steps/account-informations-step';
import PlanStep from '@/components/auth/signup-steps/plan-step';

function Page(): React.JSX.Element {
    const [step, setStep] = useState<number>(1);

    const steps: React.JSX.Element[] = [
        <AccountTypeStep key={0} />,
        <AccountInformationsStep key={1} />,
        <PlanStep key={2} />,
    ];

    const nextStep = () => {
        setStep((step) => {
            if (step <= 4) {
                return step + 1;
            } else {
                return step;
            }
        });
    };

    return (
        <div className="flex flex-col items-center">
            <AuthStepper step={step} />

            <h1 className="my-12 text-5xl font-bold">
                Let's <span className="text-primary">sign</span> you{' '}
                <span className="text-primary">up!</span>
            </h1>

            {steps[step - 1]}

            <Button className={'mt-8'} onClick={nextStep}>
                Next
            </Button>

            <p className={'my-12'}>
                Already have an account?{' '}
                <Link href={'/signin'} className={'font-medium text-primary underline'}>
                    Sign in
                </Link>
            </p>
        </div>
    );
}

export default Page;
