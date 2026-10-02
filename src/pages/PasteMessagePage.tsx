import { useState } from "react";
import PageHeader from "../components/PageHeader";
import MessageInput from "../components/MessageInput";
import ScamFooter from "../components/ScamFooter";
import { SCAM_FACTS, SCAM_NEWS } from "../data/content";

interface Props {
  onBack: () => void;
}

const SAMPLE =
  "SEBI approved investment scheme. Get guaranteed 40% returns in 6 months. Invest now! Limited time only. Contact: +91 98765 43210";

const TRUST_CHIPS = ["🚩 Spots red flags", "🗣️ Plain-language results", "🚫 No investment advice"];

export default function PasteMessagePage({ onBack }: Props) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const analyze = async (): Promise<void> => {
    setLoading(true);
    try {
      // TODO: call your backend, then navigate to the Analysis Result page
      // const res = await fetch("/api/analyze", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text }),
      // });
      await new Promise((r) => setTimeout(r, 800));
      alert("Analysis page goes here (next screen).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-10 py-10 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      <PageHeader title="Back to home" onBack={onBack} />

      <div className="mt-6">
        <h1 className="bg-linear-to-r from-heading to-brand bg-clip-text text-4xl font-bold leading-tight text-transparent max-md:text-2xl">
          Paste a message to check
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted max-md:text-[13px]">
          Paste a WhatsApp, Telegram or SMS message below. We’ll look for scam signs and explain them simply.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TRUST_CHIPS.map((c) => (
            <span key={c} className="rounded-full border border-line bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur-sm">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[3fr_2fr] items-start gap-10 max-md:mt-6 max-md:grid-cols-1 max-md:gap-0">
        <section>
          <MessageInput value={text} onChange={setText} />

          <button
            onClick={analyze}
            disabled={!text.trim() || loading}
            className="mt-4 w-full rounded-full bg-linear-to-r from-brand to-violet-500 py-3.5 text-[15px] font-bold text-white
                       shadow-[0_0_30px_-6px_rgba(124,92,255,0.7)] transition duration-300
                       hover:scale-[1.02] hover:shadow-[0_0_44px_-4px_rgba(124,92,255,0.9)] active:scale-95
                       disabled:cursor-not-allowed disabled:bg-none disabled:bg-disabled disabled:text-muted disabled:shadow-none
                       disabled:hover:scale-100"
          >
            {loading ? "Analyzing…" : "🔍 Analyze Message"}
          </button>

          <div className="mt-3 flex items-center justify-center gap-5 text-xs">
            <button onClick={() => setText(SAMPLE)} className="text-brand hover:underline">
              Try an example
            </button>
            {text && (
              <button onClick={() => setText("")} className="text-muted hover:text-ink hover:underline">
                Clear
              </button>
            )}
          </div>
        </section>

        <ScamFooter news={SCAM_NEWS} facts={SCAM_FACTS} />
      </div>
    </main>
  );
}