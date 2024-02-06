import type { AxiosInstance, AxiosResponse } from 'axios';
import { appAPIFactory } from './client';
import type { UserProfile, UserProfileUpdatePayload, UserSettingsUpdatePayload } from '@/types/users';
import type { ApiResponse, UserSettings, Notification } from '@/types';

class UsersAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/users';
            return config;
        });
    }

    public async getProfile() {
        return await this.client.get<ApiResponse<UserProfile>>('/me');
    }
    
    public async updateProfile(userId: UserProfile['id'], payload: UserProfileUpdatePayload) {
        let response: AxiosResponse<ApiResponse<UserProfile>>;
        const { profilePicture, ...payloadRest } = payload;
        
        response = await this.client.patch<ApiResponse<UserProfile>>(`/${userId}`, payloadRest);
        
        if (profilePicture) {
            response = await this.client.put<ApiResponse<UserProfile>>(`/${userId}/profile-picture`, {
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
        return await this.client.get<ApiResponse<UserSettings>>('/me/settings');
    }
    
    public async updateSettings(payload: UserSettingsUpdatePayload) {
        return await this.client.patch<ApiResponse<UserSettings>>('/me/settings', payload);
    }
    
    async getNotifications() {
        return this.client.get<ApiResponse<Notification[]>>('/me/notifications?page=1');
    }
}

export const usersAPI = new UsersAPI(appAPIFactory());
