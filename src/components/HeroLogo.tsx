import mockup from "../assets/scam-mockup.png";

export default function HeroLogo() {
  return (
    <div className="flex justify-center">
      <img
        src={mockup}
        alt="VeraFin scam analysis: a suspicious message flagged as high risk"
        className="max-h-125 w-auto select-none object-contain drop-shadow-[0_20px_40px_rgba(79,140,255,0.35)]
                   transition duration-300 ease-out hover:scale-[1.04]
                   motion-reduce:transition-none motion-reduce:hover:scale-100"
        draggable={false}
      />
    </div>
  );
}