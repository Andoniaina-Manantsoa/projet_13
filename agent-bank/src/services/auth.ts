import { apiService } from "./api";

// Type pour la réponse du login (JWT)
export type LoginResponse = {
    token: string;
};

// Type pour le profil utilisateur
export type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

// LOGIN : fonction qui appelle l'API pour obtenir un token
export async function loginRequest(
    email: string,
    password: string
): Promise<string> {
    // Appel à la méthode login de ApiService
    const res = await apiService.login(email, password);

    // Vérifie que le token existe dans la réponse
    if (!res.body?.token) {
        throw new Error("Login failed: token missing"); // Erreur si pas de token
    }

    // Retourne le token JWT
    return res.body.token;
}

// FETCH PROFIL : récupère les informations du profil utilisateur
export async function fetchUserProfile(
    token: string
): Promise<UserProfile> {
    // Appel à la méthode getUserProfile de ApiService
    const res: any = await apiService.getUserProfile(token);
    // Retourne le corps de la réponse (données utilisateur)
    return res.body;
}

// UPDATE PROFIL : met à jour prénom et nom de l'utilisateur
export async function updateUserProfile(
    token: string,
    firstName: string,
    lastName: string
): Promise<UserProfile> {
    // Appel à la méthode updateUserProfile de ApiService
    return apiService.updateUserProfile(token, firstName, lastName);
}
