import type { Plan } from '@/types';

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

export default plans;
