
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'DXN Lingzhi Coffee 3-in-1',
    category: 'Beverages',
    price: 24.50,
    description: 'A specially blended coffee with premium coffee beans and Ganoderma extract. No artificial coloring or preservatives.',
    image: 'https://picsum.photos/seed/coffee/600/600',
    benefits: ['Natural energy boost', 'Enhanced focus', 'Immune system support']
  },
  {
    id: '2',
    name: 'DXN Spirulina Tablets',
    category: 'Supplements',
    price: 35.00,
    description: 'Pure Spirulina cultivated in high-quality ponds. Rich in essential nutrients and antioxidants.',
    image: 'https://picsum.photos/seed/spirulina/600/600',
    benefits: ['Complete protein source', 'Highly alkalizing', 'Rich in iron and B-vitamins']
  },
  {
    id: '3',
    name: 'DXN Ganozhi Toothpaste',
    category: 'Personal Care',
    price: 12.00,
    description: 'Toothpaste containing Ganoderma extract, food gel, and menthol. No saccharin or artificial coloring.',
    image: 'https://picsum.photos/seed/toothpaste/600/600',
    benefits: ['Gentle on gums', 'Refreshing breath', 'Natural ingredients']
  },
  {
    id: '4',
    name: 'DXN Cocozhi',
    category: 'Beverages',
    price: 28.00,
    description: 'Rich chocolate drink with Ganoderma extract. Perfect for kids and adults alike.',
    image: 'https://picsum.photos/seed/cocoa/600/600',
    benefits: ['Rich in antioxidants', 'Gentle energy', 'Delicious taste']
  },
  {
    id: '5',
    name: 'DXN Reishi Gano (RG)',
    category: 'Supplements',
    price: 45.00,
    description: '90-day old Ganoderma lucidum extract. Known for detoxifying and balancing the body.',
    image: 'https://picsum.photos/seed/rg/600/600',
    benefits: ['Deep detoxification', 'Cellular regeneration', 'Blood circulation support']
  },
  {
    id: '6',
    name: 'DXN Ganocelium (GL)',
    category: 'Supplements',
    price: 42.00,
    description: 'Extract from the mycelium of 14-day old Ganoderma lucidum. Rich in oxygen and germanium.',
    image: 'https://picsum.photos/seed/gl/600/600',
    benefits: ['Oxygenates blood', 'Brain function support', 'Balances body pH']
  },
  {
    id: '7',
    name: 'DXN Ganozhi Shampoo',
    category: 'Personal Care',
    price: 15.50,
    description: 'Enriched with Ganoderma extract and vitamin B5 for healthy, shiny hair.',
    image: 'https://picsum.photos/seed/shampoo/600/600',
    benefits: ['Strengthens hair roots', 'Promotes shine', 'pH balanced']
  },
  {
    id: '8',
    name: 'DXN Roselle Juice',
    category: 'Beverages',
    price: 18.00,
    description: 'Natural juice from Hibiscus sabdariffa. Rich in Vitamin C and antioxidants.',
    image: 'https://picsum.photos/seed/roselle/600/600',
    benefits: ['High Vitamin C', 'Kidney health support', 'Anti-aging properties']
  }
];

export const CATEGORIES = ['All', 'Supplements', 'Beverages', 'Personal Care', 'Food'];
