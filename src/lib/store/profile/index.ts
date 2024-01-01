import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store';
import type { UserProfile } from '@/types/users';

interface ProfileState {
    value: UserProfile;
}

const initialState: ProfileState = {
    value: {},
} as ProfileState;

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserProfile>) => {
            state.value = action.payload;
        },
    },
})

export const { setProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.value;

export default profileSlice.reducer;
