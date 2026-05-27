'use client'

import { useState } from 'react'
import { Lead, LeadStatus, STATUS_CONFIG, SOURCE_CONFIG } from './types'

interface Props {
  leads: Lead[]
  onSelectLead: (lead: Lead) => void
  onUpdateStatus: (id: string, status: LeadStatus) => void
}

export default function LeadsList({ leads, onSelectLead, onUpdateStatus }: Props) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all')
  const [filterSource, setFilterSource] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date')

  const filtered = leads
    .filter(l => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        l.prenom.toLowerCase().includes(q) ||
        l.nom.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.ville.toLowerCase().includes(q)
      const matchStatus = filterStatus === 'all' || l.status === filterStatus
      const matchSource = filterSource === 'all' || l.source === filterSource
      return matchSearch && matchStatus && matchSource
    })
    .sort((a, b) => sortBy === 'score'
      ? b.score - a.score
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(diff / 86400000)
    if (h < 1) return '< 1h'
    if (h < 24) return `${h}h`
    return `${d}j`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white font-display font-bold text-lg">Tous les leads</h2>
          <p className="text-white/40 text-xs mt-0.5">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>
        </div>
        {/* Export CSV basique */}
        <button
          onClick={() => {
            const csv = [
              'Prénom,Nom,Email,Téléphone,Ville,Source,Statut,Score,Date',
              ...leads.map(l => `${l.prenom},${l.nom},${l.email},${l.telephone},${l.ville},${l.source},${l.status},${l.score},${new Date(l.createdAt).toLocaleDateString('fr-FR')}`)
            ].join('\n')
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url; a.download = 'leads-iad.csv'; a.click()
          }}
          className="flex items-center gap-2 text-xs text-white/50 border border-white/10 rounded-xl px-3 py-2 hover:text-white hover:border-white/25 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Recherche */}
        <div className="relative flex-1 min-w-48">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30">
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors"
          />
        </div>

        {/* Filtre statut */}
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as LeadStatus | 'all')}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-white/25 transition-colors"
        >
          <option value="all">Tous statuts</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>

        {/* Filtre source */}
        <select
          value={filterSource}
          onChange={e => setFilterSource(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-white/25 transition-colors"
        >
          <option value="all">Toutes sources</option>
          {Object.entries(SOURCE_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.emoji} {v.label}</option>
          ))}
        </select>

        {/* Tri */}
        <button
          onClick={() => setSortBy(s => s === 'date' ? 'score' : 'date')}
          className="flex items-center gap-1.5 text-xs text-white/50 border border-white/10 rounded-xl px-3 py-2 hover:text-white hover:border-white/25 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M7 12h10M11 18h2" />
          </svg>
          Tri : {sortBy === 'date' ? 'Date' : 'Score'}
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          {['Contact', 'Email', 'Ville', 'Source', 'Statut', 'Score'].map(h => (
            <span key={h} className="text-xs text-white/40 font-medium uppercase tracking-wider">{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-white/30 text-sm">
            Aucun lead trouvé
          </div>
        ) : (
          filtered.map((lead, i) => {
            const sc = STATUS_CONFIG[lead.status]
            return (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className={`
                  grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-3 px-4 py-3.5
                  border-b border-white/[0.04] last:border-0
                  cursor-pointer hover:bg-white/[0.04] transition-colors duration-150
                  ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}
                `}
              >
                {/* Contact */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: `hsl(${parseInt(lead.id) * 47}, 50%, 30%)` }}
                  >
                    {lead.prenom[0]}{lead.nom[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-tight">{lead.prenom} {lead.nom}</p>
                    <p className="text-white/30 text-[10px]">{lead.telephone} · {timeAgo(lead.createdAt)}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <span className="text-white/50 text-xs truncate">{lead.email}</span>
                </div>

                {/* Ville */}
                <div className="flex items-center">
                  <span className="text-white/60 text-xs">📍 {lead.ville}</span>
                </div>

                {/* Source */}
                <div className="flex items-center">
                  <span className="text-xs font-medium" style={{ color: SOURCE_CONFIG[lead.source].color }}>
                    {SOURCE_CONFIG[lead.source].emoji} {SOURCE_CONFIG[lead.source].label}
                  </span>
                </div>

                {/* Statut */}
                <div className="flex items-center">
                  <select
                    value={lead.status}
                    onClick={e => e.stopPropagation()}
                    onChange={e => { e.stopPropagation(); onUpdateStatus(lead.id, e.target.value as LeadStatus) }}
                    className="text-xs font-medium rounded-lg px-2 py-1 border cursor-pointer focus:outline-none transition-colors"
                    style={{
                      color: sc.color,
                      background: sc.bg,
                      borderColor: sc.border,
                    }}
                  >
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                      <option key={k} value={k} style={{ background: '#0A0A0F', color: '#fff' }}>{v.label}</option>
                    ))}
                  </select>
                </div>

                {/* Score */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${lead.score}%`,
                          background: lead.score >= 80 ? '#34D399' : lead.score >= 60 ? '#F59E0B' : '#F87171',
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white/70 w-7 text-right">{lead.score}</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
