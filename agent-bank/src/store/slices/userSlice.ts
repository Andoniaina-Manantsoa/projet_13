import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface UserState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
};

// Récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.token;

            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch profile');
            }

            return data.body;
        } catch (error) {
            return rejectWithValue('Network error');
        }
    }
);

// Mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (
        updates: { firstName: string; lastName: string },
        { getState, rejectWithValue }
    ) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.token;

            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to update profile');
            }

            return data.body;
        } catch (error) {
            return rejectWithValue('Network error');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserProfile: (state) => {
            state.profile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;