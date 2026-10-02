interface Props {
  title: string;
  onBack: () => void;
}

export default function PageHeader({ title, onBack }: Props) {
  return (
    <header className="flex items-center gap-3">
      <button
        onClick={onBack}
        aria-label="Go back"
        className="grid size-9 place-items-center rounded-full border border-line bg-card/60 text-xl leading-none backdrop-blur-sm
                   transition duration-200 hover:scale-110 hover:border-brand active:scale-95"
      >
        ‹
      </button>
      <span className="text-sm font-medium text-muted">{title}</span>
    </header>
  );
}