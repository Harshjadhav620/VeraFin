export type NavTab = "home" | "history" | "learn" | "settings";
export type Page = NavTab | "paste" | "upload";
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