import type { Metadata } from "next";
import "../../styles/globals.css";
import ReduxProvider from "../components/ReduxProvider";
import '@fortawesome/fontawesome-free/css/all.min.css';
import AuthInitializer from "../components/AuthInitializer";

//  Métadonnées de l’application
export const metadata: Metadata = {
    title: "Argent Bank", 
    description: "Your trusted banking partner",
};

// -------------------
// Layout racine de l’application
// -------------------
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                />
            </head>
            <body className="flex flex-col min-h-screen m-0 text-center text-text">
                <ReduxProvider>
                    {/* 🔑 Réhydratation Redux */}
                    <AuthInitializer />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}