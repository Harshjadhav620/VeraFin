import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import DropZone from "../components/DropZone";
import ImagePreview from "../components/ImagePreview";

interface Props {
  onBack: () => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const TIPS = [
  "Include the whole message, from the sender's name to the last line.",
  "Make sure the text is sharp and readable.",
  "Don't crop out links, phone numbers or account details in the message.",
  "Hide your own private details (OTPs, card numbers) before uploading.",
];

export default function UploadPage({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // release the old preview URL when it changes, and when the page closes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (picked: File): void => {
    if (!ALLOWED_TYPES.includes(picked.type)) {
      setError("Please choose a JPG, PNG or WEBP image.");
      return;
    }
    if (picked.size > MAX_SIZE_BYTES) {
      setError(`That image is too large. The limit is ${MAX_SIZE_MB} MB.`);
      return;
    }
    setError(null);
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
  };

  const removeFile = (): void => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const upload = async (): Promise<void> => {
    if (!file) return;
    setLoading(true);
    try {
      // TODO: send the image to your backend, then go to the Analysis Result page
      // const formData = new FormData();
      // formData.append("image", file);
      // const res = await fetch("/api/analyze-image", { method: "POST", body: formData });
      await new Promise((r) => setTimeout(r, 800));
      alert("Analysis page goes here (next screen).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-10 py-10 max-md:px-4.5 max-md:py-5 max-md:pb-24">
      <PageHeader title="Back to home" onBack={onBack} />

      <div className="mt-6">
        <h1 className="w-fit bg-linear-to-r from-heading to-brand bg-clip-text text-4xl font-bold leading-tight text-transparent max-md:text-2xl">
          Upload a screenshot
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted max-md:text-[13px]">
          Upload a screenshot of a chat, post or promotion. We’ll read the text, look for scam signs and explain them simply.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["🖼️ Chats, posts & ads", "🔎 Reads the text for you", "🚫 No investment advice"].map((c) => (
            <span key={c} className="rounded-full border border-line bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur-sm">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[3fr_2fr] items-start gap-10 max-md:mt-6 max-md:grid-cols-1 max-md:gap-0">
        <section>
          {file && previewUrl ? (
            <ImagePreview src={previewUrl} name={file.name} size={file.size} onRemove={removeFile} />
          ) : (
            <DropZone onFileSelected={handleFile} maxSizeMb={MAX_SIZE_MB} />
          )}

          {error && (
            <div role="alert" className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={upload}
            disabled={!file || loading}
            className="mt-4 w-full rounded-full bg-linear-to-r from-brand to-violet-500 py-3.5 text-[15px] font-bold text-white
                       shadow-[0_0_30px_-6px_rgba(124,92,255,0.7)] transition duration-300
                       hover:scale-[1.02] hover:shadow-[0_0_44px_-4px_rgba(124,92,255,0.9)] active:scale-95
                       disabled:cursor-not-allowed disabled:bg-none disabled:bg-disabled disabled:text-muted disabled:shadow-none
                       disabled:hover:scale-100"
          >
            {loading ? "Analyzing…" : "🔍 Analyze Screenshot"}
          </button>
        </section>

        <aside className="rounded-3xl border border-line bg-card/60 p-5 backdrop-blur-md max-md:mt-6">
          <h2 className="mb-3 text-[15px] font-bold">📸 Tips for a good screenshot</h2>
          <ul className="space-y-2.5 text-[13px] leading-relaxed">
            {TIPS.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-amber-400">✦</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-brand/10 px-3 py-2 text-xs text-muted">
            VeraFin never gives stock tips or investment advice. It only helps you check and understand a message.
          </p>
        </aside>
      </div>
    </main>
  );
}