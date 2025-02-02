import { PortfolioProfile } from "@/app/admin/components/portfolio/portfolio-profile";
import { CreateSectionModal } from "./components/section/create-section-modal";
import ListSections from "./components/section/list-sections";

export default async function AdminPage() {
  return (
    <div className="w-full flex flex-1 h-full">
      <div className="flex-1 p-6 border-r">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex w-full flex-col gap-4">
            <PortfolioProfile />
            <CreateSectionModal />
            <ListSections />
          </div>
        </div>
      </div>
      {/* <div className="flex-2 py-6 px-8">
        <MobilePreview />
      </div> */}
    </div>
  );
}
