"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { mockTransactions, Transaction } from "../../../data/mockTransactions";

export default function TransactionsPage() {
    const { accountId } = useParams<{ accountId: string }>();

    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const updateCategory = (id: string, newCategory: string) => {
        setTransactions(transactions.map(t =>
            t.id === id ? { ...t, category: newCategory } : t
        ));
    };

    const updateNotes = (id: string, newNotes: string) => {
        setTransactions(transactions.map(t =>
            t.id === id ? { ...t, notes: newNotes } : t
        ));
    };

    return (
        <>
            <Nav isAuthenticated={true} username="Tony" />

            <main className="flex-1 bg-light pb-12 bg-gray-300">
                {/* Account Header */}
                <div className="bg-white border border-gray-300 py-8 text-center mb-8">
                    <h2 className="text-base font-normal text-dark mb-2">
                        Argent Bank Checking (x{accountId})
                    </h2>
                    <p className="text-3xl font-bold text-dark mb-1">$2,082.79</p>
                    <p className="text-base text-dark">Available Balance</p>
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
                                <div className="flex justify-center font-bold text-gray-500 text-xl">⌄</div>
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
                                                <option>Food</option>
                                                <option>Transport</option>
                                                <option>Shopping</option>
                                                <option>Entertainment</option>
                                                <option>Other</option>
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
