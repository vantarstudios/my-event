import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store';

const AUTH_KEY = 'isAuthenticated';

interface IsAuthenticatedState {
    value: boolean;
}

const initialState: IsAuthenticatedState = {
    value: false
}

export const isAuthenticatedSlice = createSlice({
    name: 'isAuthenticated',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(AUTH_KEY, action.payload.toString());
            }
            
            state.value = action.payload;
        }
    },
})

export const { setIsAuthenticated } = isAuthenticatedSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.isAuthenticated.value;

export default isAuthenticatedSlice.reducer;
