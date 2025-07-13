import React, { useState } from 'react';
import { useBundle } from '../../contexts/BundleContext';

const BundleCreator = () => {
  const { createBundle, products } = useBundle();
  const [bundleName, setBundleName] = useState('');
  const [discount, setDiscount] = useState(15);
  
  const selectedCount = products.filter(p => p.selected).length;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createBundle({
      name: bundleName,
      discount
    });
    setBundleName('');
  };

  return (
    <div style={{ 
      background: '#f8fafc', 
      padding: '16px', 
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '24px'
    }}>
      <h3 style={{ marginBottom: '12px' }}>Create Bundle</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Bundle Name</label>
          <input
            type="text"
            value={bundleName}
            onChange={(e) => setBundleName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
            placeholder="E.g., Summer T-Shirt Bundle"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
            Discount Percentage: {discount}%
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={selectedCount < 2}
          style={{
            background: selectedCount >= 2 ? '#10b981' : '#9ca3af',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 0',
            fontSize: '16px',
            fontWeight: 600,
            cursor: selectedCount >= 2 ? 'pointer' : 'not-allowed',
            marginTop: '10px'
          }}
        >
          Create Bundle ({selectedCount} selected)
        </button>
      </form>
    </div>
  );
};

export default BundleCreator;
