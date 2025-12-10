const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

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

    private async request<T>(endpoint: string, options: ApiRequestOptions): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentification
    async login(email: string, password: string) {
        return this.request('/user/login', {
            method: 'POST',
            body: { email, password },
        });
    }

    // Profil utilisateur
    async getUserProfile(token: string) {
        return this.request('/user/profile', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async updateUserProfile(token: string, firstName: string, lastName: string) {
        return this.request('/user/profile', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { firstName, lastName },
        });
    }

    // Transactions (Phase 2 - préparation)
    async getTransactions(token: string, month?: string, accountId?: string) {
        let endpoint = '/transactions';
        const params = new URLSearchParams();

        if (month) params.append('month', month);
        if (accountId) params.append('accountId', accountId);

        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }

        return this.request(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getTransactionDetails(token: string, transactionId: string) {
        return this.request(`/transactions/${transactionId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async updateTransaction(token: string, transactionId: string, updates: { category?: string; notes?: string }) {
        return this.request(`/transactions/${transactionId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: updates,
        });
    }

    async deleteTransactionInfo(token: string, transactionId: string) {
        return this.request(`/transactions/${transactionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async addTransactionCategory(token: string, transactionId: string, category: string) {
        return this.request(`/transactions/${transactionId}/category`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { category },
        });
    }

    async addTransactionNotes(token: string, transactionId: string, notes: string) {
        return this.request(`/transactions/${transactionId}/notes`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { notes },
        });
    }
}

export const apiService = new ApiService(API_BASE_URL);