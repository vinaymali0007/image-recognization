import { useCallback, useRef, useState } from 'react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export default function UploadCard({ onFileSelected, onInvalidFile }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const validateAndSelect = useCallback(
    (file) => {
      if (!file) return
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onInvalidFile?.('Only JPG and PNG images are accepted.')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        onInvalidFile?.('File exceeds the 10MB upload limit.')
        return
      }
      onFileSelected(file)
    },
    [onFileSelected, onInvalidFile]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      validateAndSelect(file)
    },
    [validateAndSelect]
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      className={`group cursor-pointer rounded-lg border-2 border-dashed px-8 py-16 text-center transition-colors ${
        isDragging ? 'border-amber bg-amber/5' : 'border-line hover:border-amber/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => validateAndSelect(e.target.files?.[0])}
      />
      <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-line text-amber transition-colors group-hover:border-amber flex items-center justify-center">
        <span className="font-mono text-lg">↑</span>
      </div>
      <p className="mb-1 font-display text-lg text-paper">Drop an MRI scan here</p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-paper/40">
        or click to browse · JPG, JPEG, PNG · max 10MB
      </p>
    </div>
  )
}
