interface Props {
  title: string;
}

export default function ComingSoonPage({ title }: Props) {
  return (
    <main className="grid min-h-[60vh] place-items-center px-10 py-10 max-md:px-4.5 max-md:pb-24">
      <div className="rounded-3xl border border-line bg-card/60 px-10 py-12 text-center backdrop-blur-md">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted">This page is coming soon.</p>
      </div>
    </main>
  );
}