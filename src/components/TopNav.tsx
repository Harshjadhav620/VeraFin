import Logo from "./Logo";
import { NAV_TABS } from "../data/content";
import type { NavTab } from "../types";

interface Props {
  active: NavTab;
  onSelect: (tab: NavTab) => void;
}

export default function TopNav({ active, onSelect }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/70 backdrop-blur-md max-md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-10 py-4">
        <Logo />
        <nav className="flex gap-8">
          {NAV_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
               className={`border-b-2 pb-1 text-sm transition duration-200 ${
    active === t.id
      ? "border-brand font-bold text-brand"
      : "border-transparent text-muted hover:text-ink"
                }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}