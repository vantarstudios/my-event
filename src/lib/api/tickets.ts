import type { AxiosInstance } from 'axios';
import type { ApiResponse, Ticket, Event } from '@/types';
import type { CreateTicketPayload, UpdateTicketPayload } from '@/types/tickets';
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
        return await this.client.post<ApiResponse<Ticket>>(`/${eventId}/tickets`, payload);
    }
    
    public async updateTicket(eventId: Event['id'], ticketId: Ticket['id'], payload: UpdateTicketPayload) {
        return await this.client.patch<ApiResponse<Ticket>>(`/${eventId}/tickets/${ticketId}`, payload);
    }
    
    public async deleteTicket(eventId: Event['id'], ticketId: Ticket['id']) {
        return await this.client.delete<ApiResponse<Ticket>>(`/${eventId}/tickets/${ticketId}`);
    }
    
    public async getTicketsForEvent(eventId: Event['id']) {
        return await this.client.get<ApiResponse<Ticket[]>>(`/${eventId}/tickets`);
    }
}

export const ticketsAPI = new TicketsAPI(appAPIFactory());
