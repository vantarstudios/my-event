import type { AxiosInstance } from 'axios';
import type { ApiResponse, Ticket, Event } from '@/types';
import type { CreateTicketPayload } from '@/types/tickets';
import { appAPI } from './client';

class TicketsAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
    }
    
    public async createTicket(eventId: Event['id'], payload: CreateTicketPayload) {
        return await this.client.post<ApiResponse<Ticket>>(`/events/${eventId}/tickets`, payload);
    }
    
    public async updateTicket(eventId: Event['id'], ticketId: Ticket['id'], payload: CreateTicketPayload) {
        return await this.client.put<ApiResponse<Ticket>>(`/events/${eventId}/tickets/${ticketId}`, payload);
    }
    
    public async deleteTicket(eventId: Event['id'], ticketId: Ticket['id']) {
        return await this.client.delete<ApiResponse<Ticket>>(`/events/${eventId}/tickets/${ticketId}`);
    }
    
    public async getTicketsForEvent(eventId: Event['id']) {
        return await this.client.get<ApiResponse<Ticket[]>>(`/events/${eventId}/tickets`);
    }
}

export const ticketsAPI = new TicketsAPI(appAPI);
