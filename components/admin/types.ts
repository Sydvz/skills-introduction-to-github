// ═══════════════════════════════════════
// TYPES — Back Office IAD
// ═══════════════════════════════════════

export type LeadStatus =
  | 'nouveau'
  | 'contacté'
  | 'en_cours'
  | 'qualifié'
  | 'converti'
  | 'refusé'

export type LeadSource = 'instagram' | 'tiktok' | 'direct' | 'referral'

export interface Lead {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  ville: string
  status: LeadStatus
  source: LeadSource
  score: number          // 0–100, calculé depuis le quiz
  createdAt: string      // ISO date
  updatedAt: string
  notes: string
  quizAnswers?: Record<string, string>
  tags: string[]
}

export interface KPIData {
  totalLeads: number
  leadsAujourdhui: number
  tauxConversion: number
  revenuMoyenEstime: number
  leadsParSource: Record<LeadSource, number>
  evolutionSemaine: number  // % vs semaine dernière
}

export const STATUS_CONFIG: Record<LeadStatus, {
  label: string
  color: string
  bg: string
  border: string
  icon: string
}> = {
  nouveau:   { label: 'Nouveau',   color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)',  icon: '✦' },
  contacté:  { label: 'Contacté',  color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', icon: '📞' },
  en_cours:  { label: 'En cours',  color: '#A78BFA', bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.3)',icon: '⚡' },
  qualifié:  { label: 'Qualifié',  color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', icon: '⭐' },
  converti:  { label: 'Converti',  color: '#C8A44A', bg: 'rgba(200,164,74,0.12)', border: 'rgba(200,164,74,0.3)', icon: '🏆' },
  refusé:    { label: 'Refusé',    color: '#F87171', bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.3)',icon: '✕' },
}

export const SOURCE_CONFIG: Record<LeadSource, { label: string; color: string; emoji: string }> = {
  instagram: { label: 'Instagram', color: '#E1306C', emoji: '📸' },
  tiktok:    { label: 'TikTok',    color: '#69C9D0', emoji: '🎵' },
  direct:    { label: 'Direct',    color: '#94A3B8', emoji: '🔗' },
  referral:  { label: 'Parrainage',color: '#C8A44A', emoji: '👥' },
}

// ── Données de démo ──────────────────────────────────────────────
export const DEMO_LEADS: Lead[] = [
  {
    id: '1', prenom: 'Marie', nom: 'Dupont', email: 'marie.dupont@gmail.com',
    telephone: '06 12 34 56 78', ville: 'Lyon', status: 'nouveau',
    source: 'instagram', score: 82, createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    updatedAt: new Date().toISOString(), notes: '', tags: ['motivée', 'reconversion'],
  },
  {
    id: '2', prenom: 'Thomas', nom: 'Martin', email: 'thomas.m@hotmail.fr',
    telephone: '07 23 45 67 89', ville: 'Bordeaux', status: 'contacté',
    source: 'tiktok', score: 74, createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600000).toISOString(), notes: 'RDV planifié demain 14h', tags: ['urgent'],
  },
  {
    id: '3', prenom: 'Sophie', nom: 'Bernard', email: 'sbernard@outlook.com',
    telephone: '06 34 56 78 90', ville: 'Paris', status: 'en_cours',
    source: 'instagram', score: 91, createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600000).toISOString(), notes: 'Très motivée, ancienne commerciale', tags: ['top profil'],
  },
  {
    id: '4', prenom: 'Lucas', nom: 'Moreau', email: 'lmoreau@gmail.com',
    telephone: '07 45 67 89 01', ville: 'Nantes', status: 'qualifié',
    source: 'tiktok', score: 88, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600000).toISOString(), notes: '', tags: ['immobilier', 'réseau'],
  },
  {
    id: '5', prenom: 'Emma', nom: 'Petit', email: 'emma.petit@gmail.com',
    telephone: '06 56 78 90 12', ville: 'Toulouse', status: 'converti',
    source: 'referral', score: 95, createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(), notes: 'Signée ! Intègre le réseau le 1er du mois.', tags: ['top profil', 'signé'],
  },
  {
    id: '6', prenom: 'Antoine', nom: 'Simon', email: 'asntn@gmail.com',
    telephone: '07 67 89 01 23', ville: 'Marseille', status: 'refusé',
    source: 'instagram', score: 31, createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(), notes: 'Pas disponible avant 6 mois', tags: [],
  },
  {
    id: '7', prenom: 'Chloé', nom: 'Laurent', email: 'chloe.l@gmail.com',
    telephone: '06 78 90 12 34', ville: 'Lille', status: 'nouveau',
    source: 'tiktok', score: 67, createdAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    updatedAt: new Date().toISOString(), notes: '', tags: ['maman', 'télétravail'],
  },
  {
    id: '8', prenom: 'Hugo', nom: 'Leroy', email: 'hugo.leroy@orange.fr',
    telephone: '07 89 01 23 45', ville: 'Nice', status: 'contacté',
    source: 'direct', score: 78, createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 3600000).toISOString(), notes: '', tags: ['reconversion'],
  },
]
