
"use client";

import { useRouter } from "next/navigation";

/**
 * Interface des props du composant Account
 * Définit les données attendues pour afficher un compte
 */
interface AccountProps {
    title: string;
    amount: string;
    description: string;
    accountId: string;
}

/**
 * Composant d’affichage d’un compte bancaire
 */
export default function Account({ title, amount, description, accountId }: AccountProps) {
    const router = useRouter();

    /**
    * Redirige l’utilisateur vers la page des transactions
    * du compte sélectionné
    */
    const handleViewTransactions = () => {
        // Extraire juste le numéro du compte (ex: "x8349" -> "8349")
        const numericId = accountId.replace('x', '');

        // Redirection vers la page transactions du compte
        router.push(`/transactions/${numericId}`);
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
                    className="block w-full lg:w-[200px] px-3 py-3 text-base font-bold mt-4 border bg-green-600 text-white rounded">
                    View transactions
                </button>
            </div>
        </section>
    );
}