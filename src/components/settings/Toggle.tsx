interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, disabled = false }: Props) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition duration-300 disabled:cursor-not-allowed ${
        checked ? "bg-brand" : "bg-line"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition duration-300 ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}