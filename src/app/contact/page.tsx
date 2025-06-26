'use client'

import React, { useState } from 'react'

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado:', formData)
    alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #030712 0%, #0c1424 30%, #082f49 60%, #0c4a6e 100%)',
    }}>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge Premium */}
          <div className="inline-block mb-6">
            <span className="text-xs font-mono font-bold tracking-ultra-wide uppercase px-6 py-3 rounded-full"
                  style={{
                    background: 'rgba(8, 47, 73, 0.2)',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    color: 'rgba(14, 165, 233, 0.9)',
                    boxShadow: '0 8px 24px rgba(8, 47, 73, 0.3)',
                  }}>
              CONTACTO KRAKEN
            </span>
          </div>
          
          {/* Title Ultra Premium */}
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-ultra-title">
            Conecta con las 
            <span className="block mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 4px 8px rgba(14, 165, 233, 0.6))',
                  }}>
              Profundidades
            </span>
          </h1>
          
          <p className="text-ultra-subtitle text-xl max-w-3xl mx-auto leading-relaxed">
            ¿Tienes preguntas sobre nuestros equipos? ¿Necesitas asesoramiento profesional? 
            El equipo KRAKEN está aquí para guiarte hacia las profundidades perfectas.
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="glass-ultra rounded-3xl p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Envíanos un Mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ocean-300 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ocean-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ocean-300 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-all duration-300"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ocean-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Cuéntanos más detalles sobre tu consulta..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-ultra-primary py-4 text-lg font-semibold"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Enviar Mensaje</span>
                  </span>
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              
              {/* Contact Methods */}
              <div className="glass-ultra rounded-3xl p-8">
                <h3 className="text-xl font-display font-bold text-white mb-6">
                  Información de Contacto
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/kraken-logo.png" 
                        alt="Kraken" 
                        className="w-10 h-10 object-contain"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-ultra-body">info@krakenfreediving.com</p>
                      <p className="text-ultra-body">support@krakenfreediving.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/kraken-logo.png" 
                        alt="Kraken" 
                        className="w-10 h-10 object-contain"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Teléfono</h4>
                      <p className="text-ultra-body">+34 900 123 456</p>
                      <p className="text-ultra-body text-sm opacity-75">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/kraken-logo.png" 
                        alt="Kraken" 
                        className="w-10 h-10 object-contain"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Ubicación</h4>
                      <p className="text-ultra-body">Barcelona, España</p>
                      <p className="text-ultra-body text-sm opacity-75">Costa Mediterránea</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ Quick Links */}
              <div className="glass-ultra rounded-3xl p-8">
                <h3 className="text-xl font-display font-bold text-white mb-6">
                  Preguntas Frecuentes
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-white mb-2">¿Hacen envíos internacionales?</h4>
                    <p className="text-ultra-body text-sm">Sí, enviamos a todo el mundo con envío gratuito en pedidos superiores a €150.</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-white mb-2">¿Ofrecen asesoramiento técnico?</h4>
                    <p className="text-ultra-body text-sm">Nuestro equipo de expertos está disponible para asesorarte en la elección del equipo perfecto.</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-white mb-2">¿Cuál es la política de devoluciones?</h4>
                    <p className="text-ultra-body text-sm">30 días para devoluciones sin preguntas. Tu satisfacción es nuestra prioridad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 