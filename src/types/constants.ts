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

export enum PaymentMethod {
    MOBILE_MONEY = 'MOBILE_MONEY',
    VISA = 'VISA',
    PAYPAL = 'PAYPAL',
}

export enum FacturationType {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}

export enum EventCategory {
    CONCERT = 'CONCERT',
    FESTIVAL = 'FESTIVAL',
    LIVE_PERFORMANCE = 'LIVE_PERFORMANCE',
    ART = 'ART',
    COMEDY = 'COMEDY',
    CINEMA = 'CINEMA',
    CULTURE = 'CULTURE',
    GASTRONOMY = 'GASTRONOMY',
    FOOD = 'FOOD',
    FASHION = 'FASHION',
    BUSINESS = 'BUSINESS',
    SEMINAR = 'SEMINAR',
    WORKSHOP = 'WORKSHOP',
    EDUCATION = 'EDUCATION',
    TECHNOLOGY = 'TECHNOLOGY',
    HACKATHON = 'HACKATHON',
    GAMING = 'GAMING',
    ESPORT = 'ESPORT',
    SPORT = 'SPORT',
    SOCIAL = 'SOCIAL',
    GALA = 'GALA',
    LITTERATURE = 'LITTERATURE',
    SCIENCE = 'SCIENCE',
    HEALTH = 'HEALTH',
    RELIGION = 'RELIGION',
    ENTERTAINMENT = 'ENTERTAINMENT',
    POLITIC = 'POLITIC',
}

export enum EventStatus {
    NOT_PUBLISHED = 'NOT_PUBLISHED',
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

export const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
