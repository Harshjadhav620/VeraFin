import Logo from "../components/Logo";
import OptionCard from "../components/OptionCard";
import RecentChecks from "../components/RecentChecks";
import HeroLogo from "../components/HeroLogo";
import { INPUT_OPTIONS, RECENT_CHECKS } from "../data/content";
import type { InputOption } from "../types";


interface Props {
  onSelectOption: (id: InputOption["id"]) => void;
}

export default function HomePage({ onSelectOption }: Props) {
  return (
    <main className="grid grid-cols-2 items-start gap-16 px-10 py-16 max-md:grid-cols-1 max-md:gap-0 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      {/* Left: intro + options */}
      <section>
        <div className="hidden max-md:block"><Logo /></div>
        <h1 className="bg-linear-to-r from-heading to-brand bg-clip-text text-5xl font-bold leading-tight text-transparent max-md:mt-5 max-md:text-2xl">Hi there!</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted max-md:mt-1.5 max-md:text-[13px]">
          <b>Verify Before You Trust.</b>
          <br />
          Upload a screenshot, paste a message, or ask by voice to check if a financial claim is safe or suspicious.
        </p>

        <div className="mt-6 max-md:mt-2">
          {INPUT_OPTIONS.map((o) => (
            <OptionCard key={o.id} option={o} onClick={() => onSelectOption(o.id)} />
          ))}
        </div>
      </section>

      {/* Right: compact logo card + recent checks */}
      <section>
        <div className="max-md:hidden"><HeroLogo /></div>
        <RecentChecks items={RECENT_CHECKS} />
      </section>
    </main>
  );
}
    