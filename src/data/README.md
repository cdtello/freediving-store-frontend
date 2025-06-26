# Sistema de Configuración Simulada de Base de Datos

Este directorio contiene la simulación de datos que en producción vendrían de una base de datos real. El sistema está diseñado para facilitar la migración futura a una base de datos real manteniendo la misma estructura y API.

## Estructura de Archivos

### `config.ts`
Contiene toda la configuración simulada de la aplicación, organizada como si fuera una base de datos:

- **Configuraciones Base**: Stock, impuestos, precios, UI y empresa
- **Configuraciones Regionales**: Diferentes configuraciones por país (ES, FR, US)
- **Configuraciones por Tipo de Tienda**: retail, wholesale, outlet
- **Configuraciones Estacionales**: summer, winter
- **Servicio de Datos**: `ConfigDataService` que simula llamadas a API

### `products.ts`
Datos de productos simulados (ya existente)

## Uso del Sistema de Configuración

### 1. Inicialización Automática

La configuración se inicializa automáticamente al cargar la aplicación a través del `ConfigProvider` en el layout principal:

```tsx
// En layout.tsx
<ConfigProvider region="ES" season="winter" storeType="retail">
  {/* Tu aplicación */}
</ConfigProvider>
```

### 2. Acceso a la Configuración

#### Usando ConfigUtils (Recomendado)
```tsx
import { ConfigUtils } from '@/config/app.config'

// En cualquier componente
const stockColor = ConfigUtils.getStockColor(quantity)
const formattedPrice = ConfigUtils.formatPrice(price)
const isLowStock = ConfigUtils.isLowStock(quantity)
```

#### Usando el Hook de Configuración
```tsx
import { useAppConfig } from '@/hooks/useAppConfig'

function MyComponent() {
  const { isInitialized, isLoading, error } = useAppConfig()
  
  if (isLoading) return <div>Cargando configuración...</div>
  if (error) return <div>Error: {error}</div>
  
  // Tu componente
}
```

#### Acceso Directo al Manager
```tsx
import { appConfig } from '@/config/app.config'

// Solo después de la inicialización
const stockConfig = appConfig.getStockConfig()
const taxConfig = appConfig.getTaxConfig()
```

### 3. Configuraciones Disponibles

#### Stock Configuration
```typescript
{
  lowStockThreshold: 5,        // Umbral de stock bajo
  maxStockForVisualization: 30, // Máximo para barras de progreso
  outOfStockThreshold: 0       // Umbral de agotado
}
```

#### Tax Configuration
```typescript
{
  defaultTaxRate: 0.21,        // 21% IVA
  taxName: 'IVA',
  taxDisplayName: 'IVA (21%)'
}
```

#### Pricing Configuration
```typescript
{
  currency: 'EUR',
  currencySymbol: '€',
  decimalPlaces: 2,
  premiumThreshold: 150        // Umbral para productos premium
}
```

#### UI Configuration
```typescript
{
  stockColors: {
    high: 'text-green-600',
    medium: 'text-yellow-600',
    low: 'text-orange-600',
    outOfStock: 'text-red-600'
  },
  stockGradients: { /* gradientes CSS */ },
  animationDurations: { /* duraciones en ms */ }
}
```

#### Business Configuration
```typescript
{
  companyName: 'KRAKEN Freediving Store',
  companyAddress: 'Calle del Mar Profundo, 42\n28001 Madrid, España',
  companyPhone: '+34 91 234 56 78',
  companyEmail: 'info@krakenfreediving.com',
  companyWebsite: 'www.krakenfreediving.com'
}
```

## Configuraciones Especiales

### Por Región
```typescript
// España
region: 'ES' → IVA 21%, EUR
// Francia  
region: 'FR' → TVA 20%, EUR
// Estados Unidos
region: 'US' → Sales Tax 8%, USD
```

### Por Tipo de Tienda
```typescript
// Retail (por defecto)
storeType: 'retail' → Stock bajo: 5, Premium: €150
// Mayorista
storeType: 'wholesale' → Stock bajo: 20, Premium: €500  
// Outlet
storeType: 'outlet' → Stock bajo: 2, Premium: €75
```

### Por Temporada
```typescript
// Invierno (por defecto)
season: 'winter' → Colores verdes, Premium: €180
// Verano
season: 'summer' → Colores azules, Premium: €120
```

## Actualización de Configuración

### Actualizar Configuración en Runtime
```tsx
import { appConfig } from '@/config/app.config'

// Actualizar configuración de stock
await appConfig.updateConfiguration('stock', {
  lowStockThreshold: 10
})

// Refrescar toda la configuración
await appConfig.refresh({ region: 'FR', season: 'summer' })
```

### Cache y Rendimiento
- **Cache automático**: 5 minutos de duración
- **Invalidación**: Al actualizar configuraciones
- **Simulación de red**: 50ms de delay para realismo

## Migración a Base de Datos Real

Para migrar a una base de datos real:

1. **Reemplazar `ConfigDataService`**: Cambiar las implementaciones de los métodos para hacer llamadas HTTP reales
2. **Mantener la misma API**: Los componentes no necesitan cambios
3. **Actualizar el cache**: Implementar cache distribuido si es necesario
4. **Variables de entorno**: Añadir configuración de conexión a BD

### Ejemplo de Migración
```typescript
// Antes (simulado)
public async getStockConfig(): Promise<StockConfiguration> {
  return Promise.resolve(stockConfigData)
}

// Después (real)
public async getStockConfig(): Promise<StockConfiguration> {
  const response = await fetch('/api/config/stock')
  return response.json()
}
```

## Ventajas del Sistema

✅ **Centralizado**: Toda la configuración en un lugar  
✅ **Type-Safe**: TypeScript garantiza tipos correctos  
✅ **Cacheable**: Sistema de cache integrado  
✅ **Extensible**: Fácil añadir nuevas configuraciones  
✅ **Testeable**: Fácil mockear para tests  
✅ **Migrable**: Preparado para base de datos real  
✅ **Performante**: Cache y carga asíncrona  
✅ **Flexible**: Configuraciones por región, temporada, etc.

## Patrones de Diseño Utilizados

- **Singleton**: `ConfigurationManager` instancia única
- **Factory**: `AppConfigFactory` para acceso fácil  
- **Strategy**: Diferentes configuraciones según contexto
- **Observer**: React hooks para cambios de estado
- **Cache**: Sistema de cache con expiración
- **Adapter**: Preparado para diferentes fuentes de datos 