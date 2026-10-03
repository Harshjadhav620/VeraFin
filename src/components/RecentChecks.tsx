import type { RecentCheck } from "../types";
import { RISK_LABEL } from "../data/content";
import { RISK_STYLE } from "../data/risk";

interface Props {
  items: RecentCheck[];
  onViewAll: () => void;
}

export default function RecentChecks({ items, onViewAll }: Props) {
  return (
    <section>
      <div className="mt-6 flex justify-between text-[15px] font-bold">
        Recent Checks
        <button onClick={onViewAll} className="text-xs font-medium text-brand hover:underline">
          View All
        </button>
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