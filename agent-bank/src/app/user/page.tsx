"use client";

import { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Account from "../../components/Account";

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
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <Nav isAuthenticated={true} username="Tony" />
            <main className="flex-1 bg-dark">
                <div className="text-white mb-8 pt-8">
                    <h1 className="text-3xl font-bold">
                        Welcome back
                        <br />
                        Tony Jarvis!
                    </h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="border border-primary bg-primary text-white font-bold px-4 py-2 mt-4 cursor-pointer"
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