import SettingsCard, { Row } from "./SettingsCard";
import Select from "./Select";
import type { SelectOption } from "./Select";
import Toggle from "./Toggle";
import { usePersistedState } from "../../hooks/usePersistedState";

const LANGUAGES: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "gu", label: "ગુજરાતી (Gujarati)" },
  { value: "bn", label: "বাংলা (Bengali)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
];

const TIME_ZONES: SelectOption[] = [
  { value: "Asia/Kolkata", label: "India (IST, UTC+5:30)" },
  { value: "Asia/Dubai", label: "Dubai (GST, UTC+4)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "America/New_York", label: "New York (ET)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PT)" },
  { value: "Asia/Singapore", label: "Singapore (SGT, UTC+8)" },
];

const DATE_FORMATS: SelectOption[] = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

const VOICE_QUALITY: SelectOption[] = [
  { value: "standard", label: "Standard (saves data)" },
  { value: "high", label: "High (clearer recognition)" },
];

function preview(format: string, timeZone: string): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, day: "2-digit", month: "2-digit", year: "numeric" }).formatToParts(now);
  const get = (type: string): string => parts.find((p) => p.type === type)?.value ?? "";
  const dd = get("day");
  const mm = get("month");
  const yyyy = get("year");
  const date = format === "MM/DD/YYYY" ? `${mm}/${dd}/${yyyy}` : format === "YYYY-MM-DD" ? `${yyyy}-${mm}-${dd}` : `${dd}/${mm}/${yyyy}`;
  const time = new Intl.DateTimeFormat("en-IN", { timeZone, hour: "2-digit", minute: "2-digit" }).format(now);
  return `${date}, ${time}`;
}

export default function PreferencesSection() {
  const [language, setLanguage] = usePersistedState<string>("vf-lang", "en");
  const [timeZone, setTimeZone] = usePersistedState<string>("vf-tz", "Asia/Kolkata");
  const [dateFormat, setDateFormat] = usePersistedState<string>("vf-date", "DD/MM/YYYY");
  const [voiceQuality, setVoiceQuality] = usePersistedState<string>("vf-voice-quality", "standard");
  const [readAloud, setReadAloud] = usePersistedState<boolean>("vf-read-aloud", false);

  return (
    <SettingsCard icon="🌐" title="Preferences & Localization">
      <div className="space-y-3">
        <Select label="Language" value={language} options={LANGUAGES} onChange={setLanguage} />
        {/* TODO: wire `language` into your translation library (e.g. i18next) */}
        <Select label="Time zone" value={timeZone} options={TIME_ZONES} onChange={setTimeZone} />
        <Select label="Date format" value={dateFormat} options={DATE_FORMATS} onChange={setDateFormat} />
        <p className="text-xs text-muted">
          Preview: <span className="font-medium text-ink">{preview(dateFormat, timeZone)}</span>
        </p>
      </div>

      <h3 className="mb-3 mt-6 text-sm font-bold text-muted">Voice assistant</h3>
      <Select label="Voice input quality" value={voiceQuality} options={VOICE_QUALITY} onChange={setVoiceQuality} />
      <div className="mt-2">
        <Row title="Read results aloud" description="Speak the analysis out loud, useful for low-literacy or low-vision users">
          <Toggle checked={readAloud} onChange={setReadAloud} label="Read results aloud" />
        </Row>
      </div>
    </SettingsCard>
  );
}
