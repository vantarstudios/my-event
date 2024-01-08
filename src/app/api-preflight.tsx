'use client';

import type { FunctionComponent } from 'react';
import { useRequest } from '@/lib/hooks';
import { appAPI } from '@/lib/api/client';

const ApiPreflight: FunctionComponent = () => {
    useRequest(
        'api-preflight',
        async () => {
            return await appAPI.get('/');
        },
        {
            showError: false,
            shouldRetryOnError: false
        }
    );

    return null;
};

export default ApiPreflight;
