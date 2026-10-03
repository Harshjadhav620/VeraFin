import Logo from "../components/Logo";
import OptionCard from "../components/OptionCard";
import RecentChecks from "../components/RecentChecks";
import HeroLogo from "../components/HeroLogo";
import { INPUT_OPTIONS, RECENT_CHECKS } from "../data/content";
import type { InputOption } from "../types";

interface Props {
  onSelectOption: (id: InputOption["id"]) => void;
  onViewAll: () => void;
}

export default function HomePage({ onSelectOption, onViewAll }: Props) {
  return (
    <main className="grid grid-cols-2 items-start gap-16 px-10 py-16 max-md:grid-cols-1 max-md:gap-0 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      {/* Left: intro, option cards, about box */}
      <section>
        <div className="hidden max-md:block"><Logo /></div>
        <h1 className="w-fit bg-linear-to-r from-heading to-brand bg-clip-text text-5xl font-bold leading-tight text-transparent max-md:mt-5 max-md:text-2xl">
          Hi there!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted max-md:mt-1.5 max-md:text-[13px]">
          <b>Verify Before You Trust.</b>
          <br />
          Upload a screenshot or paste a message to check if a financial claim is safe or suspicious.
        </p>

        <div className="mt-15 grid grid-cols-2 gap-3 max-md:mt-2 max-md:grid-cols-1">
          {INPUT_OPTIONS.map((o) => (
            <OptionCard key={o.id} option={o} onClick={() => onSelectOption(o.id)} />
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-line bg-card/60 p-7 backdrop-blur-sm max-md:mt-6 max-md:p-5">
          <h2 className="py-4 text-lg font-bold">About VeraFin</h2>
          <p className="text-sm leading-relaxed text-muted">
            VeraFin is an AI-powered safety companion for first-time and retail investors. Paste a message or upload a
            screenshot, and it points out the warning signs of a scam, picks out the claims being made, and explains in
            simple language why something may be risky. It then shows what you should verify with official sources before
            acting. VeraFin never gives stock tips or investment advice. It simply helps you pause, check and decide with
            confidence.
          </p>
        </div>
      </section>

      {/* Right: phone mockup + recent checks */}
      <section>
        <div className="max-md:hidden"><HeroLogo /></div>
        <RecentChecks items={RECENT_CHECKS} onViewAll={onViewAll} />
      </section>
    </main>
  );
}