import { useEffect, useState } from "react";
import StarBackground from "./components/StarBackground";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import PasteMessagePage from "./pages/PasteMessagePage";
import SettingsPage from "./pages/SettingsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import { useAppearance } from "./hooks/useAppearance";
import type { InputOption, NavTab, Page } from "./types";
import UploadPage from "./pages/UploadPage";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const appearance = useAppearance(); 

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const handleOption = (id: InputOption["id"]): void => {
    if (id === "paste") setPage("paste");
    if (id === "upload") setPage("upload");
  };

  
  const isHomeFlow = page === "paste" || page === "upload";
  const activeTab: NavTab = isHomeFlow ? "home" : (page as NavTab);

  const goHome = (): void => setPage("home");

  return (
    <div className="min-h-screen">
      <StarBackground />
      <TopNav active={activeTab} onSelect={setPage} />

      <div className="mx-auto w-full max-w-7xl">
        {page === "home" && <HomePage onSelectOption={handleOption} />}
        {page === "paste" && <PasteMessagePage onBack={goHome} />}
        {page === "upload" && <UploadPage onBack={goHome} />}
        {page === "history" && <ComingSoonPage title="History" />}
        {page === "learn" && <ComingSoonPage title="Learn" />}
        {page === "settings" && <SettingsPage appearance={appearance} />}
      </div>

      <BottomNav active={activeTab} onSelect={setPage} />
    </div>
  );
}