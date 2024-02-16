import type { AxiosInstance, AxiosResponse } from 'axios';
import type { UserProfileUpdatePayload, UserSettingsUpdatePayload } from '@/types/users';
import type { Paginated, User, UserSettings, Notification } from '@/types';
import { appAPIFactory } from './client';

class UsersAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/users';
            return config;
        });
    }

    public async getProfile() {
        return await this.client.get<User>('/me');
    }
    
    public async updateProfile(payload: UserProfileUpdatePayload) {
        let response: AxiosResponse<User>;
        const { profilePicture, ...payloadRest } = payload;
        
        response = await this.client.patch<User>(`/me`, payloadRest);
        
        if (profilePicture) {
            response = await this.client.put<User>(`/me/profile-picture`, {
                profilePicture,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        
        return response;
    }
    
    public async getSettings() {
        return await this.client.get<UserSettings>('/me/settings');
    }
    
    public async updateSettings(payload: UserSettingsUpdatePayload) {
        return await this.client.patch<UserSettings>('/me/settings', payload);
    }
    
    async getNotifications() {
        return this.client.get<Paginated<Notification>>('/me/notifications?page=1');
    }
    
    async markNotificationAsRead(notificationId: Notification['id']) {
        return this.client.patch<Notification>(`/me/notifications/${notificationId}/read`);
    }
    
    async markAllNotificationsAsRead() {
        return this.client.patch<null>('/me/notifications/read-all');
    }
}

export const usersAPI = new UsersAPI(appAPIFactory());
