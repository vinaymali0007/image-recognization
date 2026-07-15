import { useEffect, useState } from 'react'

/**
 * Manages dark/light theme, persisted for the session via React state
 * (no localStorage — kept in-memory per app load) and reflected onto
 * the <html> element so Tailwind's `dark:`/`.light` selectors apply.
 */
export function useTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
