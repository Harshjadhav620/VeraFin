import type { AnalysisResult, BackendVerificationRecord, RiskLevel } from "../types";

function toRiskLevel(value: string): RiskLevel {
  return value === "high" || value === "medium" || value === "low" ? value : "low";
}

export function toAnalysisResult(verification: BackendVerificationRecord): AnalysisResult {
  const backendResult = verification.result;
  const extractedText = verification.content?.raw_text ?? verification.content?.extracted_text ?? "";
  const title = verification.content?.image_metadata?.originalName ?? (extractedText.trim().slice(0, 40) || "Verification");

  return {
    id: Date.now(),
    title: title.length < extractedText.trim().length ? `${title}…` : title,
    source: verification.input.type === "image" ? "image" : "text",
    risk: toRiskLevel(backendResult?.risk_level ?? "none"),
    summary: backendResult?.explanation ?? "The verification completed without an explanation.",
    indicators: (backendResult?.risk_indicators ?? []).map((indicator, index) => ({
      id: `${index}-${indicator.indicator}`,
      title: indicator.indicator,
      detail: indicator.evidence,
      severity: toRiskLevel(indicator.severity),
    })),
    claims: (backendResult?.claims ?? []).map((claim) => claim.claim),
    extractedText,
    advice: backendResult?.recommendation ? [backendResult.recommendation] : [],
    createdAt: verification.createdAt,
    backendResult,
  };
}
