"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Interface des props du composant Nav
 */
interface NavProps {
    isAuthenticated?: boolean; // Indique si l’utilisateur est connecté
    username?: string; // Nom de l’utilisateur connecté
}

/**
 * Composant de navigation principal
 */
export default function Nav({
    isAuthenticated = false,
    username,
}: NavProps) {
    const router = useRouter();

    /**
    * Déconnexion de l’utilisateur
    */
    const handleLogout = () => {
        // Supprime le token
        localStorage.removeItem("token");

        // Redirige vers la page de login
        router.push("/sign-in");
    };

    return (
        <nav className="flex justify-between items-center px-5 py-[5px]">
            <Link href="/" className="flex items-center">
                <Image
                    src="/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                    width={200}
                    height={54}
                    className="max-w-full"
                    priority
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            <div>
                {isAuthenticated ? (
                    <>
                        <Link
                            href="/user"
                            className="font-bold text-text no-underline mr-2 hover:underline"
                        >
                            <i className="fa fa-user-circle"></i> {username}
                        </Link>

                        {/* 🔴 LOGOUT */}
                        <button
                            onClick={handleLogout}
                            className="font-bold text-text no-underline mr-2 hover:underline bg-transparent border-none cursor-pointer"
                        >
                            <i className="fa fa-sign-out"></i> Sign Out
                        </button>
                    </>
                ) : (
                    <Link
                        href="/sign-in"
                        className="font-bold text-text no-underline mr-2 hover:underline"
                    >
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
