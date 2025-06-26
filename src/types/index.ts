export interface ProductVariant {
  readonly id: number
  readonly color: string
  readonly colorName: string
  readonly image: string
  readonly inStock: boolean
  readonly stockQuantity: number
}

export interface ProductSale {
  readonly discountPercentage: number
}

export interface Product {
  readonly id: number
  readonly name: string
  readonly price: number // Precio actual (con descuento si aplica)
  readonly originalPrice?: number // Precio original antes del descuento
  readonly inSale?: ProductSale | null // Información de promoción
  readonly description: string
  readonly image: string
  readonly category: ProductCategory
  readonly inStock: boolean
  readonly stockQuantity: number
  readonly rating?: number
  readonly reviews?: number
  readonly variants?: readonly ProductVariant[]
}

export interface CartItem {
  readonly product: Product
  quantity: number
  readonly selectedVariant?: number // Índice de la variante seleccionada
}

export interface CartState {
  readonly items: readonly CartItem[]
  readonly total: number
  readonly itemCount: number
}

export interface CartContextType {
  readonly cart: CartState
  addToCart: (product: Product, selectedVariant?: number) => void
  removeFromCart: (productId: number, selectedVariant?: number) => void
  updateQuantity: (productId: number, quantity: number, selectedVariant?: number) => void
  clearCart: () => void
  readonly isCartOpen: boolean
  toggleCart: () => void
}

// Tipos específicos para el catálogo
export const PRODUCT_CATEGORIES = {
  FINS: 'fins',
  MASKS: 'masks', 
  SNORKELS: 'snorkels',
  WETSUITS: 'wetsuits',
  ACCESSORIES: 'accessories'
} as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES]

export const SORT_OPTIONS = {
  NAME: 'name',
  PRICE_LOW: 'price-low', 
  PRICE_HIGH: 'price-high'
} as const

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]

export interface CatalogFilters {
  readonly category: ProductCategory | 'all'
  readonly sortBy: SortOption
  readonly showInStockOnly: boolean
}

// Props de componentes
export interface ProductCardProps {
  readonly product: Product
}

export interface CartProps {
  // Vacío por ahora, pero facilita extensión futura
}

export interface HeaderProps {
  // Vacío por ahora, pero facilita extensión futura
}

// Tipos para el sistema de pago
export interface PaymentData {
  readonly cardNumber: string
  readonly expiryDate: string
  readonly cvv: string
  readonly cardholderName: string
  readonly billingAddress: BillingAddress
}

export interface BillingAddress {
  readonly fullName: string
  readonly email: string
  readonly street: string
  readonly city: string
  readonly postalCode: string
  readonly country: string
}

export interface DigitalSignature {
  readonly signatureData: string // Base64 de la firma
  readonly timestamp: string
  readonly ipAddress: string
  readonly userAgent: string
}

export interface Invoice {
  readonly id: string
  readonly orderNumber: string
  readonly date: string
  readonly items: readonly CartItem[]
  readonly subtotal: number
  readonly tax: number
  readonly total: number
  readonly paymentMethod: string
  readonly customerInfo: CustomerInfo
  readonly signature: DigitalSignature
  readonly deviceInfo: DeviceInfo
}

export interface CustomerInfo {
  readonly name: string
  readonly email: string
  readonly billingAddress: BillingAddress
}

export interface DeviceInfo {
  readonly userAgent: string
  readonly platform: string
  readonly language: string
  readonly screenResolution: string
  readonly timezone: string
} 