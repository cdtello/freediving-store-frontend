'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAppConfig } from '@/hooks/useAppConfig'

interface ConfigContextType {
  isLoading: boolean
  isInitialized: boolean
  error: string | null
  refresh: (options?: {
    region?: string
    season?: string
    storeType?: 'retail' | 'wholesale' | 'outlet'
  }) => Promise<void>
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

interface ConfigProviderProps {
  children: ReactNode
  region?: string
  season?: string
  storeType?: 'retail' | 'wholesale' | 'outlet'
}

/**
 * Provider que inicializa y gestiona la configuración de la aplicación
 * Debe envolver toda la aplicación para que la configuración esté disponible
 */
export function ConfigProvider({ 
  children, 
  region = 'ES', 
  season = 'winter',
  storeType = 'retail' 
}: ConfigProviderProps) {
  const configState = useAppConfig({ region, season, storeType })

  // Mostrar loading mientras se inicializa la configuración
  if (configState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si falla la inicialización
  if (configState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error de Configuración
          </h2>
          <p className="text-gray-600 mb-4">
            {configState.error}
          </p>
          <button
            onClick={() => configState.refresh()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <ConfigContext.Provider value={configState}>
      {children}
    </ConfigContext.Provider>
  )
}

/**
 * Hook para acceder al contexto de configuración
 */
export function useConfigContext(): ConfigContextType {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error('useConfigContext must be used within a ConfigProvider')
  }
  return context
}

/**
 * HOC para componentes que requieren configuración inicializada
 */
export function withConfig<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ConfiguredComponent(props: P) {
    const { isInitialized } = useConfigContext()
    
    if (!isInitialized) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-gray-500">Inicializando configuración...</div>
        </div>
      )
    }
    
    return <Component {...props} />
  }
} 