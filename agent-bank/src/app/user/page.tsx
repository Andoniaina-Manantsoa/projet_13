"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Account from "../../components/Account";
import { fetchUserProfile, updateUserProfile, UserProfile } from "../../services/auth";
import { accounts } from "../../data/mockAccount";

export default function User() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // 🔐 PROTECTION PAGE
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/sign-in");
            return;
        }

        fetchUserProfile(token)
            .then((data) => {
                console.log("PROFILE FROM API 👉", data);
                setUser(data);
                setFirstName(data.firstName);
                setLastName(data.lastName);
            })
            .catch((err) => {
                console.error(err);
                localStorage.removeItem("token");
                router.push("/sign-in");
            });
    }, [router]);

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const updatedUser = await updateUserProfile(token, firstName, lastName);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
        setIsEditing(false);
    };

    if (!user) return null;

    return (
        <>
            <Nav isAuthenticated={true} username={user.firstName} />

            <main className="flex-1 bg-gray-200">
                <div className="bg-light py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl font-bold text-dark mb-6">
                            Welcome back
                        </h1>

                        {isEditing ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="border border-gray-500 px-2 py-2 text-s bg-white"
                                        placeholder="First Name"
                                    />
                                    <input
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="border border-gray-500 px-4 py-2 text-s bg-white"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSave}
                                        className="border border-purple-700 bg-white text-purple-700 font-bold px-6 py-2 hover:bg-primary hover:text-white transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="border border-purple-700 bg-white text-purple-700 font-bold px-6 py-2 hover:bg-primary hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-dark text-2xl mb-4">
                                    {user.firstName} {user.lastName}
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="border border-primary bg-primary text-white font-bold px-4 py-2 hover:bg-primary-dark transition"
                                >
                                    Edit Name
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <h2 className="sr-only">Accounts</h2>

                {accounts.map((account, index) => (
                    <Account
                        key={index}
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                        accountId={account.id}
                    />
                ))}
            </main>

            <Footer />
        </>
    );
}