'use client'

import React, { useState, useMemo } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import QuickViewModal from '@/components/QuickViewModal'
import { QuickViewProvider } from '@/contexts/QuickViewContext'
import type { ProductCategory } from '@/types'

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'fins', label: 'Aletas' },
  { value: 'masks', label: 'Máscaras' },
  { value: 'snorkels', label: 'Tubos' },
  { value: 'wetsuits', label: 'Trajes' },
  { value: 'accessories', label: 'Accesorios' },
]

export default function CatalogPage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name')
  const [showInStockOnly, setShowInStockOnly] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtrar por stock
    if (showInStockOnly) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Ordenar
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        default:
          return 0
      }
    })

    return sorted
  }, [selectedCategory, sortBy, showInStockOnly])

  return (
    <QuickViewProvider>
      <div className="min-h-screen relative" style={{
        background: 'linear-gradient(135deg, #030712 0%, #0c1424 30%, #082f49 60%, #0c4a6e 100%)',
      }}>
        

        
        {/* Products Grid Ultra Premium */}
        <div className="pt-32 pb-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-slide-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick View Modal - Rendered at section level */}
        <QuickViewModal />
      </div>
    </QuickViewProvider>
  )
} 