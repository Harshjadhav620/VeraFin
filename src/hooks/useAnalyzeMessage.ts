import { useState } from "react";
import { apiClient, getApiErrorMessage } from "../api/client";
import type { SubmissionResponse } from "../types";

function getSubmission(data: unknown): SubmissionResponse {
  if (typeof data !== "object" || data === null || !("verification" in data)) {
    throw new Error("The backend did not return a verification ID.");
  }

  const verification = data.verification;
  if (typeof verification !== "object" || verification === null || !("id" in verification) || typeof verification.id !== "string") {
    throw new Error("The backend returned an invalid verification ID.");
  }

  return data as SubmissionResponse;
}

export function useAnalyzeMessage(token: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (request: Promise<{ data: unknown }>): Promise<SubmissionResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await request;
      return getSubmission(response.data);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const submitMessage = (text: string, source: string): Promise<SubmissionResponse | null> =>
    submit(apiClient.post("/api/verification/submit", {
      language: "en",
      source,
      raw_text: text.trim(),
    }, { headers: { Authorization: `Bearer ${token}` } }));

  const submitImage = (image: File, source: string): Promise<SubmissionResponse | null> => {
    const form = new FormData();
    form.append("source", source);
    form.append("language", "en");
    form.append("image", image);

    return submit(apiClient.post("/api/verification/submit", form, {
      headers: { Authorization: `Bearer ${token}` },
    }));
  };

  return { submitMessage, submitImage, isLoading, error };
}
