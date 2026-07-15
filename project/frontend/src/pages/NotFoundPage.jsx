import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
      <p className="mb-4 font-mono text-6xl text-amber">404</p>
      <h1 className="mb-3 font-display text-2xl text-paper">Scan not found</h1>
      <p className="mb-8 max-w-sm text-sm text-paper/50">
        This page doesn't exist. It may have been moved or the address was mistyped.
      </p>
      <Link
        to="/"
        className="rounded bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft"
      >
        Back to home
      </Link>
    </div>
  )
}
