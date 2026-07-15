import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import PredictionPage from './pages/PredictionPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import PrivateRoute from './components/PrivateRoute'
import { useTheme } from './hooks/useTheme'
import { checkHealth } from './services/api'
import { useAuth } from './contexts/AuthContext'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [apiStatus, setApiStatus] = useState('checking')
  const { user, logout } = useAuth()

  useEffect(() => {
    let mounted = true

    async function poll() {
      const res = await checkHealth()
      if (mounted) setApiStatus(res.ok ? 'up' : 'down')
    }

    poll()
    const interval = setInterval(poll, 30000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar theme={theme} onToggleTheme={toggleTheme} apiStatus={apiStatus} user={user} onLogout={logout} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/predict" element={<PrivateRoute><PredictionPage /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
