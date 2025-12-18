// Import des fonctions utilitaires de Redux Toolkit pour créer un slice et des thunks asynchrones
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginRequest } from "../../services/auth";

// Définition de l'interface TypeScript pour l'état d'authentification
interface AuthState {
    token: string | null;         // Token JWT de l'utilisateur (null si non connecté)
    user: any | null;             // Infos de l'utilisateur (id, nom, email, etc.)
    isAuthenticated: boolean;     // Flag pour savoir si l'utilisateur est connecté
}

// État initial du slice d'authentification
const initialState: AuthState = {
    token: null,                  // Pas de token au départ
    user: null,                   // Pas d'utilisateur connecté
    isAuthenticated: false,       // Pas authentifié au départ
};

// Création d'un thunk asynchrone pour gérer la connexion
export const login = createAsyncThunk(
    "auth/login", // Nom de l'action pour Redux
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            // Appel de la fonction loginRequest qui renvoie le token si succès
            const token = await loginRequest(email, password);
            return token;
        } catch (error: any) {
            // En cas d'erreur, rejette avec une valeur personnalisée
            return thunkAPI.rejectWithValue("Email ou mot de passe incorrect");
        }
    }
);

// Création du slice d'authentification
const authSlice = createSlice({
    name: "auth",                 // Nom du slice
    initialState,                 // État initial défini ci-dessus
    reducers: {                   // Actions synchrones pour gérer l'état
        // Action pour définir le token après connexion
        setCredentials: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;  // L'utilisateur est maintenant authentifié
        },
        // Action pour déconnecter l'utilisateur
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token"); // Supprime le token du localStorage
        },
        // Action pour définir les informations de l'utilisateur connecté
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
    // Ici on pourrait gérer des reducers pour les thunks asynchrones comme login
    // extraReducers: (builder) => {...} si nécessaire
});

// Export des actions synchrones pour les utiliser dans les composants
export const { setCredentials, logout, setUser } = authSlice.actions;

// Export du reducer pour l'ajouter au store Redux
export default authSlice.reducer;