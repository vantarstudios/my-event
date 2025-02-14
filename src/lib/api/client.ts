import axios from 'axios';
import { clientEnv } from '@/lib/utils/env';

const appAPIFactory = () => axios.create({
    baseURL: clientEnv.API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { appAPIFactory };
