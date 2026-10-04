import { useEffect, useState } from "react";
import StarBackground from "./components/StarBackground";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import PasteMessagePage from "./pages/PasteMessagePage";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import { useAppearance } from "./hooks/useAppearance";
import { usePersistedState } from "./hooks/usePersistedState";
import { SAMPLE_HISTORY } from "./data/content";
import type { AnalysisResult, HistoryItem, InputOption, NavTab, Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = usePersistedState<HistoryItem[]>("vf-history", SAMPLE_HISTORY);
  const appearance = useAppearance();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const handleOption = (id: InputOption["id"]): void => {
    if (id === "paste") setPage("paste");
    if (id === "upload") setPage("upload");
  };

  // a finished check: remember it, save it to History, open the result page
  const handleAnalyzed = (r: AnalysisResult): void => {
    setResult(r);
    setHistory([{ id: r.id, title: r.title, type: r.source, risk: r.risk, createdAt: r.createdAt }, ...history]);
    setPage("result");
  };

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
        {page === "paste" && <PasteMessagePage onBack={goHome} onAnalyzed={handleAnalyzed} />}
        {page === "upload" && <UploadPage onBack={goHome} onAnalyzed={handleAnalyzed} />}
        {page === "result" && result && (
          <ResultPage result={result} onBack={goHome} onViewHistory={() => setPage("history")} />
        )}
        {page === "history" && <HistoryPage items={history} setItems={setHistory} onGoHome={goHome} />}
        {page === "learn" && <ComingSoonPage title="Learn" />}
        {page === "settings" && <SettingsPage appearance={appearance} />}
      </div>

      <BottomNav active={activeTab} onSelect={setPage} />
    </div>
  );
}