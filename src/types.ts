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

export interface VerificationResponse {
  input?: {
    text?: string;
    message?: string;
    claims?: { claim: string; claim_type?: string; subject?: string }[];
    entities?: { name: string; type: string }[];
    links?: { url: string; domain?: string }[];
    riskSignals?: { indicator: string; evidence: string; severity: string }[];
  };
  analysis?: {
    assessments?: {
      claim: string;
      claimType?: string;
      status: string;
      explanation: string;
      evidenceIds?: string[];
    }[];
  };
  retrieval?: {
    mode?: string;
    results?: { queryId: string; outcome: string; source?: string; evidence?: unknown[] }[];
  };
  riskAssessment?: {
    score?: number;
    level?: string;
    factors?: { name: string; description: string; points: number; source?: string }[];
    limitations?: string[];
    interpretation?: string;
  };
  explanation?: {
    summary?: string;
    risk?: { level?: string; score?: number };
    reasons?: string[];
    claims?: { claim: string; status: string; explanation: string; evidenceIds?: string[] }[];
    evidence?: unknown[];
    limitations?: string[];
    recommendedActions?: string[];
    notice?: string;
  };
  [key: string]: unknown;
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
  verification?: VerificationResponse;
}
