import { Link } from 'react-router-dom'

const CLASSES = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary']

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-xl border border-line bg-void-soft bg-[#12151A] px-8 py-16 sm:px-16">
        {/* signature: scanning sweep line evoking an MRI pass */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-amber/10 to-transparent animate-sweep" />
        </div>

        <p className="relative mb-4 font-mono text-xs uppercase tracking-[0.3em] text-amber">
          ◈ Neuroimaging classification system
        </p>
        <h1 className="relative mb-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-paper sm:text-6xl">
          Read the scan <span className="text-amber">before</span> the radiologist does.
        </h1>
        <p className="relative mb-10 max-w-xl text-sm leading-relaxed text-paper/60 sm:text-base">
          Upload an axial MRI slice and a convolutional neural network trained on
          four tumor classes returns a diagnosis with full confidence breakdown —
          in milliseconds, entirely in your browser session.
        </p>

        <div className="relative flex flex-wrap gap-4">
          <Link
            to="/predict"
            className="rounded bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft"
          >
            Run a diagnosis →
          </Link>
          <Link
            to="/about"
            className="rounded border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper/70 hover:border-amber hover:text-amber"
          >
            How it works
          </Link>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CLASSES.map((c) => (
          <div key={c} className="rounded-lg border border-line bg-void-soft bg-[#12151A] px-4 py-5 text-center">
            <p className="font-display text-sm text-paper">{c}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-line bg-void-soft bg-[#12151A] p-8">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-alert">
          ⚠ Research use only
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-paper/60">
          This tool is an educational demonstration of CNN-based medical image
          classification. It has not been validated for clinical use and must
          never substitute a diagnosis from a qualified radiologist.
        </p>
      </div>
    </div>
  )
}
