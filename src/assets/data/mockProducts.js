// Mock Printify Products Data
export const mockProducts = [
  {
    id: 'prod_001',
    name: 'Custom T-Shirt Design - Premium Cotton',
    sku: 'TSH-001',
    price: '$19.99',
    category: 'Apparel',
    description: 'High-quality custom t-shirt with premium cotton blend',
    tags: ['t-shirt', 'custom', 'apparel', 'cotton'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_002',
    name: 'Coffee Mug Premium - 11oz Ceramic',
    sku: 'MUG-002',
    price: '$12.99',
    category: 'Drinkware',
    description: 'Durable ceramic coffee mug perfect for daily use',
    tags: ['mug', 'coffee', 'ceramic', 'drinkware'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_003',
    name: 'Tote Bag Canvas - Eco-Friendly',
    sku: 'BAG-003',
    price: '$15.99',
    category: 'Bags',
    description: 'Sustainable canvas tote bag for everyday use',
    tags: ['tote', 'bag', 'canvas', 'eco-friendly'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_004',
    name: 'Phone Case Protective - iPhone/Android',
    sku: 'PHN-004',
    price: '$24.99',
    category: 'Accessories',
    description: 'Durable protective phone case with custom design',
    tags: ['phone case', 'protective', 'accessories', 'custom'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_005',
    name: 'Sticker Pack - Vinyl Waterproof',
    sku: 'STK-005',
    price: '$8.99',
    category: 'Stickers',
    description: 'High-quality vinyl stickers, waterproof and durable',
    tags: ['stickers', 'vinyl', 'waterproof', 'pack'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_006',
    name: 'Hoodie Premium - Fleece Lined',
    sku: 'HOD-006',
    price: '$39.99',
    category: 'Apparel',
    description: 'Comfortable fleece-lined hoodie with custom print',
    tags: ['hoodie', 'fleece', 'apparel', 'warm'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_007',
    name: 'Notebook Spiral - 120 Pages',
    sku: 'NTB-007',
    price: '$11.99',
    category: 'Stationery',
    description: 'High-quality spiral notebook with custom cover',
    tags: ['notebook', 'spiral', 'stationery', 'pages'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_008',
    name: 'Water Bottle Stainless - 20oz',
    sku: 'WTR-008',
    price: '$22.99',
    category: 'Drinkware',
    description: 'Insulated stainless steel water bottle',
    tags: ['water bottle', 'stainless', 'insulated', 'drinkware'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_009',
    name: 'Poster Print - High Quality Paper',
    sku: 'PST-009',
    price: '$16.99',
    category: 'Wall Art',
    description: 'Premium quality poster print on archival paper',
    tags: ['poster', 'print', 'wall art', 'paper'],
    image: '/api/placeholder/200/200'
  },
  {
    id: 'prod_010',
    name: 'Keychain Metal - Custom Engraved',
    sku: 'KEY-010',
    price: '$9.99',
    category: 'Accessories',
    description: 'Durable metal keychain with custom engraving',
    tags: ['keychain', 'metal', 'engraved', 'accessories'],
    image: '/api/placeholder/200/200'
  }
];

export const productCategories = [
  'All Products',
  'Apparel',
  'Drinkware',
  'Bags',
  'Accessories',
  'Stickers',
  'Stationery',
  'Wall Art'
];

export const bundleTemplates = [
  {
    name: 'Coffee Lover Bundle',
    description: 'Perfect bundle for coffee enthusiasts',
    suggestedProducts: ['prod_002', 'prod_005', 'prod_007'],
    discount: 15
  },
  {
    name: 'Apparel Starter Pack',
    description: 'Essential apparel items bundle',
    suggestedProducts: ['prod_001', 'prod_006', 'prod_003'],
    discount: 15
  },
  {
    name: 'Office Essentials',
    description: 'Everything you need for the office',
    suggestedProducts: ['prod_007', 'prod_002', 'prod_010'],
    discount: 15
  },
  {
    name: 'Gift Set Premium',
    description: 'Perfect gift combination',
    suggestedProducts: ['prod_001', 'prod_002', 'prod_005', 'prod_010'],
    discount: 15
  }
];

export default mockProducts;