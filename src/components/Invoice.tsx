'use client'

import React, { useRef } from 'react'
import type { Invoice } from '@/types'
import { getFinalPrice, getOriginalPrice, isProductOnSale, getTaxDisplayName } from '@/utils/pricing'
import { CONFIG } from '@/config/app.config'

interface InvoiceProps {
  invoice: Invoice
  onClose: () => void
}

export default function InvoiceComponent({ invoice, onClose }: InvoiceProps): JSX.Element {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const handlePrint = async (): Promise<void> => {
    if (!invoiceRef.current) return

    try {
      // Importar dinámicamente las librerías
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      // Capturar el contenido de la factura
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      // Crear el PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Agregar la primera página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Crear blob del PDF y abrirlo en nueva ventana para imprimir
      const pdfBlob = pdf.output('blob')
      const pdfUrl = URL.createObjectURL(pdfBlob)
      
      // Abrir en nueva ventana
      const printWindow = window.open(pdfUrl, '_blank')
      if (printWindow) {
        // Limpiar la URL del blob después de un tiempo para liberar memoria
        setTimeout(() => {
          URL.revokeObjectURL(pdfUrl)
        }, 10000)
      }
    } catch (error) {
      console.error('Error generating PDF for print:', error)
      // Fallback a impresión simple si hay error
      window.print()
    }
  }

  const handleDownload = async (): Promise<void> => {
    if (!invoiceRef.current) return

    try {
      // Importar dinámicamente las librerías
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      // Capturar el contenido de la factura
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      // Crear el PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Agregar la primera página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Descargar el PDF
      pdf.save(`factura-${invoice.orderNumber}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback a JSON si hay error
      const invoiceData = JSON.stringify(invoice, null, 2)
      const blob = new Blob([invoiceData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `factura-${invoice.orderNumber}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-neutral-200 rounded-t-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src="/kraken-logo.png"
                  alt="KRAKEN" 
                  className="w-12 h-12"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)) brightness(1.15) contrast(1.2) saturate(1.1)'
                  }}
                />
                <div>
                  <h1 className="text-2xl font-bold text-neutral-800">Factura</h1>
                  <p className="text-sm text-neutral-600">Comprobante de Pago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Imprimir
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
                >
                  Descargar
                </button>
                <button
                  onClick={onClose}
                  className="p-3 rounded-full hover:bg-neutral-100 transition-colors duration-200"
                  aria-label="Cerrar factura"
                >
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div ref={invoiceRef} className="p-6 space-y-5">
            
                        {/* Invoice Header - Balanceado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h2 className="text-base font-bold text-neutral-800 mb-3">Información de la Empresa</h2>
                <div className="space-y-1.5 text-sm text-neutral-700">
                  <p className="font-semibold text-neutral-800">{CONFIG.BUSINESS.companyName}</p>
                  {CONFIG.BUSINESS.companyAddress.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  <p>Tel: {CONFIG.BUSINESS.companyPhone}</p>
                  <p>Email: {CONFIG.BUSINESS.companyEmail}</p>
                  <p>Web: {CONFIG.BUSINESS.companyWebsite}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-base font-bold text-neutral-800 mb-3">Información del Cliente</h2>
                <div className="space-y-1.5 text-sm text-neutral-700">
                  <p className="font-semibold text-neutral-800">{invoice.customerInfo.name}</p>
                  <p>{invoice.customerInfo.email}</p>
                  <p>{invoice.customerInfo.billingAddress.street}</p>
                  <p>{invoice.customerInfo.billingAddress.city}, {invoice.customerInfo.billingAddress.postalCode}</p>
                  <p>{invoice.customerInfo.billingAddress.country}</p>
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-neutral-800 mb-3">Detalles de Factura</h2>
                <div className="space-y-1.5 text-sm text-neutral-700">
                  <p><span className="font-medium text-neutral-800">Factura:</span> {invoice.id}</p>
                  <p><span className="font-medium text-neutral-800">Pedido:</span> {invoice.orderNumber}</p>
                  <p><span className="font-medium text-neutral-800">Fecha:</span> {invoice.date}</p>
                  <p><span className="font-medium text-neutral-800">Pago:</span> {invoice.paymentMethod}</p>
                </div>
              </div>
            </div>

            

            {/* Items - Tabla balanceada */}
            <div>
              <h2 className="text-base font-bold text-neutral-800 mb-3">Productos</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-800 text-sm">Producto</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-800 text-sm">Variante</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-800 text-sm">Cant.</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-800 text-sm">P. Unit.</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-800 text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => {
                      const finalPrice = getFinalPrice(item.product)
                      const originalPrice = getOriginalPrice(item.product)
                      const onSale = isProductOnSale(item.product)
                      const variant = item.selectedVariant !== undefined ? item.product.variants?.[item.selectedVariant] : null
                      const itemTotal = finalPrice * item.quantity
                      
                      return (
                        <tr key={`${item.product.id}-${item.selectedVariant || 0}`} className="border-b border-neutral-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={variant?.image || item.product.image}
                                alt={item.product.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-neutral-800 text-sm">{item.product.name}</p>
                                <p className="text-xs text-neutral-600">{item.product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {variant ? (
                              <div className="flex items-center space-x-2">
                                <div
                                  className="w-4 h-4 rounded-full border border-neutral-300"
                                  style={{ backgroundColor: variant.color }}
                                ></div>
                                <span className="text-sm text-neutral-600">{variant.colorName}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-neutral-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-medium text-neutral-800 text-sm">{item.quantity}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="space-y-1">
                              {onSale && (
                                <p className="text-xs text-neutral-400 line-through">{CONFIG.PRICING.currencySymbol}{originalPrice.toFixed(CONFIG.PRICING.decimalPlaces)}</p>
                              )}
                              <p className={`font-medium text-sm ${onSale ? 'text-red-600' : 'text-neutral-800'}`}>
                                {CONFIG.PRICING.currencySymbol}{finalPrice.toFixed(CONFIG.PRICING.decimalPlaces)}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <p className="font-bold text-neutral-800 text-sm">{CONFIG.PRICING.currencySymbol}{itemTotal.toFixed(CONFIG.PRICING.decimalPlaces)}</p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

                        {/* Totals - Balanceado */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-neutral-700">
                  <span className="text-sm">Subtotal:</span>
                  <span className="font-medium text-sm">{CONFIG.PRICING.currencySymbol}{invoice.subtotal.toFixed(CONFIG.PRICING.decimalPlaces)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span className="text-sm">{getTaxDisplayName()}:</span>
                  <span className="font-medium text-sm">{CONFIG.PRICING.currencySymbol}{invoice.tax.toFixed(CONFIG.PRICING.decimalPlaces)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-neutral-800 border-t border-neutral-200 pt-2">
                  <span>Total:</span>
                  <span>{CONFIG.PRICING.currencySymbol}{invoice.total.toFixed(CONFIG.PRICING.decimalPlaces)}</span>
                </div>
              </div>
            </div>

                        {/* Payment & Technical Info - Compacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50 rounded-lg p-4">
              <div>
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">Información de Pago</h3>
                <div className="space-y-1 text-xs text-neutral-700">
                  <p><span className="font-medium text-neutral-800">Método:</span> Tarjeta • <span className="text-green-600 font-medium">Pagado</span></p>
                  <p><span className="font-medium text-neutral-800">Número:</span> {invoice.paymentMethod}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm">Información Técnica</h3>
                <div className="space-y-1 text-xs text-neutral-700">
                  <p><span className="font-medium text-neutral-800">IP:</span> {invoice.signature.ipAddress} • <span className="font-medium text-neutral-800">Zona:</span> {invoice.deviceInfo.timezone}</p>
                  <p><span className="font-medium text-neutral-800">Dispositivo:</span> {invoice.deviceInfo.platform}</p>
                </div>
              </div>
            </div>

                        {/* Digital Signature - Compacto */}
            <div className="bg-neutral-50 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2 text-sm">Firma Digital del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="bg-white border border-neutral-300 rounded p-2 text-center">
                    <img
                      src={invoice.signature.signatureData}
                      alt="Firma digital"
                      className="max-w-full h-auto mx-auto"
                      style={{ maxHeight: '80px' }}
                    />
                  </div>
                </div>
                <div className="space-y-1 text-xs text-neutral-700">
                  <p><span className="font-medium text-neutral-800">Firmado por:</span> {invoice.customerInfo.name}</p>
                  <p><span className="font-medium text-neutral-800">Fecha:</span> {new Date(invoice.signature.timestamp).toLocaleString('es-ES')}</p>
                  <div className="flex items-center space-x-1 mt-2 p-2 bg-green-50 border border-green-200 rounded">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium text-green-800">Firma verificada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Compacto */}
            <div className="text-center text-xs text-neutral-500 border-t border-neutral-200 pt-2">
              <p>Este documento constituye un comprobante de pago válido • {CONFIG.BUSINESS.companyName}</p>
              <p>Generado el {new Date().toLocaleString('es-ES')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 