import { useState } from 'react'
import UploadCard from '../components/UploadCard'
import ImagePreview from '../components/ImagePreview'
import PredictionCard from '../components/PredictionCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Toast from '../components/Toast'
import ErrorModal from '../components/ErrorModal'
import { usePrediction } from '../hooks/usePrediction'

export default function PredictionPage() {
  const {
    file, previewUrl, result, loading, error,
    history, selectFile, clearFile, runPrediction, clearHistory,
  } = usePrediction()

  const [toast, setToast] = useState(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setToast('Prediction copied to clipboard')
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neuroscan-result-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setToast('Result downloaded')
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="mb-2 font-display text-3xl font-semibold text-paper">Run a diagnosis</h1>
      <p className="mb-10 text-sm text-paper/50">
        Upload a single axial MRI slice (JPG or PNG, up to 10MB).
      </p>

      {!file && (
        <UploadCard
          onFileSelected={selectFile}
          onInvalidFile={(msg) => setToast(msg)}
        />
      )}

      {file && !result && !loading && (
        <div className="space-y-6">
          <ImagePreview
            previewUrl={previewUrl}
            fileName={file.name}
            fileSize={file.size}
            onRemove={clearFile}
          />
          <button
            onClick={runPrediction}
            className="w-full rounded bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft"
          >
            Run classification
          </button>
        </div>
      )}

      {loading && <LoadingSpinner />}

      {result && !loading && (
        <div className="space-y-6">
          <ImagePreview
            previewUrl={previewUrl}
            fileName={file.name}
            fileSize={file.size}
            onRemove={clearFile}
          />
          <PredictionCard
            result={result}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onReset={clearFile}
          />
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-14">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
              Recent history
            </p>
            <button
              onClick={clearHistory}
              className="font-mono text-[10px] uppercase tracking-widest text-paper/30 hover:text-alert"
            >
              Clear
            </button>
          </div>
          <div className="divide-y divide-line/60 rounded-lg border border-line">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-xs text-paper/80">{h.fileName}</p>
                  <p className="font-mono text-[10px] text-paper/30">{h.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${h.isTumor ? 'text-alert' : 'text-clear'}`}>
                    {h.prediction}
                  </p>
                  <p className="font-mono text-[10px] text-paper/40">{h.confidence.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {error && <ErrorModal message={error} onClose={clearFile} />}
    </div>
  )
}
