import type { RiskLevel } from "../types";

interface Props {
  risk: RiskLevel;
  summary: string;
}

const CONFIG: Record<RiskLevel, { icon: string; title: string; box: string; accent: string }> = {
  high: { icon: "🚨", title: "High Risk", box: "border-red-500/30 bg-red-500/10", accent: "text-red-400" },
  medium: { icon: "⚠️", title: "Medium Risk", box: "border-amber-500/30 bg-amber-500/10", accent: "text-amber-400" },
  low: { icon: "✅", title: "Low Risk", box: "border-green-500/30 bg-green-500/10", accent: "text-green-400" },
};

export default function RiskBanner({ risk, summary }: Props) {
  const c = CONFIG[risk];
  return (
    <div className={`flex items-center gap-4 rounded-3xl border p-5 backdrop-blur-md ${c.box}`}>
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-card/70 text-3xl">{c.icon}</span>
      <div>
        <h2 className={`text-2xl font-extrabold ${c.accent}`}>{c.title}</h2>
        <p className="mt-0.5 text-sm text-muted">{summary}</p>
      </div>
    </div>
  );
}