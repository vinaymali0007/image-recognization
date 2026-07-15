export default function ProbabilityBars({ probabilities, prediction }) {
  const sorted = Object.entries(probabilities).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
        Class probabilities
      </p>
      {sorted.map(([label, pct]) => {
        const isPredicted = label === prediction
        return (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between">
              <span
                className={`text-xs ${isPredicted ? 'font-medium text-paper' : 'text-paper/50'}`}
              >
                {isPredicted && <span className="mr-1 text-amber">▸</span>}
                {label}
              </span>
              <span className={`font-mono text-xs ${isPredicted ? 'text-amber' : 'text-paper/30'}`}>
                {pct.toFixed(1)}%
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-line/60">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isPredicted ? 'bg-amber' : 'bg-paper/20'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
