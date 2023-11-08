import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import oneTimerImage from '@/assets/icons/one-timer.svg';
import organizationImage from '@/assets/icons/organization.svg';

const AccountType: FunctionComponent = () => {
    return (
        <Fragment>
            <p className="text-lg">Which of these define you better?</p>

            <div className="my-16 flex items-center gap-10">
                <div className="flex h-44 w-44 cursor-pointer flex-col items-center justify-center gap-5 rounded-[20px] border border-stone-900 border-opacity-5 bg-white shadow-lg transition-all hover:shadow-md">
                    <Image src={oneTimerImage} alt="" />
                    <span className="font-medium">One-timer</span>
                </div>

                <div className="flex h-44 w-44 cursor-pointer flex-col items-center justify-center gap-5 rounded-[20px] border border-stone-900 border-opacity-5 bg-white shadow-lg transition-all hover:shadow-md">
                    <Image src={organizationImage} alt="" />
                    <span className="font-medium">Organization</span>
                </div>
            </div>
        </Fragment>
    );
}

export default AccountType;
