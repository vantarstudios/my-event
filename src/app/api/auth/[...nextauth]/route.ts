import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { serverEnv, isDevelopment } from '@/lib/utils/env';
import { authAPI } from '@/lib/api/auth';
import { Role } from '@/types/constants';
import type { SignInPayload } from '@/types/auth';

const authHandler = (request: NextApiRequest, response: NextApiResponse) => {
    return NextAuth(request, response, {
        secret: serverEnv.NEXTAUTH_SECRET,
        useSecureCookies: !isDevelopment,
        callbacks: {
            signIn: async ({ user }) => {
                return [Role.ADMIN, Role.ORGANIZER].includes(user.role);
            },
            jwt: async ({ token, user }) => {
                if (user) {
                    token.user = user as JWT['user'];
                }
                
                return token;
            },
            session: async ({ session, token }) => {
                session.user = token.user;
                
                return session;
            },
        },
        providers: [
            CredentialsProvider({
                id: 'credentials',
                name: 'Credentials',
                type: 'credentials',
                credentials: {
                    email: { label: 'Email', type: 'email' },
                    password: { label: 'Password', type: 'password' },
                },
                authorize: async (credentials?: SignInPayload) => {
                    if (!credentials) {
                        return null;
                    }

                    const signInResponse = await authAPI.signIn(credentials);
                    
                    if (!signInResponse.data.success) {
                        return null
                    }
                    
                    return signInResponse.data.data;
                }
            }),
        ],
    });
}

export { authHandler as GET, authHandler as POST };
