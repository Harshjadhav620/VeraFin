import PageHeader from "../components/PageHeader";
import RiskBanner from "../components/RiskBanner";
import { RISK_STYLE } from "../data/risk";
import type { AnalysisResult, RiskLevel } from "../types";

interface Props {
  result: AnalysisResult;
  onBack: () => void;
  onViewHistory: () => void;
}

const SEVERITY_LABEL: Record<RiskLevel, string> = { high: "High", medium: "Medium", low: "Low", none: "None" };

const SOURCES = [
  { label: "SEBI (check registered advisers)", href: "https://www.sebi.gov.in" },
  { label: "RBI (banks and NBFCs)", href: "https://www.rbi.org.in" },
  { label: "Cyber Crime Portal (report fraud)", href: "https://cybercrime.gov.in" },
];

const card = "rounded-3xl border border-line bg-card/60 p-5 backdrop-blur-md";

function formatResponseValue(value: unknown): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2) ?? String(value);
}

export default function ResultPage({ result, onBack, onViewHistory }: Props) {
  const backendResult = result.backendResult;

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
        {backendResult && <p className="mt-2 text-sm font-semibold capitalize text-brand">Result: {backendResult.overall_status.replaceAll("_", " ")}</p>}
        {backendResult && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {backendResult.decision && <span className="rounded-full border border-line bg-card/60 px-3 py-1">Decision: {backendResult.decision.replaceAll("_", " ")}</span>}
            {backendResult.verification_status && <span className="rounded-full border border-line bg-card/60 px-3 py-1">Verification: {backendResult.verification_status.replaceAll("_", " ")}</span>}
          </div>
        )}
        {backendResult && (backendResult.overall_status === "unverified" || backendResult.overall_status === "inconclusive") && (
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted">
            There is not enough evidence to confirm these claims. Missing evidence does not prove that they are false.
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-[3fr_2fr] items-start gap-8 max-md:grid-cols-1 max-md:gap-5">
        {/* Left column */}
        <section className="space-y-5">
          <RiskBanner risk={result.risk} summary={result.summary} />
          {backendResult && <p className="-mt-3 px-2 text-xs text-muted">Risk level is a prototype indicator, not a definitive fraud determination.</p>}

          {backendResult && (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">Decision support</h2>
              <div className="grid grid-cols-2 gap-3 text-sm max-sm:grid-cols-1">
                {backendResult.risk_score !== undefined && <p className="rounded-xl bg-surface/50 px-3 py-2">Risk score: <b>{backendResult.risk_score}</b></p>}
                {backendResult.verification_score !== undefined && <p className="rounded-xl bg-surface/50 px-3 py-2">Claim verification: <b>{backendResult.verification_score}%</b></p>}
                {backendResult.confidence !== undefined && <p className="rounded-xl bg-surface/50 px-3 py-2">Decision confidence: <b>{Math.round(backendResult.confidence * 100)}%</b></p>}
                {backendResult.risk_evidence_found !== undefined && <p className="rounded-xl bg-surface/50 px-3 py-2">Risk evidence: <b>{backendResult.risk_evidence_found ? "Found" : "Not found"}</b></p>}
                {backendResult.trust_evidence_found !== undefined && <p className="rounded-xl bg-surface/50 px-3 py-2">Trust/reference evidence: <b>{backendResult.trust_evidence_found ? "Found" : "Not found"}</b></p>}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Evidence presence describes what retrieval found. Missing evidence does not prove a claim false or the message safe.
              </p>
            </div>
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

          {backendResult && (backendResult.verified_claims?.length || backendResult.unverified_claims?.length || backendResult.contradicted_claims?.length) ? (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">Claim outcomes</h2>
              <div className="space-y-3">
                {([
                  ["Verified", backendResult.verified_claims],
                  ["Unverified", backendResult.unverified_claims],
                  ["Contradicted", backendResult.contradicted_claims],
                ] as const).map(([label, values]) => values && values.length > 0 && (
                  <div key={label}>
                    <h3 className="mb-1 text-xs font-semibold text-muted">{label}</h3>
                    <ul className="space-y-1 text-sm">
                      {values.map((value, index) => <li key={`${label}-${index}`} className="rounded-xl bg-surface/50 px-3 py-2 whitespace-pre-wrap">{formatResponseValue(value)}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className={card}>
            <h2 className="mb-3 text-[15px] font-bold">📋 Claims found</h2>
            {result.claims.length === 0 ? (
              <p className="text-sm text-muted">No specific claims were picked out.</p>
            ) : (
              <div className="space-y-2.5">
                {result.claims.map((claim) => {
                  const claimType = backendResult?.claims?.find((item) => item.claim === claim)?.claim_type;

                  return (
                    <div key={claim} className="rounded-2xl bg-surface/50 px-4 py-3">
                      <p className="text-sm italic">“{claim}”</p>
                      {claimType && <p className="mt-1 text-xs capitalize text-muted">{claimType.replaceAll("_", " ")}</p>}
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

          {backendResult?.warnings && backendResult.warnings.length > 0 && (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">⚠️ Warnings</h2>
              <ul className="space-y-2 text-[13px] leading-relaxed text-muted">
                {backendResult.warnings.map((warning) => <li key={warning}>• {warning}</li>)}
              </ul>
            </div>
          )}

          {backendResult?.evidence && backendResult.evidence.length > 0 && (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">📚 Evidence</h2>
              <ul className="space-y-2 text-[13px] leading-relaxed text-muted">
                {backendResult.evidence.map((item, index) => <li key={`${index}-${item}`}>• {item}</li>)}
              </ul>
            </div>
          )}

          {backendResult?.sources && backendResult.sources.length > 0 && (
            <div className={card}>
              <h2 className="mb-3 text-[15px] font-bold">🔗 Sources checked</h2>
              <div className="space-y-2">
                {backendResult.sources.map((source) => (
                  <div key={`${source.name}-${source.url ?? ""}`} className="rounded-xl bg-surface/50 px-3 py-2.5 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span>{source.url ? <a href={source.url} target="_blank" rel="noreferrer" className="text-brand hover:underline">{source.name}</a> : source.name}</span>
                      <span className="shrink-0 text-xs capitalize text-muted">{source.status.replaceAll("_", " ")}</span>
                    </div>
                    {source.detail && <p className="mt-1 text-xs leading-relaxed text-muted">{source.detail}</p>}
                  </div>
                ))}
              </div>
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

      {backendResult && (
        <details className={`${card} mt-6`}>
          <summary className="cursor-pointer text-sm font-semibold">Detailed verification pipeline</summary>
          <div className="mt-4 space-y-2">
            {(["extracted", "plan", "retrieval", "analysis", "risk", "explanation"] as const).map((stage) => {
              const value = backendResult.pipeline?.[stage];
              return value === undefined ? null : (
                <details key={stage} className="rounded-xl border border-line p-3">
                  <summary className="cursor-pointer text-sm font-medium capitalize">{stage}</summary>
                  <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-muted">{formatResponseValue(value)}</pre>
                </details>
              );
            })}
          </div>
        </details>
      )}

      {backendResult && (
        <details className={`${card} mt-4`}>
          <summary className="cursor-pointer text-sm font-semibold">Full backend verification response</summary>
          <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-muted">
            {formatResponseValue(backendResult)}
          </pre>
        </details>
      )}
    </main>
  );
}
