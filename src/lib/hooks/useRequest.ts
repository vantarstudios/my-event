import useSWR from 'swr';
import type { Key, Fetcher, SWRConfiguration } from 'swr';
import type { AxiosError } from 'axios';
import { toast } from '@/lib/utils';
import type { ApiError } from '@/types';

type Options = SWRConfiguration & {
    successMessage?: string;
    showError?: boolean;
};

export const useRequest = <Data, SWRKey extends Key = Key>(
    key: SWRKey,
    fetcher: Fetcher<Data, SWRKey>,
    options: Options = { successMessage: '', showError: false }
) => {
    return useSWR(
        key,
        fetcher,
        {
            onError(error: AxiosError) {
                if (!options.showError) {
                    return;
                }
                
                toast.error((error.response?.data as ApiError)?.message || error.message);
            },
            onSuccess() {
                if (options.successMessage && options.successMessage !== '') {
                    toast.success(options.successMessage);
                }
            },
            shouldRetryOnError: false,
            ...options
        }
    );
};
