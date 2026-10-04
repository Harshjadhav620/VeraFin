import { useEffect, useState } from "react";
import StarBackground from "./components/StarBackground";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import PasteMessagePage from "./pages/PasteMessagePage";
import UploadPage from "./pages/UploadPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import VerificationStatusPage from "./pages/VerificationStatusPage";
import { useAppearance } from "./hooks/useAppearance";
import { useVerificationHistory } from "./hooks/useVerificationHistory";
import type { InputOption, NavTab, Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [token, setToken] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [messageDraft, setMessageDraft] = useState("");
  const appearance = useAppearance();
  const history = useVerificationHistory(token ?? "", Boolean(token) && page === "history");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const handleOption = (id: InputOption["id"]): void => {
    if (id === "paste") setPage("paste");
    if (id === "upload") setPage("upload");
  };

  const handleSubmitted = (id: string): void => {
    setVerificationId(id);
    setPage("result");
  };

  if (!token) {
    return <AuthPage onAuthenticated={setToken} />;
  }

  // Paste, Upload and Result belong to Home, so Home stays highlighted
  const isHomeFlow = page === "paste" || page === "upload" || page === "result";
  const activeTab: NavTab = isHomeFlow ? "home" : (page as NavTab);

  const goHome = (): void => setPage("home");

  return (
    <div className="min-h-screen">
      <StarBackground />
      <TopNav active={activeTab} onSelect={setPage} />

      <div className="mx-auto w-full max-w-7xl">
        {page === "home" && <HomePage onSelectOption={handleOption} onViewAll={() => setPage("history")} />}
        {page === "paste" && <PasteMessagePage token={token} initialText={messageDraft} onTextChange={setMessageDraft} onBack={goHome} onSubmitted={handleSubmitted} />}
        {page === "upload" && <UploadPage token={token} onBack={goHome} onSubmitted={handleSubmitted} />}
        {page === "result" && verificationId && (
          <VerificationStatusPage verificationId={verificationId} token={token} onBack={goHome} onRetrySubmission={() => setPage("paste")} onViewHistory={() => setPage("history")} />
        )}
        {page === "history" && <HistoryPage items={history.items} onGoHome={goHome} readOnly loading={history.isLoading} error={history.error} onRetry={history.retry} />}
        {page === "settings" && <SettingsPage appearance={appearance} token={token} onLogout={() => { setToken(null); setPage("home"); }} />}
      </div>

      <BottomNav active={activeTab} onSelect={setPage} />
    </div>
  );
}
