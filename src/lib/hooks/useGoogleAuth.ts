import type { AxiosResponse } from 'axios';
import { authAPI } from '@/lib/api/auth';
import { clientEnv } from '@/lib/utils/env';
import type { UserProfile } from '@/types/users';
import type { GoogleAuthPayload, GoogleProfile, ApiResponse } from '@/types';
import { useMutationRequest } from './useMutationRequest';

export const useGoogleAuth = (type: 'sign-in' | 'sign-up') => useMutationRequest(
    'google-auth', async (_: string, { arg: { accessToken, accountType } }: { arg: GoogleAuthPayload }) => {
        const googleAuthResponse = await fetch(`/api/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken, accountType }),
        });
        
        if (!googleAuthResponse.ok) {
            throw new Error('An error occurred while signing in with Google.');
        }
        
        const userInformation = await googleAuthResponse.json() as GoogleProfile;
        
        let response: AxiosResponse<ApiResponse<UserProfile>>;
        
        switch (type) {
            case 'sign-in':
                response = await authAPI.signIn({
                    email: userInformation.email,
                    password: clientEnv.GOOGLE_CLIENT_SECRET,
                });
                break;
            case 'sign-up':
                response = await authAPI.signUp({
                    email: userInformation.email,
                    password: clientEnv.GOOGLE_CLIENT_SECRET,
                    firstName: userInformation.given_name,
                    lastName: userInformation.family_name,
                    username: userInformation.name,
                    phoneNumber: '',
                });
                break;
        }
        
        return response.data;
    }
);
