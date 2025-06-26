'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import type { CartContextType, CartState, CartItem, Product } from '@/types'

// Estado inicial del carrito
const initialCartState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

// Tipos de acciones para el reducer
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; selectedVariant?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number; selectedVariant?: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number; selectedVariant?: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }

// Reducer del carrito
function cartReducer(state: CartState & { isCartOpen: boolean }, action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, selectedVariant } = action.payload
      const existingItem = state.items.find(item => 
        item.product.id === product.id && item.selectedVariant === selectedVariant
      )
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === product.id && item.selectedVariant === selectedVariant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity: 1, selectedVariant }]
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case 'REMOVE_FROM_CART': {
      const { productId, selectedVariant } = action.payload
      const newItems = state.items.filter(item => 
        !(item.product.id === productId && item.selectedVariant === selectedVariant)
      )
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, selectedVariant } = action.payload
      const newItems = state.items.map(item =>
        item.product.id === productId && item.selectedVariant === selectedVariant
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)

      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        ...initialCartState,
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }

    default:
      return state
  }
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider del contexto
interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialCartState,
    isCartOpen: false,
  })

  const addToCart = (product: Product, selectedVariant?: number): void => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, selectedVariant } })
  }

  const removeFromCart = (productId: number, selectedVariant?: number): void => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, selectedVariant } })
  }

  const updateQuantity = (productId: number, quantity: number, selectedVariant?: number): void => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, selectedVariant } })
  }

  const clearCart = (): void => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = (): void => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const contextValue: CartContextType = {
    cart: {
      items: state.items,
      total: state.total,
      itemCount: state.itemCount,
    },
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen: state.isCartOpen,
    toggleCart,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 