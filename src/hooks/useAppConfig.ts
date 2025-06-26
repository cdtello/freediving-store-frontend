import { useEffect, useState } from 'react'
import { appConfig } from '@/config/app.config'

interface UseAppConfigOptions {
  region?: string
  season?: string
  storeType?: 'retail' | 'wholesale' | 'outlet'
}

interface UseAppConfigReturn {
  isLoading: boolean
  isInitialized: boolean
  error: string | null
  refresh: (options?: UseAppConfigOptions) => Promise<void>
}

/**
 * Hook para gestionar la configuración de la aplicación
 * Inicializa la configuración desde la base de datos simulada
 */
export function useAppConfig(options?: UseAppConfigOptions): UseAppConfigReturn {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeConfig = async (configOptions?: UseAppConfigOptions) => {
    try {
      setIsLoading(true)
      setError(null)
      
      await appConfig.initialize(configOptions)
      
      setIsInitialized(true)
      console.log('[useAppConfig] Configuration initialized successfully')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize configuration'
      setError(errorMessage)
      console.error('[useAppConfig] Configuration initialization failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const refresh = async (refreshOptions?: UseAppConfigOptions) => {
    await initializeConfig(refreshOptions || options)
  }

  useEffect(() => {
    initializeConfig(options)
  }, []) // Solo se ejecuta una vez al montar el componente

  return {
    isLoading,
    isInitialized,
    error,
    refresh,
  }
}

/**
 * Hook simplificado para obtener configuraciones específicas
 */
export function useStockConfig() {
  const { isInitialized } = useAppConfig()
  
  if (!isInitialized) {
    throw new Error('Configuration not initialized. Use useAppConfig first.')
  }
  
  return appConfig.getStockConfig()
}

export function useTaxConfig() {
  const { isInitialized } = useAppConfig()
  
  if (!isInitialized) {
    throw new Error('Configuration not initialized. Use useAppConfig first.')
  }
  
  return appConfig.getTaxConfig()
}

export function usePricingConfig() {
  const { isInitialized } = useAppConfig()
  
  if (!isInitialized) {
    throw new Error('Configuration not initialized. Use useAppConfig first.')
  }
  
  return appConfig.getPricingConfig()
}

export function useUIConfig() {
  const { isInitialized } = useAppConfig()
  
  if (!isInitialized) {
    throw new Error('Configuration not initialized. Use useAppConfig first.')
  }
  
  return appConfig.getUIConfig()
}

export function useBusinessConfig() {
  const { isInitialized } = useAppConfig()
  
  if (!isInitialized) {
    throw new Error('Configuration not initialized. Use useAppConfig first.')
  }
  
  return appConfig.getBusinessConfig()
} 