import type { AxiosInstance, AxiosResponse } from 'axios';
import { appAPI } from './client';
import type { UserProfile, UserProfileUpdatePayload } from '@/types/users';
import type { ApiResponse } from '@/types';

class UsersAPI {
    private readonly client: AxiosInstance;
    
    constructor(client: AxiosInstance) {
        this.client = client;
    }

    public getProfile() {
        return this.client.get<ApiResponse<UserProfile>>('users/me');
    }
    
    public updateProfile(userId: UserProfile['id'], payload: UserProfileUpdatePayload) {
        let response: Promise<AxiosResponse<ApiResponse<UserProfile>>>;
        const { profilePicture, ...payloadRest } = payload;
        
        response = this.client.patch<ApiResponse<UserProfile>>(`users/${userId}`, payloadRest);
        
        if (profilePicture) {
            response = this.client.put<ApiResponse<UserProfile>>(`users/${userId}/profile-picture`, {
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
