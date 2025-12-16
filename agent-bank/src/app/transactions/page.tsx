"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    balance: number;
    type: string;
    category: string;
    notes: string;
};

const mockTransactions: Transaction[] = [
    {
        id: "1",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 5.00,
        balance: 2082.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "2",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 10.00,
        balance: 2087.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "3",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 20.00,
        balance: 2097.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "4",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 30.00,
        balance: 2117.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "5",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 40.00,
        balance: 2147.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    },
    {
        id: "6",
        date: "June 20th, 2020",
        description: "Golden Sun Bakery",
        amount: 50.00,
        balance: 2187.79,
        type: "Electronic",
        category: "Food",
        notes: ""
    }
];

export default function TransactionsPage() {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [transactions, setTransactions] = useState(mockTransactions);

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

            <main className="flex-1 bg-light pb-12">
                {/* Account Header */}
                <div className="bg-white border border-gray-300 py-8 text-center mb-8">
                    <h2 className="text-base font-normal text-dark mb-2">
                        Argent Bank Checking (x8349)
                    </h2>
                    <p className="text-5xl font-bold text-dark mb-2">$2,082.79</p>
                    <p className="text-base text-dark">Available Balance</p>
                </div>

                {/* Transactions Table */}
                <div className="mx-auto" style={{ width: '90%' }}>
                    {/* Table Header */}
                    <div className="grid grid-cols-[80px_1fr_1fr_150px_150px] gap-4 px-6 py-3 bg-light border-b-2 border-gray-400 font-bold text-dark">
                        <div></div>
                        <div>DATE</div>
                        <div>DESCRIPTION</div>
                        <div className="text-right">AMOUNT</div>
                        <div className="text-right">BALANCE</div>
                    </div>

                    {/* Transaction Rows */}
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="bg-white border-b border-gray-300">
                            {/* Main Row */}
                            <div
                                className="grid grid-cols-[80px_1fr_1fr_150px_150px] gap-4 px-6 py-4 items-center cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleExpand(transaction.id)}
                            >
                                <div className="flex justify-center">
                                    <svg
                                        className={`w-6 h-6 transition-transform ${expandedId === transaction.id ? 'rotate-180' : ''}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="text-dark">{transaction.date}</div>
                                <div className="text-dark">{transaction.description}</div>
                                <div className="text-dark text-right">${transaction.amount.toFixed(2)}</div>
                                <div className="text-dark text-right">${transaction.balance.toFixed(2)}</div>
                            </div>

                            {/* Expanded Details */}
                            {expandedId === transaction.id && (
                                <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
                                    <div className="max-w-2xl space-y-4">
                                        <div className="flex text-dark">
                                            <span className="font-semibold">Transaction Type:</span> {transaction.type}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-dark">Category:</span>
                                            <select
                                                value={transaction.category}
                                                onChange={(e) => updateCategory(transaction.id, e.target.value)}
                                                className="border border-gray-300 px-3 py-1 rounded bg-white"
                                            >
                                                <option value="Food">Food</option>
                                                <option value="Transport">Transport</option>
                                                <option value="Shopping">Shopping</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-dark">Notes:</span>
                                            <input
                                                type="text"
                                                value={transaction.notes}
                                                onChange={(e) => updateNotes(transaction.id, e.target.value)}
                                                placeholder="Add notes..."
                                                className="border border-gray-300 px-3 py-1 rounded flex-1 bg-white"
                                            />
                                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
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