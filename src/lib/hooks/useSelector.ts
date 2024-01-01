import { useSelector as useSelectorBase } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/lib/store';

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
