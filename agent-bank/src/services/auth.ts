// src/services/auth.ts
import { apiService } from "./api";

// Types pour les réponses de l'API
export type LoginResponse = {
    token: string;
};

export type UserProfile = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

// Fonction pour la requête de login
export async function loginRequest(email: string, password: string): Promise<string> {
    const res = await apiService.login(email, password);

    // On cast res.body en LoginResponse
    const body = res.body as LoginResponse;

    if (!body?.token) {
        throw new Error("Login failed: token missing");
    }

    return body.token;
}

// Fonction pour récupérer le profil utilisateur
export async function fetchUserProfile(token: string): Promise<UserProfile> {
    const res = await apiService.getUserProfile(token);

    const body = res.body as UserProfile;

    if (!body) {
        throw new Error("Fetch user profile failed");
    }

    return body;
}
