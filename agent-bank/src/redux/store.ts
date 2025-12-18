// Import de la fonction configureStore de Redux Toolkit pour créer le store
import { configureStore } from '@reduxjs/toolkit';
// Import des reducers (slices) que nous avons créés
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

// Création du store Redux avec configureStore
export const store = configureStore({
    reducer: {
        // Ajout du slice d'authentification sous la clé "auth"
        auth: authReducer,
        // Ajout du slice utilisateur sous la clé "user"
        user: userReducer,
    },
});

// Définition du type RootState pour représenter l'état global du store
// Utile pour typer useSelector
export type RootState = ReturnType<typeof store.getState>;

// Définition du type AppDispatch pour représenter le type du dispatch
// Utile pour typer useDispatch
export type AppDispatch = typeof store.dispatch;
