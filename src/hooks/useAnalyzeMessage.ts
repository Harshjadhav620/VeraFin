import { useState } from "react";
import axios from "axios";
import type { VerificationResponse } from "../types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, "");
const MESSAGE_API_URL = `${API_BASE_URL}/api/verification/run`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isVerificationResponse(value: unknown): value is VerificationResponse {
  if (!isRecord(value)) return false;

  const input = value.input;
  const analysis = value.analysis;
  const riskAssessment = value.riskAssessment;
  const explanation = value.explanation;

  return isRecord(input) && Array.isArray(input.riskSignals) && input.riskSignals.every((signal) =>
    isRecord(signal) && typeof signal.indicator === "string" && typeof signal.evidence === "string" && typeof signal.severity === "string") &&
    isRecord(analysis) && Array.isArray(analysis.assessments) && analysis.assessments.every((assessment) =>
      isRecord(assessment) && typeof assessment.claim === "string" && typeof assessment.status === "string" && typeof assessment.explanation === "string") &&
    isRecord(riskAssessment) && typeof riskAssessment.level === "string" &&
    isRecord(explanation) && typeof explanation.summary === "string" &&
    Array.isArray(explanation.recommendedActions) && explanation.recommendedActions.every((action) => typeof action === "string") &&
    (explanation.reasons === undefined || (Array.isArray(explanation.reasons) && explanation.reasons.every((reason) => typeof reason === "string"))) &&
    (explanation.limitations === undefined || (Array.isArray(explanation.limitations) && explanation.limitations.every((limitation) => typeof limitation === "string")));
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseData: unknown = error.response?.data;
    if (typeof responseData === "string" && responseData) return responseData;
    if (responseData !== undefined) return JSON.stringify(responseData);
    return error.message;
  }

  return error instanceof Error ? error.message : "Unable to send the message.";
}

export function useAnalyzeMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMessage = async (text: string): Promise<VerificationResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<unknown>(MESSAGE_API_URL, { message: text.trim() });
      if (!isVerificationResponse(response.data)) {
        throw new Error("The backend returned a verification response in an unexpected format.");
      }
      return response.data;
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { analyzeMessage, isLoading, error };
}
