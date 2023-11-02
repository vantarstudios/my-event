'use client';

import cn from '@/lib/utils/cn';
import React from 'react';
import { motion } from 'framer-motion';

export default function AuthStepper({ step }: { step: number }): React.JSX.Element {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-xl text-white">
                1
            </div>
            <div className={cn('h-[4px] w-12 bg-black')}>
                <motion.div
                    className={'bg-primary h-[4px]'}
                    animate={{
                        width: step > 1 ? '100%' : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                ></motion.div>
            </div>
            <div
                className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full text-xl text-white',
                    `${step >= 2 ? 'bg-primary' : 'bg-black'}`,
                )}
            >
                2
            </div>
            <div className={cn('h-[4px] w-12 bg-black')}>
                <motion.div
                    className={'bg-primary h-[4px]'}
                    animate={{
                        width: step > 2 ? '100%' : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                ></motion.div>
            </div>
            <div
                className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full text-xl text-white',
                    `${step >= 3 ? 'bg-primary' : 'bg-black'}`,
                )}
            >
                3
            </div>
            <div className={cn('h-[4px] w-12 bg-black')}>
                <motion.div
                    className={'bg-primary h-[4px]'}
                    animate={{
                        width: step > 3 ? '100%' : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                ></motion.div>
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
    );
}
