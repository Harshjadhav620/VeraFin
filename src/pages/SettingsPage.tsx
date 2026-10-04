import AccountSection from "../components/settings/AccountSection";
import NotificationsSection from "../components/settings/NotificationsSection";
import SupportSection from "../components/settings/SupportSection";
import SecuritySection from "../components/settings/SecuritySection";
import AppearanceSection from "../components/settings/AppearanceSection";
import PreferencesSection from "../components/settings/PreferencesSection";
import type { AppearanceState } from "../hooks/useAppearance";

interface Props {
  appearance: AppearanceState;
  onLogout: () => void;
  token: string;
}

export default function SettingsPage({ appearance, onLogout, token }: Props) {
  return (
    <main className="px-10 py-10 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      <div className="flex items-start justify-between gap-4">
        <h1 className="bg-linear-to-r from-heading to-brand bg-clip-text text-4xl font-bold text-transparent max-md:text-2xl">Settings</h1>
        <button onClick={onLogout} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-brand hover:bg-brand/10">
          Sign out
        </button>
      </div>
      <p className="mt-2 text-[15px] text-muted max-md:text-[13px]">
        Manage your profile, security, notifications and how VeraFin looks.
      </p>

      <div className="mt-8 grid grid-cols-2 items-start gap-6 max-md:mt-5 max-md:grid-cols-1">
        <div className="space-y-6">
          <AccountSection token={token} />
          <NotificationsSection />
          <SupportSection />
        </div>
        <div className="space-y-6">
          <SecuritySection />
          <AppearanceSection appearance={appearance} />
          <PreferencesSection />
        </div>
      </div>
    </main>
  );
}
