import type { AxiosInstance } from 'axios';
import { appAPIFactory } from './client';
import type { ApiResponse } from '@/types';
import { Role, Country } from '@/types/constants';
import type { SignUpPayload, SignInPayload } from '@/types/auth';
import type { UserProfile } from '@/types/users';

class AuthAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/auth';
            return config;
        });
    }

    public async signIn(payload: SignInPayload) {
        return await this.client.post<ApiResponse<UserProfile>>('/login', payload);
    }

    public async signUp(payload: Omit<SignUpPayload, 'confirmPassword'>) {
        return await this.client.post<ApiResponse<UserProfile>>(
        '/signup',
        {
            ...payload,
            country: Country.BJ,
            role: Role.ORGANIZER
        });
    }
    
    public async googleSignIn(accessToken: string) {
        return await this.client.post<ApiResponse<UserProfile>>('/google-login', {
            token: accessToken
        });
    }
    
    public async googleSignUp(accessToken: string) {
        return await this.client.post<ApiResponse<UserProfile>>('/google-signup', {
            token: accessToken
        });
    }
    
    public async signOut() {
        return await this.client.post<ApiResponse>('/logout');
    }
}

export const authAPI = new AuthAPI(appAPIFactory());
