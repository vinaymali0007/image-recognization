import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `text-xs tracking-[0.2em] uppercase transition-colors ${
    isActive ? 'text-amber' : 'text-paper/50 hover:text-paper'
  }`

export default function Navbar({ theme, onToggleTheme, apiStatus, user, onLogout }) {
  const statusColor =
    apiStatus === 'up' ? 'bg-clear' : apiStatus === 'down' ? 'bg-alert' : 'bg-amber/60'

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-paper">
          Neuro<span className="text-amber">Scan</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          <NavLink to="/predict" className={linkClass}>Diagnose</NavLink>
          {user && <NavLink to="/history" className={linkClass}>History</NavLink>}
          <NavLink to="/about" className={linkClass}>Model</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex" title={`API status: ${apiStatus}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusColor}`} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
              {apiStatus === 'up' ? 'Online' : apiStatus === 'down' ? 'Offline' : 'Checking'}
            </span>
          </div>
          <button
            onClick={onToggleTheme}
            className="rounded border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/60 hover:border-amber hover:text-amber"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          
          <div className="h-4 w-px bg-line/60"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-paper/70 md:inline-block">{user.name}</span>
              <button onClick={onLogout} className="rounded border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-alert hover:border-alert transition">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="font-mono text-[10px] uppercase tracking-widest text-paper/70 hover:text-amber transition">Login</Link>
              <Link to="/register" className="rounded bg-amber text-void px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-amber-soft transition">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
