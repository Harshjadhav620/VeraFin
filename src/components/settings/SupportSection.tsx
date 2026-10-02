import { useState } from "react";
import SettingsCard, { Row } from "./SettingsCard";

const APP_VERSION = "1.0.0";

// TODO: replace the "#" links and the email with your real pages
const HELP_LINKS = [
  { label: "Help center", description: "Guides on using VeraFin", href: "#" },
  { label: "FAQs", description: "Answers to common questions", href: "#" },
  { label: "Contact support", description: "support@example.com", href: "mailto:support@example.com" },
];

const LEGAL_LINKS = [
  { label: "Terms of service", href: "#" },
  { label: "Privacy policy", href: "#" },
];

export default function SupportSection() {
  const [confirming, setConfirming] = useState<boolean>(false);

  const logOut = (): void => {
    // TODO: clear the auth token / call your backend, then redirect to login
    alert("Logged out (placeholder)");
    setConfirming(false);
  };

  return (
    <SettingsCard icon="🛟" title="Support & About">
      {HELP_LINKS.map((l) => (
        <Row key={l.label} title={l.label} description={l.description}>
          <a href={l.href} className="text-lg text-brand transition hover:translate-x-1">›</a>
        </Row>
      ))}

      <h3 className="mb-1 mt-6 text-sm font-bold text-muted">About</h3>
      <Row title="App version">
        <span className="rounded-full bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand">v{APP_VERSION}</span>
      </Row>
      {LEGAL_LINKS.map((l) => (
        <Row key={l.label} title={l.label}>
          <a href={l.href} className="text-lg text-brand transition hover:translate-x-1">›</a>
        </Row>
      ))}

      <div className="mt-5">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-full rounded-full border border-red-500/50 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500/10 active:scale-95"
          >
            Log out
          </button>
        ) : (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center">
            <p className="text-sm">Log out of VeraFin on this device?</p>
            <div className="mt-3 flex justify-center gap-3">
              <button onClick={() => setConfirming(false)} className="rounded-full border border-line px-5 py-2 text-xs font-medium transition hover:border-brand">
                Cancel
              </button>
              <button onClick={logOut} className="rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white transition active:scale-95">
                Yes, log out
              </button>
            </div>
          </div>
        )}
      </div>
    </SettingsCard>
  );
}