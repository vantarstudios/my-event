import type { HTMLAttributes, ReactNode } from 'react';
import tags from '@/data/tags';

export type Mode = 'view' | 'edit';

export type EditOrCreateStep = {
    title: string;
    content: ReactNode;
};

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

export const ticketTypes = ['free', 'paid', 'invitation'] as const;

export const invitationTypes = ['e-mail', 'unique link'] as const;

export type TicketType = {
    title: string;
    quantity: number;
    types: (typeof ticketTypes)[number][];
    groupTicket: boolean;
} & (
    | { types: ['free'] }
    | { types: ['free', 'invitation']; invitationType: (typeof invitationTypes)[number] }
    | { types: ['paid']; price: number }
    | { types: ['paid', 'invitation']; price: number; invitationType: (typeof invitationTypes)[number] }
    | { types: ['invitation']; invitationType: (typeof invitationTypes)[number] }
) &
    (
        | {
              groupTicket: false;
          }
        | {
              groupTicket: true;
              groupSize?: number;
              numberOfGroups?: number;
          }
    );

export const eventTypes = ['online', 'live'] as const;

export type Tag = (typeof tags)[number];

export type Event = {
    id: string;
    title: string;
    description: string;
    type: (typeof eventTypes)[number];
    startDate: string;
    endDate?: string;
    location: string;
    currency: string;
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
