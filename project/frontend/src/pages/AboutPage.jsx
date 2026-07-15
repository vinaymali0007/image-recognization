const SPECS = [
  ['Architecture', 'CNN (2 conv blocks + 2 FC layers)'],
  ['Input size', '32 × 32 px'],
  ['Channels', 'RGB (3ch)'],
  ['Parameters', '~2.1M'],
  ['Framework', 'PyTorch'],
  ['Inference device', 'CPU'],
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="mb-2 font-display text-3xl font-semibold text-paper">About the model</h1>
      <p className="mb-10 text-sm text-paper/50">
        A lightweight convolutional network trained to classify brain MRI slices
        into four categories.
      </p>

      <div className="mb-10 divide-y divide-line/60 rounded-lg border border-line">
        {SPECS.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-paper/40">{k}</span>
            <span className="text-sm text-paper/80">{v}</span>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="mb-3 font-display text-lg text-paper">Pipeline</h2>
        <ol className="space-y-2 text-sm text-paper/60">
          <li><span className="text-amber">1.</span> Image is decoded and converted to RGB.</li>
          <li><span className="text-amber">2.</span> Resized to 32×32 px and converted to a tensor.</li>
          <li><span className="text-amber">3.</span> Forward pass through the CNN produces raw logits.</li>
          <li><span className="text-amber">4.</span> Softmax converts logits into class probabilities.</li>
          <li><span className="text-amber">5.</span> The highest-probability class is returned as the diagnosis.</li>
        </ol>
      </div>

      <div className="rounded-lg border border-alert/30 bg-alert/5 p-6">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-alert">Limitations</p>
        <p className="text-sm leading-relaxed text-paper/60">
          Trained on a limited dataset at low resolution for demonstration purposes.
          It is not a substitute for professional radiological review, and its
          outputs should not inform any real medical decision.
        </p>
      </div>
    </div>
  )
}
