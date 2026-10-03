import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";

interface Props {
  onFileSelected: (file: File) => void;
  maxSizeMb: number;
}

export default function DropZone({ onFileSelected, maxSizeMb }: Props) {
  const [isDragging, setIsDragging] = useState<boolean>(false); // visual only
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  const pick = (e: ChangeEvent<HTMLInputElement>): void => {
    const f = e.target.files?.[0];
    if (f) onFileSelected(f);
    e.target.value = ""; // so choosing the same file again still works
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault(); // without this the browser opens the dropped file
    setIsDragging(true);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFileSelected(f);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.current?.click();
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-card/60 p-4 backdrop-blur-md shadow-[0_0_40px_-14px_rgba(79,140,255,0.5)]">
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInput.current?.click()}
        onKeyDown={onKey}
        onDragOver={onDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center rounded-2xl border-[1.5px] border-dashed px-6 py-12 text-center
                    transition duration-200 focus-visible:outline-none
                    ${isDragging ? "scale-[1.01] border-brand bg-brand/10" : "border-brand-soft bg-surface/50 hover:border-brand"}`}
      >
        <span className="grid size-16 place-items-center rounded-full bg-brand/15 text-3xl">🖼️</span>
        <p className="mt-4 text-[15px] font-semibold">
          {isDragging ? "Drop your image here" : "Choose or drag an image here"}
        </p>
        <p className="mt-1 text-xs text-muted">Supports JPG, PNG, WEBP (Max {maxSizeMb}MB)</p>
      </div>

      <div className="my-4 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        OR
        <span className="h-px flex-1 bg-line" />
      </div>

      <button
        onClick={() => cameraInput.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm font-medium
                   transition duration-200 hover:border-brand hover:bg-brand/10 active:scale-95"
      >
        📷 Take a Photo
      </button>

      <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={pick} className="hidden" />
      <input ref={cameraInput} type="file" accept="image/*" capture="environment" onChange={pick} className="hidden" />
    </div>
  );
}