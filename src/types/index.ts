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
    InvitationType,
    NotificationType,
    SortOrder,
} from './constants';

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export type ApiError = {
    message: string;
    error: string;
    statusCode: number;
};

export type Paginated<T> = {
    data: T[];
    total: number;
};

export type BaseQuery = Partial<{
    take: number;
    skip: number;
    page: number;
    date: string;
    'orderBty[createdAt]': SortOrder;
}>;

export type RoleUnion = (typeof Role)[keyof typeof Role];

export type PlanUnion = (typeof PlanEnum)[keyof typeof PlanEnum];

export type SubscriptionStatusUnion = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export type PaymentMethodUnion = (typeof PaymentMethodType)[keyof typeof PaymentMethodType];

export type WithdrawalMethodUnion = (typeof WithdrawalMethodType)[keyof typeof WithdrawalMethodType];

export type FacturationTypeUnion = (typeof FacturationType)[keyof typeof FacturationType];

export type EventCategoryUnion = (typeof EventCategory)[keyof typeof EventCategory];

export type EventTypeUnion = (typeof EventType)[keyof typeof EventType];

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

export type Media = {
    id: string,
    url: string,
    description?: string,
    format: string,
    type: MediaType,
    createdAt: string,
    updatedAt: string,
};

export type UserSettings = {
    id: string,
    enabledNotifications: NotificationType[],
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type User = {
    id: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    role: RoleUnion,
    bio?: string,
    followersCount: number,
    deviceNotificationToken?: string,
    interestedCategories: EventCategoryUnion[],
    country: Country,
    profilePicture?: Media,
};

export type Event = {
    id: string,
    title: string,
    description: string,
    categories: EventCategoryUnion[],
    cover: Media,
    startingDate: string,
    endingDate: string,
    organizerId: string,
    country: Country,
    location: string,
    mapUrl?: string,
    status: EventStatus,
    type: EventType,
    isPrivate: boolean,
    likesCount: number,
    attendeesCount: number,
    followersCount: number,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type EventWithOrganizer = Event & {
    organizer: Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'followersCount' | 'profilePicture'>,
};

export type Ticket = {
    id: string,
    title: string,
    description: string,
    eventId: Event['id'],
    price: number,
    salesEndDate: string,
    allowedPeople: number,
    invitationType: InvitationType,
    limited: boolean,
    maxQuantity?: number,
    availableQuantity?: number,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string,
};

export type Notification = {
    id: string,
    type: NotificationType,
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
    onClick?: (event: MouseEvent<SVGElement>) => void;
    className?: HTMLAttributes<SVGElement>['className'];
}

export const ticketTypes = ['free', 'paid', 'invitation'] as const;

export type DateObject = {
    day: number;
    month: number;
    year: number;
};

export type ParsedDate = DateObject;

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
