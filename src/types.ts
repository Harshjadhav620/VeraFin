export type NavTab = "home" | "history" | "learn" | "settings";
export type Page = NavTab | "paste" | "upload"| "result";
export type RiskLevel = "high" | "medium" | "low";
export type HistoryType = "text" | "image";

export interface InputOption {
  id: "upload" | "paste" | "voice";
  title: string;
  description: string;
  color: string;
  icon: string;
}

export interface RecentCheck {
  id: number;
  title: string;
  risk: RiskLevel;
}

export interface NewsItem {
  source: string;
  text: string;
}

export interface HistoryItem {
  id: number;
  title: string;
  type: HistoryType;
  risk: RiskLevel;
  createdAt: string; // ISO date string
}

export interface RiskIndicator {
  id: string;
  title: string;
  detail: string;
  severity: RiskLevel;
}

export interface AnalysisResult {
  id: number;
  title: string;
  source: HistoryType; // "text" | "image"
  risk: RiskLevel;
  summary: string;
  indicators: RiskIndicator[];
  claims: string[];
  extractedText: string;
  advice: string[];
  createdAt: string; // ISO date string
}