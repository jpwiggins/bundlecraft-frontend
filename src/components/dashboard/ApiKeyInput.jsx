import React from 'react';
import { useBundle } from '../../contexts/BundleContext';

const ApiKeyInput = () => {
  const { apiKey, setApiKey, fetchProducts, loading, error } = useBundle();
  
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '12px' }}>Printify API Key</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Printify API key"
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '16px'
          }}
        />
        <button
          onClick={fetchProducts}
          disabled={loading}
          style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {loading ? 'Loading...' : 'Import Products'}
        </button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </div>
  );
};

export default ApiKeyInput;
