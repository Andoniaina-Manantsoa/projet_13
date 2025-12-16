"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { loginRequest } from "../../services/auth";

export default function SignIn() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 🔐 Appel API login
            const token = await loginRequest(email, password);

            // 💾 Stockage token
            localStorage.setItem("token", token);

            // (Optionnel) remember me
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }

            // 🔄 Redirection profil
            router.push("/user");
        } catch (err) {
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
