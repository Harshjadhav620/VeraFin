import type { NewsItem } from "../types";

interface Props {
  news: NewsItem[];
  facts: string[];
}

export default function ScamFooter({ news, facts }: Props) {
  return (
    <footer className="max-md:mt-7">
      <h4 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
        <span className="size-2 animate-pulse rounded-full bg-red-400" />
        Scam news
      </h4>
      {news.map((n) => (
        <div
          key={n.source + n.text}
          className="mb-2.5 rounded-2xl border border-line bg-card/60 p-3.5 backdrop-blur-md
                     transition duration-300 hover:scale-[1.02] hover:border-brand"
        >
          <small className="text-[11px] font-semibold uppercase tracking-wide text-brand">{n.source}</small>
          <p className="mt-1 text-[13px] leading-snug text-ink">{n.text}</p>
        </div>
      ))}

      <h4 className="mb-3 mt-6 text-[15px] font-bold">💡 Did you know?</h4>
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-[13px] leading-relaxed backdrop-blur-md">
        <ul className="space-y-2">
          {facts.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-amber-400">✦</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}