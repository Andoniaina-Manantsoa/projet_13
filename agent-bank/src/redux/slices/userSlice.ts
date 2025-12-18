// Import des fonctions utilitaires de Redux Toolkit pour créer un slice et des thunks asynchrones
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchUserProfile } from "../../services/auth";

import { apiService } from "../../services/api";

// Définition de l'interface TypeScript pour l'état utilisateur
interface UserState {
    firstName: string | null;   
    lastName: string | null;    
    email: string | null;       
    loading: boolean;           
}

// État initial du slice utilisateur
const initialState: UserState = {
    firstName: null,
    lastName: null,
    email: null,
    loading: false,             // Pas en cours de chargement au départ
};

// Création d'un thunk asynchrone pour charger le profil utilisateur
export const loadUser = createAsyncThunk(
    "user/load",                // Nom de l'action
    async (token: string, thunkAPI) => {
        try {
            // Appel à l'API pour récupérer le profil
            const data = await fetchUserProfile(token);
            return data;       // Retourne les données du profil
        } catch {
            // En cas d'erreur, rejette avec null
            return thunkAPI.rejectWithValue(null);
        }
    }
);

// Création d'un thunk asynchrone pour mettre à jour le profil utilisateur
export const updateUser = createAsyncThunk(
    "user/update",              // Nom de l'action
    async (
        { token, firstName, lastName }: { token: string; firstName: string; lastName: string },
        thunkAPI
    ) => {
        try {
            // Appel à l'API pour mettre à jour le profil
            await apiService.updateUserProfile(token, firstName, lastName);
            // Retourne les nouvelles valeurs à stocker dans le state
            return { firstName, lastName };
        } catch {
            // En cas d'erreur, rejette avec null
            return thunkAPI.rejectWithValue(null);
        }
    }
);

// Création du slice utilisateur
const userSlice = createSlice({
    name: "user",               // Nom du slice
    initialState,               // État initial défini ci-dessus
    reducers: {},               // Pas d'actions synchrones ici
    extraReducers: (builder) => { // Gestion des actions asynchrones
        builder
            // Lorsque le profil est en cours de chargement
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            // Lorsque le profil est chargé avec succès
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;                // Fin du chargement
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
            })
            // Lorsque la mise à jour du profil est réussie
            .addCase(updateUser.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            });
    },
});

// Export du reducer pour l'ajouter au store Redux
export default userSlice.reducer;
