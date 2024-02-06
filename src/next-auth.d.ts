import type { ISODateString } from 'next-auth';
import type { UserProfile } from '@/types/users';

declare module 'next-auth' {
    interface DefaultSession {
        user?: UserProfile;
        expires: ISODateString;
    }
    
    interface Session {
        user?: UserProfile;
        expires: ISODateString;
    }
    
    interface DefaultUser extends UserProfile {}
    
    interface User extends UserProfile {}
}

declare module 'next-auth/jwt' {
    interface JWT {
        name?: string | null
        email?: string | null
        picture?: string | null
        sub?: string
        user: UserProfile;
    }
}
