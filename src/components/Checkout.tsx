'use client'

import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import DigitalSignature from './DigitalSignature'
import type { PaymentData, BillingAddress, DigitalSignature as DigitalSignatureType, Invoice } from '@/types'
import { getFinalPrice, calculateTax, getTaxDisplayName } from '@/utils/pricing'
import { generateInvoiceId, getDeviceInfo } from '@/utils/deviceInfo'
import { CONFIG } from '@/config/app.config'

interface CheckoutProps {
  onPaymentComplete: (invoice: Invoice) => void
  onClose?: () => void
}

export default function Checkout({ onPaymentComplete, onClose }: CheckoutProps): JSX.Element {
  const { cart, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<'payment' | 'signature' | 'processing'>('payment')
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [signature, setSignature] = useState<DigitalSignatureType | null>(null)

  // Cálculos usando configuración
  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (getFinalPrice(item.product) * item.quantity)
  }, 0)
  
  const tax = calculateTax(subtotal)
  const total = subtotal + tax

  const handlePaymentSubmit = (data: PaymentData): void => {
    setPaymentData(data)
    setCurrentStep('signature')
  }

  const handleSignatureComplete = (signatureData: DigitalSignatureType): void => {
    console.log('🖊️ Firma completada, iniciando procesamiento...')
    setSignature(signatureData)
    setCurrentStep('processing')
    
    // Simular procesamiento de pago - reducido a 1 segundo para testing
    setTimeout(() => {
      console.log('⏰ Timeout completado, procesando pago directamente...')
      
      if (!paymentData) {
        console.error('❌ No hay datos de pago')
        return
      }

      try {
        console.log('📱 Obteniendo información del dispositivo...')
        const deviceInfo = getDeviceInfo()
        console.log('✅ DeviceInfo obtenido:', deviceInfo)
        
        console.log('📄 Creando factura...')
        const invoice: Invoice = {
          id: generateInvoiceId(),
          orderNumber: `ORD-${Date.now()}`,
          date: new Date().toLocaleDateString('es-ES'),
          customerInfo: {
            name: paymentData.billingAddress.fullName,
            email: paymentData.billingAddress.email,
            billingAddress: paymentData.billingAddress,
          },
          items: cart.items,
          subtotal,
          tax,
          total,
          paymentMethod: `**** **** **** ${paymentData.cardNumber.slice(-4)}`,
          signature: signatureData,
          deviceInfo,
        }
        
        console.log('✅ Factura creada:', invoice)
        console.log('🛒 Limpiando carrito...')
        clearCart()
        
        console.log('🎉 Llamando onPaymentComplete...')
        onPaymentComplete(invoice)
        
      } catch (error) {
        console.error('❌ Error processing payment:', error)
        alert('Error procesando el pago. Por favor, inténtalo de nuevo.')
        setCurrentStep('signature')
      }
    }, 1000)
  }



  if (currentStep === 'signature') {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/kraken-logo.png"
                alt="KRAKEN" 
                className="w-12 h-12"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                }}
              />
              <h1 className="text-3xl font-bold text-neutral-800">Firma Digital</h1>
            </div>
            <p className="text-neutral-600">
              Para completar tu compra, necesitamos tu firma digital como confirmación del pedido.
            </p>
          </div>

          <DigitalSignature onSignatureComplete={handleSignatureComplete} />
        </div>
      </div>
    )
  }

  if (currentStep === 'processing') {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src="/kraken-logo.png"
              alt="KRAKEN" 
              className="w-12 h-12"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
              }}
            />
            <h1 className="text-2xl font-bold text-neutral-800">Procesando Pago</h1>
          </div>
          
          <div className="mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ocean-600 mx-auto"></div>
          </div>
          
          <p className="text-neutral-600 mb-4">
            Estamos procesando tu pago de forma segura...
          </p>
          <p className="text-sm text-neutral-500">
            Por favor, no cierres esta ventana.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 py-8 sm:py-12">
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl shadow-2xl w-full max-w-6xl p-4 sm:p-8">
        
        {/* Header */}
        <div className="mb-8">
          {onClose && (
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-neutral-100 transition-colors duration-200"
                aria-label="Cerrar checkout"
              >
                <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/kraken-logo.png"
                alt="KRAKEN" 
                className="w-12 h-12 sm:w-16 sm:h-16"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                }}
              />
              <h1 className="text-2xl sm:text-4xl font-bold text-neutral-800">Finalizar Compra</h1>
            </div>
            <p className="text-xl text-neutral-600">
              Completa tu pedido de equipos de freediving profesionales
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Payment Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">Información de Pago</h2>
            
            <PaymentForm onSubmit={handlePaymentSubmit} />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">Resumen del Pedido</h2>
            
            <div className="space-y-6">
              {/* Items */}
              <div className="space-y-4">
                {cart.items.map((item, index) => {
                  const variant = item.selectedVariant !== undefined ? item.product.variants?.[item.selectedVariant] : null
                  const displayImage = variant?.image || item.product.image
                  const itemTotal = getFinalPrice(item.product) * item.quantity
                  
                  return (
                    <div key={`${item.product.id}-${item.selectedVariant || 0}`} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-2xl">
                      <img
                        src={displayImage}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-800">{item.product.name}</h3>
                        {variant && (
                          <p className="text-sm text-neutral-600">Color: {variant.colorName}</p>
                        )}
                        <p className="text-sm text-neutral-600">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-neutral-800">{CONFIG.PRICING.currencySymbol}{itemTotal.toFixed(CONFIG.PRICING.decimalPlaces)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Totals */}
              <div className="border-t border-neutral-200 pt-6 space-y-4">
                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal:</span>
                  <span className="font-medium">{CONFIG.PRICING.currencySymbol}{subtotal.toFixed(CONFIG.PRICING.decimalPlaces)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>{getTaxDisplayName()}:</span>
                  <span className="font-medium">{CONFIG.PRICING.currencySymbol}{tax.toFixed(CONFIG.PRICING.decimalPlaces)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-neutral-800 border-t border-neutral-200 pt-4">
                  <span>Total:</span>
                  <span>{CONFIG.PRICING.currencySymbol}{total.toFixed(CONFIG.PRICING.decimalPlaces)}</span>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-800">Pago 100% Seguro</p>
                    <p className="text-sm text-green-700">Tus datos están protegidos con encriptación SSL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

// Payment Form Component
interface PaymentFormProps {
  onSubmit: (data: PaymentData) => void
}

function PaymentForm({ onSubmit }: PaymentFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      fullName: '',
      email: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'España'
    }
  })

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    onSubmit(formData)
  }

  const detectCardType = (cardNumber: string): string => {
    const number = cardNumber.replace(/\s/g, '')
    
    // Visa: comienza con 4
    if (/^4/.test(number)) {
      return 'visa'
    }
    
    // Mastercard: comienza con 5 o 2221-2720
    if (/^5[1-5]/.test(number) || /^2(22[1-9]|2[3-9]|[3-6]|7[0-1]|720)/.test(number)) {
      return 'mastercard'
    }
    
    // American Express: comienza con 34 o 37
    if (/^3[47]/.test(number)) {
      return 'amex'
    }
    
    // Discover: comienza con 6
    if (/^6/.test(number)) {
      return 'discover'
    }
    
    return 'unknown'
  }

  const formatCardNumber = (value: string): string => {
    // Remover todos los espacios y caracteres no numéricos
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    // Limitar a 16 dígitos
    const matches = v.substring(0, 16).match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string): string => {
    // Remover caracteres no numéricos
    const v = value.replace(/\D/g, '')
    // Limitar a 4 dígitos
    const limited = v.substring(0, 4)
    
    if (limited.length >= 2) {
      return limited.substring(0, 2) + '/' + limited.substring(2)
    }
    
    return limited
  }

  const CardIcon = ({ type }: { type: string }) => {
    const baseStyle = "w-10 h-6 rounded transition-all duration-300 transform hover:scale-105 shadow-sm"
    
    switch (type) {
      case 'visa':
        return (
          <div className={`${baseStyle} bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center animate-fade-in`}>
            <span className="text-white text-xs font-bold tracking-wider">VISA</span>
          </div>
        )
      case 'mastercard':
        return (
          <div className={`${baseStyle} bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center relative animate-fade-in`}>
            <div className="w-3 h-3 bg-red-600 rounded-full absolute left-1 opacity-90"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full absolute right-1 opacity-90"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full z-10"></div>
          </div>
        )
      case 'amex':
        return (
          <div className={`${baseStyle} bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-fade-in`}>
            <span className="text-white text-xs font-bold tracking-wider">AMEX</span>
          </div>
        )
      case 'discover':
        return (
          <div className={`${baseStyle} bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center animate-fade-in`}>
            <span className="text-white text-xs font-bold tracking-wider">DISC</span>
          </div>
        )
      default:
        return (
          <div className={`${baseStyle} bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center`}>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        )
    }
  }

  const handleInputChange = (field: string, value: string): void => {
    let formattedValue = value

    // Aplicar formateo específico según el campo
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvv') {
      // Limitar CVV a 4 dígitos
      formattedValue = value.replace(/\D/g, '').substring(0, 4)
    }

    if (field.startsWith('billingAddress.')) {
      const addressField = field.replace('billingAddress.', '')
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: formattedValue
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Información de la Tarjeta</h3>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Número de Tarjeta
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 pr-14 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CardIcon type={detectCardType(formData.cardNumber)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Fecha de Vencimiento
            </label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              placeholder="MM/AA"
              maxLength={5}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Nombre del Titular
          </label>
          <input
            type="text"
            value={formData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            placeholder="Juan Pérez"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
            required
          />
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Dirección de Facturación</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.billingAddress.fullName}
              onChange={(e) => handleInputChange('billingAddress.fullName', e.target.value)}
              placeholder="Juan Pérez García"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.billingAddress.email}
              onChange={(e) => handleInputChange('billingAddress.email', e.target.value)}
              placeholder="juan@ejemplo.com"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            value={formData.billingAddress.street}
            onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
            placeholder="Calle Principal, 123"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Ciudad
            </label>
            <input
              type="text"
              value={formData.billingAddress.city}
              onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
              placeholder="Madrid"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Código Postal
            </label>
            <input
              type="text"
              value={formData.billingAddress.postalCode}
              onChange={(e) => handleInputChange('billingAddress.postalCode', e.target.value)}
              placeholder="28001"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800 placeholder-neutral-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              País
            </label>
            <select
              value={formData.billingAddress.country}
              onChange={(e) => handleInputChange('billingAddress.country', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-neutral-800"
              required
            >
              <option value="España">España</option>
              <option value="Francia">Francia</option>
              <option value="Portugal">Portugal</option>
              <option value="Italia">Italia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 font-bold text-lg rounded-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
          color: '#000000',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.4)',
        }}
      >
        Continuar con la Firma Digital
      </button>
    </form>
  )
} 