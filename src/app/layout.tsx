import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { ConfigProvider } from '@/components/ConfigProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KRAKEN - Equipos Premium de Freediving | Tienda Especializada',
  description: 'Descubre KRAKEN, tu tienda premium de equipos de freediving y buceo libre. Máscaras, aletas, trajes de neopreno y accesorios de la más alta calidad para profesionales y entusiastas.',
  keywords: 'freediving, buceo libre, equipos submarinos, máscaras buceo, aletas freediving, trajes neopreno, KRAKEN, equipos profesionales',
  authors: [{ name: 'KRAKEN Freediving Store' }],
  creator: 'KRAKEN',
  publisher: 'KRAKEN',
  robots: 'index, follow',
  metadataBase: new URL('https://kraken-freediving.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KRAKEN - Equipos Premium de Freediving',
    description: 'La tienda líder en equipos de freediving. Calidad profesional, diseño premium.',
    url: 'https://kraken-freediving.com',
    siteName: 'KRAKEN Freediving Store',
    images: [
      {
        url: '/kraken-logo.png',
        width: 800,
        height: 800,
        alt: 'KRAKEN - Equipos Premium de Freediving',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KRAKEN - Equipos Premium de Freediving',
    description: 'La tienda líder en equipos de freediving. Calidad profesional, diseño premium.',
    images: ['/kraken-logo.png'],
    creator: '@kraken_freediving',
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/kraken-logo.png" />
        <link rel="shortcut icon" type="image/png" href="/kraken-logo.png" />
        <link rel="apple-touch-icon" href="/kraken-logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0c4a6e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "KRAKEN Freediving Store",
              description: "Tienda especializada en equipos premium de freediving y buceo libre",
              url: "https://kraken-freediving.com",
              logo: "https://kraken-freediving.com/kraken-logo.svg",
              image: "https://kraken-freediving.com/kraken-logo.png",
              telephone: "+34-XXX-XXX-XXX",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES"
              },
              sameAs: [
                "https://instagram.com/kraken_freediving",
                "https://facebook.com/kraken_freediving",
                "https://youtube.com/kraken_freediving"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ConfigProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <Cart />
            </FavoritesProvider>
          </CartProvider>
        </ConfigProvider>
      </body>
    </html>
  )
} 