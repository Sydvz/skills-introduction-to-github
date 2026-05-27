'use client'

import { useState, useEffect } from 'react'
import { Lead, LeadStatus, STATUS_CONFIG, SOURCE_CONFIG } from './types'

interface Props {
  lead: Lead | null
  onClose: () => void
  onUpdate: (id: string, updates: Partial<Lead>) => void
}

const TEMPLATES = [
  {
    label: 'Prise de contact initiale',
    body: `Bonjour {prenom},\n\nJ'ai bien reçu ta candidature et je suis ravie de te contacter.\n\nTon profil correspond à ce que nous recherchons chez IAD France. J'aimerais t'appeler pour échanger 15 minutes sur tes objectifs et te présenter notre modèle.\n\nQuand es-tu disponible cette semaine ?\n\nÀ très vite,`,
  },
  {
    label: 'Relance J+2',
    body: `Bonjour {prenom},\n\nJe me permets de revenir vers toi suite à ta demande sur notre modèle IAD.\n\nNombreux sont ceux qui hésitent au début — c'est tout à fait normal. Je serai heureux(se) de répondre à tes questions.\n\nUn appel de 10 minutes suffit pour clarifier les choses.\n\nDisponible ?`,
  },
  {
    label: 'Confirmation RDV',
    body: `Bonjour {prenom},\n\nParfait ! Je confirme notre échange :\n📅 Date et heure convenus\n📞 Je t'appellerai sur le numéro indiqué\n\nD'ici là, n'hésite pas à consulter notre site : iad-immobilier.fr\n\nÀ très vite !`,
  },
]

export default function LeadDrawer({ lead, onClose, onUpdate }: Props) {
  const [note, setNote] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'notes' | 'contact'>('info')

  useEffect(() => {
    if (lead) {
      setNote(lead.notes)
      setActiveTab('info')
      setSelectedTemplate(null)
    }
  }, [lead])

  if (!lead) return null

  const sc = STATUS_CONFIG[lead.status]

  const getTemplateBody = (template: string) =>
    template.replace('{prenom}', lead.prenom)

  const handleSaveNote = () => {
    onUpdate(lead.id, { notes: note, updatedAt: new Date().toISOString() })
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col border-l border-white/10"
        style={{ background: '#0D0D1A' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold text-white"
              style={{ background: `hsl(${parseInt(lead.id) * 47}, 50%, 30%)` }}
            >
              {lead.prenom[0]}{lead.nom[0]}
            </div>
            <div>
              <p className="text-white font-semibold">{lead.prenom} {lead.nom}</p>
              <p className="text-white/40 text-xs">📍 {lead.ville}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Status + Score */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <select
            value={lead.status}
            onChange={e => onUpdate(lead.id, { status: e.target.value as LeadStatus, updatedAt: new Date().toISOString() })}
            className="flex-1 text-sm font-medium rounded-xl px-3 py-2 border cursor-pointer focus:outline-none"
            style={{ color: sc.color, background: sc.bg, borderColor: sc.border }}
          >
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <option key={k} value={k} style={{ background: '#0A0A0F', color: '#fff' }}>{v.icon} {v.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50 text-xs">Score</span>
            <span
              className="font-bold text-sm"
              style={{ color: lead.score >= 80 ? '#34D399' : lead.score >= 60 ? '#F59E0B' : '#F87171' }}
            >
              {lead.score}/100
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 py-3 border-b border-white/[0.06]">
          {(['info', 'notes', 'contact'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab === 'info' ? 'Infos' : tab === 'notes' ? 'Notes' : 'Contacter'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* TAB : INFOS */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              {[
                { label: 'Email', value: lead.email, icon: '✉️' },
                { label: 'Téléphone', value: lead.telephone, icon: '📞' },
                { label: 'Ville', value: lead.ville, icon: '📍' },
                { label: 'Source', value: `${SOURCE_CONFIG[lead.source].emoji} ${SOURCE_CONFIG[lead.source].label}`, icon: '' },
                { label: 'Créé', value: new Date(lead.createdAt).toLocaleString('fr-FR'), icon: '📅' },
                { label: 'Mis à jour', value: new Date(lead.updatedAt).toLocaleString('fr-FR'), icon: '🔄' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-base w-6">{item.icon}</span>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Tags */}
              {lead.tags.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Score visuel */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Score de qualification</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${lead.score}%`,
                        background: lead.score >= 80 ? '#34D399' : lead.score >= 60 ? '#F59E0B' : '#F87171',
                      }}
                    />
                  </div>
                  <span className="text-white font-bold text-sm w-12 text-right">{lead.score}/100</span>
                </div>
                <p className="text-white/30 text-xs mt-1">
                  {lead.score >= 80 ? '🟢 Excellent profil' : lead.score >= 60 ? '🟡 Profil moyen' : '🔴 Profil faible'}
                </p>
              </div>
            </div>
          )}

          {/* TAB : NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Notes internes</p>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={8}
                  placeholder="Ajoute tes notes ici…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/20 resize-none focus:outline-none focus:border-white/25 transition-colors"
                />
              </div>
              <button
                onClick={handleSaveNote}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-100"
                style={{ background: 'linear-gradient(135deg, #003087, #0055B8)' }}
              >
                Sauvegarder
              </button>
            </div>
          )}

          {/* TAB : CONTACTER */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <p className="text-white/40 text-xs uppercase tracking-wider">Templates de message</p>
              {TEMPLATES.map((tmpl, i) => (
                <div key={i}>
                  <button
                    onClick={() => setSelectedTemplate(selectedTemplate === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
                  >
                    <span className="text-sm text-white/80 font-medium">{tmpl.label}</span>
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className={`w-4 h-4 text-white/40 transition-transform ${selectedTemplate === i ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {selectedTemplate === i && (
                    <div className="mt-2 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                      <pre className="p-4 text-xs text-white/70 whitespace-pre-wrap font-sans leading-relaxed">
                        {getTemplateBody(tmpl.body)}
                      </pre>
                      <div className="px-4 pb-3 flex gap-2">
                        <button
                          onClick={() => navigator.clipboard.writeText(getTemplateBody(tmpl.body))}
                          className="flex-1 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
                        >
                          Copier
                        </button>
                        <a
                          href={`mailto:${lead.email}?subject=IAD France — Votre demande&body=${encodeURIComponent(getTemplateBody(tmpl.body))}`}
                          className="flex-1 py-2 text-xs rounded-lg text-center font-semibold text-white transition-all hover:scale-[1.02]"
                          style={{ background: 'linear-gradient(135deg, #003087, #0055B8)' }}
                        >
                          Envoyer par mail
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Actions rapides */}
              <div className="pt-2 space-y-2">
                <p className="text-white/40 text-xs uppercase tracking-wider">Actions rapides</p>
                <a
                  href={`tel:${lead.telephone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/15 transition-all"
                >
                  <span>📞</span> Appeler {lead.prenom}
                </a>
                <a
                  href={`https://wa.me/33${lead.telephone.replace(/\s/g, '').slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 transition-all"
                >
                  <span>💬</span> WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
