'use client'

import React, { useCallback, useState } from 'react'
import type { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'

interface ProductActionsProps {
  readonly product: Product
  readonly inStock?: boolean
  readonly selectedVariant?: number
}

export function ProductActions({ product, inStock = product.inStock, selectedVariant }: ProductActionsProps): JSX.Element {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = useCallback(async (): Promise<void> => {
    if (isAdding || !inStock) return
    
    setIsAdding(true)
    addToCart(product, selectedVariant)
    
    // Simular feedback visual
    setTimeout(() => {
      setIsAdding(false)
    }, 1200)
  }, [addToCart, product, selectedVariant, isAdding, inStock])

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full py-4 font-semibold text-base rounded-full transition-all duration-300 cursor-not-allowed"
        style={{
          background: 'rgba(107, 114, 128, 0.1)',
          color: 'rgba(107, 114, 128, 0.6)',
          border: '1px solid rgba(107, 114, 128, 0.2)',
        }}
      >
        No Disponible
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full py-4 font-semibold text-base rounded-full transition-all duration-300 relative overflow-hidden group"
      style={{
        background: isAdding 
          ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
          : 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
        color: '#000000',
        boxShadow: isAdding 
          ? '0 8px 24px rgba(16, 185, 129, 0.4)'
          : '0 8px 24px rgba(217, 119, 6, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transform: isAdding ? 'scale(0.98)' : 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!isAdding) {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(217, 119, 6, 0.5)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isAdding) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.4)'
        }
      }}
      aria-label={`Agregar ${product.name} al carrito`}
    >
      {/* Shimmer Effect */}
      {!isAdding && (
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          }}
        />
      )}
      
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {isAdding ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-bold">¡Agregado!</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span>Agregar al Carrito</span>
          </>
        )}
      </span>
    </button>
  )
} 