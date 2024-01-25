import type { AxiosRequestConfig } from 'axios';

export function objectToQueryParams(obj: Record<string, unknown>): AxiosRequestConfig['params'] {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
         params.append(key, String(value));
    });
    return params;
}
