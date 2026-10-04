export type NavTab = "home" | "history" | "learn" | "settings";
export type Page = NavTab | "paste" | "upload"| "result";
export type RiskLevel = "high" | "medium" | "low" | "none";
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
  id: number | string;
  title: string;
  type: HistoryType;
  risk: RiskLevel;
  createdAt: string; // ISO date string
  status?: VerificationStatus;
}

export interface RiskIndicator {
  id: string;
  title: string;
  detail: string;
  severity: RiskLevel;
}

export type VerificationStatus = "pending" | "processing" | "completed" | "failed";

export interface BackendVerificationResult {
  overall_status: "verified" | "unverified" | "suspicious" | "inconclusive";
  risk_level: "high" | "medium" | "low" | "none";
  risk_score?: number;
  decision?: string;
  verification_status?: string;
  verification_score?: number;
  confidence?: number;
  risk_evidence_found?: boolean;
  trust_evidence_found?: boolean;
  verified_claims?: unknown[];
  unverified_claims?: unknown[];
  contradicted_claims?: unknown[];
  explanation: string;
  evidence: string[];
  warnings: string[];
  recommendation: string;
  sources?: { name: string; url?: string; status: "found" | "not_found" | "unverified"; detail?: string }[];
  claims?: { claim: string; claim_type: string; subject: string }[];
  risk_indicators?: { indicator: string; evidence: string; severity: "high" | "medium" | "low" }[];
  pipeline?: Record<string, unknown>;
}

export interface BackendVerificationRecord {
  _id?: string;
  id?: string;
  input: { type: HistoryType | "voice"; language: string; source: string };
  content?: { raw_text?: string; extracted_text?: string; image_metadata?: { originalName?: string } };
  status: VerificationStatus;
  result?: BackendVerificationResult;
  error?: string;
  createdAt: string;
}

export interface SubmissionResponse {
  message: string;
  verification: { id: string; type: HistoryType | "voice"; status: VerificationStatus; createdAt: string };
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
  backendResult?: BackendVerificationResult;
}
