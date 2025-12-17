"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { accountsData, Transaction, AccountInfo } from "../../../data/mockTransactions";
import { fetchUserProfile, UserProfile } from "../../../services/auth";

export default function TransactionsPage() {
    const router = useRouter();
    const params = useParams();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [accountData, setAccountData] = useState<AccountInfo | null>(null);
    const [loadingAccount, setLoadingAccount] = useState(true);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // -------------------
    // DEBUG: Vérifier params
    // -------------------
    useEffect(() => {
        console.log("Params object:", params);
    }, [params]);

    // -------------------
    // Fetch user
    // -------------------
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/sign-in");
            return;
        }

        fetchUserProfile(token)
            .then((data) => {
                setUser(data);
                setLoadingUser(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                router.push("/sign-in");
            });
    }, [router]);

    // -------------------
    // Load account
    // -------------------
    useEffect(() => {
        console.log("Raw params object:", params);

        // Récupérer la première clé, peu importe les espaces
        const key = Object.keys(params)[0];
        const accountId = (params[key] as string)?.trim();

        console.log("Corrected accountId:", accountId);
        console.log("Available accounts:", Object.keys(accountsData));

        const account = accountsData[accountId] ?? null;
        setAccountData(account);
        setTransactions(account?.transactions ?? []);
        setLoadingAccount(false);
    }, [params]);

    // -------------------
    // Handlers
    // -------------------
    const toggleExpand = (id: string) => setExpandedId(prev => (prev === id ? null : id));
    const updateCategory = (id: string, newCategory: string) =>
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, category: newCategory } : t));
    const updateNotes = (id: string, newNotes: string) =>
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, notes: newNotes } : t));

    // -------------------
    // Loading
    // -------------------
    if (loadingUser || loadingAccount) {
        return (
            <>
                <Nav isAuthenticated={!!user} username={user?.firstName || ""} />
                <main className="flex-1 bg-light pb-12">
                    <div className="text-center py-20">
                        <p className="text-dark text-xl">Chargement du compte...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!accountData) {
        return (
            <>
                <Nav isAuthenticated={!!user} username={user?.firstName || ""} />
                <main className="flex-1 bg-light pb-12">
                    <div className="text-center py-20">
                        <p className="text-dark text-xl">Compte introuvable</p>
                        <p className="text-red-500 mt-2">Vérifiez l'URL ou accountId</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // -------------------
    // Main render
    // -------------------
    return (
        <>
            <Nav isAuthenticated={!!user} username={user!.firstName} />
            <main className="flex-1 bg-gray-300 pb-12">
                <div className="bg-white border border-gray-300 py-8 text-center mb-8">
                    <h2 className="text-base font-normal text-dark mb-2">{accountData.title}</h2>
                    <p className="text-5xl font-bold text-dark mb-2">{accountData.amount}</p>
                    <p className="text-base text-dark">{accountData.description}</p>
                </div>

                <div className="mx-auto" style={{ width: "90%" }}>
                    <div className="grid grid-cols-[80px_1fr_1fr_150px_150px] gap-4 px-6 py-3 bg-light border-b-2 border-gray-400 font-bold text-dark">
                        <div></div>
                        <div>DATE</div>
                        <div>DESCRIPTION</div>
                        <div className="text-right">AMOUNT</div>
                        <div className="text-right">BALANCE</div>
                    </div>

                    {transactions.map(t => (
                        <div key={t.id} className="bg-white border-b border-gray-300">
                            <div className="grid grid-cols-[80px_1fr_1fr_150px_150px] gap-4 px-5 py-3 items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleExpand(t.id)}>
                                <div className="flex justify-center">
                                    <svg className={`w-6 h-6 transition-transform ${expandedId === t.id ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>{t.date}</div>
                                <div>{t.description}</div>
                                <div className="text-right">${t.amount.toFixed(2)}</div>
                                <div className="text-right">${t.balance.toFixed(2)}</div>
                            </div>

                            {expandedId === t.id && (
                                <div className="px-6 py-6 bg-gray-50">
                                    <div className="space-y-4">
                                        <div className="flex gap-4"><strong>Transaction Type:</strong> {t.type}</div>
                                        <div className="flex gap-2 items-center">
                                            <strong>Category:</strong>
                                            <select value={t.category} onChange={e => updateCategory(t.id, e.target.value)} className="px-2 py-1 bg-white">
                                                <option value="Food">Food</option>
                                                <option value="Transport">Transport</option>
                                                <option value="Shopping">Shopping</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Other">Other</option>
                                                <option value="Income">Income</option>
                                                <option value="Transfer">Transfer</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <strong>Notes:</strong>
                                            <input value={t.notes} onChange={e => updateNotes(t.id, e.target.value)} placeholder="votre note ici..." className="px-2 py-1 bg-white" />
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
