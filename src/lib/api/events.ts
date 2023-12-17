import type { AxiosInstance } from 'axios';
import type { ApiResponse, User } from '@/types';
import { Country } from '@/types/constants';
import type { EventData, CreateEventPayload, UpdateEventPayload } from '@/types/events';
import { appAPI } from './client';

class EventsAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
    }
    
    public async getAllEvents() {
        return await this.client.get<ApiResponse<EventData[]>>('/events');
    }
    
    public async getAllEventsForOrganizer(organizerId: User['id']) {
        return await this.client.get<ApiResponse<EventData[]>>(`/events/by-organizer/${organizerId}`);
    }
    
    public async getEvent(id: EventData['id']) {
        return await this.client.get<ApiResponse<EventData>>(`/events/${id}`);
    }
    
    public async createEvent(payload: CreateEventPayload) {
        return await this.client.post<ApiResponse<EventData>>('/events', {
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
        return await this.client.patch<ApiResponse<EventData>>(`/events/${eventId}`, {
            ...payload,
            categories: payload.categories && payload.categories.join(','),
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export const eventsAPI = new EventsAPI(appAPI);
