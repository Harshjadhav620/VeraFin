import { useState } from "react";
import SettingsCard, { Row } from "./SettingsCard";
import Toggle from "./Toggle";
import Field from "./Field";

interface Session {
  id: number;
  device: string;
  detail: string;
  current: boolean;
}

const INITIAL_SESSIONS: Session[] = [
  { id: 1, device: "Chrome on Windows", detail: "This device · Active now", current: true },
  { id: 2, device: "VeraFin app on Android", detail: "Last active 2 days ago", current: false },
];

export default function SecuritySection() {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [pwDone, setPwDone] = useState<boolean>(false);
  const [twoFA, setTwoFA] = useState<boolean>(false);
  const [shareData, setShareData] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [deleteText, setDeleteText] = useState<string>("");

  const updatePassword = (): void => {
    // TODO: call your backend to change the password
    setShowPw(false);
    setCurrentPw("");
    setNewPw("");
    setPwDone(true);
  };

  return (
    <SettingsCard icon="🔒" title="Security & Privacy">
      <Row title="Password" description={pwDone ? "✓ Password updated" : "Reset or change your password"}>
        <button onClick={() => setShowPw(!showPw)} className="text-xs font-medium text-brand hover:underline">
          {showPw ? "Cancel" : "Change"}
        </button>
      </Row>
      {showPw && (
        <div className="space-y-3 pb-3">
          <Field label="Current password" type="password" value={currentPw} onChange={setCurrentPw} />
          <Field label="New password (min 8 characters)" type="password" value={newPw} onChange={setNewPw} />
          <button
            onClick={updatePassword}
            disabled={!currentPw || newPw.length < 8}
            className="rounded-full bg-brand px-5 py-2 text-xs font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Update password
          </button>
        </div>
      )}

      <Row title="Two-factor authentication (2FA)" description={twoFA ? "On: a code is needed at login" : "Add an extra layer of security"}>
        <Toggle checked={twoFA} onChange={setTwoFA} label="Two-factor authentication" />
      </Row>

      <div className="border-t border-line pt-3">
        <p className="text-sm font-medium">Active sessions</p>
        <p className="mb-2 mt-0.5 text-xs text-muted">Devices currently logged in to your account</p>
        {sessions.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface/50 px-3 py-2.5 not-first:mt-2">
            <div className="min-w-0">
              <p className="truncate text-sm">{s.device}</p>
              <p className="text-xs text-muted">{s.detail}</p>
            </div>
            {s.current ? (
              <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[11px] font-semibold text-green-400">Current</span>
            ) : (
              <button
                onClick={() => setSessions(sessions.filter((x) => x.id !== s.id))}
                className="text-xs font-medium text-red-400 hover:underline"
              >
                Log out
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Row title="Share anonymous usage data" description="Helps us improve scam detection. No message content is shared.">
          <Toggle checked={shareData} onChange={setShareData} label="Share anonymous usage data" />
        </Row>
      </div>

      <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
        <p className="text-sm font-bold text-red-400">Danger zone</p>
        <p className="mt-1 text-xs text-muted">Deactivate pauses your account. Deleting removes your data permanently.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-full border border-line px-4 py-1.5 text-xs font-medium transition hover:border-brand">
            Deactivate account
          </button>
          <button
            onClick={() => setConfirmDelete(!confirmDelete)}
            className="rounded-full border border-red-500/50 px-4 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Delete account
          </button>
        </div>
        {confirmDelete && (
          <div className="mt-3 space-y-2">
            <Field label='Type "DELETE" to confirm' value={deleteText} onChange={setDeleteText} />
            <button
              disabled={deleteText !== "DELETE"}
              onClick={() => alert("TODO: call your backend to delete the account")}
              className="rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Permanently delete
            </button>
          </div>
        )}
      </div>
    </SettingsCard>
  );
}