import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
    title: "Argent Bank",
    description: "Your trusted banking partner",
};

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
                {children}
            </body>
        </html>
    );
}