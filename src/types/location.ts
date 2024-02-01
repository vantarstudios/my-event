export type Address = string;

export type Coordinates = {
    latitude: number,
    longitude: number,
};

export type PointOfInterest = {
    score: number,
    name: string,
    address: Address,
    position: Coordinates,
};

export type GetAddressesPayload = {
    latitude: number;
    longitude: number;
    language?: string;
};

export type GetCoordinatesPayload = {
    address: Address;
    language?: string;
};

export type GetPointOfInterestPayload = {
    query: string;
    language?: string;
};
