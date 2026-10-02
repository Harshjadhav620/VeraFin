import AccountSection from "../components/settings/AccountSection";
import NotificationsSection from "../components/settings/NotificationsSection";
import SupportSection from "../components/settings/SupportSection";
import SecuritySection from "../components/settings/SecuritySection";
import AppearanceSection from "../components/settings/AppearanceSection";
import PreferencesSection from "../components/settings/PreferencesSection";
import type { AppearanceState } from "../hooks/useAppearance";

interface Props {
  appearance: AppearanceState;
}

export default function SettingsPage({ appearance }: Props) {
  return (
    <main className="px-10 py-10 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      <h1 className="bg-linear-to-r from-heading to-brand bg-clip-text text-4xl font-bold text-transparent max-md:text-2xl">
        Settings
      </h1>
      <p className="mt-2 text-[15px] text-muted max-md:text-[13px]">
        Manage your profile, security, notifications and how VeraFin looks.
      </p>

      <div className="mt-8 grid grid-cols-2 items-start gap-6 max-md:mt-5 max-md:grid-cols-1">
        <div className="space-y-6">
          <AccountSection />
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