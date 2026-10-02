import type { ReactNode } from "react";

interface CardProps {
  icon: string;
  title: string;
  children: ReactNode;
}

export default function SettingsCard({ icon, title, children }: CardProps) {
  return (
    <section className="rounded-3xl border border-line bg-card/60 p-5 backdrop-blur-md">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="grid size-8 place-items-center rounded-full bg-brand/15 text-base">{icon}</span>
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

interface RowProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Row({ title, description, children }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-line py-3 first:border-t-0">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}