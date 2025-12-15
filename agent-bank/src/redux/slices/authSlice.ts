import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginRequest } from "../../services/auth";

interface AuthState {
    token: string | null;
    user: any | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

// Async thunk pour la connexion
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const token = await loginRequest(email, password);
            return token;
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Email ou mot de passe incorrect");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;