import type { AxiosInstance } from 'axios';
import { appAPIFactory } from './client';
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
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/location';
            return config;
        });
    }

    public async getAddressesByCoordinates(payload: GetAddressesPayload) {
        return this.client.post<Address[]>('/addresses', payload);
    }
    
    public async getCoordinatesByAddress(payload: GetCoordinatesPayload) {
        return this.client.post<Coordinates>('/coordinates', payload);
    }
    
    public async getPointsOfInterest(payload: GetPointOfInterestPayload) {
        return this.client.post<PointOfInterest[]>('/points-of-interest', payload);
    }
}

export const locationAPI = new LocationAPI(appAPIFactory());
