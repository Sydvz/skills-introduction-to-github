'use client'

import { useEffect, useState } from 'react'

// --- Icônes SVG inline pour éviter les dépendances ---
const EuroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 6.5A6 6 0 1 0 14.5 17.5M3 12h8M3 9h8" />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12L12 3l9 9M4 10.5V21h5v-6h6v6h5V10.5" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  </svg>
)

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
)

// --- Compteur animé ---
function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return (
    <span>{prefix}{count.toLocaleString('fr-FR')}{suffix}</span>
  )
}

// --- Badge flottant ---
function FloatingBadge({
  text,
  delay = '0s',
  position
}: {
  text: string;
  delay?: string;
  position: string
}) {
  return (
    <div
      className={`absolute ${position} glass rounded-full px-3 py-1.5 text-xs font-medium text-white/80 border border-white/10 animate-float hidden lg:flex items-center gap-1.5`}
      style={{ animationDelay: delay }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
      {text}
    </div>
  )
}

// --- Composant principal ---
export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToQuiz = () => {
    document.getElementById('qualification')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-iad-dark">

      {/* ══ FOND VISUEL ══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A1E] via-[#0A0A0F] to-[#0A0F1A]" />

        {/* Orbes lumineux */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #0055B8 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #003087 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C8A44A 0%, transparent 70%)' }} />

        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

        {/* Ligne décorative IAD */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0055B8] to-transparent opacity-60" />
      </div>

      {/* ══ NAVIGATION MINIMALE ══ */}
      <nav className={`relative z-10 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3">
          {/* Logo IAD simplifié */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-iad flex items-center justify-center font-display font-900 text-white text-sm glow-blue">
              IAD
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-sm tracking-wide">IAD France</span>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Réseau Immobilier</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Recrutement ouvert
          </span>
          <button
            onClick={scrollToQuiz}
            className="text-xs font-medium text-white/70 border border-white/15 rounded-full px-4 py-2 hover:border-white/30 hover:text-white transition-all duration-300"
          >
            Tester mon profil
          </button>
        </div>
      </nav>

      {/* ══ CONTENU PRINCIPAL ══ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* COLONNE GAUCHE — Texte principal */}
            <div className="space-y-8">

              {/* Badge d'accroche */}
              <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium text-[#C8A44A] border border-[#C8A44A]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A44A] animate-pulse" />
                  Ce n&apos;est pas pour tout le monde
                </span>
              </div>

              {/* Titre principal */}
              <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight">
                  <span className="text-white">Voyons si</span>
                  <br />
                  <span className="text-white">c&apos;est</span>
                  {' '}
                  <span className="gradient-text-gold">fait pour</span>
                  <br />
                  <span className="text-white">toi.</span>
                </h1>
              </div>

              {/* Sous-titre */}
              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg">
                  Des centaines de personnes gagnent leur vie dans l&apos;immobilier
                  sans patron, sans bureau et sans diplôme.
                  <span className="text-white/90 font-medium"> Toi, tu peux aussi — mais d&apos;abord, vérifions.</span>
                </p>
              </div>

              {/* 3 Piliers */}
              <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="grid grid-cols-3 gap-3">

                  {/* Pilier 1 — Revenus */}
                  <div className="glass-blue rounded-2xl p-4 space-y-2 group hover:border-[#0055B8]/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#0055B8]/20 flex items-center justify-center text-[#4488FF] group-hover:bg-[#0055B8]/30 transition-colors">
                      <EuroIcon />
                    </div>
                    <div>
                      <p className="font-display font-black text-xl text-white leading-none">5 000€</p>
                      <p className="text-white/50 text-xs mt-1">par mois</p>
                    </div>
                  </div>

                  {/* Pilier 2 — Télétravail */}
                  <div className="glass-blue rounded-2xl p-4 space-y-2 group hover:border-[#0055B8]/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#0055B8]/20 flex items-center justify-center text-[#4488FF] group-hover:bg-[#0055B8]/30 transition-colors">
                      <HomeIcon />
                    </div>
                    <div>
                      <p className="font-display font-black text-xl text-white leading-none">100%</p>
                      <p className="text-white/50 text-xs mt-1">télétravail</p>
                    </div>
                  </div>

                  {/* Pilier 3 — Diplôme */}
                  <div className="glass-blue rounded-2xl p-4 space-y-2 group hover:border-[#0055B8]/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#0055B8]/20 flex items-center justify-center text-[#4488FF] group-hover:bg-[#0055B8]/30 transition-colors">
                      <ShieldIcon />
                    </div>
                    <div>
                      <p className="font-display font-black text-xl text-white leading-none">0</p>
                      <p className="text-white/50 text-xs mt-1">diplôme requis</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* CTA principal */}
              <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="flex flex-col sm:flex-row gap-3">

                  {/* Bouton principal */}
                  <button
                    onClick={scrollToQuiz}
                    className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100"
                    style={{ background: 'linear-gradient(135deg, #003087, #0055B8)' }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="relative z-10 text-white">Découvrir si c&apos;est pour moi</span>
                    <span className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </button>

                  {/* Bouton secondaire */}
                  <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium text-sm text-white/60 border border-white/10 hover:border-white/25 hover:text-white/90 transition-all duration-300">
                    Voir des témoignages
                  </button>

                </div>

                {/* Micro-preuve sociale sous les boutons */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['M', 'S', 'A', 'L'].map((initial, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-iad-dark flex items-center justify-center text-[10px] font-bold text-white"
                        style={{
                          background: `hsl(${210 + i * 20}, 60%, 35%)`,
                          zIndex: 4 - i
                        }}
                      >
                        {initial}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/50 text-xs">
                    <span className="text-white/80 font-medium">+1 400 conseillers</span> actifs en France
                  </p>
                </div>

              </div>
            </div>

            {/* COLONNE DROITE — Carte de statut + Stats */}
            <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>

              {/* Badges flottants */}
              <FloatingBadge text="Reconversion réussie" position="top-4 -left-4" delay="0s" />
              <FloatingBadge text="Première vente en 3 mois" position="bottom-20 -left-6" delay="1s" />
              <FloatingBadge text="Indépendant depuis 2 ans" position="top-12 -right-4" delay="0.5s" />

              {/* Carte principale */}
              <div className="relative glass rounded-3xl p-6 md:p-8 border border-white/10 overflow-hidden">

                {/* Glow intérieur */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #0055B8, transparent)' }} />

                {/* Header de carte */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Ton potentiel mensuel</p>
                    <p className="font-display font-black text-4xl md:text-5xl gradient-text-gold">
                      <AnimatedCounter end={5000} suffix="€" />
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl gradient-iad flex items-center justify-center glow-blue">
                    <span className="font-display font-black text-white text-sm">IAD</span>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mb-8 space-y-3">
                  {[
                    { label: 'Liberté financière', value: 85, color: '#4488FF' },
                    { label: 'Flexibilité d\'emploi du temps', value: 95, color: '#C8A44A' },
                    { label: 'Évolution de carrière', value: 78, color: '#44BB88' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-white/50 mb-1.5">
                        <span>{item.label}</span>
                        <span style={{ color: item.color }}>{item.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 delay-700"
                          style={{
                            width: isVisible ? `${item.value}%` : '0%',
                            background: item.color,
                            boxShadow: `0 0 8px ${item.color}60`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-6">
                  <p className="text-white/40 text-xs uppercase tracking-widest">Conditions d&apos;accès</p>
                  {[
                    'Avoir envie d\'indépendance',
                    'Aimer le contact humain',
                    'Motivation à apprendre',
                    'Zéro diplôme requis',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: 16, suffix: 'ans', label: "d'expérience" },
                      { value: 90, suffix: 'pays', label: 'présence' },
                      { value: 23, suffix: 'k+', label: 'conseillers' },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display font-black text-xl text-white">
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1500} />
                        </p>
                        <p className="text-white/40 text-[11px] mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ SCROLL INDICATOR ══ */}
      <div className={`relative z-10 flex justify-center pb-8 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={scrollToQuiz}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300 group"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Défiler</span>
          <span className="animate-bounce group-hover:text-white/60">
            <ChevronDown />
          </span>
        </button>
      </div>

    </section>
  )
}
