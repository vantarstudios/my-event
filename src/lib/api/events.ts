import type { AxiosInstance } from 'axios';
import type { Paginated, Event, EventWithOrganizer, User, EventCounts } from '@/types';
import { Country } from '@/types/constants';
import type { CreateEventPayload, UpdateEventPayload, EventQuery } from '@/types/events';
import { appAPIFactory } from './client';

class EventsAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/events';
            return config;
        });
    }
    
    public async getAllEvents(query?: EventQuery) {
        return await this.client.get<Paginated<EventWithOrganizer>>('/', {
            params: query
        });
    }
    
    public async getAllEventsForOrganizer(organizerId: User['id'], query?: EventQuery) {
        return await this.client.get<Paginated<EventWithOrganizer>>(`/organizer/${organizerId}`, {
            params: query
        });
    }
    
    public async getEvent(id: Event['id']) {
        return await this.client.get<Event>(`/${id}`);
    }
    
    public async createEvent(payload: CreateEventPayload) {
        return await this.client.post<Event>('/', {
            ...payload,
            categories: payload.categories.join(','),
            country: Country.BJ,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    public async updateEvent(eventId: Event['id'], payload: UpdateEventPayload) {
        return await this.client.patch<Event>(`/${eventId}`, {
            ...payload,
            categories: payload.categories && payload.categories.join(','),
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    public async deleteEvent(eventId: Event['id']) {
        return await this.client.delete<null>(`/${eventId}`);
    }
    
    public async getEventsCounts(organizerId: User['id']) {
        return await this.client.get<EventCounts>(`/organizer-stats/${organizerId}`);
    }
}

export const eventsAPI = new EventsAPI(appAPIFactory());
