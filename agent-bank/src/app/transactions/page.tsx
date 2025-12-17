"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { accountsData } from "../../data/mockTransactions";

export default function TransactionsRedirect() {
    const router = useRouter();

    useEffect(() => {
        const firstAccountId = Object.keys(accountsData)[0];
        if (firstAccountId) {
            console.log("Redirecting to first account:", firstAccountId);
            router.replace(`/transactions/${firstAccountId}`);
        } else {
            console.log("No accounts available to redirect");
        }
    }, [router]);

    return null;
}
