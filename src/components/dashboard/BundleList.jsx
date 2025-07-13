import React from 'react';
import { useBundle } from '../../contexts/BundleContext';

const BundleList = () => {
  const { bundles } = useBundle();
  
  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>Created Bundles ({bundles.length})</h3>
      {bundles.length === 0 ? (
        <p>No bundles created yet. Select 2+ products to create your first bundle.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bundles.map(bundle => (
            <li 
              key={bundle.id}
              style={{
                background: '#e0e7ff',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>{bundle.name}</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                Created: {new Date(bundle.createdAt).toLocaleDateString()}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                <strong>Products:</strong> {bundle.products.map(p => p.name).join(', ')}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                <span style={{ textDecoration: 'line-through', color: '#ef4444' }}>
                  Original: {bundle.products.reduce((sum, p) => {
                    const price = parseFloat(p.price.replace('$', ''));
                    return sum + price;
                  }, 0).toFixed(2)}
                </span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>
                  Bundle: ${(bundle.products.reduce((sum, p) => {
                    const price = parseFloat(p.price.replace('$', ''));
                    return sum + price;
                  }, 0) * (1 - bundle.discount/100)).toFixed(2)}
                </span>
                <span style={{ color: '#3b82f6' }}>
                  Save: {bundle.discount}%
                </span>
              </div>
              <div style={{ marginTop: '12px' }}>
                <h4>Etsy Export:</h4>
                <textarea
                  readOnly
                  value={bundle.etsyExport}
                  style={{
                    width: '100%',
                    height: '200px',
                    padding: '8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BundleList;
