'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header(): JSX.Element {
  const { cart, toggleCart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header-ultra ${isScrolled ? 'header-solid' : 'header-glass'}`}>
      <nav className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo KRAKEN Ultra Premium */}
          <Link href="/" className="logo-ultra group">
            <div className="flex items-center space-x-4">
              <div className="logo-icon group-hover:scale-105 transition-transform duration-300">
                {/* Logo del Kraken limpio y elegante */}
                <img 
                  src="/kraken-logo.png"
                  alt="KRAKEN Logo" 
                  className="w-12 h-12"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="logo-text text-2xl font-black tracking-tight">KRAKEN</span>
                <span className="logo-subtitle text-xs font-bold tracking-ultra-wide">FREEDIVING STORE</span>
              </div>
            </div>
          </Link>

          {/* Navigation Ultra Premium - Desktop */}
          <div className="nav-ultra hidden lg:flex">
            <Link href="/" className="nav-link">
              Inicio
            </Link>
            <Link href="/catalog" className="nav-link">
              Equipos
            </Link>
            <Link href="/about" className="nav-link">
              Nuestra Historia
            </Link>
            <Link href="/contact" className="nav-link">
              Contacto
            </Link>
          </div>

          {/* Cart Button Ultra Premium */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden nav-link p-2 relative z-50" 
              aria-label="Menú móvil"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative group p-3 rounded-full transition-all duration-300 ease-out"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(217, 119, 6, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label="Abrir carrito de compras"
            >
              <svg 
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              
              {cart.itemCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 h-7 w-7 flex items-center justify-center text-xs font-bold text-black rounded-full animate-scale-in"
                  style={{
                    background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
                  }}
                >
                  {cart.itemCount > 99 ? '99+' : cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - EXACT COPY OF CART */}
        <>
          {/* Premium Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
              onClick={closeMobileMenu}
            />
          )}

          {/* Menu Sidebar Ultra Premium - KRAKEN Style - FORCED STYLES */}
          <div className={`fixed right-0 top-0 h-full w-96 transform transition-all duration-500 ease-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(3, 7, 18, 1) 0%, rgba(12, 20, 36, 1) 30%, rgba(8, 47, 73, 1) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div className="flex flex-col h-full" style={{
              background: 'linear-gradient(135deg, rgba(3, 7, 18, 1) 0%, rgba(12, 20, 36, 1) 30%, rgba(8, 47, 73, 1) 100%)',
            }}>
              {/* Premium Header - KRAKEN */}
              <div className="flex items-center justify-between p-6 border-b border-white/10"
                   style={{
                     background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.3) 0%, rgba(14, 165, 233, 0.1) 100%)',
                   }}>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Navegación KRAKEN
                  </h2>
                  <p className="text-sm text-ocean-300 mt-1">
                    Explora las profundidades
                  </p>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 group"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-ocean-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 p-6" style={{
                background: 'linear-gradient(135deg, rgba(3, 7, 18, 1) 0%, rgba(12, 20, 36, 1) 30%, rgba(8, 47, 73, 1) 100%)',
              }}>
                <div className="space-y-4">
                  <Link 
                    href="/" 
                    className="block p-4 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="font-medium">Inicio</span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/catalog" 
                    className="block p-4 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span className="font-medium">Equipos</span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/about" 
                    className="block p-4 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Nuestra Historia</span>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="block p-4 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Contacto</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      </nav>
    </header>
  )
} 