// URL de base de l'API : utilise la variable d'environnement NEXT_PUBLIC_API_URL si disponible, sinon localhost
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";


// Interface pour les options d'une requête API
interface ApiRequestOptions {
    method: string;
    headers?: Record<string, string>;
    body?: unknown;
}

// Classe ApiService pour centraliser les appels API
class ApiService {
    private baseUrl: string; // URL de base de l'API

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Méthode interne générique pour effectuer une requête API
    private async request<T>(
        endpoint: string, // Endpoint relatif (ex: /user/login)
        options: ApiRequestOptions // Options de la requête (méthode, headers, body)
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            method: options.method,
            headers: {
                "Content-Type": "application/json", // Content-Type par défaut
                ...options.headers, // Fusion avec les headers personnalisés
            },
        };

        // Si on a un body, on le convertit en JSON
        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        // Exécution de la requête fetch
        const response = await fetch(url, config);
        const data = await response.json();

        // Gestion des erreurs : si le status n'est pas ok, on lance une exception
        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }

        return data;
    }

    // LOGIN : envoie email et mot de passe pour obtenir un token
    async login(email: string, password: string) {
        return this.request<{
            status: number;
            message: string;
            body: {
                token: string; // Token JWT renvoyé par le serveur
            };
        }>("/user/login", {
            method: "POST",
            body: { email, password }, // Corps de la requête
        });
    }

    // GET PROFIL : récupère les informations de l'utilisateur
    async getUserProfile(token: string) {
        return this.request<{
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        }>("/user/profile", {
            method: "POST", // Ici on utilise POST pour récupérer le profil
            headers: {
                Authorization: `Bearer ${token}`,  // JWT dans l'entête Authorization
            },
        });
    }

    // UPDATE PROFIL : met à jour prénom et nom de l'utilisateur
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
            method: "PUT", // Méthode PUT pour la mise à jour
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { firstName, lastName }, // Données à mettre à jour
        });
    }
}

// Création d'une instance unique de ApiService à utiliser dans toute l'application
export const apiService = new ApiService(API_BASE_URL);
