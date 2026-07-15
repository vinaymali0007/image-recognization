export default function ImagePreview({ previewUrl, fileName, fileSize, onRemove }) {
  const sizeLabel = fileSize ? `${(fileSize / 1024).toFixed(0)} KB` : ''

  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-void-soft bg-[#12151A]">
      <div className="relative">
        <img
          src={previewUrl}
          alt="Uploaded MRI scan preview"
          className="max-h-96 w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-0 bg-scan-grid bg-grid opacity-30" />
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
        <div className="font-mono text-[11px] text-paper/50">
          {fileName} <span className="text-paper/30">· {sizeLabel}</span>
        </div>
        <button
          onClick={onRemove}
          className="font-mono text-[10px] uppercase tracking-widest text-paper/40 hover:text-alert"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
