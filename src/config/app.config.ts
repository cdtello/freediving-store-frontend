/**
 * Application Configuration System
 * Implements Singleton pattern and follows SOLID principles
 */

import { configDataService, getConfigData } from '@/data/config'

// Configuration Interfaces (Interface Segregation Principle)
export interface StockConfiguration {
  readonly lowStockThreshold: number
  readonly maxStockForVisualization: number
  readonly outOfStockThreshold: number
}

export interface TaxConfiguration {
  readonly defaultTaxRate: number
  readonly taxName: string
  readonly taxDisplayName: string
}

export interface PricingConfiguration {
  readonly currency: string
  readonly currencySymbol: string
  readonly decimalPlaces: number
  readonly premiumThreshold: number
}

export interface UIConfiguration {
  readonly stockColors: {
    readonly high: string
    readonly medium: string
    readonly low: string
    readonly outOfStock: string
  }
  readonly stockGradients: {
    readonly high: string
    readonly medium: string
    readonly low: string
  }
  readonly animationDurations: {
    readonly fast: number
    readonly medium: number
    readonly slow: number
  }
}

export interface BusinessConfiguration {
  readonly companyName: string
  readonly companyAddress: string
  readonly companyPhone: string
  readonly companyEmail: string
  readonly companyWebsite: string
}

export interface AppConfiguration {
  stock: StockConfiguration
  tax: TaxConfiguration
  pricing: PricingConfiguration
  ui: UIConfiguration
  business: BusinessConfiguration
}

/**
 * Configuration Manager - Singleton Pattern
 * Manages all application configuration with database simulation
 */
export class ConfigurationManager {
  private static instance: ConfigurationManager
  private config: AppConfiguration | null = null
  private isInitialized = false

