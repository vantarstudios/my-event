import { NextRequest, NextResponse } from 'next/server';
import type { GoogleProfile } from '@/types';

const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const POST = async (request: NextRequest) => {
    try {
        const { accessToken } = await request.json() as { accessToken: string };
        
        const googleResponse = await fetch(GOOGLE_USER_INFO_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        if (!googleResponse.ok) {
            return NextResponse.error();
        }
        
        const userInfo = await googleResponse.json() as GoogleProfile;
        
        return NextResponse.json(userInfo);
    } catch (error) {
        return NextResponse.error();
    }
}
