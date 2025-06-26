'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'
import { ProductActions } from './ProductActions'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useQuickView } from '@/contexts/QuickViewContext'
import {
  isProductOnSale,
  getOriginalPrice,
  getFinalPrice,
  getSavingsAmount,
  isPremiumProduct,
  formatPrice
} from '@/utils/pricing'
import { ConfigUtils } from '@/config/app.config'

interface ProductCardProps {
  readonly product: Product
}

export default function ProductCard({ product }: ProductCardProps): JSX.Element {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { openQuickView } = useQuickView()
  const [selectedVariant, setSelectedVariant] = useState(0)
  
  const isProductFavorite = isFavorite(product.id)
  const currentImage = product.variants?.[selectedVariant]?.image || product.image
  const currentStock = product.variants?.[selectedVariant]?.inStock ?? product.inStock
  const currentStockQuantity = product.variants?.[selectedVariant]?.stockQuantity ?? product.stockQuantity

  const handleQuickView = (): void => {
    openQuickView(product)
  }

  const handleToggleFavorite = (): void => {
    toggleFavorite(product)
  }

  const handleColorSelect = (variantIndex: number): void => {
    setSelectedVariant(variantIndex)
  }
  
  const isPremium = isPremiumProduct(product)
  const isOnSale = isProductOnSale(product)
  const originalPrice = getOriginalPrice(product)
  const finalPrice = getFinalPrice(product)
  const savingsAmount = getSavingsAmount(product)
  
  return (
    <div className="card-ultra group h-full flex flex-col">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 space-y-2">
        {/* Sale Badge */}
        {isOnSale && (
          <div 
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
            }}
          >
            Sale -{product.inSale?.discountPercentage}%
          </div>
        )}
        
        {/* Premium Badge */}
        {isPremium && !isOnSale && (
          <div 
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              color: '#000000',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
            }}
          >
            Premium
          </div>
        )}
      </div>

      {/* Stock Status */}
      {ConfigUtils.isOutOfStock(currentStockQuantity) && (
        <div className="absolute top-4 right-4 z-20">
          <div 
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(107, 114, 128, 0.9)',
              color: '#ffffff',
              backdropFilter: 'blur(10px)',
            }}
          >
            Agotado
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={currentImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleQuickView}
              className="p-3 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              }}
              aria-label="Vista rápida"
            >
              <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            <button 
              onClick={handleToggleFavorite}
              className="p-3 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110"
              style={{
                background: isProductFavorite 
                  ? 'rgba(239, 68, 68, 0.9)' 
                  : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              }}
              aria-label={isProductFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <svg 
                className={`w-5 h-5 ${isProductFavorite ? 'text-white' : 'text-neutral-800'}`} 
                fill={isProductFavorite ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category */}
        <div className="mb-3">
          <span 
            className="text-xs font-mono font-bold uppercase tracking-ultra-wide px-2 py-1 rounded"
            style={{
              background: 'rgba(14, 165, 233, 0.1)',
              color: 'rgba(14, 165, 233, 0.8)',
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Color Variants - Altura fija */}
        <div className="mb-4 h-12 flex items-start">
          {product.variants && product.variants.length > 0 ? (
            <div className="w-full">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-neutral-600">Colores:</span>
                <div className="flex space-x-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(index)}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 relative ${
                        selectedVariant === index 
                          ? 'border-neutral-800 scale-110' 
                          : 'border-neutral-300 hover:border-neutral-500'
                      }`}
                      style={{ backgroundColor: variant.color }}
                      title={variant.colorName}
                    >
                      {/* Ring indicator for selected color */}
                      {selectedVariant === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-white"></div>
                      )}
                      {/* Out of stock indicator */}
                      {!variant.inStock && (
                        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-white transform rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Title - Altura fija */}
        <h3 className="text-xl font-display font-bold text-neutral-900 mb-3 leading-tight line-clamp-2 group-hover:text-neutral-800 transition-colors duration-300 h-14 flex items-start">
          {product.name}
        </h3>

        {/* Description - Altura fija */}
        <p className="text-sm text-neutral-600 mb-6 line-clamp-3 leading-relaxed h-16 flex items-start">
          {product.description}
        </p>

                {/* Price - Altura fija */}
        <div className="flex items-center justify-between mb-6 h-16">
          <div className="flex flex-col space-y-1 justify-start">
            {/* Original Price (if on sale) */}
            {isOnSale && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            
            {/* Current Price */}
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-display font-black ${
                isOnSale ? 'text-red-600' : 'text-neutral-900'
              }`}>
                {formatPrice(finalPrice)}
              </span>
              
              {isOnSale && (
                <span className="text-sm font-bold text-green-600">
                  Ahorra {formatPrice(savingsAmount)}
                </span>
              )}
            </div>
          </div>
          
          {/* Sale Badge (right side) */}
          {isOnSale && (
            <div 
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: '#ffffff',
              }}
            >
              -{product.inSale?.discountPercentage}%
            </div>
          )}
        </div>

        {/* Stock Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-600">Stock disponible</span>
            <span 
              className="font-bold"
              style={{ 
                color: ConfigUtils.getStockColorHex(currentStockQuantity),
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {ConfigUtils.isOutOfStock(currentStockQuantity) ? 'Agotado' : `${currentStockQuantity} unidades`}
            </span>
          </div>
          
          {/* Stock Bar */}
          <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: ConfigUtils.getStockBarWidth(currentStockQuantity),
                background: ConfigUtils.getStockGradient(currentStockQuantity)
              }}
            />
          </div>
        </div>

        {/* Actions - Siempre al final */}
        <div className="mt-auto">
          <ProductActions product={product} inStock={currentStock} selectedVariant={selectedVariant} />
        </div>
      </div>
    </div>
  )
} 