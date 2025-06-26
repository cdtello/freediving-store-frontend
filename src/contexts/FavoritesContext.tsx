'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product } from '@/types'

interface FavoritesState {
  readonly favorites: readonly Product[]
}

interface FavoritesContextType {
  readonly favorites: readonly Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: number) => void
  isFavorite: (productId: number) => boolean
  toggleFavorite: (product: Product) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Estado inicial
const initialState: FavoritesState = {
  favorites: [],
}

// Tipos de acciones
type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: number }

// Reducer
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      // Evitar duplicados
      if (state.favorites.some(product => product.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(product => product.id !== action.payload),
      }

    default:
      return state
  }
}

// Provider Props
interface FavoritesProviderProps {
  readonly children: ReactNode
}

// Provider Component
export function FavoritesProvider({ children }: FavoritesProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  const addToFavorites = (product: Product): void => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product })
  }

  const removeFromFavorites = (productId: number): void => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId })
  }

  const isFavorite = (productId: number): boolean => {
    return state.favorites.some(product => product.id === productId)
  }

  const toggleFavorite = (product: Product): void => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const contextValue: FavoritesContextType = {
    favorites: state.favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  }

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Hook personalizado
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
} 