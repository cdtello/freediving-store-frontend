'use client'

import React, { useRef, useState, useEffect } from 'react'
import type { DigitalSignature as DigitalSignatureType } from '@/types'
import { getUserIP } from '@/utils/deviceInfo'

interface DigitalSignatureProps {
  onSignatureComplete: (signature: DigitalSignatureType) => void
}

export default function DigitalSignature({ onSignatureComplete }: DigitalSignatureProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar el canvas con mejor resolución
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    
    ctx.scale(dpr, dpr)
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    // Configurar el estilo de dibujo
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.imageSmoothingEnabled = true
  }, [])

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      }
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      }
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): void => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const { x, y } = getCoordinates(e)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): void => {
    e.preventDefault()
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const { x, y } = getCoordinates(e)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = (): void => {
    if (!isDrawing) return
    setIsDrawing(false)
    setHasSignature(true)
  }

  const clearSignature = (): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const handleComplete = async (): Promise<void> => {
    if (!hasSignature || isCompleting) return

    setIsCompleting(true)

    try {
      const canvas = canvasRef.current
      if (!canvas) return

      // Convertir a base64
      const signatureData = canvas.toDataURL('image/png')
      const ipAddress = await getUserIP()

      const signature: DigitalSignatureType = {
        signatureData,
        timestamp: new Date().toISOString(),
        ipAddress,
        userAgent: navigator.userAgent,
      }

      onSignatureComplete(signature)
    } catch (error) {
      console.error('Error completing signature:', error)
      setIsCompleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 bg-neutral-50">
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">Firma Digital</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Por favor, firme en el área de abajo para confirmar su compra
        </p>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="border border-neutral-300 rounded bg-white w-full touch-none"
            style={{ 
              cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19l7-7 3 3-7 7-3-3z'/%3E%3Cpath d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z'/%3E%3Cpath d='M2 2l7.586 7.586'/%3E%3Ccircle cx='11' cy='11' r='2'/%3E%3C/svg%3E") 2 2, crosshair` 
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          
          {!hasSignature && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center space-x-2 text-neutral-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                <span className="text-lg">Firme aquí</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={clearSignature}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-all duration-200 disabled:opacity-50"
            disabled={!hasSignature || isCompleting}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            <span>Limpiar Firma</span>
          </button>
          
          {hasSignature && (
            <div className="flex items-center space-x-2 text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Firma capturada</span>
            </div>
          )}
        </div>
      </div>

      {/* Complete Button */}
      <div className="flex space-x-4">
        <button
          onClick={handleComplete}
          disabled={!hasSignature || isCompleting}
          className="flex-1 py-4 font-bold text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: hasSignature && !isCompleting
              ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
              : 'rgba(107, 114, 128, 0.1)',
            color: hasSignature && !isCompleting ? '#000000' : 'rgba(107, 114, 128, 0.6)',
            boxShadow: hasSignature && !isCompleting
              ? '0 8px 24px rgba(16, 185, 129, 0.4)'
              : 'none',
          }}
        >
          {isCompleting ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
              <span>Procesando...</span>
            </span>
          ) : (
            'Confirmar Firma y Continuar'
          )}
        </button>
      </div>
    </div>
  )
} 