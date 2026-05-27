import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IAD France — Voyons si c\'est fait pour toi',
  description: 'Découvre si le modèle IAD est fait pour toi. 5 000€/mois, 100% télétravail, 0 diplôme requis. Pas pour tout le monde.',
  keywords: ['IAD', 'mandataire immobilier', 'indépendant', 'télétravail', 'revenu complémentaire', 'reconversion'],
  openGraph: {
    title: 'IAD France — Voyons si c\'est fait pour toi',
    description: '5 000€/mois · 100% télétravail · 0 diplôme requis',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IAD France — Voyons si c\'est fait pour toi',
    description: '5 000€/mois · 100% télétravail · 0 diplôme requis',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-iad-dark text-white antialiased">
        {children}
      </body>
    </html>
  )
}
