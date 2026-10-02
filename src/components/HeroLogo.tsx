const FEATURES = [
  { icon: "🛡️", label: "Detect Scams" },
  { icon: "🔍", label: "Verify Claims" },
  { icon: "🌱", label: "Build Safe Habits" },
  { icon: "📈", label: "Invest with Confidence" },
];

export default function HeroLogo() {
  return (
    <div
      className="group flex flex-col items-center rounded-3xl border border-line bg-linear-to-b from-hero-from to-hero-to px-6 py-6 text-center
                 shadow-[0_0_40px_-12px_rgba(79,140,255,0.45)]
                 transition duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(79,140,255,0.7)]
                 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <div className="flex items-center gap-4">
        <svg
          viewBox="0 0 100 120"
          className="h-20 w-auto drop-shadow-[0_0_14px_rgba(34,193,195,0.55)] transition duration-500 ease-out group-hover:scale-125 group-hover:rotate-3
                     motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="shield" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22c1c3" />
              <stop offset="100%" stopColor="#4f8cff" />
            </linearGradient>
          </defs>
          <path d="M50 4 L92 18 V58 C92 86 72 106 50 116 C28 106 8 86 8 58 V18 Z" fill="url(#shield)" />
          <path d="M30 58 L45 73 L72 42" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            VERA<span className="text-brand">FIN</span>
          </h2>
          <p className="text-sm text-muted">Verify Before You Trust.</p>
        </div>
      </div>

      <div className="mt-5 grid w-full grid-cols-2 gap-2.5">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-2 rounded-xl border border-line bg-card/80 px-3 py-2 text-left text-xs font-medium"
          >
            <span className="text-base">{f.icon}</span>
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
}