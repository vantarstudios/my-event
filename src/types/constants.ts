export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT',
}

export enum Country {
    BJ = 'BJ',
    TG = 'TG',
    SN = 'SN',
}

export enum Role {
    USER = 'USER',
    STAFF = 'STAFF',
    ORGANIZER = 'ORGANIZER',
    ADMIN = 'ADMIN',
}

export enum Plan {
    FREE = 'FREE',
    PREMIUM_USER = 'PREMIUM_USER',
}

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    ENDED = 'ENDED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentMethodType {
    MOBILE_MONEY = 'MOBILE_MONEY',
    VISA = 'VISA',
    PAYPAL = 'PAYPAL',
}

export enum WithdrawalMethodType {
    MOBILE_MONEY = 'MOBILE_MONEY',
    PAYPAL = 'PAYPAL',
}

export enum FacturationType {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}

export enum EventFormat {
    CONFERENCE = 'CONFERENCE',
    WEBINAR = 'WEBINAR',
    WORKSHOP = 'WORKSHOP',
    PRODUCT_LAUNCH = 'PRODUCT_LAUNCH',
    AWARD_CEREMONY = 'AWARD_CEREMONY',
    SEMINAR = 'SEMINAR',
    GALA = 'GALA',
    MEETUP = 'MEETUP',
    GAME = 'GAME',
    MATCH = 'MATCH',
}

export enum EventTheme {
    FUNDRAISER = 'FUNDRAISER',
    RETREAT = 'RETREAT',
    EXHIBITION = 'EXHIBITION',
    FESTIVAL = 'FESTIVAL',
    GAMING = 'GAMING',
    PARTY = 'PARTY',
    SPORT = 'SPORT',
    ARTS_AND_CRAFTS = 'ARTS_AND_CRAFTS',
    FASHION = 'FASHION',
    MUSIC = 'MUSIC',
    CONCERT = 'CONCERT',
    FAIR = 'FAIR',
}

export const EventCategory = Object.freeze(Object.assign({}, { ...EventFormat, ...EventTheme }));

export enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    POSTPONED = 'POSTPONED',
    CANCELLED = 'CANCELLED',
}

export enum EventType {
    LIVE = 'LIVE',
    ONLINE = 'ONLINE',
}

export enum UserTicketStatus {
    UNVERIFIED = 'UNVERIFIED',
    VERIFIED = 'VERIFIED',
    OUT = 'OUT',
}

export enum InvitationType {
    FREE = 'FREE',
    EMAIL = 'EMAIL',
    UNIQUE_LINK = 'UNIQUE_LINK',
}

export enum NotificationType {
    ORGANIZER_EVENTS = 'ORGANIZER_EVENTS',
    ORGANIZER_TICKETS = 'ORGANIZER_TICKETS',
    ORGANIZER_FOLLOWERS = 'ORGANIZER_FOLLOWERS',
    FINANCES = 'FINANCES',
    SUBSCRIPTION_PLAN = 'SUBSCRIPTION_PLAN',
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
