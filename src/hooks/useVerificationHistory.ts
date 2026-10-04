import { useEffect, useState } from "react";
import { apiClient, getApiErrorMessage } from "../api/client";
import type { HistoryItem, RiskLevel } from "../types";

interface HistoryPayload {
  verifications: unknown[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toHistoryItem(value: unknown): HistoryItem | null {
  if (!isRecord(value) || !isRecord(value.input) || typeof value.createdAt !== "string") return null;
  const id = typeof value._id === "string" ? value._id : typeof value.id === "string" ? value.id : null;
  if (!id) return null;

  const content = isRecord(value.content) ? value.content : {};
  const result = isRecord(value.result) ? value.result : {};
  const text = typeof content.extracted_text === "string"
    ? content.extracted_text
    : typeof content.raw_text === "string"
      ? content.raw_text
      : typeof result.explanation === "string"
        ? result.explanation
        : "Verification";
  const valueRisk = result.risk_level;
  const risk: RiskLevel = valueRisk === "high" || valueRisk === "medium" || valueRisk === "low" || valueRisk === "none" ? valueRisk : "low";

  return {
    id,
    title: text.trim().slice(0, 60) || "Verification",
    type: value.input.type === "image" ? "image" : "text",
    risk,
    createdAt: value.createdAt,
    status: value.status === "pending" || value.status === "processing" || value.status === "completed" || value.status === "failed"
      ? value.status
      : undefined,
  };
}

export function useVerificationHistory(token: string, enabled: boolean) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    setIsLoading(true);
    setError(null);

    apiClient.get<HistoryPayload>("/api/verification?page=1&limit=20", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (!active || !Array.isArray(response.data.verifications)) return;
      setItems(response.data.verifications.map(toHistoryItem).filter((item): item is HistoryItem => item !== null));
    }).catch((requestError: unknown) => {
      if (active) setError(getApiErrorMessage(requestError));
    }).finally(() => {
      if (active) setIsLoading(false);
    });

    return () => { active = false; };
  }, [token, enabled, reloadKey]);

  return { items, isLoading, error, retry: () => setReloadKey((value) => value + 1) };
}
