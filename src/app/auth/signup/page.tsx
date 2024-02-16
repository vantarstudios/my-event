'use client';

import { Fragment, useState, type ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import type { NextPage } from 'next';
import type { ZodError } from 'zod';
import { useMutationRequest, useGoogleAuth } from '@/lib/hooks';
import { toast } from '@/lib/utils';
import { authAPI } from '@/lib/api/auth';
import { signUpSchema } from '@/types/auth';
import type { SignUpPayload, SignUpErrors } from '@/types/auth';
import { AccountTypes, type AccountType } from '@/types';
import { AuthStepper } from '@components/auth';
import { AccountInformations, AccountTypeChooser } from '@components/auth/signup-steps';
import { PrimaryButton } from '@components/ui/buttons';
import { GoogleColored, Loader } from '@components/ui/icons';
import { useGoogleLogin } from '@react-oauth/google';

const accountTypesRedirections: Partial<Record<AccountType, string>> = {
    organization: '/workspaces/signup',
};

const unavailableAccountTypes: AccountType[] = [
    'organization',
];

const updateSearchParamsFactory = (router: ReturnType<typeof useRouter>, pathname: string, searchParams: ReadonlyURLSearchParams) => (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
};

const SignUpPage: NextPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const updateSearchParams = updateSearchParamsFactory(router, pathname, searchParams);
    
    const accountType = (
        !searchParams.has('accountType')
        || unavailableAccountTypes.includes(searchParams.get('accountType') as AccountType)
        || !AccountTypes.includes(searchParams.get('accountType') as AccountType)
    )
        ? null
        : searchParams.get('accountType') as AccountType;

    const step = searchParams.has('step')
        ? Number(searchParams.get('step'))
        : (() => {
            updateSearchParams('step', '1');
            return 1;
        })();
    
    const [formData, setFormData] = useState<SignUpPayload>({} as SignUpPayload);
    const [formErrors, setFormErrors] = useState<SignUpErrors>({} as SignUpErrors);
    
    const googleSignIn = useGoogleLogin({
        flow: 'implicit',
        onSuccess: async (response) => {
            await registerWithGoogle({
                accountType: accountType as AccountType,
                accessToken: response.access_token,
            });
            
            toast.success('Your account has been created!\n You can now sign in.');
            router.push('/auth/signin');
        },
        onError: (error) => {
            toast.error(error.error_description || 'An error occurred while trying to sign up with Google.');
        }
    });
    
    const { trigger, isMutating } = useMutationRequest(
        'sign-up',
        async (_: string, { arg: data }: { arg: SignUpPayload }) => {
            const { confirmPassword, ...payload } = data;
            const response = await authAPI.signUp(payload);
            return response.data;
        },
        'Your account has been created!'
    );
    
    const { trigger: registerWithGoogle, isMutating: isGoogleMutating } = useGoogleAuth('sign-up');

    const handleStepChange = (step: number) => {
        updateSearchParams('step', String(step));
    };

    const handleAccountTypeChange = (type: AccountType) => {
        updateSearchParams('accountType', type);
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
                
                router.push('/auth/signin');
            } catch (error) {
                setFormErrors((error as ZodError).formErrors.fieldErrors as SignUpErrors);
            }
            
            return;
        }

        handleStepChange(step + 1);
    };

    const signUpSteps: ReactNode[] = useMemo(() => [
        <AccountTypeChooser key={accountType} currentType={accountType} onTypeChange={handleAccountTypeChange} />,
        <AccountInformations key={1} setInformation={handleInputChange} informationsErrors={formErrors} />,
    ], [accountType, formErrors]);

    return (
        <div className="flex flex-col justify-start items-center gap-10 w-[max(450px,25%)] mt-10 animate-slide-right">
            <AuthStepper currentStep={step} totalSteps={signUpSteps.length} onStepChange={handleStepChange} />
            <h1 className="text-5xl font-bold">
                Let&apos;s&nbsp;
                <span className="text-5xl text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-5xl text-primary">up!</span>
            </h1>
            {signUpSteps[step - 1]}
            <PrimaryButton
                onClick={goToNextStep}
                disabled={accountType === null || isMutating}
                loading={isMutating}
                className="w-full"
            >
                <p className="mx-auto">{step === signUpSteps.length ? 'Sign up' : 'Next'}</p>
            </PrimaryButton>
            {step === 2 && (
                <Fragment>
                    <p>or</p>
                    <div
                        onClick={() => googleSignIn()}
                        className="flex justify-start items-center gap-5 pr-7 shadow-md rounded-full cursor-pointer transform transition-all duration-300 hover:bg-black hover:text-white">
                        <div className="w-12 h-12 p-2">
                            <GoogleColored/>
                        </div>
                        <p className="flex items-center justify-center w-44">
                            {isGoogleMutating ? <Loader className="w-6 h-6 text-primary animate-spin"/> : 'Continue with Google'}
                        </p>
                    </div>
                </Fragment>
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
