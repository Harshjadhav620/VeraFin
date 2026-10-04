import PageHeader from "../components/PageHeader";
import RiskBanner from "../components/RiskBanner";
import { RISK_STYLE } from "../data/risk";
import type { AnalysisResult, RiskLevel } from "../types";

interface Props {
  result: AnalysisResult;
  onBack: () => void;
  onViewHistory: () => void;
}

const SEVERITY_LABEL: Record<RiskLevel, string> = { high: "High", medium: "Medium", low: "Low" };

const SOURCES = [
  { label: "SEBI (check registered advisers)", href: "https://www.sebi.gov.in" },
  { label: "RBI (banks and NBFCs)", href: "https://www.rbi.org.in" },
  { label: "Cyber Crime Portal (report fraud)", href: "https://cybercrime.gov.in" },
];

const card = "rounded-3xl border border-line bg-card/60 p-5 backdrop-blur-md";

export default function ResultPage({ result, onBack, onViewHistory }: Props) {
  const verificationClaims = result.verification?.analysis?.assessments ?? result.verification?.explanation?.claims ?? [];
  const reasons = result.verification?.explanation?.reasons ?? [];
  const limitations = result.verification?.riskAssessment?.limitations ?? result.verification?.explanation?.limitations ?? [];

  return (
    <main className="px-10 py-10 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      <PageHeader title="Back to home" onBack={onBack} />

      <div className="mt-6">
        <h1 className="w-fit bg-linear-to-r from-heading to-brand bg-clip-text text-4xl font-bold leading-tight text-transparent max-md:text-2xl">
          Analysis result
        </h1>
        <p className="mt-2 text-xs text-muted">
          {result.source === "image" ? "🖼️ Screenshot" : "📝 Message"} · checked {new Date(result.createdAt).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-[3fr_2fr] items-start gap-8 max-md:grid-cols-1 max-md:gap-5">
        {/* Left column */}
        <section className="space-y-5">
          <RiskBanner risk={result.risk} summary={result.summary} />
          {result.verification?.riskAssessment?.score !== undefined && (
            <p className="-mt-3 px-2 text-xs text-muted">
              Prototype risk score: {result.verification.riskAssessment.score}
            </p>
          )}

          <div className={card}>
            <h2 className="mb-3 text-[15px] font-bold">🚩 Risk indicators</h2>
            {result.indicators.length === 0 ? (
              <p className="text-sm text-muted">No warning signs were detected in this text.</p>
            ) : (
              <div className="space-y-2.5">
                {result.indicators.map((i) => (
                  <div key={i.id} className="flex items-start justify-between gap-3 rounded-2xl bg-surface/50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{i.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{i.detail}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${RISK_STYLE[i.severity]}`}>
                      {SEVERITY_LABEL[i.severity]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={card}>
            <h2 className="mb-3 text-[15px] font-bold">📋 Claims found</h2>
            {result.claims.length === 0 ? (
              <p className="text-sm text-muted">No specific claims were picked out.</p>
            ) : (
              <div className="space-y-2.5">
                {result.claims.map((claim) => {
                  const assessment = verificationClaims.find((item) => item.claim === claim);
                  const status = assessment?.status ?? "unverified";
                  const statusStyle = status === "supported"
                    ? "bg-green-500/15 text-green-400"
                    : status === "contradicted"
                      ? "bg-red-500/15 text-red-400"
                      : "bg-amber-500/15 text-amber-400";

                  return (
                    <div key={claim} className="rounded-2xl bg-surface/50 px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm italic">“{claim}”</p>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusStyle}`}>
                          {status.replaceAll("_", " ")}
                        </span>
                      </div>
                      {assessment?.explanation && <p className="mt-2 text-xs leading-relaxed text-muted">{assessment.explanation}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Right column */}
        <aside className="space-y-5">
          <div className={card}>
            <h2 className="mb-3 text-[15px] font-bold">🔎 Extracted text</h2>
            <p className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-surface/50 p-4 text-sm leading-relaxed">
              {result.extractedText}
            </p>
          </div>

          {reasons.length > 0 && (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">🧾 Verification findings</h2>
              <ul className="space-y-2 text-[13px] leading-relaxed text-muted">
                {reasons.map((reason) => <li key={reason}>• {reason}</li>)}
              </ul>
            </div>
          )}

          {limitations.length > 0 && (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">Evidence limitations</h2>
              <ul className="space-y-2 text-[13px] leading-relaxed text-muted">
                {limitations.map((limitation) => <li key={limitation}>• {limitation}</li>)}
              </ul>
            </div>
          )}

          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur-md">
            <h2 className="mb-3 text-[15px] font-bold">💡 What you should do</h2>
            <ul className="space-y-2 text-[13px] leading-relaxed">
              {result.advice.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-amber-400">✦</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={card}>
            <h2 className="mb-3 text-[15px] font-bold">✅ Verify with official sources</h2>
            <div className="space-y-2">
              {SOURCES.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-line px-4 py-2.5 text-sm transition duration-200 hover:border-brand hover:bg-brand/10"
                >
                  {s.label}
                  <span className="text-brand">↗</span>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              VeraFin never gives stock tips or investment advice. It only helps you check and understand a message.
            </p>
          </div>

          <div className="flex gap-3 max-md:flex-col">
            <button
              onClick={onBack}
              className="flex-1 rounded-full bg-linear-to-r from-brand to-violet-500 py-3 text-sm font-bold text-white shadow-[0_0_30px_-6px_rgba(124,92,255,0.7)] transition duration-300 hover:scale-[1.02] active:scale-95"
            >
              Check another
            </button>
            <button
              onClick={onViewHistory}
              className="flex-1 rounded-full border border-line py-3 text-sm font-medium transition duration-200 hover:border-brand hover:bg-brand/10 active:scale-95"
            >
              View history
            </button>
          </div>
        </aside>
      </div>

      {result.verification && (
        <details className={`${card} mt-6`}>
          <summary className="cursor-pointer text-sm font-semibold">Full backend verification response</summary>
          <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-muted">
            {JSON.stringify(result.verification, null, 2)}
          </pre>
        </details>
      )}
    </main>
  );
}
