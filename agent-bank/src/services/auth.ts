import { apiService } from "./api";

export type LoginResponse = {
    token: string;
};

export type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

// 🔐 LOGIN
export async function loginRequest(
    email: string,
    password: string
): Promise<string> {
    const res = await apiService.login(email, password);

    if (!res.body?.token) {
        throw new Error("Login failed: token missing");
    }

    return res.body.token;
}

// 👤 FETCH PROFIL
export async function fetchUserProfile(
    token: string
): Promise<UserProfile> {
    const profile = await apiService.getUserProfile(token);
    return profile;
}

// ✏️ UPDATE PROFIL
export async function updateUserProfile(
    token: string,
    firstName: string,
    lastName: string
): Promise<UserProfile> {
    return apiService.updateUserProfile(token, firstName, lastName);
}
