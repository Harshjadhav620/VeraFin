import type { RiskLevel } from "../types";

export const RISK_STYLE: Record<RiskLevel, string> = {
  high: "bg-red-500/15 text-red-400",
  medium: "bg-amber-500/15 text-amber-400",
  low: "bg-green-500/15 text-green-400",
  none: "bg-green-500/15 text-green-400",
};
