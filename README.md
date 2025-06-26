# 🏊‍♂️ Freediving Store

Una tienda especializada en equipos de buceo libre construida con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** con configuración estricta
- **Tailwind CSS** para estilos
- **Carrito de compras** con Context API
- **Responsive design** mobile-first
- **Filtros avanzados** por categoría y precio
- **Gestión de estado** con React Context

## 📋 Requisitos

- **Node.js >= 18.17.0** (Actualmente tienes 14.20.0 - necesitas actualizar)
- **npm >= 6.14.0**

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone [tu-repo]
cd freediving-store

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── catalog/           # Página del catálogo
│   ├── about/             # Página acerca de
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Navegación principal
│   ├── Cart.tsx           # Carrito deslizante
│   └── ProductCard.tsx    # Tarjeta de producto
├── contexts/              # Context providers
│   └── CartContext.tsx    # Estado global del carrito
├── data/                  # Datos mockeados
│   └── products.ts        # Catálogo de productos
└── types/                 # Definiciones TypeScript
    └── index.ts           # Interfaces principales
```

## 🎨 Tecnologías Utilizadas

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: React Context API
- **Imágenes**: Next.js Image con Unsplash
- **Linting**: ESLint

## 🔧 Configuración

### Tailwind CSS
Configurado con colores personalizados oceánicos en `tailwind.config.ts`

### TypeScript
Configuración estricta en `tsconfig.json` con paths absolutos

### Next.js
- App Router habilitado
- Imágenes optimizadas de Unsplash
- Configuración en `next.config.js`

## 🛒 Funcionalidades del Carrito

- ✅ Agregar productos
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Cálculo automático del total
- ✅ Persistencia durante la sesión
- ✅ Animaciones suaves

## 📱 Responsive Design

- **Mobile First**: Diseñado para móvil primero
- **Breakpoints**: sm, md, lg, xl
- **Grid responsivo**: Adapta columnas según pantalla

## 🎯 Patrones de Diseño

- **Context Pattern**: Para estado global
- **Custom Hooks**: Lógica reutilizable
- **Compound Components**: Componentes modulares
- **TypeScript Interfaces**: Contratos de datos

## ⚠️ Problema Actual

**Error de Node.js**: Necesitas actualizar Node.js a la versión >= 18.17.0

### Solución:
1. Instala nvm (Node Version Manager)
2. Ejecuta: `nvm install 18` y `nvm use 18`
3. O descarga Node.js 18+ desde nodejs.org

## 🚀 Despliegue

```bash
# Build de producción
npm run build

# Ejecutar producción
npm start
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. 