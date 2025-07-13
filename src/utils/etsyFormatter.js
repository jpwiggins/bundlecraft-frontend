export const generateEtsyExport = (products, bundleConfig) => {
  const totalValue = products.reduce((sum, product) => {
    const priceStr = product.price.replace('$', '');
    const price = parseFloat(priceStr) || 0;
    return sum + price;
  }, 0);
  
  const discountDecimal = bundleConfig.discount / 100;
  const bundlePrice = totalValue * (1 - discountDecimal);
  const savings = totalValue - bundlePrice;
  
  return `
[TITLE]
${bundleConfig.name} - ${products.length} Item Bundle

[DESCRIPTION]
This premium bundle includes:
${products.map(p => `• ${p.name}`).join('\n')}

BUNDLE EXCLUSIVE: ${bundleConfig.discount}% OFF!
Total Value: $${totalValue.toFixed(2)} 
Bundle Price: $${bundlePrice.toFixed(2)}
Save $${savings.toFixed(2)}

[TAGS]
bundle, multipack, discounted

[SKUS]
${products.map(p => p.sku).join(', ')}

[PRICING]
$${bundlePrice.toFixed(2)}

[SHIPPING]
Use combined shipping profile
  `.trim();
};
