
import type { Metadata } from "next";
import "./ui/globals.css";
import Link from "next/link";
import UserButton from "./components/Topbar/UserButton";
import AuthModal from "./components/modals/AuthModal";

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
            <div className="flex min-h-screen flex-col grow-0 p-3">
                <div className="flex h-24 shrink-0 items-center justify-items-center rounded-lg bg-blue-900 p-4">
                    <div className="flex grow order-1 justify-between space">
                        <Link href="/home">
                            <h1 className="text-5xl object-left">Campaign Tracker</h1>
                        </Link>
                    </div>
                    <UserButton />
                    
                </div>
                <AuthModal />
                {children}
            </div>
      </body>
    </html>
  );
}
