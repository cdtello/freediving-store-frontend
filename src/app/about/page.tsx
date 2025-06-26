import React from 'react'
import Link from 'next/link'

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #030712 0%, #0c1424 30%, #082f49 60%, #0c4a6e 100%)',
    }}>
      
      {/* Hero Section - La Leyenda del Kraken */}
      <section className="pt-32 pb-20 px-8 relative overflow-hidden">
        
        {/* Animated Ocean Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-20 animate-float"
               style={{
                 background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
                 filter: 'blur(40px)',
               }}></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-20 animate-float"
               style={{
                 background: 'radial-gradient(circle, rgba(8, 47, 73, 0.4) 0%, transparent 70%)',
                 filter: 'blur(50px)',
                 animationDelay: '3s'
               }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-20">
          
          {/* Badge Premium */}
          <div className="inline-block mb-8">
            <span className="text-xs font-mono font-bold tracking-ultra-wide uppercase px-6 py-3 rounded-full"
                  style={{
                    background: 'rgba(8, 47, 73, 0.2)',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    color: 'rgba(14, 165, 233, 0.9)',
                    boxShadow: '0 8px 24px rgba(8, 47, 73, 0.3)',
                  }}>
              LA LEYENDA COMIENZA
            </span>
          </div>
          
          {/* Title Ultra Premium */}
          <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-ultra-title">
            La Historia del
            <span className="block mt-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(14, 165, 233, 1) 0%, rgba(56, 189, 248, 1) 30%, rgba(125, 211, 252, 1) 60%, rgba(186, 230, 253, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 8px 16px rgba(14, 165, 233, 0.4)',
                  }}>
              KRAKEN
            </span>
          </h1>
          
          <p className="text-ultra-subtitle text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            En las profundidades más oscuras del océano, donde la presión es implacable y la oscuridad absoluta, 
            nace la leyenda del <span className="font-semibold text-white">Kraken</span> - 
            maestro indiscutible de las profundidades.
          </p>
        </div>
      </section>

      {/* La Mitología Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-ultra-title">
                  El Maestro de las Profundidades
                </h2>
                
                <p className="text-ultra-body text-lg leading-relaxed mb-6">
                  Como el legendario Kraken de los mares nórdicos, nuestra marca representa la 
                  <span className="font-semibold text-white"> inteligencia suprema</span> y el 
                  <span className="font-semibold text-white"> dominio absoluto</span> de las profundidades oceánicas.
                </p>
                
                <p className="text-ultra-body text-lg leading-relaxed mb-6">
                  El pulpo, símbolo de nuestra marca, es reconocido como una de las criaturas más inteligentes 
                  del océano - capaz de <span className="font-semibold text-white">adaptarse, innovar y prosperar</span> 
                  en los entornos más desafiantes del planeta.
                </p>
                
                <p className="text-ultra-body text-lg leading-relaxed">
                  Esta filosofía guía cada producto que creamos: equipos que no solo resisten las presiones extremas, 
                  sino que <span className="font-semibold text-white">evolucionan con ellas</span>.
                </p>
              </div>
              
              {/* Stats Premium */}
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-ultra rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-ocean-300 mb-2">15+</div>
                  <div className="text-sm text-ultra-body">Años de Experiencia</div>
                </div>
                <div className="glass-ultra rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-ocean-300 mb-2">10K+</div>
                  <div className="text-sm text-ultra-body">Freedivers Equipados</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual - Kraken Symbol */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-ocean-gradient rounded-full opacity-20 blur-2xl scale-150"></div>
                <div className="relative glass-ultra rounded-3xl p-16 text-center">
                  <div className="w-48 h-48 mx-auto flex items-center justify-center">
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
              </div>
            </div>
          </div>

          {/* Nuestros Valores Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-8 text-ultra-title">
              Los Principios del Kraken
            </h2>
            <p className="text-ultra-subtitle text-xl max-w-3xl mx-auto">
              Cada tentáculo representa un pilar fundamental de nuestra filosofía empresarial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            
            <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-up">
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
              <h3 className="font-display font-bold text-xl mb-4 text-white">Adaptabilidad</h3>
              <p className="text-ultra-body text-sm leading-relaxed">
                Como el pulpo, nos adaptamos a cada desafío con inteligencia y flexibilidad
              </p>
            </div>
            
            <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-up" style={{animationDelay: '0.1s'}}>
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
              <h3 className="font-display font-bold text-xl mb-4 text-white">Innovación</h3>
              <p className="text-ultra-body text-sm leading-relaxed">
                Tecnología de vanguardia inspirada en la naturaleza más inteligente
              </p>
            </div>
            
            <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-up" style={{animationDelay: '0.2s'}}>
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
              <h3 className="font-display font-bold text-xl mb-4 text-white">Precisión</h3>
              <p className="text-ultra-body text-sm leading-relaxed">
                Cada movimiento calculado, cada producto perfeccionado al detalle
              </p>
            </div>
            
            <div className="glass-ultra rounded-3xl p-8 text-center animate-slide-in-up" style={{animationDelay: '0.3s'}}>
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
              <h3 className="font-display font-bold text-xl mb-4 text-white">Profundidad</h3>
              <p className="text-ultra-body text-sm leading-relaxed">
                Conocimiento profundo del océano y las necesidades del freediver
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="glass-ultra rounded-4xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-white">
                Únete a la Leyenda del Kraken
              </h2>
              <p className="text-ultra-body text-lg mb-8 max-w-2xl mx-auto">
                Forma parte de una comunidad de freedivers que han elegido la excelencia. 
                Descubre por qué los atletas más exigentes confían en KRAKEN.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/catalog" className="btn-ultra-primary group">
                  <span className="relative z-10 flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Explorar Arsenal</span>
                  </span>
                </Link>
                
                <Link href="/contact" className="btn-ultra-secondary group">
                  <span className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Contactar</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 