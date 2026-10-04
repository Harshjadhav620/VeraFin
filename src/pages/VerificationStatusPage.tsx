import { toAnalysisResult } from "../api/verificationResult";
import { useVerificationPolling } from "../hooks/useVerificationPolling";
import ResultPage from "./ResultPage";

interface Props {
  verificationId: string;
  token: string;
  onBack: () => void;
  onRetrySubmission: () => void;
  onViewHistory: () => void;
}

export default function VerificationStatusPage({ verificationId, token, onBack, onRetrySubmission, onViewHistory }: Props) {
  const { verification, error, retryPolling } = useVerificationPolling(verificationId, token);

  if (verification?.status === "completed" && verification.result) {
    const result = toAnalysisResult(verification);
    return <ResultPage result={result} onBack={onBack} onViewHistory={onViewHistory} />;
  }

  const failed = verification?.status === "failed";
  const invalidCompleted = verification?.status === "completed" && !verification.result;
  const title = failed || invalidCompleted ? "Verification failed" : verification?.status === "processing" ? "Checking your message" : "Verification queued";

  return (
    <div className="mt-8" aria-live="polite">
      <section className="w-full rounded-2xl border border-line bg-card/60 p-6 backdrop-blur-md">
        <p className="text-4xl" aria-hidden="true">{failed || error ? "⚠️" : "🔎"}</p>
        <h1 className="mt-4 text-2xl font-bold">{error ? "Unable to check status" : title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {error ?? verification?.error ?? (invalidCompleted
            ? "The backend marked this verification complete without returning a result."
            : failed
            ? "The backend could not complete this verification. You can submit the message again."
            : "VeraFin is checking the submitted content. This page will update when the result is ready.")}
        </p>

        {(error || failed || invalidCompleted) ? (
          <div className="mt-6 flex justify-center gap-3 max-sm:flex-col">
            {error && <button onClick={retryPolling} className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-brand">Retry status check</button>}
            <button onClick={onRetrySubmission} className="rounded-full bg-linear-to-r from-brand to-violet-500 px-5 py-2.5 text-sm font-bold text-white">Submit again</button>
            <button onClick={onBack} className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-brand">Back home</button>
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
            <button onClick={onBack} className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-brand">Back home</button>
          </div>
        )}
      </section>
    </div>
  );
}
