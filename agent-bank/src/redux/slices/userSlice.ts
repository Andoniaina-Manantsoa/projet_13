import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../services/auth";
import { apiService } from "../../services/api";

interface UserState {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    loading: boolean;
}

const initialState: UserState = {
    firstName: null,
    lastName: null,
    email: null,
    loading: false,
};

export const loadUser = createAsyncThunk(
    "user/load",
    async (token: string, thunkAPI) => {
        try {
            const data = await fetchUserProfile(token);
            return data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/update",
    async (
        { token, firstName, lastName }: { token: string; firstName: string; lastName: string },
        thunkAPI
    ) => {
        try {
            await apiService.updateUserProfile(token, firstName, lastName);
            return { firstName, lastName };
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            });
    },
});

export default userSlice.reducer;
