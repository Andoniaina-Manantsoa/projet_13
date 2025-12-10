import Link from "next/link";
import Image from "next/image";

interface NavProps {
    isAuthenticated?: boolean;
    username?: string;
}

export default function Nav({ isAuthenticated = false, username }: NavProps) {
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
                        <Link
                            href="/"
                            className="font-bold text-text no-underline mr-2 hover:underline"
                        >
                            <i className="fa fa-sign-out"></i> Sign Out
                        </Link>
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