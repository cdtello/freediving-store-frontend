import type { Product } from '@/types'
import { ConfigUtils, CONFIG } from '@/config/app.config'

/**
 * Pricing utilities using centralized configuration
 * Follows Single Responsibility and Dependency Inversion principles
 */

/**
 * Calcula el precio con descuento aplicado
 */
export function getDiscountedPrice(product: Product): number {
  if (!product.inSale) {
    return product.price
  }
  
  const discount = product.price * (product.inSale.discountPercentage / 100)
  const discountedPrice = product.price - discount
  
  // Round to configured decimal places
  const decimalPlaces = CONFIG.PRICING.decimalPlaces
  return Math.round(discountedPrice * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
}

/**
 * Calcula el monto ahorrado
 */
export function getSavingsAmount(product: Product): number {
  if (!product.inSale) {
    return 0
  }
  
  const savings = product.price - getDiscountedPrice(product)
  
  // Round to configured decimal places
  const decimalPlaces = CONFIG.PRICING.decimalPlaces
  return Math.round(savings * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
}

/**
 * Verifica si un producto está en promoción
 */
export function isProductOnSale(product: Product): boolean {
  return Boolean(product.inSale && product.inSale.discountPercentage > 0)
}

/**
 * Obtiene el precio original (sin descuento)
 */
export function getOriginalPrice(product: Product): number {
  return product.price
}

/**
 * Obtiene el precio final a mostrar (con descuento si aplica)
 */
export function getFinalPrice(product: Product): number {
  if (!isProductOnSale(product)) {
    return product.price
  }
  
  const discountPercentage = product.inSale?.discountPercentage || 0
  const discountAmount = product.price * (discountPercentage / 100)
  const finalPrice = product.price - discountAmount
  
  // Round to configured decimal places
  const decimalPlaces = CONFIG.PRICING.decimalPlaces
  return Math.round(finalPrice * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
}

export function formatPrice(price: number): string {
  return ConfigUtils.formatPrice(price)
}

export function isPremiumProduct(product: Product): boolean {
  return ConfigUtils.isPremiumProduct(getOriginalPrice(product))
}

export function calculateTax(amount: number): number {
  return ConfigUtils.calculateTax(amount)
}

export function calculateTotalWithTax(amount: number): number {
  return ConfigUtils.calculateTotalWithTax(amount)
}

export function getTaxRate(): number {
  return CONFIG.TAX.defaultTaxRate
}

export function getTaxDisplayName(): string {
  return CONFIG.TAX.taxDisplayName
}

export function getCurrency(): string {
  return CONFIG.PRICING.currency
}

export function getCurrencySymbol(): string {
  return CONFIG.PRICING.currencySymbol
} 