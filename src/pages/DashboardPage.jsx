import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBundle } from '../contexts/BundleContext';
import LoadingSpinner from './LoadingSpinner';
import config from '../config/config';
import analytics from '../utils/analytics';

const Dashboard = () => {
  const { user, apiKey: authApiKey } = useAuth();
  const { 
    products, 
    setProducts, 
    bundles, 
    createBundle, 
    toggleProductSelection,
    loading,
    error
  } = useBundle();
  
  const [bundleName, setBundleName] = useState('');
  const [discount, setDiscount] = useState(15);

  useEffect(() => {
    analytics.trackPageView('dashboard');
  }, []);

  // Fetch products from Printify using the user's API key
  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      // Get shops
      const shopsResponse = await fetch(`${config.printifyApiUrl}/shops.json`, {
        headers: {
          'Authorization': `Bearer ${authApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!shopsResponse.ok) {
        throw new Error(`Failed to fetch shops: ${shopsResponse.status}`);
      }
      
      const shopsData = await shopsResponse.json();
      if (!shopsData.data || shopsData.data.length === 0) {
        setError('No shops found');
        return;
      }
      
      const shopId = shopsData.data[0].id;
      
      // Get products
      const productsResponse = await fetch(`${config.printifyApiUrl}/shops/${shopId}/products.json`, {
        headers: {
          'Authorization': `Bearer ${authApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.status}`);
      }
      
      const productsData = await productsResponse.json();
      
      setProducts(productsData.data.map(product => ({
        id: product.id,
        name: product.title,
        sku: product.variants?.[0]?.sku || 'N/A',
        price: product.variants?.[0]?.price ? `$${product.variants[0].price}` : 'N/A',
        selected: false
      })));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. In production, API calls should go through your backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBundle = () => {
    createBundle({
      name: bundleName,
      discount
    });
    setBundleName('');
  };

  const selectedCount = products.filter(p => p.selected).length;

  return (
    <div>
      <h2 style={{ color: '#2563eb', marginBottom: 18 }}>Dashboard</h2>
      
      {/* User Information Section */}
      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0', 
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 24 
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#374151' }}>Account Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <div>
            <strong>Username:</strong> {user?.username || 'N/A'}
          </div>
          <div>
            <strong>Email:</strong> {user?.email || 'N/A'}
          </div>
          <div>
            <strong>API Key:</strong> 
            <span style={{ 
              fontFamily: 'monospace', 
              background: '#e5e7eb', 
              padding: '2px 6px', 
              borderRadius: 4, 
              marginLeft: 8,
              fontSize: '0.9em'
            }}>
              {authApiKey ? '••••••••' + authApiKey.slice(-4) : 'Not set'}
            </span>
          </div>
        </div>
      </div>
      
      <button onClick={fetchProducts} disabled={loading} style={{
        background: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '8px 20px',
        fontSize: 15,
        fontWeight: 500,
        cursor: 'pointer',
        marginBottom: 16
      }}>
        {loading ? 'Loading...' : 'Import Products from Printify'}
      </button>
      
      {loading && <LoadingSpinner message="Fetching products from Printify..." />}
      {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
      
      {/* Bundle Creation Section */}
      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0', 
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 24 
      }}>
        <h3 style={{ marginBottom: 12 }}>Create New Bundle</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Bundle Name</label>
            <input
              type="text"
              value={bundleName}
              onChange={e => setBundleName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #d1d5db',
                fontSize: 16
              }}
              placeholder="E.g., Summer T-Shirt Bundle"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>
              Discount Percentage: {discount}%
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={discount}
              onChange={e => setDiscount(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
        
        <button 
          onClick={handleCreateBundle} 
          disabled={selectedCount < 2} 
          style={{
            background: selectedCount >= 2 ? '#10b981' : '#9ca3af',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 0',
            fontSize: 16,
            fontWeight: 600,
            cursor: selectedCount >= 2 ? 'pointer' : 'not-allowed',
          }}
        >
          Create Bundle ({selectedCount} selected)
        </button>
      </div>
      
      {/* Products Section */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 10 }}>Products</h3>
        {products.length === 0 ? <p>No products loaded.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products.map(p => (
              <li key={p.id} style={{
                background: '#f1f5f9',
                borderRadius: 8,
                marginBottom: 10,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <input
                  type="checkbox"
                  checked={p.selected || false}
                  onChange={() => toggleProductSelection(p.id)}
                  style={{ marginRight: 8 }}
                />
                <span style={{ fontWeight: 500 }}>{p.name}</span>
                <span style={{ color: '#64748b' }}>SKU: {p.sku}</span>
                <span style={{ color: '#64748b' }}>Price: {p.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Bundles Section */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 10 }}>Created Bundles ({bundles.length})</h3>
        {bundles.length === 0 ? (
          <p>No bundles created yet. Select 2+ products to create your first bundle.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bundles.map((bundle, i) => (
              <li key={i} style={{ 
                background: '#e0e7ff',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12
              }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{bundle.name}</div>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  Created: {new Date(bundle.createdAt).toLocaleDateString()}
                </div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  <strong>Products:</strong> {bundle.products.map(p => p.name).join(', ')}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 14, marginBottom: 12 }}>
                  <span style={{ textDecoration: 'line-through', color: '#ef4444' }}>
                    Original: ${bundle.products.reduce((sum, p) => {
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
                
                <div>
                  <h4 style={{ marginBottom: 8 }}>Etsy Export:</h4>
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
    </div>
  );
};

export default Dashboard;
