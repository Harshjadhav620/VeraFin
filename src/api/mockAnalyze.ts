import type { AnalysisResult, HistoryType, RiskIndicator, RiskLevel } from "../types";

interface Rule {
  id: string;
  title: string;
  detail: string;
  severity: RiskLevel;
  test: RegExp;
}

const RULES: Rule[] = [
  { id: "returns", title: "Guaranteed returns", detail: "Promises fixed or assured profit. No legitimate investment can do that.", severity: "high", test: /guarantee|assured|fixed return|risk[- ]?free|\d+\s?%\s*(returns?|profit)/i },
  { id: "urgency", title: "Urgency / time pressure", detail: "Pushes you to act immediately, without time to check.", severity: "high", test: /urgent|immediately|today only|limited (time|slots?)|hurry|last chance|invest now|act now/i },
  { id: "payment", title: "Payment request", detail: "Asks you to pay or transfer money.", severity: "high", test: /pay\b|payment|fee|transfer|deposit|₹\s?\d|\brs\.?\s?\d/i },
  { id: "sensitive", title: "Sensitive information request", detail: "Asks for OTP, PIN, password or card details.", severity: "high", test: /\botp\b|\bpin\b|password|cvv|card number|aadhaar/i },
  { id: "authority", title: "Authority claim", detail: "Uses the name of SEBI, RBI or the government to look trustworthy. Verify it on the official website.", severity: "medium", test: /sebi|rbi|\bnse\b|\bbse\b|government|ministry/i },
  { id: "contact", title: "External link or phone number", detail: "Asks you to click, call or message an outside contact.", severity: "medium", test: /https?:\/\/|www\.|\+?\d[\d\s-]{8,}|whatsapp|telegram|click (here|the link)/i },
];

const POINTS: Record<RiskLevel, number> = { high: 2, medium: 1, low: 0, none: 0 };

const SUMMARY: Record<RiskLevel, string> = {
  high: "This message shows multiple signs of a potential financial scam.",
  medium: "This message has some warning signs. Verify it before you act.",
  low: "We did not find major scam signs, but always verify with official sources.",
  none: "No risk signals were identified. This does not verify every claim in the message.",
};

const ADVICE: string[] = [
  "Do not send money or share your OTP, PIN or card details.",
  "Verify the organisation and the claim on official sources like SEBI or RBI.",
  "Do not click links or call numbers given in the message.",
  "If you already paid, call 1930 or report at cybercrime.gov.in.",
];

// TODO: real OCR will come from the backend. This is placeholder text.
const SAMPLE_OCR_TEXT =
  "SEBI approved investment scheme. Get guaranteed 40% returns in 6 months. Invest now! Limited time only. Contact: +91 98765 43210";

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function build(text: string, source: HistoryType, title: string): AnalysisResult {
  const hits = RULES.filter((r) => r.test.test(text));
  const score = hits.reduce((sum, r) => sum + POINTS[r.severity], 0);
  const risk: RiskLevel = score >= 4 ? "high" : score >= 2 ? "medium" : "low";

  const indicators: RiskIndicator[] = hits.map((h) => ({
    id: h.id,
    title: h.title,
    detail: h.detail,
    severity: h.severity,
  }));

  const claimRules = RULES.filter((r) => ["returns", "urgency", "payment", "authority"].includes(r.id));
  const claims = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8 && claimRules.some((r) => r.test.test(s)))
    .slice(0, 3);

  return {
    id: Date.now(),
    title,
    source,
    risk,
    summary: SUMMARY[risk],
    indicators,
    claims,
    extractedText: text,
    advice: ADVICE,
    createdAt: new Date().toISOString(),
  };
}

export async function analyzeText(text: string): Promise<AnalysisResult> {
  await delay(900);
  const clean = text.trim();
  const title = clean.length > 40 ? `${clean.slice(0, 40)}…` : clean;
  return build(clean, "text", title);
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  await delay(1200);
  return build(SAMPLE_OCR_TEXT, "image", file.name);
}
