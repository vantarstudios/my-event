'use client';

import AuthStepper from '@/components/auth-stepper/auth-stepper';
import React, { useState } from 'react';
import Button from '@/components/button/button';
import Link from 'next/link';
import AccountTypeStep from '@/components/auth/signup-steps/account-type-step';

function Page(): React.JSX.Element {
    const [step, setStep] = useState<number>(0);

    const steps: React.JSX.Element[] = [<AccountTypeStep key={0} />];

    const nextStep = () => {
        setStep((step) => ++step);
    };

    return (
        <div className="flex flex-col items-center">
            <AuthStepper />

            <h1 className="my-12 text-5xl font-bold">
                Let's <span className="text-primary">sign</span> you{' '}
                <span className="text-primary">up!</span>
            </h1>

            {steps[0]}

            <Button className={'mt-8'}>Next</Button>

            <p className={'my-12'}>
                Already have an account?{' '}
                <Link href={'/signin'} className={'text-primary font-medium underline'}>
                    Sign in
                </Link>
            </p>
        </div>
    );
}

export default Page;
