export default function LoadingSpinner({ label = 'Analyzing scan…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-line" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-amber" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-paper/50">{label}</p>
    </div>
  )
}
