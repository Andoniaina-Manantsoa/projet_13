"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { accountsData } from "../../data/mockTransactions";

/**
 * Composant de redirection automatique vers
 * le premier compte disponible
 */
export default function TransactionsRedirect() {
    // Initialisation du router Next.js
    const router = useRouter();

    /**
    * Effet exécuté au montage du composant
    */
    useEffect(() => {

        // Récupère l’ID du premier compte disponible
        const firstAccountId = Object.keys(accountsData)[0];
        if (firstAccountId) {

            // Redirection vers la page du premier compte
            router.replace(`/transactions/${firstAccountId}`);
        } 
    }, [router]);
    // Le hook se déclenche une seule fois (router est stable)
    return null;
}
