import type { AxiosInstance } from 'axios';
import type { CreateTicketPayload, UpdateTicketPayload } from '@/types/tickets';
import type { Paginated, Ticket, Event } from '@/types';
import { appAPIFactory } from './client';

class TicketsAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/events';
            return config;
        });
    }
    
    public async createTicket(eventId: Event['id'], payload: CreateTicketPayload) {
        return await this.client.post<Ticket>(`/${eventId}/tickets`, payload);
    }
    
    public async getTicketsForEvent(eventId: Event['id']) {
        return await this.client.get<Paginated<Ticket>>(`/${eventId}/tickets`);
    }
    
    public async updateTicket(eventId: Event['id'], ticketId: Ticket['id'], payload: UpdateTicketPayload) {
        return await this.client.patch<Ticket>(`/${eventId}/tickets/${ticketId}`, payload);
    }
    
    public async deleteTicket(eventId: Event['id'], ticketId: Ticket['id']) {
        return await this.client.delete<Ticket>(`/${eventId}/tickets/${ticketId}`);
    }
}

export const ticketsAPI = new TicketsAPI(appAPIFactory());
