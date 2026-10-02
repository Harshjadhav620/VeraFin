export type Page = NavTab | "paste";
export type NavTab = "home" | "history" | "learn" | "settings";
export type RiskLevel = "high" | "medium" | "low";

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