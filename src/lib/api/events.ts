import type { AxiosInstance } from 'axios';
import type { ApiResponse, User, EventCounts } from '@/types';
import { Country } from '@/types/constants';
import type { EventData, CreateEventPayload, UpdateEventPayload } from '@/types/events';
import { appAPI } from './client';

class EventsAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
    }
    
    public async getAllEvents() {
        return await this.client.get<ApiResponse<EventData[]>>('/events?page=0');
    }
    
    public async getAllEventsForOrganizer(organizerId: User['id']) {
        return await this.client.get<ApiResponse<EventData[]>>(`/events/organizer/${organizerId}?page=0`);
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
    
    public async deleteEvent(eventId: EventData['id']) {
        return await this.client.delete<ApiResponse<EventData>>(`/events/${eventId}`);
    }
    
    public async getEventsCounts(organizerId: User['id']) {
        return await this.client.get<ApiResponse<EventCounts>>(`/events/stats/organizer/${organizerId}`);
    }
}

export const eventsAPI = new EventsAPI(appAPI);
