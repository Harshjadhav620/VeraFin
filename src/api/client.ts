import axios from "axios";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, "");

export const apiClient = axios.create({ baseURL: API_BASE_URL });

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseData: unknown = error.response?.data;
    if (typeof responseData === "string" && responseData) return responseData;
    if (typeof responseData === "object" && responseData !== null && "message" in responseData && typeof responseData.message === "string") {
      return responseData.message;
    }
    return error.message;
  }

  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
