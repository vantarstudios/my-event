import axios from 'axios';
import { clientEnv } from '@/lib/utils/env';

const appAPI = axios.create({
    baseURL: clientEnv.API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { appAPI };
