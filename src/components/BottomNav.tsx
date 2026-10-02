import { NAV_TABS } from "../data/content";
import type { NavTab } from "../types";

interface Props {
  active: NavTab;
  onSelect: (tab: NavTab) => void;
}

export default function BottomNav({ active, onSelect }: Props) {
  return (
    <nav className="hidden border-t border-line bg-surface/90 py-2 backdrop-blur-md max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:flex max-md:justify-around">
      {NAV_TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex flex-col items-center gap-0.5 text-[11px] ${
            active === t.id ? "font-bold text-brand" : "text-muted"
          }`}
        >
          <span className="text-lg">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}