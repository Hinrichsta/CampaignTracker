
import type { Metadata } from "next";
import "./ui/globals.css";
import Topbar from "./components/Topbar/Topbar";
import { cookies } from "next/headers";
import AuthModal from "./components/modals/AuthModal";
import JoinModal from "./components/modals/JoinModal";
import CreateCampaignModal from "./components/modals/CreateCampaignModal";
import React from "react";

export const metadata: Metadata = {
    title: "Campaign Tracker",
    description: "Web app to help D&D players track items for their party.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="flex min-h-screen flex-col grow-0 p-3">
                    <Topbar />
                    <AuthModal />
                    <JoinModal />
                    <CreateCampaignModal />
                    {children}
                </div>
            </body>
        </html>
    );
}
