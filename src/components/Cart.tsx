'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import Checkout from './Checkout'
import InvoiceComponent from './Invoice'
import type { Invoice } from '@/types'
import { getFinalPrice, formatPrice } from '@/utils/pricing'

export default function Cart(): JSX.Element {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [invoice, setInvoice] = useState<Invoice | null>(null)

  const handleCheckout = (): void => {
    setShowCheckout(true)
    toggleCart() // Cerrar el carrito
  }

  const handlePaymentComplete = (completedInvoice: Invoice): void => {
    console.log('🎯 handlePaymentComplete llamado con:', completedInvoice)
    setInvoice(completedInvoice)
    console.log('📄 Invoice establecida, cerrando checkout...')
    setShowCheckout(false)
    console.log('✅ Checkout cerrado, debería mostrar factura')
  }

  const handleCloseInvoice = (): void => {
    setInvoice(null)
  }

  return (
    <>
      {/* Premium Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          onClick={toggleCart}
        />
      )}

      {/* Cart Sidebar Ultra Premium - KRAKEN Style */}
      <div className={`fixed right-0 top-0 h-full w-96 backdrop-blur-ultra shadow-ultra transform transition-all duration-500 ease-out z-50 border-l border-white/10 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(12, 20, 36, 0.95) 30%, rgba(8, 47, 73, 0.95) 100%)',
      }}>
        <div className="flex flex-col h-full">
          {/* Premium Header - KRAKEN */}
          <div className="flex items-center justify-between p-6 border-b border-white/10"
               style={{
                 background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.3) 0%, rgba(14, 165, 233, 0.1) 100%)',
               }}>
            <div>
              <h2 className="text-xl font-bold text-white">
                Arsenal KRAKEN
              </h2>
              <p className="text-sm text-ocean-300 mt-1">
                {cart.itemCount} {cart.itemCount === 1 ? 'equipo' : 'equipos'} seleccionados
              </p>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 group"
              aria-label="Cerrar carrito"
            >
              <svg className="w-5 h-5 text-white group-hover:text-ocean-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.items.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                     style={{
                       background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.3) 0%, rgba(14, 165, 233, 0.2) 100%)',
                       border: '1px solid rgba(14, 165, 233, 0.3)',
                     }}>
                  <svg className="w-10 h-10 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Tu arsenal está vacío</h3>
                <p className="text-ocean-300 text-sm">Agrega equipos de las profundidades</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item, index) => {
                  const variant = item.selectedVariant !== undefined ? item.product.variants?.[item.selectedVariant] : null
                  const displayImage = variant?.image || item.product.image
                  
                  return (
                    <div 
                      key={`${item.product.id}-${item.selectedVariant || 0}`} 
                      className="glass-ultra rounded-2xl p-4 animate-slide-up"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 relative overflow-hidden rounded-lg">
                          <Image
                            src={displayImage}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      
                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <h3 className="text-sm font-semibold text-white line-clamp-2">
                            {item.product.name}
                          </h3>
                          {variant && (
                            <p className="text-xs text-ocean-200 mt-1">
                              Color: {variant.colorName}
                            </p>
                          )}
                          <p className="text-sm font-bold text-ocean-300 mt-1">
                            {formatPrice(getFinalPrice(item.product))}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{
                                background: 'rgba(14, 165, 233, 0.2)',
                                border: '1px solid rgba(14, 165, 233, 0.3)',
                              }}
                              onMouseEnter={(e) => {
                                if (!e.currentTarget.disabled) {
                                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.3)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!e.currentTarget.disabled) {
                                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
                                }
                              }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="text-sm font-semibold text-white min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                              style={{
                                background: 'rgba(14, 165, 233, 0.2)',
                                border: '1px solid rgba(14, 165, 233, 0.3)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.3)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
                              }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors duration-200"
                            aria-label="Eliminar producto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Premium Footer - KRAKEN */}
          {cart.items.length > 0 && (
            <div className="border-t border-white/10 p-6 space-y-6"
                 style={{
                   background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.2) 0%, rgba(3, 7, 18, 0.8) 100%)',
                 }}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ocean-300">Subtotal:</span>
                  <span className="font-semibold text-white">
                    {formatPrice(cart.items.reduce((sum, item) => sum + (getFinalPrice(item.product) * item.quantity), 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ocean-300">Envío:</span>
                  <span className="text-sm font-medium text-green-400">Gratis Mundial</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total:</span>
                    <span className="text-xl font-bold text-white">
                      {formatPrice(cart.items.reduce((sum, item) => sum + (getFinalPrice(item.product) * item.quantity), 0))}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button onClick={handleCheckout} className="btn-ultra-primary w-full">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Proceder al Pago</span>
                  </span>
                </button>
                <button
                  onClick={clearCart}
                  className="w-full px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-200"
                >
                  Vaciar Arsenal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          onPaymentComplete={handlePaymentComplete}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {/* Invoice Modal */}
      {invoice && (
        <InvoiceComponent
          invoice={invoice}
          onClose={handleCloseInvoice}
        />
      )}
    </>
  )
} 