import type { AnalysisResult, RiskLevel, VerificationResponse } from "../types";

function toRiskLevel(value: string | undefined): RiskLevel {
  return value === "high" || value === "medium" || value === "low" ? value : "medium";
}

export function toAnalysisResult(response: VerificationResponse, submittedText: string): AnalysisResult {
  const claims = response.analysis?.assessments ?? response.explanation?.claims ?? [];
  const riskSignals = response.input?.riskSignals ?? [];
  const title = submittedText.trim().slice(0, 40);

  return {
    id: Date.now(),
    title: title.length < submittedText.trim().length ? `${title}…` : title,
    source: "text",
    risk: toRiskLevel(response.riskAssessment?.level ?? response.explanation?.risk?.level),
    summary: response.explanation?.summary ?? "The backend returned a verification result without a summary.",
    indicators: riskSignals.map((signal, index) => ({
      id: `${index}-${signal.indicator}`,
      title: signal.indicator,
      detail: signal.evidence,
      severity: toRiskLevel(signal.severity),
    })),
    claims: claims.map((claim) => claim.claim),
    extractedText: submittedText,
    advice: response.explanation?.recommendedActions ?? [],
    createdAt: new Date().toISOString(),
    verification: response,
  };
}
