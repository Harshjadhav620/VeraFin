import { useState } from "react";
import type { FormEvent } from "react";
import { apiClient, getApiErrorMessage } from "../api/client";

interface Props {
  onAuthenticated: (token: string) => void;
}

interface LoginResponse {
  token?: string;
}

type Mode = "login" | "register";

export default function AuthPage({ onAuthenticated }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        await apiClient.post("/api/users/register", { name: name.trim(), email: email.trim(), password });
      }

      const response = await apiClient.post<LoginResponse>("/api/users/login", { email: email.trim(), password });
      if (typeof response.data.token !== "string" || !response.data.token) {
        throw new Error("The backend did not return a login token.");
      }
      onAuthenticated(response.data.token);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-[80vh] place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-line bg-card/70 p-7 shadow-[0_0_40px_-14px_rgba(79,140,255,0.5)] backdrop-blur-md">
        <p className="text-sm font-semibold text-brand">VeraFin</p>
        <h1 className="mt-2 text-3xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-sm text-muted">Sign in to submit and track message verifications.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "register" && (
            <label className="block text-sm font-medium">
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand" />
            </label>
          )}
          <label className="block text-sm font-medium">
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="mt-1.5 w-full rounded-xl border border-line bg-surface px-3 py-2.5 outline-none focus:border-brand" />
          </label>

          {error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full rounded-full bg-linear-to-r from-brand to-violet-500 py-3 text-sm font-bold text-white transition hover:scale-[1.02] disabled:opacity-60">
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          {mode === "login" ? "New to VeraFin?" : "Already have an account?"}{" "}
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }} className="font-semibold text-brand hover:underline">
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </p>
        <p className="mt-4 text-center text-xs text-muted">Your sign-in token stays in memory and is cleared when this page reloads.</p>
      </section>
    </main>
  );
}
