'use client';

import cn from '@/lib/utils/cn';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthStepper({ step }: { step: number }): React.JSX.Element {
    const widths: number[] = [0, 35, 65, 100];

    return (
        <div className={'relative w-96'}>
            <div className={cn('absolute top-1/2 my-auto h-[4px] w-[95%] origin-center bg-black')}>
                <motion.div
                    className={'relative h-[4px] bg-primary'}
                    initial={false}
                    animate={{
                        width: `${widths[step - 1]}%`,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                ></motion.div>
            </div>
            <div className="relative flex w-full items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-white">
                    1
                </div>

                <div
                    className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-full text-xl text-white',
                        `${step >= 2 ? 'bg-primary' : 'bg-black'}`,
                    )}
                >
                    2
                </div>

                <div
                    className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-full text-xl text-white',
                        `${step >= 3 ? 'bg-primary' : 'bg-black'}`,
                    )}
                >
                    3
                </div>

                <div
                    className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-full text-xl text-white',
                        `${step >= 4 ? 'bg-primary' : 'bg-black'}`,
                    )}
                >
                    4
                </div>
            </div>
        </div>
    );
}
