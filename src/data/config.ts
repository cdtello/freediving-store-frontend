import type { 
  StockConfiguration, 
  TaxConfiguration, 
  PricingConfiguration, 
  UIConfiguration, 
  BusinessConfiguration 
} from '@/config/app.config'

/**
 * Configuración simulada de base de datos
 * En producción, estos datos vendrían de una API/base de datos
 */

// Configuración de Stock (tabla: stock_settings)
export const stockConfigData: StockConfiguration = {
  lowStockThreshold: 5,
  maxStockForVisualization: 30,
  outOfStockThreshold: 0,
}

// Configuración de Impuestos (tabla: tax_settings)
export const taxConfigData: TaxConfiguration = {
  defaultTaxRate: 0.21, // 21% IVA España
  taxName: 'IVA',
  taxDisplayName: 'IVA (21%)',
}

// Configuración de Precios (tabla: pricing_settings)
export const pricingConfigData: PricingConfiguration = {
  currency: 'EUR',
  currencySymbol: '€',
  decimalPlaces: 2,
  premiumThreshold: 150,
}

// Configuración de UI (tabla: ui_settings)
export const uiConfigData: UIConfiguration = {
  stockColors: {
    high: 'text-green-600',
    medium: 'text-yellow-600',
    low: 'text-orange-600',
    outOfStock: 'text-red-600',
  },
  stockGradients: {
    high: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
    medium: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
    low: 'linear-gradient(90deg, #ea580c 0%, #fb923c 100%)',
  },
  animationDurations: {
    fast: 200,
    medium: 300,
    slow: 500,
  },
}

// Configuración de Empresa (tabla: business_settings)
export const businessConfigData: BusinessConfiguration = {
  companyName: 'KRAKEN Freediving Store',
  companyAddress: 'Calle del Mar Profundo, 42\n28001 Madrid, España',
  companyPhone: '+34 91 234 56 78',
  companyEmail: 'info@krakenfreediving.com',
  companyWebsite: 'www.krakenfreediving.com',
}

/**
 * Configuraciones por país/región (tabla: regional_settings)
 * Simula configuraciones específicas por región
 */
export const regionalConfigs = {
  ES: {
    tax: {
      defaultTaxRate: 0.21,
      taxName: 'IVA',
      taxDisplayName: 'IVA (21%)',
    },
    pricing: {
      currency: 'EUR',
      currencySymbol: '€',
      decimalPlaces: 2,
    },
  },
  FR: {
    tax: {
      defaultTaxRate: 0.20,
      taxName: 'TVA',
      taxDisplayName: 'TVA (20%)',
    },
    pricing: {
      currency: 'EUR',
      currencySymbol: '€',
      decimalPlaces: 2,
    },
  },
  US: {
    tax: {
      defaultTaxRate: 0.08,
      taxName: 'Sales Tax',
      taxDisplayName: 'Sales Tax (8%)',
    },
    pricing: {
      currency: 'USD',
      currencySymbol: '$',
      decimalPlaces: 2,
    },
  },
} as const

/**
 * Configuraciones por tipo de tienda (tabla: store_type_settings)
 * Simula diferentes configuraciones según el tipo de negocio
 */
export const storeTypeConfigs = {
  retail: {
    stock: {
      lowStockThreshold: 5,
      maxStockForVisualization: 30,
      outOfStockThreshold: 0,
    },
    premiumThreshold: 150,
  },
  wholesale: {
    stock: {
      lowStockThreshold: 20,
      maxStockForVisualization: 100,
      outOfStockThreshold: 0,
    },
    premiumThreshold: 500,
  },
  outlet: {
    stock: {
      lowStockThreshold: 2,
      maxStockForVisualization: 20,
      outOfStockThreshold: 0,
    },
    premiumThreshold: 75,
  },
} as const

/**
 * Configuraciones de temporada (tabla: seasonal_settings)
 * Simula configuraciones que cambian según la temporada
 */
export const seasonalConfigs = {
  summer: {
    premiumThreshold: 120, // Menor umbral en temporada alta
    stockColors: {
      high: 'text-blue-600',
      medium: 'text-cyan-600',
      low: 'text-orange-600',
      outOfStock: 'text-red-600',
    },
  },
  winter: {
    premiumThreshold: 180, // Mayor umbral en temporada baja
    stockColors: {
      high: 'text-green-600',
      medium: 'text-yellow-600',
      low: 'text-orange-600',
      outOfStock: 'text-red-600',
    },
  },
} as const

/**
 * Simulación de API para obtener configuración
 * En producción, esto sería una llamada real a la API
 */
