'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer(): JSX.Element {
  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #030712 0%, #0c1424 30%, #082f49 60%, #0c4a6e 100%)',
    }}>
      
      {/* Animated Ocean Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-float"
             style={{
               background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
               filter: 'blur(40px)',
               animationDelay: '2s'
             }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 animate-float"
             style={{
               background: 'radial-gradient(circle, rgba(8, 47, 73, 0.4) 0%, transparent 70%)',
               filter: 'blur(50px)',
               animationDelay: '4s'
             }}></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 py-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img 
                  src="/kraken-logo.png"
                  alt="KRAKEN" 
                  className="w-10 h-10"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">KRAKEN</h3>
                <p className="text-sm text-ocean-300 font-medium tracking-wide">FREEDIVING STORE</p>
              </div>
            </div>
            
            <p className="text-ultra-body text-lg leading-relaxed mb-6 max-w-md">
              Maestros de las profundidades oceánicas. Equipamos a los freedivers más exigentes del mundo 
              con tecnología de vanguardia inspirada en la inteligencia del Kraken.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                 style={{
                   background: 'rgba(14, 165, 233, 0.2)',
                   border: '1px solid rgba(14, 165, 233, 0.3)',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.background = 'rgba(14, 165, 233, 0.3)'
                   e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)'
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
                   e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)'
                 }}>
                <svg className="w-5 h-5 text-ocean-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                 style={{
                   background: 'rgba(14, 165, 233, 0.2)',
                   border: '1px solid rgba(14, 165, 233, 0.3)',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.background = 'rgba(14, 165, 233, 0.3)'
                   e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)'
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
                   e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)'
                 }}>
                <svg className="w-5 h-5 text-ocean-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                 style={{
                   background: 'rgba(14, 165, 233, 0.2)',
                   border: '1px solid rgba(14, 165, 233, 0.3)',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.background = 'rgba(14, 165, 233, 0.3)'
                   e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)'
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
                   e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)'
                 }}>
                <svg className="w-5 h-5 text-ocean-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Navegación</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Inicio</Link></li>
              <li><Link href="/catalog" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Equipos</Link></li>
              <li><Link href="/about" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Nuestra Historia</Link></li>
              <li><Link href="/contact" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Contacto</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Soporte</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Centro de Ayuda</a></li>
              <li><a href="#" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Envíos y Devoluciones</a></li>
              <li><a href="#" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Garantía</a></li>
              <li><a href="#" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Términos y Condiciones</a></li>
              <li><a href="#" className="text-ultra-body hover:text-ocean-300 transition-colors duration-200">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-ultra-body text-sm">
              © 2024 KRAKEN Freediving Store. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-ultra-body">Métodos de pago:</span>
              <div className="flex space-x-3">
                <div className="w-8 h-5 rounded bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">💳</span>
                </div>
                <div className="w-8 h-5 rounded bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">🏦</span>
                </div>
                <div className="w-8 h-5 rounded bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 