"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { accountsData, Transaction } from "../../../data/mockTransactions";
import { fetchUserProfile, UserProfile } from "../../../services/auth";

export default function TransactionsPage() {
    const router = useRouter();
    const params = useParams();
    const accountId = params?.accountId as string | undefined;

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Récupération du compte correspondant
    const accountData = accountId ? accountsData[accountId] : null;

    // 🔐 Charger le profil utilisateur
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/sign-in");
            return;
        }

        fetchUserProfile(token)
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                localStorage.removeItem("token");
                router.push("/sign-in");
            });
    }, [router]);

    // Initialiser les transactions si accountData existe
    useEffect(() => {
        if (accountData) {
            setTransactions(accountData.transactions);
        }
    }, [accountData]);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const updateCategory = (id: string, newCategory: string) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, category: newCategory } : t))
        );
    };

    const updateNotes = (id: string, newNotes: string) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, notes: newNotes } : t))
        );
    };

    // Affichage pendant le chargement
    if (loading) {
        return (
            <>
                <Nav isAuthenticated={!!user} username={user?.firstName || ""} />
                <main className="flex-1 bg-light pb-12">
                    <div className="text-center py-20">
                        <p className="text-dark text-xl">Chargement...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Compte introuvable
    /*if (!accountData) {
        return (
            <>
                <Nav isAuthenticated={!!user} username={user?.firstName || ""} />
                <main className="flex-1 bg-light pb-12">
                    <div className="text-center py-20">
                        <p className="text-dark text-xl">Compte introuvable (ID: {accountId})</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }*/

    return (
        <>
            <Nav isAuthenticated={!!user} username={user?.firstName || ""} />

            <main className="flex-1 bg-light pb-12 bg-gray-300">
                {/* Account Header */}
                <div className="bg-white border border-gray-300 py-8 text-center mb-8">
                    <h2 className="text-base font-normal text-dark mb-2">{accountData.title}</h2>
                    <p className="text-3xl font-bold text-dark mb-1">{accountData.amount}</p>
                    <p className="text-base text-dark">{accountData.description}</p>
                </div>

                {/* Transactions Table */}
                <div className="mx-auto" style={{ width: "90%" }}>
                    {/* Header */}
                    <div className="grid grid-cols-[80px_1fr_1fr_150px_150px] gap-4 px-6 py-3 bg-light border-b-2 border-gray-400 font-bold text-dark">
                        <div></div>
                        <div>DATE</div>
                        <div>DESCRIPTION</div>
                        <div className="text-right">AMOUNT</div>
                        <div className="text-right">BALANCE</div>
                    </div>

                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="bg-white border-b border-gray-300">
                            {/* Main Row */}
                            <div
                                className="grid grid-cols-[80px_1fr_1fr_150px_150px] gap-4 px-5 py-3 items-center cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleExpand(transaction.id)}
                            >
                                <div className="flex justify-center">
                                    <svg
                                        className={`w-6 h-6 transition-transform ${expandedId === transaction.id ? "rotate-180" : ""}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>{transaction.date}</div>
                                <div>{transaction.description}</div>
                                <div className="text-right">${transaction.amount.toFixed(2)}</div>
                                <div className="text-right">${transaction.balance.toFixed(2)}</div>
                            </div>

                            {/* Expanded */}
                            {expandedId === transaction.id && (
                                <div className="px-6 py-6 bg-gray-50">
                                    <div className="space-y-4">
                                        <div className="flex gap-2 items-center">
                                            <strong>Transaction Type:</strong> {transaction.type}
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <strong>Category:</strong>
                                            <select
                                                value={transaction.category}
                                                onChange={(e) => updateCategory(transaction.id, e.target.value)}
                                                className="px-2 py-1 bg-white"
                                            >
                                                <option value="Food">Food</option>
                                                <option value="Transport">Transport</option>
                                                <option value="Shopping">Shopping</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <strong>Notes:</strong>
                                            <input
                                                value={transaction.notes}
                                                onChange={(e) => updateNotes(transaction.id, e.target.value)}
                                                placeholder="votre note ici..."
                                                className="px-2 py-1 bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}
