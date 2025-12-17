"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransactionsRedirect() {
    const router = useRouter();

    useEffect(() => {
        // compte par défaut
        router.replace("/transactions/${accountId}");
    }, [router]);

    return null;
}
