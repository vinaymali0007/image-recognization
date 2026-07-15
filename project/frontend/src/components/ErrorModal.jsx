export default function ErrorModal({ message, onClose }) {
  if (!message) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-lg border border-alert/40 bg-void-soft bg-[#12151A] p-6">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-alert">
          Prediction failed
        </p>
        <p className="mb-5 text-sm text-paper/80">{message}</p>
        <button
          onClick={onClose}
          className="w-full rounded border border-line py-2 font-mono text-xs uppercase tracking-widest text-paper/70 hover:border-amber hover:text-amber"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
