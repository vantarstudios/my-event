import { toast as nativeToast } from 'sonner';
import type { ToastT } from 'sonner';

const toastOptions: Omit<ToastT, 'id'> = {
    duration: 3000,
};

export const toast = {
    success: (message: string) => nativeToast.success(message, toastOptions),
    info: (message: string) => nativeToast.info(message, toastOptions),
    warning: (message: string) => nativeToast.warning(message, toastOptions),
    error: (message: string) => nativeToast.error(message, toastOptions),
    message: (message: string) => nativeToast.message(message, toastOptions),
    loading: (message: string) => nativeToast.loading(message, toastOptions),
};
