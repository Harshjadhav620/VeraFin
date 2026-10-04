import { useState } from "react";
import axios from "axios";

const MESSAGE_API_URL = "http://localhost:5000/api/test/message";

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
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeMessage = async (text: string): Promise<void> => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post<unknown>(MESSAGE_API_URL, { message: text.trim() });
      setResult(response.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return { analyzeMessage, isLoading, result, error };
}
