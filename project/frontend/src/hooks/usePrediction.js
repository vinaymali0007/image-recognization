import { useCallback, useState } from 'react'
import { predictImage } from '../services/api'

/**
 * Encapsulates the full upload -> predict -> history flow so the
 * PredictionPage component stays focused on layout/rendering.
 */
export function usePrediction() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  const selectFile = useCallback((newFile) => {
    setError(null)
    setResult(null)
    setFile(newFile)
    setPreviewUrl(newFile ? URL.createObjectURL(newFile) : null)
  }, [])

  const clearFile = useCallback(() => {
    setFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
  }, [])

  const runPrediction = useCallback(async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    const response = await predictImage(file)

    if (response.ok) {
      setResult(response.data)
      setHistory((prev) => [
        {
          id: Date.now(),
          fileName: file.name,
          prediction: response.data.prediction,
          confidence: response.data.confidence,
          isTumor: response.data.isTumor,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 10))
    } else {
      setError(response.error.message)
    }

    setLoading(false)
  }, [file])

  const clearHistory = useCallback(() => setHistory([]), [])

  return {
    file,
    previewUrl,
    result,
    loading,
    error,
    history,
    selectFile,
    clearFile,
    runPrediction,
    clearHistory,
  }
}
