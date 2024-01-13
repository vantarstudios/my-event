import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store';
import type { UserProfile } from '@/types/users';

const PROFILE_KEY = 'profile';

interface ProfileState {
    value: UserProfile;
}

const initialState: ProfileState = {
    value: JSON.parse(typeof window !== 'undefined'
        ? window.localStorage.getItem(PROFILE_KEY) || '{}'
        : '{}'
    ),
} as ProfileState;

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserProfile>) => {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(PROFILE_KEY, JSON.stringify(action.payload));
            }
            state.value = action.payload;
        },
        clearProfile: (state) => {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(PROFILE_KEY);
            }
            state.value = {} as UserProfile;
        }
    },
})

export const { setProfile, clearProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.value;

export default profileSlice.reducer;
