import type { ChangeEvent } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function Select({ label, value, options, onChange }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-surface/70 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand [&>option]:bg-card"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}