'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import type { Plan } from '@/types';
import { Button } from '@components/common';
import PlanPackagesList from './plan-packages-list';

const plans: Plan[] = [
    {
        name: 'Free',
        packages: [
            {
                name: 'Free',
                price: 0,
                monthly: false,
                features: [
                    'Size: 1 - 100',
                    '3 days app premium plan',
                    'Add payment method',
                    'Dashboard',
                    '5% tickets processing fees',
                ],
                isCurrent: true,
            },
        ],
    },
    {
        name: 'Organization',
        packages: [
            {
                name: 'Bronze',
                price: 59,
                monthly: true,
                yearly: 658,
                features: [
                    'Event management',
                    'App premium plan',
                    'Social medias',
                    '05 teams',
                    'Unlimited members',
                    '3% tickets processing fees',
                ],
                isCurrent: false,
            },
            {
                name: 'Silver',
                price: 79,
                monthly: true,
                yearly: 898,
                features: [
                    'Event management',
                    'App premium plan',
                    'Social medias',
                    '15 teams',
                    'Unlimited members',
                    '2% tickets processing fees',
                ],
                isCurrent: false,
            },
            {
                name: 'Gold',
                price: 99,
                monthly: true,
                yearly: 1138,
                features: [
                    'Event management',
                    'App premium plan',
                    'Social medias',
                    'Unlimited teams',
                    'Unlimited members',
                    '1% tickets processing fees',
                ],
                isCurrent: false,
            },
        ],
    },
];

const Plans: FunctionComponent = () => {
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0] as Plan);

    return (
        <div className="flex flex-col justify-start items-start gap-10 h-full">
            <div className="flex gap-0.5 justify-start w-full">
                {plans.map((plan, index) => (
                    <Button
                        key={plan.name}
                        className={`basis-40 text-sm rounded-none ${plan.name === selectedPlan.name && 'bg-primary'} ${
                            index === 0 && 'rounded-l-lg'
                        } ${index === plans.length - 1 && 'rounded-r-lg'}`}
                        onClick={() => setSelectedPlan(plan)}
                    >
                        {plan.name}
                    </Button>
                ))}
            </div>
            <PlanPackagesList packages={selectedPlan.packages} />
        </div>
    );
};

export default Plans;
