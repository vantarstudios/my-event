import type { AxiosInstance, AxiosResponse } from 'axios';
import { appAPI } from './client';
import type { UserProfile, UserProfileUpdatePayload, UserSettingsUpdatePayload } from '@/types/users';
import type { ApiResponse, UserSettings } from '@/types';

class UsersAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
    }

    public async getProfile() {
        return await this.client.get<ApiResponse<UserProfile>>('users/me');
    }
    
    public async updateProfile(userId: UserProfile['id'], payload: UserProfileUpdatePayload) {
        let response: AxiosResponse<ApiResponse<UserProfile>>;
        const { profilePicture, ...payloadRest } = payload;
        
        response = await this.client.patch<ApiResponse<UserProfile>>(`users/${userId}`, payloadRest);
        
        if (profilePicture) {
            response = await this.client.put<ApiResponse<UserProfile>>(`users/${userId}/profile-picture`, {
                profilePicture,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        
        return response;
    }
    
    public async getSettings(userId: UserProfile['id']) {
        return await this.client.get<ApiResponse<UserSettings>>(`users/${userId}/settings`);
    }
    
    public async updateSettings(userId: UserProfile['id'], payload: UserSettingsUpdatePayload) {
        return await this.client.patch<ApiResponse<UserSettings>>(`users/${userId}/settings`, payload);
    }
}

export const usersAPI = new UsersAPI(appAPI);
