import type { AxiosInstance, AxiosResponse } from 'axios';
import { appAPI } from './client';
import type { UserProfile, UserProfileUpdatePayload } from '@/types/users';
import type { ApiResponse } from '@/types';

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
}

export const usersAPI = new UsersAPI(appAPI);
