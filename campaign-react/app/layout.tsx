
import type { Metadata } from "next";
import "./ui/globals.css";
import Topbar from "./components/Topbar/Topbar";
import AuthModal from "./components/modals/AuthModal";
import JoinModal from "./components/modals/JoinModal";

export const metadata: Metadata = {
    title: "Campaign Tracker",
    description: "Web app to help D&D players track items for their party.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Topbar />
                {children}
                <AuthModal />
                <JoinModal />
            </body>
        </html>
    );
}
