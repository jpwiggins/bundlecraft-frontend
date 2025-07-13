import config from '../config/config';

export const fetchPrintifyProducts = async (apiKey) => {
  try {
    // Get shops
    const shopsResponse = await fetch(`${config.printifyApiUrl}/shops.json`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!shopsResponse.ok) {
      throw new Error(`Failed to fetch shops: ${shopsResponse.status}`);
    }
    
    const shopsData = await shopsResponse.json();
    if (!shopsData.data || shopsData.data.length === 0) {
      throw new Error('No shops found');
    }
    
    const shopId = shopsData.data[0].id;
    
    // Get products
    const productsResponse = await fetch(`${config.printifyApiUrl}/shops/${shopId}/products.json`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }
    
    const productsData = await productsResponse.json();
    
    return productsData.data.map(product => ({
      id: product.id,
      name: product.title,
      sku: product.variants?.[0]?.sku || 'N/A',
      price: product.variants?.[0]?.price ? `$${product.variants[0].price}` : 'N/A',
      image: product.images?.[0]?.src || ''
    }));
  } catch (error) {
    console.error('Error in fetchPrintifyProducts:', error);
    throw error;
  }
};
