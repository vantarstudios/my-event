import type { AxiosInstance } from 'axios';
import { appAPI } from './client';
import type { ApiResponse } from '@/types';
import { Role, Country } from '@/types/constants';
import type { SignUpPayload, SignInPayload } from '@/types/auth';
import type { UserProfile } from '@/types/users';

class AuthAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
    }

    public async signIn(payload: SignInPayload) {
        return await this.client.post<ApiResponse<UserProfile>>('auth/login', payload);
    }

    public async signUp(payload: Omit<SignUpPayload, 'confirmPassword'>) {
        return await this.client.post<ApiResponse<UserProfile>>(
        'auth/signup',
        {
            ...payload,
            country: Country.BJ,
            role: Role.ORGANIZER
        });
    }
    
    public async signOut() {
        return await this.client.post<ApiResponse>('auth/logout');
    }
}

export const authAPI = new AuthAPI(appAPI);
