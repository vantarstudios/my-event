import type { HTMLAttributes } from 'react';

export interface IconProps {
    className?: HTMLAttributes<SVGElement>['className'];
}

export type PaymentMethod = 'card' | 'paypal';

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
