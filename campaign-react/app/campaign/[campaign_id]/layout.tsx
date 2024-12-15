import Sidebar from "@/app/components/Sidebar/Sidebar"

export default function CampaignRootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    )
  }