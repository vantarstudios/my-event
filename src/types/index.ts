import type { HTMLAttributes, ReactNode, FunctionComponent,MouseEvent } from 'react';
import {
    Role,
    Plan as PlanEnum,
    SubscriptionStatus,
    PaymentMethodType,
    WithdrawalMethodType,
    FacturationType,
    MediaType,
    Country,
    EventCategory,
    EventStatus,
    EventType,
    UserTicketStatus,
    InvitationType,
    NotificationType,
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

export type MediaTypeUnion = (typeof MediaType)[keyof typeof MediaType];

export type Media = {
    id: string,
    url: string,
    description?: string,
    format: string,
    type: MediaTypeUnion,
    createdAt: string,
    updatedAt: string,
};

export type CountryUnion = (typeof Country)[keyof typeof Country];

export type RoleUnion = (typeof Role)[keyof typeof Role];

export type PlanUnion = (typeof PlanEnum)[keyof typeof PlanEnum];

export type SubscriptionStatusUnion = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export type PaymentMethodUnion = (typeof PaymentMethodType)[keyof typeof PaymentMethodType];

export type WithdrawalMethodUnion = (typeof WithdrawalMethodType)[keyof typeof WithdrawalMethodType];

export type FacturationTypeUnion = (typeof FacturationType)[keyof typeof FacturationType];

export type EventCategoryUnion = (typeof EventCategory)[keyof typeof EventCategory];

export type EventStatusUnion = (typeof EventStatus)[keyof typeof EventStatus];

export type EventTypeUnion = (typeof EventType)[keyof typeof EventType];

export type UserTicketStatusUnion = (typeof UserTicketStatus)[keyof typeof UserTicketStatus];

export type InvitationTypeUnion = (typeof InvitationType)[keyof typeof InvitationType];

export type NotificationTypeUnion = (typeof NotificationType)[keyof typeof NotificationType];

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

export type UserSettings = {
    id: string,
    enabledNotifications: NotificationTypeUnion[],
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
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
    settings?: UserSettings,
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
    isPrivate: boolean,
    likesCount: number,
    attendeesCount: number,
    followersCount: number,
    cover: string,
    organizer?: User,
    organizerName?: string,
    country: CountryUnion,
    likers?: User[],
    attendees?: User[],
    followers?: User[],
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
    invitationType: InvitationTypeUnion,
    groupTicket: boolean,
    limited: boolean,
    maxQuantity?: number,
    availableQuantity?: number,
    eventId: Event['id'],
    soldTickets?: UserTicket[],
    ticketOrders?: TicketOrderItem[],
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type Notification = {
    id: string,
    type: NotificationTypeUnion,
    title: string,
    message: string,
    read: boolean,
    resourceId?: string,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type NavigationLink = Readonly<{
    name: string;
    href: string;
    icon?: FunctionComponent<IconProps>;
}>;

export type EventCounts = {
    total: number;
    upComing: number;
    onGoing: number;
    past: number;
};

export type Mode = 'view' | 'edit';

export type Layout = 'create' | 'edit';

export type EditOrCreateStep = {
    title: string;
    content: ReactNode;
    isCompleted: boolean;
};

export const AccountTypes = ['individual', 'organization'] as const;

export type AccountType = (typeof AccountTypes)[number];

export interface IconProps {
    onClick?: (event?: MouseEvent<HTMLElement>) => void;
    className?: HTMLAttributes<SVGElement>['className'];
}

export const ticketTypes = ['free', 'paid', 'invitation'] as const;

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

export type WithdrawalMethod = {
    type: WithdrawalMethodUnion;
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

export enum AdRedirectionTypes {
    EMAIL = 'email',
    PHONE_NUMBER = 'phone_number',
    LINK = 'link',
}

export type AdBusinessOwner<FileType> = {
    fullName: string;
    businessName: string;
    email: string;
    phoneNumber: string;
    location: string;
    logo: FileType;
};

export type AdContent<FileType> = {
    description: string;
    images: FileType[];
};

export type AdDetails = {
    ctaText: string;
    ctaLink: string;
};

export type Ad<FileType> = {
    businessOwner: AdBusinessOwner<FileType>
} & AdContent<FileType> & AdDetails;
