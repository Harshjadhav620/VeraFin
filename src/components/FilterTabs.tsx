interface Option<T extends string> {
  id: T;
  label: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  active: T;
  onChange: (id: T) => void;
}

export default function FilterTabs<T extends string>({ options, active, onChange }: Props<T>) {
  return (
    <div className="flex gap-2 rounded-full border border-line bg-card/60 p-1 backdrop-blur-sm">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`flex-1 rounded-full px-4 py-2 text-sm transition duration-200 ${
            active === o.id ? "bg-brand font-semibold text-white" : "text-muted hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}