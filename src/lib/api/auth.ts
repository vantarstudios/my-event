import type { AxiosInstance } from 'axios';
import { appAPIFactory } from './client';
import { Role, Country } from '@/types/constants';
import type { SignUpPayload, SignInPayload, RecoveryCodeVerificationPayload, PasswordResetPayload } from '@/types/auth';
import type { User } from '@/types';

class AuthAPI {
    constructor(private readonly client: AxiosInstance) {
        this.client = client;
        this.client.interceptors.request.use((config) => {
            config.baseURL += '/auth';
            return config;
        });
    }

    public async signIn(payload: SignInPayload) {
        return this.client.post<User>('/login', payload);
    }

    public async signUp(payload: Omit<SignUpPayload, 'confirmPassword'>) {
        return this.client.post<User>(
        '/signup',
        {
            ...payload,
            country: Country.BJ,
            role: Role.ORGANIZER
        });
    }
    
    public async googleSignIn(accessToken: string) {
        return this.client.post<User>('/google/login', {
            token: accessToken
        });
    }
    
    public async googleSignUp(accessToken: string) {
        return this.client.post<User>('/google/signup', {
            token: accessToken,
            role: Role.ORGANIZER,
        });
    }
    
    public async signOut() {
        return this.client.post<null>('/logout');
    }
    
    public async sendPasswordResetCode(email: string) {
        return this.client.get<null>('/password-recovery/send-code', {
            params: { email }
        });
    }
    
    public async verifyPasswordResetCode(payload: RecoveryCodeVerificationPayload) {
        return this.client.post<null>('/password-recovery/verify-code', payload);
    }
    
    public async resetPassword(payload: PasswordResetPayload) {
        return this.client.post<null>('/password-recovery/reset-password', payload);
    }
}

export const authAPI = new AuthAPI(appAPIFactory());
