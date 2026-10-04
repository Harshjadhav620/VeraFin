import type { HistoryItem, InputOption, NavTab, NewsItem, RecentCheck } from "../types";

export const NAV_TABS: { id: NavTab; icon: string; label: string }[] = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "history", icon: "🕘", label: "History" },
  { id: "learn", icon: "📖", label: "Learn" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export const INPUT_OPTIONS: InputOption[] = [
  { id: "upload", title: "Upload Screenshot", description: "Check images, chats, posts", color: "#2b6be8", icon: "📷" },
  { id: "paste", title: "Paste Message", description: "Type or copy text", color: "#5c5fd6", icon: "📝" },
  ];

export const RECENT_CHECKS: RecentCheck[] = [
  { id: 1, title: "SEBI approved investment scheme", risk: "high" },
  { id: 2, title: "Free stock tips", risk: "medium" },
];

// Replace with real advisories or load from an API.
export const SCAM_NEWS: NewsItem[] = [
  { source: "SEBI Advisory", text: "Deal only with SEBI-registered intermediaries and verify them on the official SEBI website." },
  { source: "Cyber Crime Portal", text: "Report financial fraud at cybercrime.gov.in or call 1930. Quick reporting improves the chance of freezing funds." },
  { source: "Scam Alert", text: "Fake WhatsApp and Telegram 'stock tip' groups impersonating well-known analysts continue to circulate." },
];

export const SCAM_FACTS: string[] = [
  "No legitimate investment can guarantee fixed returns.",
  "Urgency like “invest today, limited slots” is a classic pressure tactic.",
  "SEBI never asks you to send money to a personal account or phone number.",
  "Check any adviser's registration on the official SEBI website before paying.",
];

export const RISK_LABEL = { high: "High Risk", medium: "Medium Risk", low: "Low Risk", none: "No Risk Signals" } as const;

const hoursAgo = (h: number): string => new Date(Date.now() - h * 3_600_000).toISOString();

export const SAMPLE_HISTORY: HistoryItem[] = [
  { id: 1, title: "SEBI approved investment scheme", type: "image", risk: "high", createdAt: hoursAgo(1) },
  { id: 2, title: "Free stock tips", type: "text", risk: "medium", createdAt: hoursAgo(3) },
  { id: 3, title: "Government scheme for farmers", type: "image", risk: "low", createdAt: hoursAgo(27) },
  { id: 4, title: "Work from home investment", type: "text", risk: "high", createdAt: hoursAgo(29) },
  { id: 5, title: "Mutual fund returns", type: "text", risk: "low", createdAt: hoursAgo(75) },
  { id: 6, title: "Crypto investment opportunity", type: "image", risk: "medium", createdAt: hoursAgo(100) },
];
