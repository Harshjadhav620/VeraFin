import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import SettingsCard, { Row } from "./SettingsCard";
import Field from "./Field";

export default function AccountSection() {
  const [name, setName] = useState<string>("Harsh");
  const [username, setUsername] = useState<string>("harsh_verafin");
  const [email, setEmail] = useState<string>("harsh@example.com");
  const [phone, setPhone] = useState<string>("+91 98765 43210");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

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

  const save = (): void => {
    // TODO: send { name, username, email, phone } to your backend
    setSaved(true);
    timer.current = setTimeout(() => setSaved(false), 2000);
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
        <Field label="Display name" value={name} onChange={setName} />
        <Field label="Username" value={username} onChange={setUsername} />
        <Field label="Email address" type="email" value={email} onChange={setEmail} />
        <Field label="Phone number" type="tel" value={phone} onChange={setPhone} />
      </div>

      <button
        onClick={save}
        className="mt-4 rounded-full bg-linear-to-r from-brand to-violet-500 px-6 py-2.5 text-sm font-bold text-white transition hover:scale-105 active:scale-95"
      >
        {saved ? "✓ Saved" : "Save changes"}
      </button>

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