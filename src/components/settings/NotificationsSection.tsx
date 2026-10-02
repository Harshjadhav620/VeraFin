import SettingsCard, { Row } from "./SettingsCard";
import Toggle from "./Toggle";
import { usePersistedState } from "../../hooks/usePersistedState";

interface PushPrefs {
  enabled: boolean;
  alerts: boolean;
  sounds: boolean;
  badges: boolean;
}

interface ChannelPrefs {
  emailScamAlerts: boolean;
  emailTips: boolean;
  emailUpdates: boolean;
  smsCritical: boolean;
}

export default function NotificationsSection() {
  const [push, setPush] = usePersistedState<PushPrefs>("vf-push", {
    enabled: true,
    alerts: true,
    sounds: true,
    badges: false,
  });
  const [ch, setCh] = usePersistedState<ChannelPrefs>("vf-channels", {
    emailScamAlerts: true,
    emailTips: false,
    emailUpdates: false,
    smsCritical: false,
  });

  const setP = (patch: Partial<PushPrefs>): void => setPush({ ...push, ...patch });
  const setC = (patch: Partial<ChannelPrefs>): void => setCh({ ...ch, ...patch });

  return (
    <SettingsCard icon="🔔" title="Notifications">
      <Row title="Push notifications" description="Allow VeraFin to send alerts to this device">
        <Toggle checked={push.enabled} onChange={(v) => setP({ enabled: v })} label="Push notifications" />
      </Row>

      <div className={`space-y-0 pl-4 transition ${push.enabled ? "" : "opacity-40"}`}>
        <Row title="Scam alerts" description="Warnings about new scams in circulation">
          <Toggle checked={push.alerts} onChange={(v) => setP({ alerts: v })} label="Scam alerts" disabled={!push.enabled} />
        </Row>
        <Row title="Sounds" description="Play a sound for new notifications">
          <Toggle checked={push.sounds} onChange={(v) => setP({ sounds: v })} label="Sounds" disabled={!push.enabled} />
        </Row>
        <Row title="Badges" description="Show an unread count on the app icon">
          <Toggle checked={push.badges} onChange={(v) => setP({ badges: v })} label="Badges" disabled={!push.enabled} />
        </Row>
      </div>

      <h3 className="mb-1 mt-6 text-sm font-bold text-muted">Email</h3>
      <Row title="Scam alert emails" description="Important scam warnings">
        <Toggle checked={ch.emailScamAlerts} onChange={(v) => setC({ emailScamAlerts: v })} label="Scam alert emails" />
      </Row>
      <Row title="Weekly safety tips" description="One short email a week">
        <Toggle checked={ch.emailTips} onChange={(v) => setC({ emailTips: v })} label="Weekly safety tips" />
      </Row>
      <Row title="Product updates" description="New features and improvements">
        <Toggle checked={ch.emailUpdates} onChange={(v) => setC({ emailUpdates: v })} label="Product updates" />
      </Row>

      <h3 className="mb-1 mt-6 text-sm font-bold text-muted">SMS</h3>
      <Row title="Critical alerts only" description="Text messages for urgent security notices">
        <Toggle checked={ch.smsCritical} onChange={(v) => setC({ smsCritical: v })} label="Critical SMS alerts" />
      </Row>
    </SettingsCard>
  );
}