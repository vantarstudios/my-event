import type { AxiosInstance } from 'axios';
import { appAPI } from './client';
import type { ApiResponse } from '@/types';
import type {
    Address,
    Coordinates,
    PointOfInterest,
    GetAddressesPayload,
    GetCoordinatesPayload,
    GetPointOfInterestPayload
} from '@/types/location';

class LocationAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
    }

    public async getAddressesByCoordinates(payload: GetAddressesPayload) {
        return this.client.post<ApiResponse<Address[]>>('/location/addresses', payload);
    }
    
    public async getCoordinatesByAddress(payload: GetCoordinatesPayload) {
        return this.client.post<ApiResponse<Coordinates>>('/location/coordinates', payload);
    }
    
    public async getPointsOfInterest(payload: GetPointOfInterestPayload) {
        return this.client.post<ApiResponse<PointOfInterest[]>>('/location/points-of-interest', payload);
    }
}

export const locationAPI = new LocationAPI(appAPI);
