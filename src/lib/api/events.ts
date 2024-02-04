import type { AxiosInstance } from 'axios';
import { objectToQueryParams } from '@/lib/utils';
import type { ApiResponse, User, EventCounts } from '@/types';
import { Country } from '@/types/constants';
import type { EventData, CreateEventPayload, UpdateEventPayload, EventQuery } from '@/types/events';
import { appAPIFactory } from './client';

class EventsAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/events';
            return config;
        });
    }
    
    public async getAllEvents() {
        return await this.client.get<ApiResponse<EventData[]>>('/?page=0');
    }
    
    public async getAllEventsForOrganizer(organizerId: User['id'], query?: EventQuery) {
        return await this.client.get<ApiResponse<EventData[]>>(`/organizer/${organizerId}`, {
            params: objectToQueryParams({
                ...query,
                page: query?.page || 0,
            })
        });
    }
    
    public async getEvent(id: EventData['id']) {
        return await this.client.get<ApiResponse<EventData>>(`/${id}`);
    }
    
    public async createEvent(payload: CreateEventPayload) {
        return await this.client.post<ApiResponse<EventData>>('/', {
            ...payload,
            categories: payload.categories.join(','),
            country: Country.BJ,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    public async updateEvent(eventId: EventData['id'], payload: UpdateEventPayload) {
        return await this.client.patch<ApiResponse<EventData>>(`/${eventId}`, {
            ...payload,
            categories: payload.categories && payload.categories.join(','),
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    public async deleteEvent(eventId: EventData['id']) {
        return await this.client.delete<ApiResponse<EventData>>(`/${eventId}`);
    }
    
    public async getEventsCounts(organizerId: User['id']) {
        return await this.client.get<ApiResponse<EventCounts>>(`/stats/organizer/${organizerId}`);
    }
}

export const eventsAPI = new EventsAPI(appAPIFactory());
