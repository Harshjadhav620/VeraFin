interface Props {
  src: string;
  name: string;
  size: number; // bytes
  onRemove: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImagePreview({ src, name, size, onRemove }: Props) {
  return (
    <div className="rounded-3xl border border-line bg-card/60 p-4 backdrop-blur-md shadow-[0_0_40px_-14px_rgba(79,140,255,0.5)]">
      <div className="flex max-h-96 justify-center overflow-hidden rounded-2xl bg-surface/60">
        <img src={src} alt="Selected screenshot preview" className="max-h-96 w-auto object-contain" />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="text-xs text-muted">{formatSize(size)}</p>
        </div>
        <button
          onClick={onRemove}
          className="shrink-0 rounded-full border border-red-500/40 px-4 py-1.5 text-xs font-medium text-red-400
                     transition duration-200 hover:bg-red-500/10 active:scale-95"
        >
          Remove
        </button>
      </div>
    </div>
  );
}