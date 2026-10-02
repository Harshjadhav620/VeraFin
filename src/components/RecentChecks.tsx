import type { RecentCheck, RiskLevel } from "../types";
import { RISK_LABEL } from "../data/content";

interface Props {
  items: RecentCheck[];
}

const RISK_STYLE: Record<RiskLevel, string> = {
  high: "bg-red-500/15 text-red-400",
  medium: "bg-amber-500/15 text-amber-400",
  low: "bg-green-500/15 text-green-400",
};

export default function RecentChecks({ items }: Props) {
  return (
    <section>
      <div className="mt-6 flex justify-between text-[15px] font-bold">
        Recent Checks
        <a href="#" className="text-xs font-medium text-brand">View All</a>
      </div>
      {items.map((c) => (
        <div
          key={c.id}
          className="mt-2.5 flex items-center justify-between rounded-[14px] border border-line bg-card p-3 text-[13px]"
        >
          <span>{c.title}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${RISK_STYLE[c.risk]}`}>
            {RISK_LABEL[c.risk]}
          </span>
        </div>
      ))}
    </section>
  );
}