import useSWRMutation from 'swr/mutation';
import type { Key } from 'swr';
import type { MutationFetcher } from 'swr/mutation';
import type { AxiosError } from 'axios';
import type { ApiResponse } from '@/types';
import { toast } from '@/lib/utils/toast';

export const useMutationRequest = <Data = unknown, SWRMutationKey extends Key = Key, ExtraArg = never>(
    key: Key,
    fetcher: MutationFetcher<ApiResponse<Data>, SWRMutationKey, ExtraArg>,
    successMessage: string = '',
) => {
    return useSWRMutation(
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
        }
    );
};
