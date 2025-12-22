"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

/**
 * Composant de navigation principal
 */
export default function Nav() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Récupération de l'état global via Redux
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { firstName } = useSelector((state: RootState) => state.user);

    /**
    * Déconnexion de l’utilisateur
    */
    const handleLogout = () => {
        // Dispatch l'action de logout Redux
        dispatch(logout());

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
                            <i className="fa fa-user-circle"></i> {firstName}
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
