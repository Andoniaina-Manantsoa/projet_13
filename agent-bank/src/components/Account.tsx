
"use client";

import { useRouter } from "next/navigation";

interface AccountProps {
    id: string;
    title: string;
    amount: string;
    description: string;
    accountId?: string;
}

export default function Account({ title, amount, description, accountId }: AccountProps) {
    const router = useRouter();

    const handleViewTransactions = () => {
        router.push(`/transactions/${accountId}`);
    };

    return (
        <section className="flex flex-col lg:flex-row justify-between items-center border border-gray-300 bg-white w-4/5 mx-auto p-6 box-border text-left mb-8">
            <div className="w-full flex-1">
                <h3 className="m-0 p-0 text-base font-normal">{title}</h3>
                <p className="m-0 text-[2.5rem] font-bold">{amount}</p>
                <p className="m-0">{description}</p>
            </div>
            <div className="w-full lg:w-auto lg:flex-none">
                <button
                    onClick={handleViewTransactions}
                    className="block w-full lg:w-[200px] px-2 py-2 text-base font-bold mt-4 border bg-purple-600 text-white rounded">
                    View transactions
                </button>
            </div>
        </section>
    );
}