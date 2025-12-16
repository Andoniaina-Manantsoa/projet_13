const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface ApiRequestOptions {
    method: string;
    headers?: Record<string, string>;
    body?: unknown;
}

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: ApiRequestOptions
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            method: options.method,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        };

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }

        return data;
    }

    // 🔐 LOGIN
    async login(email: string, password: string) {
        return this.request<{
            status: number;
            message: string;
            body: {
                token: string;
            };
        }>("/user/login", {
            method: "POST",
            body: { email, password },
        });
    }

    // 👤 PROFIL (GET)
    async getUserProfile(token: string) {
        return this.request<{
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        }>("/user/profile", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // ✏️ UPDATE PROFIL
    async updateUserProfile(
        token: string,
        firstName: string,
        lastName: string
    ) {
        return this.request<{
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        }>("/user/profile", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { firstName, lastName },
        });
    }
}
export const apiService = new ApiService(API_BASE_URL);
