import type { HTMLAttributes, ReactNode } from 'react';

import {
    Role,
    Plan,
    SubscriptionStatus,
    PaymentMethod,
    FacturationType,
    MediaType,
    Country,
    EventCategory,
    EventStatus,
    EventType,
    UserTicketStatus,
    InvitationType,
} from './constants';

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export type ApiError = {
    readonly code: number;
    readonly message: string;
    readonly path: string;
    readonly details: unknown;
};

export type ApiResponse<T = null> = {
    success: boolean;
    timestamp: string;
} & (
    | {
        success: true;
        data: T;
    }
    | {
        success: false;
        error: ApiError;
    }
);

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export type Media = {
    id: string,
    url: string,
    description?: string,
    format: string,
    type: MediaType,
    createdAt: string,
    updatedAt: string,
};

export type CountryUnion = (typeof Country)[keyof typeof Country];

export type RoleUnion = (typeof Role)[keyof typeof Role];

export type PlanUnion = (typeof Plan)[keyof typeof Plan];

export type SubscriptionStatusUnion = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export type PaymentMethodUnion = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export type FacturationTypeUnion = (typeof FacturationType)[keyof typeof FacturationType];

export type EventCategoryUnion = (typeof EventCategory)[keyof typeof EventCategory];

export type EventStatusUnion = (typeof EventStatus)[keyof typeof EventStatus];

export type EventTypeUnion = (typeof EventType)[keyof typeof EventType];

export type UserTicketStatusUnion = (typeof UserTicketStatus)[keyof typeof UserTicketStatus];

export type InvitationTypeUnion = (typeof InvitationType)[keyof typeof InvitationType];

export type Subscription = {
    id: string,
    userId: string,
    plan: PlanUnion,
    status: SubscriptionStatusUnion,
    price: number,
    billingDate: string,
    paymentReference: string,
    paymentMethod: PaymentMethodUnion,
    facturationType: FacturationTypeUnion,
};

export type User = {
    id: string,
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    role: RoleUnion,
    bio: string | null,
    followersCount: number,
    deviceNotificationToken?: string,
    interestedCategories: EventCategoryUnion[],
    country: CountryUnion,
    profilePicture?: string,
    subscriptions?: Subscription[],
    ownedEvents?: Event[],
    likedEvents?: Event[],
    attendingEvents?: Event[],
    followedEvents?: Event[],
    ownedTickets?: UserTicket[],
    ticketOrders?: TicketOrder[],
    isActivated: boolean,
    isSuspended: boolean,
    createdAt: string,
    updatedAt: string,
};

export type Event = {
    id: string,
    title: string,
    description: string,
    categories: EventCategoryUnion[],
    startingDate: string,
    endingDate: string,
    countryCode?: string,
    location: string,
    mapUrl?: string,
    status: EventStatusUnion,
    type: EventTypeUnion,
    currency: string,
    isPrivate: boolean,
    likesCount: number,
    attendeesCount: number,
    followersCount: number,
    cover: string,
    organizer?: User,
    country: CountryUnion,
    likers?: User[],
    attendees?: User[],
    followers?: User[],
    tickets: Ticket[],
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type TicketOrder = {
    id: string,
    buyerId: string,
    totalPrice: number,
    paymentReference: string,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type TicketOrderItem = {
    id: string,
    ticket: Ticket,
    order: TicketOrder,
    quantity: number,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type UserTicket = {
    id: string,
    code: string,
    ticket: Ticket,
    owner?: User,
    status: UserTicketStatusUnion,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type Ticket = {
    id: string,
    title: string,
    description: string,
    price: number,
    salesEndDate: string,
    allowedPeople: number,
    type?: InvitationTypeUnion[],
    groupTicket: boolean,
    limited: boolean,
    maxQuantity?: number,
    availableQuantity?: number,
    event?: Event,
    soldTickets?: UserTicket[],
    ticketOrders?: TicketOrderItem[],
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

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

/*
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
*/

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

export type PaymentMethod = {
    type: PaymentMethodUnion;
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
