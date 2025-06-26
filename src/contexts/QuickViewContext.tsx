'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '@/types'

interface QuickViewContextType {
  readonly isOpen: boolean
  readonly product: Product | null
  openQuickView: (product: Product) => void
  closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined)

interface QuickViewProviderProps {
  readonly children: ReactNode
}

export function QuickViewProvider({ children }: QuickViewProviderProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)

  const openQuickView = (selectedProduct: Product): void => {
    setProduct(selectedProduct)
    setIsOpen(true)
  }

  const closeQuickView = (): void => {
    setIsOpen(false)
    setProduct(null)
  }

  const contextValue: QuickViewContextType = {
    isOpen,
    product,
    openQuickView,
    closeQuickView,
  }

  return (
    <QuickViewContext.Provider value={contextValue}>
      {children}
    </QuickViewContext.Provider>
  )
}

export function useQuickView(): QuickViewContextType {
  const context = useContext(QuickViewContext)
  if (context === undefined) {
    throw new Error('useQuickView must be used within a QuickViewProvider')
  }
  return context
} 