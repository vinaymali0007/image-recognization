import ProbabilityBars from './ProbabilityBars'

export default function PredictionCard({ result, onCopy, onDownload, onReset }) {
  const { prediction, confidence, probabilities, isTumor, processingTime } = result

  return (
    <div className="animate-fade-up rounded-lg border border-line bg-void-soft bg-[#12151A] p-6">
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className={`rounded border-t-2 ${isTumor ? 'border-alert' : 'border-clear'} bg-void/50 p-4`}>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-paper/40">
            Diagnosis
          </p>
          <p className={`font-display text-xl font-semibold ${isTumor ? 'text-alert' : 'text-clear'}`}>
            {prediction}
          </p>
        </div>
        <div className="rounded border-t-2 border-amber bg-void/50 p-4">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-paper/40">
            Confidence
          </p>
          <p className="font-display text-xl font-semibold text-paper">{confidence.toFixed(1)}%</p>
        </div>
      </div>

      <ProbabilityBars probabilities={probabilities} prediction={prediction} />

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="rounded border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/50">
          {processingTime}
        </span>
        <span
          className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
            isTumor ? 'border-alert/30 text-alert' : 'border-clear/30 text-clear'
          }`}
        >
          {isTumor ? 'Tumor detected' : 'Clear scan'}
        </span>

        <div className="ml-auto flex gap-2">
          <button
            onClick={onCopy}
            className="rounded border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper/60 hover:border-amber hover:text-amber"
          >
            Copy
          </button>
          <button
            onClick={onDownload}
            className="rounded border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper/60 hover:border-amber hover:text-amber"
          >
            Download JSON
          </button>
          <button
            onClick={onReset}
            className="rounded bg-amber px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-void hover:bg-amber-soft"
          >
            New scan
          </button>
        </div>
      </div>
    </div>
  )
}
