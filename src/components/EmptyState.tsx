interface Props {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <div className="rounded-3xl border border-line bg-card/60 px-6 py-14 text-center backdrop-blur-md">
      <span className="text-4xl">🗂️</span>
      <h2 className="mt-3 text-lg font-bold">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 rounded-full bg-linear-to-r from-brand to-violet-500 px-6 py-2.5 text-sm font-bold text-white transition hover:scale-105 active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}