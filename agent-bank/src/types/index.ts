// Types pour l'authentification
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: number;
    message: string;
    body: {
        token: string;
    };
}

// Types pour le profil utilisateur
export interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface UserProfileResponse {
    status: number;
    message: string;
    body: UserProfile;
}

export interface UpdateProfileData {
    firstName: string;
    lastName: string;
}

// Types pour les comptes (Phase 1)
export interface Account {
    title: string;
    amount: string;
    description: string;
}

// Types pour les transactions (Phase 2 - préparation)
export interface Transaction {
    id: string;
    accountId: string;
    date: string;
    description: string;
    amount: number;
    balance: number;
    type: 'debit' | 'credit';
    category?: string;
    notes?: string;
}

export interface TransactionDetails extends Transaction {
    accountName: string;
    merchant: {
        name: string;
        location: string;
    };
    metadata: {
        paymentMethod: string;
        referenceNumber: string;
    };
}

export interface TransactionUpdate {
    category?: string;
    notes?: string;
}

export interface TransactionsResponse {
    status: number;
    message: string;
    body: Transaction[];
}

export interface TransactionDetailsResponse {
    status: number;
    message: string;
    body: TransactionDetails;
}

// Types pour les erreurs API
export interface ApiError {
    status: number;
    message: string;
    body?: unknown;
}