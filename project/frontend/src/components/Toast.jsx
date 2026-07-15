import { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  const borderColor =
    type === 'error' ? 'border-alert' : type === 'success' ? 'border-clear' : 'border-amber'

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 max-w-xs animate-fade-up rounded border-l-2 ${borderColor} bg-void-raised bg-[#181C22] px-4 py-3 shadow-lg`}
    >
      <p className="text-xs text-paper/80">{message}</p>
    </div>
  )
}
