import useSWR from 'swr';
import type { Key, Fetcher } from 'swr';
import type { AxiosError } from 'axios';
import type { ApiResponse } from '@/types';
import { toast } from '@/lib/utils/toast';

export const useRequest = <Data, SWRKey extends Key = Key>(
    key: SWRKey,
    fetcher: Fetcher<ApiResponse<Data> & { success: true }, SWRKey>,
    successMessage: string = '',
) => {
    return useSWR(
        key,
        fetcher,
        {
            onError(error: AxiosError) {
                const errorData = error.response?.data as ApiResponse & { success: false };
                
                if (errorData.success !== undefined && errorData.success === false) {
                    toast.error(errorData.error.message);
                } else {
                    toast.error(error.message);
                }
            },
            onSuccess(data) {
                if (data.success && successMessage !== '') {
                    toast.success(successMessage);
                }
            },
            shouldRetryOnError: false
        }
    );
};
