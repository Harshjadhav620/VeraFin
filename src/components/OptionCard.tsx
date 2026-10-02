import { useEffect, useRef, useState } from "react";
import type { InputOption } from "../types";

interface Props {
  option: InputOption;
  onClick: () => void;
}

const DELAY_MS = 300;

export default function OptionCard({ option, onClick }: Props) {
  const [pressed, setPressed] = useState<boolean>(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClick = (): void => {
    if (pressed) return;
    setPressed(true);
    timer.current = setTimeout(() => {
      onClick();
      setPressed(false);
    }, DELAY_MS);
  };

  return (
    <button
      onClick={handleClick}
      className={`group mt-3 flex w-full items-center gap-3.5 rounded-2xl border bg-card p-3.5 text-left
                  transition duration-300 ease-out
                  hover:scale-[1.03] hover:border-brand hover:shadow-[0_0_24px_-4px_rgba(79,140,255,0.5)]
                  focus-visible:border-brand focus-visible:outline-none
                  motion-reduce:transition-none motion-reduce:hover:scale-100
                  ${pressed ? "scale-105 border-brand shadow-[0_0_24px_-4px_rgba(79,140,255,0.5)]" : "border-line"}`}
    >
      <span
        className={`grid size-10.5 shrink-0 place-items-center rounded-full text-lg text-white
                    transition duration-300 ease-out group-hover:scale-125
                    ${pressed ? "scale-125" : ""}`}
        style={{ background: option.color }}
      >
        {option.icon}
      </span>
      <span>
        <h3 className="text-[15px] font-semibold">{option.title}</h3>
        <p className="mt-0.5 text-xs text-muted">{option.description}</p>
      </span>
      <span
        className={`ml-auto text-muted transition duration-300 group-hover:translate-x-1 group-hover:text-brand
                    ${pressed ? "translate-x-1 text-brand" : ""}`}
      >
        ›
      </span>
    </button>
  );
}