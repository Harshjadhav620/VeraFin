import SettingsCard from "./SettingsCard";
import { ACCENTS } from "../../hooks/useAppearance";
import type { AppearanceState, TextSize, ThemeMode } from "../../hooks/useAppearance";

interface Props {
  appearance: AppearanceState;
}

const THEMES: { id: ThemeMode; icon: string; label: string }[] = [
  { id: "dark", icon: "🌙", label: "Dark" },
  { id: "light", icon: "☀️", label: "Light" },
  { id: "system", icon: "💻", label: "System" },
];

const SIZES: { id: TextSize; label: string; px: string }[] = [
  { id: "small", label: "Small", px: "text-xs" },
  { id: "medium", label: "Medium", px: "text-base" },
  { id: "large", label: "Large", px: "text-xl" },
];

const base = "flex-1 rounded-xl border px-3 py-2.5 text-sm transition duration-200";
const on = "border-brand bg-brand/15 font-semibold text-brand";
const off = "border-line text-muted hover:border-brand-soft hover:text-ink";

export default function AppearanceSection({ appearance }: Props) {
  const { theme, setTheme, textSize, setTextSize, accent, setAccent } = appearance;

  return (
    <SettingsCard icon="🎨" title="Appearance & Display">
      <p className="text-sm font-medium">Theme</p>
      <div className="mb-5 mt-2 flex gap-2">
        {THEMES.map((t) => (
          <button key={t.id} onClick={() => setTheme(t.id)} className={`${base} ${theme === t.id ? on : off}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium">Text size</p>
      <div className="mb-5 mt-2 flex gap-2">
        {SIZES.map((s) => (
          <button key={s.id} onClick={() => setTextSize(s.id)} className={`${base} ${textSize === s.id ? on : off}`}>
            <span className={s.px}>Aa</span>
            <span className="ml-2 text-xs">{s.label}</span>
          </button>
        ))}
      </div>

      <p className="text-sm font-medium">Accent color</p>
      <div className="mt-2 flex gap-3">
        {ACCENTS.map((a) => (
          <button
            key={a.value}
            onClick={() => setAccent(a.value)}
            aria-label={a.name}
            title={a.name}
            style={{ background: a.value }}
            className={`size-9 rounded-full transition duration-200 hover:scale-110 ${
              accent === a.value ? "ring-2 ring-ink ring-offset-2 ring-offset-surface" : ""
            }`}
          />
        ))}
      </div>
    </SettingsCard>
  );
}