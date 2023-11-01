import React from 'react';

export default function AuthStepper(): React.JSX.Element {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-xl text-white">
                1
            </div>
            <div className="w-12 border-[3px] border-black"></div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl text-white">
                2
            </div>
            <div className="w-12 border-[3px] border-black"></div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl text-white">
                3
            </div>
            <div className="w-12 border-[3px] border-black"></div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl text-white">
                4
            </div>
        </div>
    );
}
