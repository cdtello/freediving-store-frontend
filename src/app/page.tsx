import React from 'react'
import Link from 'next/link'

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #030712 0%, #0c1424 30%, #082f49 60%, #0c4a6e 100%)',
    }}>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            
            {/* Badge Premium */}
            <div className="mb-8">
              <div className="inline-block mb-6">
                <span className="text-xs font-mono font-bold tracking-ultra-wide uppercase px-6 py-3 rounded-full"
                      style={{
                        background: 'rgba(8, 47, 73, 0.2)',
                        border: '1px solid rgba(14, 165, 233, 0.4)',
                        color: 'rgba(14, 165, 233, 0.9)',
                        boxShadow: '0 8px 24px rgba(8, 47, 73, 0.3)',
                      }}>
                  DESDE LAS PROFUNDIDADES
                </span>
              </div>
              
              {/* KRAKEN Logo y Title Ultra Premium */}
              <div className="mb-12">
                <div className="mx-auto w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-8 flex items-center justify-center">
                  <img 
                    src="/kraken-logo.png" 
                    alt="Kraken Logo" 
                    className="w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 24px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                    }}
                  />
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-24 leading-tight text-center">
                <span className="block text-ultra-title">KRAKEN</span>
                <span className="block text-4xl md:text-6xl lg:text-7xl mt-8 mb-12 font-light tracking-wide text-center"
                      style={{
                        background: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 4px 8px rgba(14, 165, 233, 0.6)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))',
                        paddingBottom: '16px',
                        textAlign: 'center',
                        width: '100%',
                        display: 'block',
                      }}>
                  FREEDIVING STORE
                </span>
              </h1>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12 mt-8">
              <p className="text-ultra-subtitle text-xl md:text-2xl mb-8 leading-relaxed">
                Como el <span className="font-semibold text-white">legendario Kraken de las profundidades</span>, 
                dominamos los océanos con equipos de <span className="font-semibold text-white">calidad extraordinaria</span> 
                para los buceadores más exigentes del mundo.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-ocean-400 animate-pulse"></div>
                  <span>Equipos Profesionales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-ocean-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span>Diseño Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-ocean-600 animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span>Calidad Garantizada</span>
                </div>
              </div>
            </div>

            {/* Botones Ultra Premium */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link href="/catalog" className="btn-ultra-primary group">
                <span className="relative z-10 flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Explorar Equipos</span>
                </span>
              </Link>
              
              <Link href="/about" className="btn-ultra-secondary group">
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>La Leyenda del Kraken</span>
                </span>
              </Link>
            </div>

            {/* Features Ultra Premium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-left">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src="/kraken-logo.png" 
                    alt="Kraken" 
                    className="w-12 h-12 object-contain"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                    }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-white">Equipos Certificados</h3>
                <p className="text-ultra-body text-sm leading-relaxed">
                  Todos nuestros productos están probados y certificados por atletas profesionales de freediving
                </p>
              </div>
              
              <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src="/kraken-logo.png" 
                    alt="Kraken" 
                    className="w-12 h-12 object-contain"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                    }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-white">Innovación Oceánica</h3>
                <p className="text-ultra-body text-sm leading-relaxed">
                  Tecnología de vanguardia inspirada en las criaturas más inteligentes del océano
                </p>
              </div>
              
              <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src="/kraken-logo.png" 
                    alt="Kraken" 
                    className="w-12 h-12 object-contain"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                    }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl mb-4 text-white">Experiencia Profunda</h3>
                <p className="text-ultra-body text-sm leading-relaxed">
                  Más de una década equipando a los mejores freedivers del mundo
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
} 