export class ConfigDataService {
  private static instance: ConfigDataService
  private cache: Map<string, any> = new Map()
  private cacheExpiry: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

  public static getInstance(): ConfigDataService {
    if (!ConfigDataService.instance) {
      ConfigDataService.instance = new ConfigDataService()
    }
    return ConfigDataService.instance
  }

  /**
   * Simula obtener configuración de stock desde la base de datos
   */
  public async getStockConfig(): Promise<StockConfiguration> {
    return this.getCachedOrFetch('stock', () => 
      Promise.resolve(stockConfigData)
    )
  }

  /**
   * Simula obtener configuración de impuestos desde la base de datos
   */
  public async getTaxConfig(region?: string): Promise<TaxConfiguration> {
    const key = `tax_${region || 'default'}`
    return this.getCachedOrFetch(key, () => {
      if (region && region in regionalConfigs) {
        return Promise.resolve(regionalConfigs[region as keyof typeof regionalConfigs].tax)
      }
      return Promise.resolve(taxConfigData)
    })
  }

  /**
   * Simula obtener configuración de precios desde la base de datos
   */
  public async getPricingConfig(region?: string): Promise<PricingConfiguration> {
    const key = `pricing_${region || 'default'}`
    return this.getCachedOrFetch(key, () => {
      const baseConfig = region && region in regionalConfigs 
        ? regionalConfigs[region as keyof typeof regionalConfigs].pricing
        : { currency: pricingConfigData.currency, currencySymbol: pricingConfigData.currencySymbol, decimalPlaces: pricingConfigData.decimalPlaces }
      
      return Promise.resolve({
        ...pricingConfigData,
        ...baseConfig,
      })
    })
  }

  /**
   * Simula obtener configuración de UI desde la base de datos
   */
  public async getUIConfig(season?: string): Promise<UIConfiguration> {
    const key = `ui_${season || 'default'}`
    return this.getCachedOrFetch(key, () => {
      const baseConfig = { ...uiConfigData }
      
      if (season && season in seasonalConfigs) {
        const seasonalConfig = seasonalConfigs[season as keyof typeof seasonalConfigs]
        baseConfig.stockColors = { ...baseConfig.stockColors, ...seasonalConfig.stockColors }
      }
      
      return Promise.resolve(baseConfig)
    })
  }

  /**
   * Simula obtener configuración de empresa desde la base de datos
   */
  public async getBusinessConfig(): Promise<BusinessConfiguration> {
    return this.getCachedOrFetch('business', () => 
      Promise.resolve(businessConfigData)
    )
  }

  /**
   * Simula obtener configuración por tipo de tienda
   */
  public async getStoreTypeConfig(storeType: keyof typeof storeTypeConfigs): Promise<Partial<StockConfiguration & { premiumThreshold: number }>> {
    const key = `store_type_${storeType}`
    return this.getCachedOrFetch(key, () => 
      Promise.resolve(storeTypeConfigs[storeType])
    )
  }

  /**
   * Simula actualizar configuración en la base de datos
   */
  public async updateConfig(type: string, config: any): Promise<boolean> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Invalidar cache
    this.cache.delete(type)
    this.cacheExpiry.delete(type)
    
    console.log(`[ConfigDataService] Updated ${type} configuration:`, config)
    return true
  }

  /**
   * Sistema de cache simple
   */
  private async getCachedOrFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const now = Date.now()
    const expiry = this.cacheExpiry.get(key)
    
    if (this.cache.has(key) && expiry && now < expiry) {
      return this.cache.get(key)
    }
    
    // Simular delay de red para hacer más realista
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const data = await fetcher()
    this.cache.set(key, data)
    this.cacheExpiry.set(key, now + this.CACHE_DURATION)
    
    return data
  }

  /**
   * Limpiar cache (útil para testing o refresh manual)
   */
  public clearCache(): void {
    this.cache.clear()
    this.cacheExpiry.clear()
  }
}

// Export del servicio singleton
export const configDataService = ConfigDataService.getInstance()

/**
 * Funciones de conveniencia para obtener configuraciones específicas
 */
export const getConfigData = {
  stock: () => configDataService.getStockConfig(),
  tax: (region?: string) => configDataService.getTaxConfig(region),
  pricing: (region?: string) => configDataService.getPricingConfig(region),
  ui: (season?: string) => configDataService.getUIConfig(season),
  business: () => configDataService.getBusinessConfig(),
  storeType: (type: keyof typeof storeTypeConfigs) => configDataService.getStoreTypeConfig(type),
} 