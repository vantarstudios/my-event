import type { AxiosResponse } from 'axios';
import { authAPI } from '@/lib/api/auth';
import type { UserProfile } from '@/types/users';
import type { GoogleAuthPayload } from '@/types/auth';
import type { ApiResponse } from '@/types';
import { useMutationRequest } from './useMutationRequest';

export const useGoogleAuth = (type: 'sign-in' | 'sign-up') => useMutationRequest(
    'google-auth', async (_: string, { arg: { accessToken, accountType } }: { arg: GoogleAuthPayload }) => {
        let response: AxiosResponse<ApiResponse<UserProfile>>;
        
        switch (type) {
            case 'sign-in':
                response = await authAPI.googleSignIn(accessToken);
                break;
            case 'sign-up':
                if (accountType !== 'individual') {
                    throw new Error('Invalid account type');
                }
                
                response = await authAPI.googleSignUp(accessToken);
                break;
        }
        
        return response.data;
    }
);
