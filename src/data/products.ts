import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 1,
    name: "Aletas Profesionales Cressi",
    price: 149.99,
    description: 'Aletas profesionales de fibra de carbono para freediving. Excelente propulsión y eficiencia.',
    image: 'https://picsum.photos/500/400?random=1',
    category: 'fins',
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviews: 124,
    variants: [
      {
        id: 0,
        color: '#1e40af',
        colorName: 'Azul Océano',
        image: 'https://picsum.photos/500/400?random=2',
        inStock: true,
        stockQuantity: 8,
      },
      {
        id: 1,
        color: '#000000',
        colorName: 'Negro Profundo',
        image: 'https://picsum.photos/500/400?random=3',
        inStock: true,
        stockQuantity: 5,
      },
      {
        id: 2,
        color: '#dc2626',
        colorName: 'Rojo Kraken',
        image: 'https://picsum.photos/500/400?random=4',
        inStock: false,
        stockQuantity: 0,
      }
    ]
  },
  {
    id: 2,
    name: "Máscara Mares X-Vision",
    price: 79.99,
    description: 'Máscara de bajo volumen con cristal templado. Perfecta para freediving profundo.',
    image: 'https://picsum.photos/500/400?random=5',
    category: 'masks',
    inStock: true,
    stockQuantity: 12,
    rating: 4.9,
    reviews: 89,
    variants: [
      {
        id: 0,
        color: '#0ea5e9',
        colorName: 'Azul Claro',
        image: 'https://picsum.photos/500/400?random=6',
        inStock: true,
        stockQuantity: 4,
      },
      {
        id: 1,
        color: '#000000',
        colorName: 'Negro',
        image: 'https://picsum.photos/500/400?random=7',
        inStock: true,
        stockQuantity: 6,
      },
      {
        id: 2,
        color: '#ffffff',
        colorName: 'Blanco',
        image: 'https://picsum.photos/500/400?random=8',
        inStock: true,
        stockQuantity: 2,
      }
    ]
  },
  {
    id: 3,
    name: "Tubo Cressi Alpha Ultra Dry",
    price: 34.99,
    description: 'Tubo de respiración con válvula de purga. Diseño ergonómico y cómodo.',
    image: 'https://picsum.photos/500/400?random=9',
    category: 'snorkels',
    inStock: true,
    stockQuantity: 8,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Traje Neopreno Mares 3mm",
    price: 189.99,
    description: 'Traje de neopreno de alta calidad para aguas templadas. Excelente flexibilidad.',
    image: 'https://picsum.photos/500/400?random=10',
    category: 'wetsuits',
    inStock: true,
    stockQuantity: 6,
    rating: 4.6,
    reviews: 78
  },
  {
    id: 5,
    name: "Reloj Garmin Descent Mk2i",
    price: 1199.99,
    description: 'Reloj inteligente especializado para buceo con GPS y monitoreo de inmersión.',
    image: 'https://picsum.photos/500/400?random=11',
    category: 'accessories',
    inStock: true,
    stockQuantity: 3,
    rating: 4.9,
    reviews: 45
  },
  {
    id: 6,
    name: "Aletas Beuchat Mundial",
    price: 124.99,
    description: 'Aletas clásicas de competición. Utilizadas por campeones mundiales.',
    image: 'https://picsum.photos/500/400?random=12',
    category: 'fins',
    inStock: true,
    stockQuantity: 22,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 7,
    name: "Máscara Cressi F1",
    price: 89.99,
    description: 'Máscara ultra-compacta con tecnología de cristal anti-reflejo.',
    image: 'https://picsum.photos/500/400?random=13',
    category: 'masks',
    inStock: false,
    stockQuantity: 0,
    rating: 4.8,
    reviews: 92
  },
  {
    id: 8,
    name: "Cuchillo Cressi Borg",
    price: 45.99,
    description: 'Cuchillo de seguridad con funda. Acero inoxidable de alta calidad.',
    image: 'https://picsum.photos/500/400?random=14',
    category: 'accessories',
    inStock: true,
    stockQuantity: 18,
    rating: 4.8,
    reviews: 92
  }
] 