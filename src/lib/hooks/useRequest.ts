import useSWR from 'swr';
import type { Key, Fetcher, SWRConfiguration } from 'swr';
import type { AxiosError } from 'axios';
import type { ApiResponse } from '@/types';
import { toast } from '@/lib/utils';

type Options = SWRConfiguration & {
    successMessage?: string;
    showError?: boolean;
};

export const useRequest = <Data, SWRKey extends Key = Key>(
    key: SWRKey,
    fetcher: Fetcher<ApiResponse<Data> & { success: true }, SWRKey>,
    options: Options = { successMessage: '', showError: true }
) => {
    return useSWR(
        key,
        fetcher,
        {
            onError(error: AxiosError) {
                if (!options.showError) {
                    return;
                }
                
                const errorData = error.response?.data as ApiResponse & { success: false };
                
                if (errorData?.success === false) {
                    toast.error(errorData.error.message);
                } else {
                    toast.error(error.message);
                }
            },
            onSuccess(data) {
                if (data.success && options.successMessage && options.successMessage !== '') {
                    toast.success(options.successMessage);
                }
            },
            shouldRetryOnError: false,
            ...options
        }
    );
};
