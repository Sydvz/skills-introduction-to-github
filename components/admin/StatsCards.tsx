'use client'

import { Lead } from './types'

interface Props { leads: Lead[] }

export default function StatsCards({ leads }: Props) {
  const today = new Date().toDateString()
  const leadsAujourdhui = leads.filter(l => new Date(l.createdAt).toDateString() === today).length
  const convertis = leads.filter(l => l.status === 'converti').length
  const tauxConversion = leads.length > 0 ? Math.round((convertis / leads.length) * 100) : 0
  const scoresMoyen = leads.length > 0 ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0
  const instagramLeads = leads.filter(l => l.source === 'instagram').length
  const tiktokLeads = leads.filter(l => l.source === 'tiktok').length

  const cards = [
    {
      label: 'Total leads',
      value: leads.length.toString(),
      sub: `+${leadsAujourdhui} aujourd'hui`,
      color: '#60A5FA',
      bg: 'rgba(96,165,250,0.08)',
      border: 'rgba(96,165,250,0.2)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      trend: '+18%',
      trendUp: true,
    },
    {
      label: 'Taux de conversion',
      value: `${tauxConversion}%`,
      sub: `${convertis} convertis`,
      color: '#C8A44A',
      bg: 'rgba(200,164,74,0.08)',
      border: 'rgba(200,164,74,0.2)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      trend: '+5%',
      trendUp: true,
    },
    {
      label: 'Score moyen quiz',
      value: `${scoresMoyen}/100`,
      sub: 'Qualité du trafic',
      color: '#34D399',
      bg: 'rgba(52,211,153,0.08)',
      border: 'rgba(52,211,153,0.2)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      trend: '+3pts',
      trendUp: true,
    },
    {
      label: 'Sources actives',
      value: '2',
      sub: `📸 ${instagramLeads} · 🎵 ${tiktokLeads}`,
      color: '#A78BFA',
      bg: 'rgba(167,139,250,0.08)',
      border: 'rgba(167,139,250,0.2)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
      trend: 'Instagram · TikTok',
      trendUp: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02]"
          style={{ background: card.bg, borderColor: card.border }}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${card.color}20`, color: card.color }}
            >
              {card.icon}
            </div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                color: card.trendUp ? '#34D399' : '#F87171',
                background: card.trendUp ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)',
              }}
            >
              {card.trend}
            </span>
          </div>
          <p className="font-display font-black text-2xl text-white mb-1">{card.value}</p>
          <p className="text-white/50 text-xs">{card.label}</p>
          <p className="text-white/30 text-xs mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  )
}
