import type { HistoryItem } from "../types";
import { RISK_LABEL } from "../data/content";
import { RISK_STYLE } from "../data/risk";
import { formatTime } from "../utils/date";

interface Props {
  item: HistoryItem;
  onDelete?: (id: HistoryItem["id"]) => void;
}

export default function HistoryItemCard({ item, onDelete }: Props) {
  return (
    <div
      className="flex items-center gap-3.5 rounded-2xl border border-line bg-card/60 p-3.5 backdrop-blur-sm
                 transition duration-300 hover:border-brand hover:shadow-[0_0_24px_-6px_rgba(79,140,255,0.5)]"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-xl">
        {item.type === "image" ? "🖼️" : "📝"}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item.title}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${RISK_STYLE[item.risk]}`}>
            {RISK_LABEL[item.risk]}
          </span>
          <span className="text-xs text-muted">{formatTime(item.createdAt)}</span>
        </div>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.title}`}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition duration-200 hover:bg-red-500/10 hover:text-red-400 active:scale-90"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
