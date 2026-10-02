import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function MessageInput({ value, onChange, maxLength = 2000 }: Props) {
  const pasteFromClipboard = async (): Promise<void> => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) onChange(clip.slice(0, maxLength));
    } catch {
      // clipboard blocked by the browser: user can paste manually
    }
  };

  const pct = Math.min(100, (value.length / maxLength) * 100);

  return (
    <div
      className="rounded-3xl border border-line bg-card/60 p-4 backdrop-blur-md
                 shadow-[0_0_40px_-14px_rgba(79,140,255,0.5)] transition duration-300
                 focus-within:border-brand focus-within:shadow-[0_0_50px_-10px_rgba(124,92,255,0.6)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-8 place-items-center rounded-full bg-[#5c5fd6] text-sm">📝</span>
          Your message
        </span>
        <button
          onClick={pasteFromClipboard}
          className="rounded-full border border-brand-soft px-3 py-1 text-xs font-medium text-brand
                     transition duration-200 hover:scale-105 hover:bg-brand/10 active:scale-95"
        >
          📋 Paste from clipboard
        </button>
      </div>

      <textarea
        value={value}
        maxLength={maxLength}
        placeholder="Paste the WhatsApp, Telegram or SMS message here…"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        className="h-64 w-full resize-none rounded-2xl border border-line bg-surface/70 p-4 text-sm leading-relaxed
                   text-ink outline-none placeholder:text-muted focus:border-brand max-md:h-48"
      />

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-linear-to-r from-teal-400 to-brand transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[11px] text-muted">{value.length}/{maxLength}</span>
      </div>
    </div>
  );
}