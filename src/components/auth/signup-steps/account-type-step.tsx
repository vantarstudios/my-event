import React from 'react';
import Image from 'next/image';
import oneTimer from '@/assets/icons/one-timer.svg';
import organization from '@/assets/icons/organization.svg';

function AccountTypeStep(): React.JSX.Element {
    return (
        <>
            <p className="text-lg">Which of these define you better?</p>

            <div className="my-16 flex items-center gap-10">
                <div className="flex h-44 w-44 cursor-pointer flex-col items-center justify-center gap-5 rounded-[20px] border border-stone-900 border-opacity-5 bg-white shadow-lg transition-all hover:shadow-md">
                    <Image src={oneTimer} alt="" />
                    <span className="font-medium">One-timer</span>
                </div>

                <div className="flex h-44 w-44 cursor-pointer flex-col items-center justify-center gap-5 rounded-[20px] border border-stone-900 border-opacity-5 bg-white shadow-lg transition-all hover:shadow-md">
                    <Image src={organization} alt="" />
                    <span className="font-medium">Organization</span>
                </div>
            </div>
        </>
    );
}

export default AccountTypeStep;
