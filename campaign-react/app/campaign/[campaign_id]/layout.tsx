import Sidebar from "@/app/components/Sidebar/Sidebar"
import CampaignTitle from "@/app/components/CampaignTitle"

export default function CampaignRootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div>
            <Sidebar />
            <CampaignTitle />
            {children}
        </div>
    )
  }