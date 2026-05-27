import HeroSection from '@/components/landing/HeroSection'

export default function Home() {
  return (
    <main>
      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 1 — HERO                           */}
      {/* ═══════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2 — DISQUALIFICATION (à venir)     */}
      {/* ═══════════════════════════════════════════ */}
      <section id="disqualification" className="py-24 bg-iad-dark">
        {/* Prochaine section */}
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 3 — QUALIFICATION QUIZ (à venir)   */}
      {/* ═══════════════════════════════════════════ */}
      <section id="qualification" className="py-24 bg-[#0A0A1A]">
        {/* Prochaine section */}
      </section>

    </main>
  )
}
