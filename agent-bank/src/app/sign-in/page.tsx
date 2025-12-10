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
            <main className="flex-1 bg-dark">
                <section className="box-border bg-white w-[300px] mx-auto mt-12 p-8">
                    <i className="fa fa-user-circle text-[5rem]"></i>
                    <h1 className="text-2xl font-bold mt-4 text-[#2c3e50]">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col text-left mb-4">
                            <label htmlFor="username" className="font-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="p-[5px] text-xl border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex flex-col text-left mb-4">
                            <label htmlFor="password" className="font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-[5px] text-xl border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember-me" className="ml-1">
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="block w-full px-2 py-2 text-lg font-bold mt-4 border border-primary bg-primary text-white cursor-pointer"
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