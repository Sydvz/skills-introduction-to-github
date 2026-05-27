'use client'

import { useState, useEffect } from 'react'
import { Lead, LeadStatus, DEMO_LEADS } from './types'
import StatsCards from './StatsCards'
import LeadPipeline from './LeadPipeline'
import LeadsList from './LeadsList'
import LeadDrawer from './LeadDrawer'

type View = 'pipeline' | 'liste' | 'stats'

function NavItem({
  active, onClick, icon, label
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-[#003087]/40 text-white border border-[#0055B8]/30'
          : 'text-white/50 hover:text-white/80 hover:bg-white/5'
      }`}
    >
      <span className={active ? 'text-[#60A5FA]' : 'text-white/30'}>{icon}</span>
      {label}
    </button>
  )
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS)
  const [view, setView] = useState<View>('pipeline')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [newLeadAlert, setNewLeadAlert] = useState(false)

  // Simuler un nouveau lead entrant après 5s
  useEffect(() => {
    const timer = setTimeout(() => setNewLeadAlert(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleUpdateStatus = (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l))
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status } : null)
    }
  }

  const handleUpdateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const addDemoLead = () => {
    const names = [['Julie', 'Fontaine'], ['Pierre', 'Leclerc'], ['Amina', 'Benali'], ['Romain', 'Gaudin']]
    const cities = ['Paris', 'Lyon', 'Bordeaux', 'Strasbourg', 'Rennes']
    const sources: Array<Lead['source']> = ['instagram', 'tiktok', 'direct']
    const pick = names[Math.floor(Math.random() * names.length)]
    const newLead: Lead = {
      id: String(Date.now()),
      prenom: pick[0], nom: pick[1],
      email: `${pick[0].toLowerCase()}.${pick[1].toLowerCase()}@gmail.com`,
      telephone: `06 ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      ville: cities[Math.floor(Math.random() * cities.length)],
      status: 'nouveau',
      source: sources[Math.floor(Math.random() * sources.length)],
      score: Math.floor(50 + Math.random() * 50),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '', tags: [],
    }
    setLeads(prev => [newLead, ...prev])
    setNewLeadAlert(false)
  }

  const nouveaux = leads.filter(l => l.status === 'nouveau').length

  return (
    <div className="flex h-screen bg-[#080810] text-white font-sans overflow-hidden">

      {/* ══ SIDEBAR ══ */}
      <aside className={`flex-shrink-0 border-r border-white/[0.08] flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-14'}`}
        style={{ background: '#0A0A16' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #003087, #0055B8)' }}>
            IAD
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-semibold text-sm">Back Office</p>
              <p className="text-white/30 text-[9px] uppercase tracking-widest">Recrutement</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <NavItem
            active={view === 'pipeline'} onClick={() => setView('pipeline')}
            label={sidebarOpen ? 'Pipeline' : ''}
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>}
          />
          <NavItem
            active={view === 'liste'} onClick={() => setView('liste')}
            label={sidebarOpen ? 'Leads' : ''}
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="12" r="1"/><circle cx="3" cy="18" r="1"/>
            </svg>}
          />
          <NavItem
            active={view === 'stats'} onClick={() => setView('stats')}
            label={sidebarOpen ? 'Statistiques' : ''}
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
            </svg>}
          />
        </nav>

        {/* Nouveau lead badge */}
        {nouveaux > 0 && sidebarOpen && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20">
            <p className="text-[#60A5FA] text-xs font-semibold">{nouveaux} nouveau{nouveaux > 1 ? 'x' : ''} lead{nouveaux > 1 ? 's' : ''}</p>
            <p className="text-white/40 text-[10px] mt-0.5">En attente de traitement</p>
          </div>
        )}

        {/* Toggle sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center h-10 border-t border-white/[0.06] text-white/30 hover:text-white/60 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </aside>

      {/* ══ MAIN ══ */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] flex-shrink-0"
          style={{ background: '#0A0A16' }}>
          <div>
            <h1 className="text-white font-display font-bold text-xl">
              {view === 'pipeline' ? 'Pipeline de recrutement'
                : view === 'liste' ? 'Gestion des leads'
                : 'Statistiques'}
            </h1>
            <p className="text-white/40 text-xs mt-0.5">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Alerte nouveau lead */}
            {newLeadAlert && (
              <button
                onClick={addDemoLead}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/25 text-[#60A5FA] text-xs font-medium animate-pulse hover:animate-none transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                Nouveau lead entrant !
              </button>
            )}

            {/* Simuler lead */}
            <button
              onClick={addDemoLead}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs hover:text-white hover:border-white/25 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Simuler lead
            </button>

            {/* Avatar admin */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#003087] to-[#0055B8] flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* KPIs toujours visibles */}
          <StatsCards leads={leads} />

          {/* Vue Pipeline */}
          {view === 'pipeline' && (
            <LeadPipeline
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onSelectLead={setSelectedLead}
            />
          )}

          {/* Vue Liste */}
          {view === 'liste' && (
            <LeadsList
              leads={leads}
              onSelectLead={setSelectedLead}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {/* Vue Stats */}
          {view === 'stats' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Répartition par source */}
              <div className="rounded-2xl border border-white/[0.08] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-white font-semibold mb-4">Leads par source</h3>
                {(['instagram', 'tiktok', 'direct', 'referral'] as const).map(src => {
                  const count = leads.filter(l => l.source === src).length
                  const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0
                  return (
                    <div key={src} className="mb-3">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>{src === 'instagram' ? '📸' : src === 'tiktok' ? '🎵' : src === 'direct' ? '🔗' : '👥'} {src}</span>
                        <span>{count} leads ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: src === 'instagram' ? '#E1306C' : src === 'tiktok' ? '#69C9D0' : src === 'direct' ? '#94A3B8' : '#C8A44A',
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Répartition par statut */}
              <div className="rounded-2xl border border-white/[0.08] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-white font-semibold mb-4">Leads par statut</h3>
                {(['nouveau', 'contacté', 'en_cours', 'qualifié', 'converti', 'refusé'] as const).map(status => {
                  const count = leads.filter(l => l.status === status).length
                  const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0
                  const config = { nouveau: '#60A5FA', contacté: '#F59E0B', en_cours: '#A78BFA', qualifié: '#34D399', converti: '#C8A44A', refusé: '#F87171' }
                  return (
                    <div key={status} className="mb-3">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span className="capitalize">{status}</span>
                        <span>{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: config[status] }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Top leads */}
              <div className="rounded-2xl border border-white/[0.08] p-5 lg:col-span-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-white font-semibold mb-4">🏆 Top profils (score ≥ 80)</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {leads.filter(l => l.score >= 80).sort((a,b) => b.score - a.score).map(lead => (
                    <button
                      key={lead.id}
                      onClick={() => { setSelectedLead(lead); setView('pipeline') }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: `hsl(${parseInt(lead.id) * 47 % 360}, 50%, 30%)` }}>
                        {lead.prenom[0]}{lead.nom[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{lead.prenom} {lead.nom}</p>
                        <p className="text-white/40 text-xs">📍 {lead.ville}</p>
                      </div>
                      <span className="text-sm font-black" style={{ color: lead.score >= 90 ? '#34D399' : '#F59E0B' }}>
                        {lead.score}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* ══ DRAWER LEAD ══ */}
      <LeadDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={handleUpdateLead}
      />
    </div>
  )
}
