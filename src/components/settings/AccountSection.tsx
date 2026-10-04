import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import SettingsCard, { Row } from "./SettingsCard";
import Field from "./Field";
import { apiClient, getApiErrorMessage } from "../../api/client";

interface Props {
  token: string;
}

interface ProfileResponse {
  user?: { name?: string; email?: string };
}

export default function AccountSection({ token }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    apiClient.get<ProfileResponse>("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (!active || !data.user) return;
        setName(data.user.name ?? "");
        setEmail(data.user.email ?? "");
      })
      .catch((requestError: unknown) => { if (active) setError(getApiErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token]);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const onPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <SettingsCard icon="👤" title="Account & Profile">
      <div className="mb-4 flex items-center gap-4">
        {photo ? (
          <img src={photo} alt="Profile" className="size-16 rounded-full object-cover" />
        ) : (
          <span className="grid size-16 place-items-center rounded-full bg-linear-to-br from-teal-400 to-brand text-xl font-bold text-white">
            {initials || "?"}
          </span>
        )}
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-full border border-brand-soft px-3 py-1.5 text-xs font-medium text-brand transition hover:bg-brand/10"
          >
            Change photo
          </button>
          {photo && (
            <button onClick={() => setPhoto(null)} className="px-2 text-xs text-muted hover:text-ink">
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <Field label="Display name" value={name} onChange={setName} readOnly />
        <Field label="Email address" type="email" value={email} onChange={setEmail} readOnly />
      </div>
      {loading && <p className="mt-3 text-xs text-muted">Loading profile…</p>}
      {error && <p role="alert" className="mt-3 text-xs text-red-400">Could not load profile: {error}</p>}
      {!loading && !error && <p className="mt-3 text-xs text-muted">Profile details are managed by your account.</p>}

      <h3 className="mb-1 mt-7 text-sm font-bold text-muted">Subscription & billing</h3>
      <Row title="Current plan" description="Free: basic message and screenshot checks">
        <button className="rounded-full bg-brand/15 px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand/25">
          Upgrade
        </button>
      </Row>
      <Row title="Payment method" description="No card added yet">
        <button className="text-xs font-medium text-brand hover:underline">Add</button>
      </Row>
      <Row title="Invoices" description="Your billing history">
        <button className="text-xs font-medium text-brand hover:underline">View</button>
      </Row>
    </SettingsCard>
  );
}
