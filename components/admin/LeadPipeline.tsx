'use client'

import { useState } from 'react'
import { Lead, LeadStatus, STATUS_CONFIG, SOURCE_CONFIG } from './types'

interface Props {
  leads: Lead[]
  onUpdateStatus: (id: string, status: LeadStatus) => void
  onSelectLead: (lead: Lead) => void
}

const PIPELINE_STAGES: LeadStatus[] = ['nouveau', 'contacté', 'en_cours', 'qualifié', 'converti']

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? '#34D399' : score >= 60 ? '#F59E0B' : '#F87171'
  return (
    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ color, background: `${color}20` }}>
      {score}
    </span>
  )
}

export default function LeadPipeline({ leads, onUpdateStatus, onSelectLead }: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<LeadStatus | null>(null)

  const getLeadsByStatus = (status: LeadStatus) =>
    leads.filter(l => l.status === status)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault()
    if (draggingId) onUpdateStatus(draggingId, status)
    setDraggingId(null)
    setDragOverCol(null)
  }

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(diff / 86400000)
    if (h < 1) return 'il y a < 1h'
    if (h < 24) return `il y a ${h}h`
    return `il y a ${d}j`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white font-display font-bold text-lg">Pipeline de recrutement</h2>
          <p className="text-white/40 text-xs mt-0.5">Glisse les cartes pour changer le statut</p>
        </div>
        <span className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1">
          {leads.filter(l => l.status !== 'refusé').length} leads actifs
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3">
        {PIPELINE_STAGES.map((stage) => {
          const config = STATUS_CONFIG[stage]
          const stageLeads = getLeadsByStatus(stage)
          const isOver = dragOverCol === stage

          return (
            <div
              key={stage}
              className="flex-shrink-0 w-64 rounded-2xl border transition-all duration-200"
              style={{
                background: isOver ? config.bg : 'rgba(255,255,255,0.03)',
                borderColor: isOver ? config.border : 'rgba(255,255,255,0.08)',
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOverCol(stage) }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, stage)}
            >
              {/* Header colonne */}
              <div className="p-3 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{config.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: config.color }}>
                    {config.label}
                  </span>
                </div>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}
                >
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-2 space-y-2 min-h-[120px]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onClick={() => onSelectLead(lead)}
                    className={`
                      rounded-xl p-3 border cursor-pointer
                      transition-all duration-200
                      hover:border-white/20 hover:bg-white/[0.07]
                      active:scale-95
                      ${draggingId === lead.id ? 'opacity-40 scale-95' : 'opacity-100'}
                    `}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Nom + score */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-semibold">
                        {lead.prenom} {lead.nom[0]}.
                      </span>
                      <ScoreBadge score={lead.score} />
                    </div>

                    {/* Ville + source */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">📍 {lead.ville}</span>
                      <span className="text-xs" style={{ color: SOURCE_CONFIG[lead.source].color }}>
                        {SOURCE_CONFIG[lead.source].emoji}
                      </span>
                    </div>

                    {/* Tags */}
                    {lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lead.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Note si présente */}
                    {lead.notes && (
                      <p className="text-white/30 text-[10px] mt-2 truncate italic">
                        &ldquo;{lead.notes}&rdquo;
                      </p>
                    )}

                    {/* Date */}
                    <p className="text-white/20 text-[9px] mt-2">{timeAgo(lead.createdAt)}</p>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="flex items-center justify-center h-20 text-white/20 text-xs border-2 border-dashed border-white/5 rounded-xl">
                    Glisse ici
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
