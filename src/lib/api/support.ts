import type { AxiosInstance } from 'axios';
import { appAPIFactory } from './client';
import type { ApiResponse } from '@/types';
import type { SupportPayload } from '@/types/support';

class SupportAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/support';
            return config;
        });
    }
    
    async requestSupport(payload: SupportPayload) {
        return this.client.post<ApiResponse<unknown>>('/request', {
            ...payload,
            origin: 'WEB'
        });
    }
}

export const supportAPI = new SupportAPI(appAPIFactory());