  private constructor() {}

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager()
    }
    return ConfigurationManager.instance
  }

  /**
   * Initialize configuration from simulated database
   * This method should be called at app startup
   */
  public async initialize(options?: {
    region?: string
    season?: string
    storeType?: 'retail' | 'wholesale' | 'outlet'
  }): Promise<void> {
    try {
      // Load all configurations from simulated database in parallel
      const [stockConfig, taxConfig, pricingConfig, uiConfig, businessConfig] = await Promise.all([
        getConfigData.stock(),
        getConfigData.tax(options?.region),
        getConfigData.pricing(options?.region),
        getConfigData.ui(options?.season),
        getConfigData.business(),
      ])

      // Apply store type specific overrides if provided
      let finalStockConfig = stockConfig
      let finalPremiumThreshold = pricingConfig.premiumThreshold

      if (options?.storeType) {
        const storeTypeConfig = await getConfigData.storeType(options.storeType)
        if (storeTypeConfig.lowStockThreshold !== undefined) {
          finalStockConfig = { 
            ...stockConfig, 
            lowStockThreshold: storeTypeConfig.lowStockThreshold,
            maxStockForVisualization: storeTypeConfig.maxStockForVisualization || stockConfig.maxStockForVisualization,
            outOfStockThreshold: storeTypeConfig.outOfStockThreshold || stockConfig.outOfStockThreshold
          }
        }
        if (storeTypeConfig.premiumThreshold) {
          finalPremiumThreshold = storeTypeConfig.premiumThreshold
        }
      }

      this.config = {
        stock: finalStockConfig,
        tax: taxConfig,
        pricing: {
          ...pricingConfig,
          premiumThreshold: finalPremiumThreshold,
        },
        ui: uiConfig,
        business: businessConfig,
      }

      this.isInitialized = true
      console.log('[ConfigurationManager] Configuration loaded from database simulation')
    } catch (error) {
      console.error('[ConfigurationManager] Failed to initialize configuration:', error)
      // Fallback to default configuration if database fails
      await this.initializeWithDefaults()
    }
  }

  /**
   * Fallback initialization with default values
   */
  private async initializeWithDefaults(): Promise<void> {
    this.config = {
      stock: {
        lowStockThreshold: 5,
        maxStockForVisualization: 30,
        outOfStockThreshold: 0,
      },
      tax: {
        defaultTaxRate: 0.21,
        taxName: 'IVA',
        taxDisplayName: 'IVA (21%)',
      },
      pricing: {
        currency: 'EUR',
        currencySymbol: '€',
        decimalPlaces: 2,
        premiumThreshold: 150,
      },
      ui: {
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
      },
      business: {
        companyName: 'KRAKEN Freediving Store',
        companyAddress: 'Calle del Mar Profundo, 42\n28001 Madrid, España',
        companyPhone: '+34 91 234 56 78',
        companyEmail: 'info@krakenfreediving.com',
        companyWebsite: 'www.krakenfreediving.com',
      },
    }
    this.isInitialized = true
    console.warn('[ConfigurationManager] Using default configuration due to database error')
  }

  /**
   * Update configuration in database and refresh local config
   */
  public async updateConfiguration(
    type: keyof AppConfiguration,
    newConfig: Partial<AppConfiguration[keyof AppConfiguration]>
  ): Promise<boolean> {
    if (!this.isInitialized || !this.config) {
      throw new Error('Configuration not initialized. Call initialize() first.')
    }

    try {
      // Update in simulated database
      const success = await configDataService.updateConfig(type.toLowerCase(), newConfig)
      
      if (success) {
        // Update local configuration
        this.config[type] = { ...this.config[type], ...newConfig } as any
        console.log(`[ConfigurationManager] Updated ${type} configuration`)
        return true
      }
      
      return false
    } catch (error) {
      console.error(`[ConfigurationManager] Failed to update ${type} configuration:`, error)
      return false
    }
  }

  /**
   * Refresh configuration from database
   */
  public async refresh(options?: {
    region?: string
    season?: string
    storeType?: 'retail' | 'wholesale' | 'outlet'
  }): Promise<void> {
    // Clear cache and reinitialize
    configDataService.clearCache()
    await this.initialize(options)
  }

  // Configuration Getters with null checks
  public getStockConfig(): StockConfiguration {
    if (!this.config) throw new Error('Configuration not initialized')
    return this.config.stock
  }

  public getTaxConfig(): TaxConfiguration {
    if (!this.config) throw new Error('Configuration not initialized')
    return this.config.tax
  }

  public getPricingConfig(): PricingConfiguration {
    if (!this.config) throw new Error('Configuration not initialized')
    return this.config.pricing
  }

  public getUIConfig(): UIConfiguration {
    if (!this.config) throw new Error('Configuration not initialized')
    return this.config.ui
  }

  public getBusinessConfig(): BusinessConfiguration {
    if (!this.config) throw new Error('Configuration not initialized')
    return this.config.business
  }

  public getFullConfig(): AppConfiguration {
    if (!this.config) throw new Error('Configuration not initialized')
    return this.config
  }

  // Utility Methods (Strategy Pattern)
  public isLowStock(quantity: number): boolean {
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    return quantity > stockConfig.outOfStockThreshold && quantity <= stockConfig.lowStockThreshold
  }

  public isHighStock(quantity: number): boolean {
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    return quantity > stockConfig.lowStockThreshold * 2
  }

  public isMediumStock(quantity: number): boolean {
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    return quantity > stockConfig.lowStockThreshold && quantity <= stockConfig.lowStockThreshold * 2
  }

  public isOutOfStock(quantity: number): boolean {
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    return quantity <= stockConfig.outOfStockThreshold
  }

  public getStockColor(quantity: number): string {
    const colors = this.config?.ui.stockColors || DEFAULT_CONFIG.UI.stockColors
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    
    if (quantity <= stockConfig.outOfStockThreshold) return colors.outOfStock
    if (quantity > stockConfig.outOfStockThreshold && quantity <= stockConfig.lowStockThreshold) return colors.low
    if (quantity > stockConfig.lowStockThreshold && quantity <= stockConfig.lowStockThreshold * 2) return colors.medium
    return colors.high
  }

  public getStockGradient(quantity: number): string {
    const gradients = this.config?.ui.stockGradients || DEFAULT_CONFIG.UI.stockGradients
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    
    if (quantity <= stockConfig.outOfStockThreshold) return gradients.low
    if (quantity > stockConfig.outOfStockThreshold && quantity <= stockConfig.lowStockThreshold) return gradients.low
    if (quantity > stockConfig.lowStockThreshold && quantity <= stockConfig.lowStockThreshold * 2) return gradients.medium
    return gradients.high
  }

  public getStockColorHex(quantity: number): string {
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    
    if (quantity <= stockConfig.outOfStockThreshold) return '#dc2626' // red-600
    if (quantity > stockConfig.outOfStockThreshold && quantity <= stockConfig.lowStockThreshold) return '#ea580c' // orange-600
    if (quantity > stockConfig.lowStockThreshold && quantity <= stockConfig.lowStockThreshold * 2) return '#d97706' // amber-600
    return '#16a34a' // green-600
  }

  public getStockBarWidth(quantity: number): string {
    const stockConfig = this.config?.stock || DEFAULT_CONFIG.STOCK
    const percentage = Math.min((quantity / stockConfig.maxStockForVisualization) * 100, 100)
    return `${percentage}%`
  }

  public isPremiumProduct(price: number): boolean {
    if (!this.config) throw new Error('Configuration not initialized')
    return price >= this.config.pricing.premiumThreshold
  }

  public formatPrice(price: number): string {
    if (!this.config) throw new Error('Configuration not initialized')
    return `${price.toFixed(this.config.pricing.decimalPlaces)}${this.config.pricing.currencySymbol}`
  }

  public calculateTax(amount: number): number {
    if (!this.config) throw new Error('Configuration not initialized')
    return amount * this.config.tax.defaultTaxRate
  }

  public calculateTotalWithTax(amount: number): number {
    if (!this.config) throw new Error('Configuration not initialized')
    return amount * (1 + this.config.tax.defaultTaxRate)
  }
}

