"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { loginRequest } from "../../services/auth";
import { AppDispatch } from "../../redux/store";
import { setCredentials } from "../../redux/slices/authSlice";
import { loadUser } from "../../redux/slices/userSlice";

// Fonction qui appelle l’API de connexion (login)
/**
 * Page de connexion (Sign In)
 */
export default function SignIn() {
    // Initialisation du router pour rediriger l’utilisateur
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // États pour stocker les valeurs du formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // États pour la gestion UI
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     *  Gestion soumission formulaire
     * @param e événement du formulaire
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Empêche le rechargement de la page
        setError(null); // Réinitialise l’erreur
        setLoading(true); // Active le loader

        try {
            // Appel de l’API de connexion avec email et mot de passe
            const token = await loginRequest(email, password);

            // Stockage token
            localStorage.setItem("token", token);

            // Mise à jour du store Redux
            dispatch(setCredentials(token));
            dispatch(loadUser(token));

            // Si "Remember me" est coché, on le sauvegarde
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }

            // Redirection vers la page profil utilisateur
            router.push("/user");
        } catch (err) {
            // En cas d’erreur (mauvais identifiants), on affiche un message
            setError("Email ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />

            <main className="bg-[#1a0b2e] block min-h-[calc(100vh-120px)]">
                <section className="bg-white w-[300px] m-10 p-8 shadow-lg flex flex-col mx-auto">
                    <div className="flex justify-center mb-4">
                        <i className="fa fa-user-circle text-[3rem] text-gray-600"></i>
                    </div>

                    <h1 className="text-4xl font-bold text-center mb-6 text-[#2c3e50]">
                        Sign In
                    </h1>

                    {error && (
                        <p className="text-red-600 text-sm text-center mb-4">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col text-left mb-4">
                            <label htmlFor="email" className="font-bold mb-1 text-[#2c3e50]">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="p-2 border border-gray-500"
                            />
                        </div>

                        <div className="flex flex-col text-left mb-4">
                            <label htmlFor="password" className="font-bold mb-1 text-[#2c3e50]">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="p-2 border border-gray-500"
                            />
                        </div>

                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="remember-me" className="text-sm">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 font-bold bg-[#00bc77] hover:bg-[#00a868] text-white disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}
