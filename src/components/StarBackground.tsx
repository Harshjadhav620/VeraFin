export default function StarBackground() {
  return (
    <div className="star-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03040b]" aria-hidden="true">
      {/* nebula glows */}
      <div className="absolute -left-40 -top-40 size-176 rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="absolute -right-32 top-1/4 size-160 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="absolute -bottom-48 left-1/3 size-152 rounded-full bg-teal-500/15 blur-[120px]" />
      <div className="absolute bottom-0 right-0 size-120 rounded-full bg-fuchsia-600/15 blur-[110px]" />
    </div>
  );
}