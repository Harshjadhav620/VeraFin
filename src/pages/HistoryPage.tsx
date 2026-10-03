import { useState } from "react";
import FilterTabs from "../components/FilterTabs";
import HistoryItemCard from "../components/HistoryItemCard";
import EmptyState from "../components/EmptyState";
import { SAMPLE_HISTORY } from "../data/content";
import { usePersistedState } from "../hooks/usePersistedState";
import { groupByDay } from "../utils/date";
import type { HistoryItem, HistoryType } from "../types";

interface Props {
  onGoHome: () => void;
}

type Filter = "all" | HistoryType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "image", label: "Images" },
  { id: "text", label: "Text" },
];

export default function HistoryPage({ onGoHome }: Props) {
  const [items, setItems] = usePersistedState<HistoryItem[]>("vf-history", SAMPLE_HISTORY);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState<string>("");
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  const q = query.trim().toLowerCase();
  const visible = items.filter(
    (i) => (filter === "all" || i.type === filter) && i.title.toLowerCase().includes(q)
  );
  const groups = groupByDay(visible);

  const deleteOne = (id: number): void => setItems(items.filter((i) => i.id !== id));
  const clearAll = (): void => {
    setItems([]);
    setConfirmClear(false);
  };

  return (
    <main className="px-10 py-10 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="w-fit bg-linear-to-r from-heading to-brand bg-clip-text text-4xl font-bold leading-tight text-transparent max-md:text-2xl">
            History
          </h1>
          <p className="mt-2 text-[15px] text-muted max-md:text-[13px]">Your past checks, newest first.</p>
        </div>

        {items.length > 0 &&
          (confirmClear ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted">Delete all {items.length} checks?</span>
              <button onClick={() => setConfirmClear(false)} className="rounded-full border border-line px-3 py-1.5 transition hover:border-brand">
                Cancel
              </button>
              <button onClick={clearAll} className="rounded-full bg-red-500 px-3 py-1.5 font-bold text-white transition active:scale-95">
                Yes, delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="rounded-full border border-red-500/40 px-4 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
            >
              Clear all
            </button>
          ))}
      </div>

      <div className="mt-6 space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍  Search your checks…"
          className="w-full rounded-2xl border border-line bg-card/60 px-4 py-3 text-sm text-ink outline-none backdrop-blur-sm placeholder:text-muted focus:border-brand"
        />
        <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="mt-6 max-w-3xl">
        {groups.length === 0 ? (
          items.length === 0 ? (
            <EmptyState
              title="No checks yet"
              message="When you check a message or screenshot, it will show up here."
              actionLabel="Start a check"
              onAction={onGoHome}
            />
          ) : (
            <EmptyState title="Nothing matches" message="Try a different search or filter." />
          )
        ) : (
          groups.map((g) => (
            <section key={g.label} className="mb-6">
              <h2 className="mb-2.5 text-sm font-bold text-muted">
                {g.label} · {g.items.length}
              </h2>
              <div className="space-y-2.5">
                {g.items.map((item) => (
                  <HistoryItemCard key={item.id} item={item} onDelete={deleteOne} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}