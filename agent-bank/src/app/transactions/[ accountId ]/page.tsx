"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { accountsData, Transaction, AccountInfo } from "../../../data/mockTransactions";
import { fetchUserProfile, UserProfile } from "../../../services/auth";


/* ======================
    Icône SVG Pencil
====================== */
const PencilIcon = ({ className = "" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 ${className}`}
        fill="none"
        viewBox="0 0 25 25"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536M9 11l6.232-6.232a2.5 2.5 0 013.536 3.536L12.536 14.536a2.5 2.5 0 01-1.768.732H9v-1.768a2.5 2.5 0 01.732-1.768z"
        />
    </svg>
);

// Fonction pour récupérer le profil utilisateur à partir du token
/**
 * Page des transactions pour un compte spécifique
 * URL exemple : /user/accounts/[accountId]
 */
export default function TransactionsPage() {
    // Router Next.js pour les redirections
    const router = useRouter();

    // Récupération des paramètres dynamiques (accountId)
    const params = useParams();

    // États utilisateur et compte
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [accountData, setAccountData] = useState<AccountInfo | null>(null);
    const [loadingAccount, setLoadingAccount] = useState(true);

    // Etats des transactions
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // États d’édition
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingNotesId, setEditingNotesId] = useState<string | null>(null);

    // -------------------
    // Récupération du profil utilisateur
    // -------------------
    useEffect(() => {
        // Récupération du token stocké
        const token = localStorage.getItem("token");

        // Si aucun token → redirection vers la page de login
        if (!token) {
            router.push("/sign-in");
            return;
        }

        // Appel API pour récupérer le profil utilisateur
        fetchUserProfile(token)
            .then((data) => {
                setUser(data); // Stockage du profil
                setLoadingUser(false); // Fin du chargement
            })
            .catch(() => {
                // Token invalide → nettoyage + redirection
                localStorage.removeItem("token");
                router.push("/sign-in");
            });
    }, [router]);

    // -------------------
    // Chargement du compte via accountId
    // -------------------
    useEffect(() => {
        // Récupère dynamiquement la clé du paramètre (gestion des espaces)
        const key = Object.keys(params)[0];

        // Nettoyage de la valeur (trim pour éviter les espaces)
        const accountId = (params[key] as string)?.trim();

        // Recherche du compte dans les données mock
        const account = accountsData[accountId] ?? null;

        // Mise à jour des états
        setAccountData(account);
        setTransactions(account?.transactions ?? []);
        setLoadingAccount(false);
    }, [params]);

    // -------------------
    // Handlers (interactions utilisateur)
    // -------------------

    // Ouvre / ferme les détails d’une transaction
    const toggleExpand = (id: string) => setExpandedId(prev => (prev === id ? null : id));

    // Mise à jour de la catégorie d’une transaction
    const updateCategory = (id: string, newCategory: string) =>
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, category: newCategory } : t));

    // Mise à jour des notes d’une transaction
    const updateNotes = (id: string, newNotes: string) =>
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, notes: newNotes } : t));

    // -------------------
    // États de chargement
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

    // -------------------
    // Compte introuvable
    // -------------------
    if (!accountData) {
        return (
            <>
                <Nav isAuthenticated={!!user} username={user?.firstName || ""} />
                <main className="flex-1 bg-light pb-12 text-center py-20">
                    Compte introuvable
                </main>
                <Footer />
            </>
        );
    }

    // -------------------
    // Rendu principal
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
                                <div className="px-6 py-6 bg-gray-50 space-y-4">
                                    <div className="flex gap-4">
                                        <span>Transaction Type:</span>
                                        {t.type}
                                    </div>

                                    {/* Category */}
                                    <div className="flex gap-2 items-center">
                                        <span>Category:</span>

                                        {editingCategoryId === t.id ? (
                                            <select
                                                value={t.category}
                                                onChange={(e) =>
                                                    updateCategory(t.id, e.target.value)
                                                }
                                                onBlur={() => setEditingCategoryId(null)}
                                                autoFocus
                                                className="border px-2 py-1"
                                            >
                                                <option>Food</option>
                                                <option>Transport</option>
                                                <option>Shopping</option>
                                                <option>Entertainment</option>
                                                <option>Other</option>
                                                <option>Income</option>
                                                <option>Transfer</option>
                                            </select>
                                        ) : (
                                            <>
                                                <span>{t.category}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingCategoryId(t.id);
                                                    }}
                                                    className="text-gray-400 hover:text-emerald-600"
                                                >
                                                    <PencilIcon />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div className="flex gap-2 items-center">
                                        <span>Notes:</span>

                                        {editingNotesId === t.id ? (
                                            <input
                                                value={t.notes}
                                                onChange={(e) =>
                                                    updateNotes(t.id, e.target.value)
                                                }
                                                onBlur={() => setEditingNotesId(null)}
                                                autoFocus
                                                className="border px-2 py-1"
                                            />
                                        ) : (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingNotesId(t.id);
                                                    }}
                                                    className="text-gray-400 hover:text-emerald-600"
                                                >
                                                    <PencilIcon />
                                                </button>
                                            </>
                                        )}
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
