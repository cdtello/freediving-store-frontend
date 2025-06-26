'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
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

export default function QuickViewModal(): JSX.Element | null {
  const { isOpen, product, closeQuickView } = useQuickView()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [selectedVariant, setSelectedVariant] = useState(0)

  if (!isOpen || !product) return null

  const handleAddToCart = (): void => {
    if (currentStock) {
      addToCart(product, selectedVariant)
      closeQuickView()
    }
  }

  const handleToggleFavorite = (): void => {
    toggleFavorite(product)
  }

  const handleColorSelect = (variantIndex: number): void => {
    setSelectedVariant(variantIndex)
  }

  const isPremium = isPremiumProduct(product)
  const isOnSale = isProductOnSale(product)
  const isProductFavorite = isFavorite(product.id)
  const currentImage = product.variants?.[selectedVariant]?.image || product.image
  const currentStock = product.variants?.[selectedVariant]?.inStock ?? product.inStock
  const currentStockQuantity = product.variants?.[selectedVariant]?.stockQuantity ?? product.stockQuantity
  const originalPrice = getOriginalPrice(product)
  const finalPrice = getFinalPrice(product)
  const savingsAmount = getSavingsAmount(product)

  const modalContent = (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={closeQuickView}
      />

      {/* Large Centered Modal */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl shadow-2xl animate-scale-in w-full max-h-[85vh] overflow-y-auto"
          style={{ maxWidth: '1200px' }}
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200 rounded-t-3xl">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="/kraken-logo.png"
                  alt="KRAKEN" 
                  className="w-10 h-10"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                  }}
                />
                <div>
                  <h1 className="text-xl font-bold text-neutral-800">Vista Detallada</h1>
                  <p className="text-sm text-neutral-600">Explora cada detalle del producto</p>
                </div>
              </div>
              <button
                onClick={closeQuickView}
                className="p-3 rounded-full hover:bg-neutral-100 transition-colors duration-200"
                aria-label="Cerrar vista detallada"
              >
                <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side - Product Image */}
            <div className="relative min-h-[500px] bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-8">
              
              {/* Floating Badges */}
              <div className="absolute top-8 left-8 z-10 space-y-3">
                {/* Sale Badge */}
                {isOnSale && (
                  <div 
                    className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                      color: '#ffffff',
                      boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)',
                    }}
                  >
                    Sale -{product.inSale?.discountPercentage}%
                  </div>
                )}
                
                {/* Premium Badge */}
                {isPremium && !isOnSale && (
                  <div 
                    className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                      color: '#000000',
                      boxShadow: '0 8px 24px rgba(217, 119, 6, 0.4)',
                    }}
                  >
                    Premium
                  </div>
                )}
                
                {ConfigUtils.isOutOfStock(currentStockQuantity) && (
                  <div 
                    className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(107, 114, 128, 0.9)',
                      color: '#ffffff',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Agotado
                  </div>
                )}
              </div>

              {/* Main Product Image */}
              <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Image Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Action Buttons */}
              <div className="absolute bottom-8 right-8 flex space-x-4">
                <button
                  onClick={handleToggleFavorite}
                  className="p-4 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: isProductFavorite 
                      ? 'rgba(239, 68, 68, 0.9)' 
                      : 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  }}
                  aria-label={isProductFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <svg 
                    className={`w-6 h-6 ${isProductFavorite ? 'text-white' : 'text-neutral-800'}`} 
                    fill={isProductFavorite ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="min-h-[500px] p-8 flex flex-col justify-center">
              <div className="max-w-xl space-y-6">
                
                {/* Category Badge */}
                <div>
                  <span 
                    className="text-sm font-mono font-bold uppercase tracking-wide px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(14, 165, 233, 0.1)',
                      color: 'rgba(14, 165, 233, 0.8)',
                    }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 leading-tight mb-3">
                    {product.name}
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Color Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-neutral-800">Colores Disponibles</h3>
                    <div className="flex items-center space-x-3">
                      {product.variants.map((variant, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorSelect(index)}
                          className={`w-10 h-10 rounded-full border-3 transition-all duration-200 relative ${
                            selectedVariant === index 
                              ? 'border-neutral-800 scale-110 shadow-lg' 
                              : 'border-neutral-300 hover:border-neutral-500 hover:scale-105'
                          }`}
                          style={{ backgroundColor: variant.color }}
                          title={variant.colorName}
                        >
                          {/* Ring indicator for selected color */}
                          {selectedVariant === index && (
                            <div className="absolute inset-1 rounded-full border-2 border-white"></div>
                          )}
                          {/* Out of stock indicator */}
                          {!variant.inStock && (
                            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                              <div className="w-4 h-0.5 bg-white transform rotate-45"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600">
                      Color seleccionado: <span className="font-medium">{product.variants[selectedVariant]?.colorName}</span>
                    </p>
                  </div>
                )}

                {/* Price Section */}
                                 <div className="py-4 border-y border-neutral-200 space-y-3">
                   {/* Original Price (if on sale) */}
                   {isOnSale && (
                     <div className="flex items-center space-x-3">
                       <span className="text-xl text-neutral-500 line-through">
                         {formatPrice(originalPrice)}
                       </span>
                       <div 
                         className="px-3 py-1 rounded-full text-sm font-bold"
                         style={{
                           background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                           color: '#ffffff',
                         }}
                       >
                         -{product.inSale?.discountPercentage}% OFF
                       </div>
                     </div>
                   )}
                   
                   {/* Current Price */}
                   <div className="flex items-center justify-between">
                     <div className="flex items-baseline space-x-3">
                       <span className={`text-4xl font-display font-black ${
                         isOnSale ? 'text-red-600' : 'text-neutral-900'
                       }`}>
                         {formatPrice(finalPrice)}
                       </span>
                       
                       {isOnSale && (
                         <span className="text-lg font-bold text-green-600">
                           Ahorra {formatPrice(savingsAmount)}
                         </span>
                       )}
                     </div>
                   </div>
                 </div>

                {/* Stock Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-700">Stock disponible</span>
                    <span 
                      className="text-lg font-bold"
                      style={{ 
                        color: ConfigUtils.getStockColorHex(currentStockQuantity),
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {ConfigUtils.isOutOfStock(currentStockQuantity) ? 'Agotado' : `${currentStockQuantity} unidades`}
                    </span>
                  </div>
                  
                  <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: ConfigUtils.getStockBarWidth(currentStockQuantity),
                        background: ConfigUtils.getStockGradient(currentStockQuantity)
                      }}
                    />
                  </div>
                </div>

                {/* Premium Features */}
                <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-neutral-800">Características Premium</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-ocean-400"></div>
                      <span className="text-sm font-medium text-neutral-700">Calidad Superior</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-ocean-500"></div>
                      <span className="text-sm font-medium text-neutral-700">Envío Gratuito</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-ocean-600"></div>
                      <span className="text-sm font-medium text-neutral-700">Garantía 2 Años</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                      <span className="text-sm font-medium text-neutral-700">Uso Profesional</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-neutral-800">Especificaciones Técnicas</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="font-medium text-neutral-600">Material</span>
                      <span className="text-neutral-800">Fibra de carbono premium</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="font-medium text-neutral-600">Peso</span>
                      <span className="text-neutral-800">Ultra ligero</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="font-medium text-neutral-600">Certificación</span>
                      <span className="text-neutral-800">CE, ISO 9001</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium text-neutral-600">Origen</span>
                      <span className="text-neutral-800">Fabricado en Italia</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={!currentStock}
                    className="w-full py-4 font-bold text-lg rounded-2xl transition-all duration-300 disabled:cursor-not-allowed"
                    style={{
                      background: currentStock 
                        ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                        : 'rgba(107, 114, 128, 0.1)',
                      color: currentStock ? '#000000' : 'rgba(107, 114, 128, 0.6)',
                      boxShadow: currentStock 
                        ? '0 8px 24px rgba(217, 119, 6, 0.4)'
                        : 'none',
                      border: currentStock 
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(107, 114, 128, 0.2)',
                    }}
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      <span>{currentStock ? 'Agregar al Carrito' : 'No Disponible'}</span>
                    </span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )

  return modalContent
} 