import type { DeviceInfo } from '@/types'

/**
 * Obtiene información del dispositivo del usuario
 */
export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent
  const platform = navigator.platform || 'Unknown'
  const language = navigator.language || 'Unknown'
  const screenResolution = `${screen.width}x${screen.height}`
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return {
    userAgent,
    platform,
    language,
    screenResolution,
    timezone,
  }
}

/**
 * Obtiene la dirección IP del usuario (simulada para demo)
 */
export async function getUserIP(): Promise<string> {
  try {
    // En un entorno real, usarías un servicio como ipapi.co o similar
    // Para la demo, simulamos una IP
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || '192.168.1.1'
  } catch (error) {
    // IP simulada en caso de error
    return '192.168.1.1'
  }
}

/**
 * Genera un ID único para la factura
 */
export function generateInvoiceId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `INV-${timestamp}-${random.toUpperCase()}`
}

/**
 * Genera un número de orden único
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 6)
  return `ORD-${timestamp}-${random.toUpperCase()}`
}

/**
 * Formatea una fecha para mostrar en la factura
 */
export function formatInvoiceDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(date)
} 