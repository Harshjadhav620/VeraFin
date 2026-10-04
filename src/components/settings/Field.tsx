import type { ChangeEvent } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export default function Field({ label, value, onChange, type = "text", placeholder, readOnly = false }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-surface/70 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-brand read-only:opacity-70"
      />
    </label>
  );
}
