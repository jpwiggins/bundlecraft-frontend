import React from 'react';
import { useBundle } from '../../contexts/BundleContext';

const ProductList = () => {
  const { products, toggleProductSelection } = useBundle();
  
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '10px' }}>Products</h3>
      {products.length === 0 ? (
        <p>No products loaded. Import products using your Printify API key.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map(product => (
            <li 
              key={product.id} 
              style={{
                background: '#f1f5f9',
                borderRadius: '8px',
                marginBottom: '10px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <input
                type="checkbox"
                checked={product.selected || false}
                onChange={() => toggleProductSelection(product.id)}
                style={{ marginRight: '8px' }}
              />
              <span style={{ fontWeight: 500 }}>{product.name}</span>
              <span style={{ color: '#64748b' }}>SKU: {product.sku}</span>
              <span style={{ color: '#64748b' }}>Price: {product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
