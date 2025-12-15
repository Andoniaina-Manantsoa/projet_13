"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function SignIn() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'authentification à implémenter
        router.push("/user");
    };

    return (
        <>
            <Nav />
            <main className="flex-1 bg-[#1a0b2e] flex items-center justify-center min-h-[calc(100vh-120px)]">
                <section className="bg-white w-[300px] p-8 rounded-sm shadow-lg">
                    <div className="flex justify-center mb-4">
                        <i className="fa fa-user-circle text-[3rem] text-gray-600"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6 text-[#2c3e50]">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col text-left mb-4">
                            <label htmlFor="username" className="font-bold mb-1 text-sm">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="p-2 text-base border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex flex-col text-left mb-4">
                            <label htmlFor="password" className="font-bold mb-1 text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 text-base border border-gray-300 rounded"
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
                            className="w-full px-4 py-3 text-base font-bold bg-[#00bc77] hover:bg-[#00a868] text-white cursor-pointer rounded transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}