import type { HTMLAttributes } from 'react';
import tags from '@/data/tags';

export type Mode = 'view' | 'edit';

export const AccountTypes = ['individual', 'organization'] as const;

export type AccountType = (typeof AccountTypes)[number];

export interface IconProps {
    onClick?: () => void;
    className?: HTMLAttributes<SVGElement>['className'];
}

export type Notification = {
    subject: string;
    description: string;
};

export type TicketType = {
    name: string;
    quantity: number;
    kind: 'free' | 'paid';
    currency: string;
} & (
    | {
          kind: 'free';
          price: 0;
      }
    | {
          kind: 'paid';
          price: number;
      }
);

export type Tag = (typeof tags)[number];

export type Event = {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    cover: string;
    tags: Tag[];
    ticketTypes: TicketType[];
};

export type ParsedDate = {
    day: number;
    month: number;
    year: number;
};

export type ParsedTime = {
    hour: number;
    minute: number;
};

export type ParsedDateTime = {
    date: ParsedDate | null;
    time: ParsedTime | null;
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
