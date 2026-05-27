'use client'

import { useState, useEffect } from 'react'
import AdminDashboard from '@/components/admin/AdminDashboard'

const ADMIN_PASSWORD = 'iad2025'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('iad_admin_auth')
    if (stored === 'true') setAuthed(true)
    setChecking(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('iad_admin_auth', 'true')
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('iad_admin_auth')
    setAuthed(false)
    setPassword('')
  }

  if (checking) return (
    <div className="flex items-center justify-center h-screen bg-[#080810]">
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#0055B8] animate-spin" />
    </div>
  )

  if (authed) return (
    <div className="relative">
      {/* Bouton déconnexion discret */}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 z-50 text-xs text-white/20 hover:text-white/50 transition-colors bg-black/40 px-3 py-1.5 rounded-lg border border-white/5"
      >
        Déconnexion
      </button>
      <AdminDashboard />
    </div>
  )

  // ── Écran de connexion ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center px-4">

      {/* Fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #0055B8 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #003087 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Card login */}
        <div className="rounded-3xl border border-white/10 p-8"
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-lg mb-4"
              style={{ background: 'linear-gradient(135deg, #003087, #0055B8)', boxShadow: '0 0 30px rgba(0,85,184,0.4)' }}>
              IAD
            </div>
            <h1 className="text-white font-display font-black text-2xl">Back Office</h1>
            <p className="text-white/40 text-sm mt-1">Accès réservé à l&apos;équipe</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Champ mot de passe */}
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false) }}
                  placeholder="••••••••"
                  autoFocus
                  className={`
                    w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm
                    placeholder-white/20 focus:outline-none transition-all duration-200 pr-10
                    ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    {showPass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Mot de passe incorrect
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.02] active:scale-100"
              style={{ background: 'linear-gradient(135deg, #003087, #0055B8)' }}
            >
              Accéder au dashboard
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-6">
            IAD France · Espace recrutement interne
          </p>
        </div>

        {/* Hint discret pour la démo */}
        <p className="text-center text-white/15 text-xs mt-4">
          Demo : <span className="font-mono">iad2025</span>
        </p>
      </div>
    </div>
  )
}
