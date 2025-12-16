"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Account from "../../components/Account";
import {
    fetchUserProfile,
    UserProfile,
} from "../../services/auth";

const accounts = [
    {
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        description: "Available Balance",
    },
    {
        title: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        description: "Available Balance",
    },
    {
        title: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        description: "Current Balance",
    },
];

export default function User() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // 🔐 PROTECTION PAGE
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/sign-in");
            return;
        }

        fetchUserProfile(token)
            .then(setUser)
            .catch(() => {
                localStorage.removeItem("token");
                router.push("/sign-in");
            });
    }, [router]);

    if (!user) return null;

    return (
        <>
            <Nav isAuthenticated={true} username={user.firstName} />

            <main className="flex-1 bg-dark">
                <div className="text-white mb-8 pt-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Welcome back
                        <br />
                        {user.firstName} {user.lastName}!
                    </h1>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="border border-primary bg-primary text-white font-bold px-4 py-2 mt-4"
                    >
                        Edit Name
                    </button>
                </div>

                <h2 className="sr-only">Accounts</h2>

                {accounts.map((account, index) => (
                    <Account
                        key={index}
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                    />
                ))}
            </main>

            <Footer />
        </>
    );
}
