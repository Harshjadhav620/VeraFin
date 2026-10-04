import { useEffect, useState } from "react";
import { apiClient, getApiErrorMessage } from "../api/client";
import type { BackendVerificationRecord, BackendVerificationResult, VerificationStatus } from "../types";

const ACTIVE_STATUSES: VerificationStatus[] = ["pending", "processing"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBackendResult(value: unknown): value is BackendVerificationResult {
  if (!isRecord(value)) return false;
  return typeof value.overall_status === "string" && typeof value.risk_level === "string" &&
    typeof value.explanation === "string" && typeof value.recommendation === "string" &&
    Array.isArray(value.evidence) && value.evidence.every((item) => typeof item === "string") &&
    Array.isArray(value.warnings) && value.warnings.every((item) => typeof item === "string") &&
    Array.isArray(value.claims) && value.claims.every((claim) => isRecord(claim) && typeof claim.claim === "string" &&
      (claim.claim_type === undefined || typeof claim.claim_type === "string")) &&
    Array.isArray(value.risk_indicators) && value.risk_indicators.every((indicator) =>
      isRecord(indicator) && typeof indicator.indicator === "string" && typeof indicator.evidence === "string" && typeof indicator.severity === "string") &&
    (value.sources === undefined || (Array.isArray(value.sources) && value.sources.every((source) =>
      isRecord(source) && typeof source.name === "string" && typeof source.status === "string" &&
      (source.url === undefined || typeof source.url === "string") && (source.detail === undefined || typeof source.detail === "string"))));
}

function isVerificationRecord(value: unknown): value is BackendVerificationRecord {
  if (!isRecord(value) || !isRecord(value.input)) return false;
  if (!["text", "image", "voice"].includes(String(value.input.type)) || typeof value.input.language !== "string" || typeof value.input.source !== "string") return false;
  if (typeof value.createdAt !== "string" || typeof value.status !== "string") return false;
  if (!["pending", "processing", "completed", "failed"].includes(value.status)) return false;
  if (value.content !== undefined && !isRecord(value.content)) return false;
  if (isRecord(value.content)) {
    if ((value.content.raw_text !== undefined && typeof value.content.raw_text !== "string") ||
      (value.content.extracted_text !== undefined && typeof value.content.extracted_text !== "string")) return false;
    if (value.content.image_metadata !== undefined && !isRecord(value.content.image_metadata)) return false;
    if (isRecord(value.content.image_metadata) && value.content.image_metadata.originalName !== undefined &&
      typeof value.content.image_metadata.originalName !== "string") return false;
  }
  if (value.status === "completed" && !isBackendResult(value.result)) return false;
  return true;
}

export function useVerificationPolling(id: string, token: string) {
  const [verification, setVerification] = useState<BackendVerificationRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let stopped = false;
    let timer: number | undefined;

    const poll = async (): Promise<void> => {
      try {
        const response = await apiClient.get<unknown>(`/api/verification/${encodeURIComponent(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (stopped) return;
        if (!isRecord(response.data) || !isVerificationRecord(response.data.verification)) {
          setError("The backend returned an invalid verification status.");
          return;
        }
        const next = response.data.verification;

        setVerification(next);
        setError(null);
        if (ACTIVE_STATUSES.includes(next.status)) timer = window.setTimeout(() => void poll(), 1500);
      } catch (requestError) {
        if (!stopped) setError(getApiErrorMessage(requestError));
      }
    };

    setVerification(null);
    setError(null);
    void poll();

    return () => {
      stopped = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [id, token, attempt]);

  return { verification, error, retryPolling: () => setAttempt((value) => value + 1) };
}
