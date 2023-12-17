import type { AxiosInstance } from 'axios';
import { appAPI } from './client';
import type { ApiResponse } from '@/types';
import { Role, Country } from '@/types/constants';
import type { SignUpPayload, SignInPayload } from '@/types/auth';
import type { UserProfile } from '@/types/users';

class AuthAPI {
    private readonly client: AxiosInstance;
    
    constructor(client: AxiosInstance) {
        this.client = client;
    }

    public signIn(payload: SignInPayload) {
        return this.client.post<ApiResponse<UserProfile>>('auth/login', payload);
    }

    public signUp(payload: Omit<SignUpPayload, 'confirmPassword'>) {
        return this.client.post<ApiResponse<UserProfile>>(
        'auth/signup',
        {
            ...payload,
            country: Country.BJ,
            role: Role.ORGANIZER
        });
    }
}

export const authAPI = new AuthAPI(appAPI);