// Factory Pattern for easy access
export class AppConfigFactory {
  public static getConfig(): ConfigurationManager {
    return ConfigurationManager.getInstance()
  }
}

// Utility class for common configuration operations
export class ConfigUtils {
  private static get config(): ConfigurationManager {
    return AppConfigFactory.getConfig()
  }

  public static getStockColor(quantity: number): string {
    return this.config.getStockColor(quantity)
  }

  public static getStockBarWidth(quantity: number): string {
    return this.config.getStockBarWidth(quantity)
  }

  public static getStockGradient(quantity: number): string {
    return this.config.getStockGradient(quantity)
  }

  public static getStockColorHex(quantity: number): string {
    return this.config.getStockColorHex(quantity)
  }

  public static isLowStock(quantity: number): boolean {
    return this.config.isLowStock(quantity)
  }

  public static isMediumStock(quantity: number): boolean {
    return this.config.isMediumStock(quantity)
  }

  public static isHighStock(quantity: number): boolean {
    return this.config.isHighStock(quantity)
  }

  public static isOutOfStock(quantity: number): boolean {
    return this.config.isOutOfStock(quantity)
  }

  public static formatPrice(price: number): string {
    return this.config.formatPrice(price)
  }

  public static calculateTax(amount: number): number {
    return this.config.calculateTax(amount)
  }

  public static calculateTotalWithTax(amount: number): number {
    return this.config.calculateTotalWithTax(amount)
  }

  public static isPremiumProduct(price: number): boolean {
    return this.config.isPremiumProduct(price)
  }
}

// Export singleton instance
export const appConfig = AppConfigFactory.getConfig()

// Initialize with defaults in background
appConfig.initialize().catch(() => {
  console.warn('[CONFIG] Initialization failed, using defaults')
})

// Default configuration values for immediate access
const DEFAULT_CONFIG = {
  STOCK: {
    lowStockThreshold: 5,
    maxStockForVisualization: 30,
    outOfStockThreshold: 0,
  },
  TAX: {
    defaultTaxRate: 0.21,
    taxName: 'IVA',
    taxDisplayName: 'IVA (21%)',
  },
  PRICING: {
    currency: 'EUR',
    currencySymbol: '€',
    decimalPlaces: 2,
    premiumThreshold: 150,
  },
  UI: {
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
  },
  BUSINESS: {
    companyName: 'KRAKEN Freediving Store',
    companyAddress: 'Calle del Mar Profundo, 42\n28001 Madrid, España',
    companyPhone: '+34 91 234 56 78',
    companyEmail: 'info@krakenfreediving.com',
    companyWebsite: 'www.krakenfreediving.com',
  }
}

// Create a CONFIG object for backward compatibility and easier access
export const CONFIG = {
  get STOCK() {
    try {
      return appConfig.getStockConfig()
    } catch {
      return DEFAULT_CONFIG.STOCK
    }
  },
  get TAX() {
    try {
      return appConfig.getTaxConfig()
    } catch {
      return DEFAULT_CONFIG.TAX
    }
  },
  get PRICING() {
    try {
      return appConfig.getPricingConfig()
    } catch {
      return DEFAULT_CONFIG.PRICING
    }
  },
  get UI() {
    try {
      return appConfig.getUIConfig()
    } catch {
      return DEFAULT_CONFIG.UI
    }
  },
  get BUSINESS() {
    try {
      return appConfig.getBusinessConfig()
    } catch {
      return DEFAULT_CONFIG.BUSINESS
    }
  }
} 