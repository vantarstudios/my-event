import { useDispatch as useDispatchBase } from 'react-redux';
import type { AppDispatch } from '@/lib/store';

export const useDispatch: () => AppDispatch = useDispatchBase;
