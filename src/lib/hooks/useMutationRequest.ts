import useSWRMutation from 'swr/mutation';
import type { Key } from 'swr';
import type { MutationFetcher } from 'swr/mutation';
import type { AxiosError } from 'axios';
import { toast } from '@/lib/utils';
import type { ApiError } from '@/types';

export const useMutationRequest = <Data = unknown, SWRMutationKey extends Key = Key, ExtraArg = never>(
    key: Key,
    fetcher: MutationFetcher<Data, SWRMutationKey, ExtraArg>,
    successMessage: string = '',
) => {
    return useSWRMutation(
        key,
        fetcher,
        {
            onError(error: AxiosError) {
                toast.error((error.response?.data as ApiError)?.message || error.message);
            },
            onSuccess() {
                if (successMessage !== '') {
                    toast.success(successMessage);
                }
            },
        }
    );
};
