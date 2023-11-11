import type { HTMLAttributes } from 'react';

export interface IconProps {
    className?: HTMLAttributes<SVGElement>['className'];
}

export type Notification = {
    subject: string;
    description: string;
};

export type Event = {
    id: string;
    title: string;
    date: { day: number; month: string };
    image: string;
};

export type PaymentMethodType = 'card' | 'paypal';

export type PaymentMethod = {
    type: PaymentMethodType;
    label: string;
};

export type PlanPackage = {
    name: string;
    price: number;
    monthly: boolean;
    yearly?: number;
    features: string[];
    isCurrent: boolean;
};

export type Plan = {
    name: string;
    packages: PlanPackage[];
};
