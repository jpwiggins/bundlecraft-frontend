import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import config from '../config/config';
import analytics from '../utils/analytics';

const sectionStyles = {
  marginBottom: 28,
};
const buttonStyles = {
  background: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 20px',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  marginBottom: 16,
};
const listStyles = {
  listStyle: 'none',
  padding: 0,
};
const productItemStyles = {
  background: '#f1f5f9',
  borderRadius: 8,
  marginBottom: 10,
  padding: '10px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};
const bundleItemStyles = {
  background: '#e0e7ef',
  borderRadius: 8,
  marginBottom: 8,
  padding: '8px 14px',
};

function Dashboard() {
  const { apiKey } = useAuth();
  const [products, setProducts] = useState([
    // Demo products for better UX
    { id: 'demo1', name: 'Custom T-Shirt Design', sku: 'TSH-001', price: '$19.99' },
    { id: 'demo2', name: 'Coffee Mug Premium', sku: 'MUG-002', price: '$12.99' },
    { id: 'demo3', name: 'Tote Bag Canvas', sku: 'BAG-003', price: '$15.99' },
    { id: 'demo4', name: 'Phone Case Protective', sku: 'PHN-004', price: '$24.99' }
  ]);
  const [selected, setSelected] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    analytics.trackPageView('dashboard');
  }, []);

  // Fetch products from Printify using the user's API key
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      // Note: Direct API calls to Printify may be blocked by CORS in production
      // In a real production app, these calls should go through your backend
      const response = await fetch(`${config.printifyApiUrl}/shops.json`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const shopData = await response.json();
      if (!shopData || !shopData.data || shopData.data.length === 0) {
        setError('No shops found for this API key.');
        setLoading(false);
        return;
      }
      const shopId = shopData.data[0].id;
      const prodRes = await fetch(`${config.printifyApiUrl}/shops/${shopId}/products.json`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!prodRes.ok) {
        throw new Error(`HTTP error! status: ${prodRes.status}`);
      }
      
      const prodData = await prodRes.json();
      if (!prodData || !prodData.data) {
        setError('No products found.');
        setLoading(false);
        return;
      }
      // Map products to show name, SKU, and price
      const mapped = prodData.data.map(p => ({
        id: p.id,
        name: p.title,
        sku: p.variants?.[0]?.sku || 'N/A',
        price: p.variants?.[0]?.price || 'N/A'
      }));
      setProducts(mapped);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. This may be due to CORS restrictions. In production, API calls should go through your backend server.');
    }
    setLoading(false);
  };

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const createBundle = () => {
    if (selected.length >= 2) {
      const selectedProducts = products.filter(p => selected.includes(p.id));
      const bundleName = `Bundle-${Date.now()}`;
      const totalPrice = selectedProducts.reduce((sum, p) => {
        const price = parseFloat(p.price.replace('$', ''));
        return sum + price;
      }, 0);
      const discountedPrice = (totalPrice * 0.85).toFixed(2); // 15% discount
      
      const newBundle = {
        id: bundleName,
        name: bundleName,
        products: selectedProducts,
        originalPrice: `$${totalPrice.toFixed(2)}`,
        bundlePrice: `$${discountedPrice}`,
        savings: `$${(totalPrice - parseFloat(discountedPrice)).toFixed(2)}`,
        sku: `BDL-${Date.now()}`,
        createdAt: new Date().toLocaleDateString()
      };
      
      setBundles([...bundles, newBundle]);
      setSelected([]);
      analytics.trackBundleCreated(newBundle);
      alert(`✅ Bundle "${bundleName}" created successfully!\n\n💰 Original Price: $${totalPrice.toFixed(2)}\n🎯 Bundle Price: $${discountedPrice}\n💵 Customer Saves: $${(totalPrice - parseFloat(discountedPrice)).toFixed(2)}\n📦 SKU: BDL-${Date.now()}`);
    } else {
      alert('Please select at least 2 products to create a bundle.');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#2563eb', marginBottom: 18 }}>Dashboard</h2>
      <button onClick={fetchProducts} disabled={loading} style={buttonStyles}>
        {loading ? 'Loading...' : 'Import Products from Printify'}
      </button>
      {loading && <LoadingSpinner message="Fetching products from Printify..." />}
      {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
      <div style={sectionStyles}>
        <h3 style={{ marginBottom: 10 }}>Products</h3>
        {products.length === 0 ? <p>No products loaded.</p> : (
          <ul style={listStyles}>
            {products.map(p => (
              <li key={p.id} style={productItemStyles}>
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => handleSelect(p.id)}
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
      <button onClick={createBundle} disabled={selected.length < 2} style={{ ...buttonStyles, background: selected.length >= 2 ? '#10b981' : '#9ca3af' }}>
        Create Bundle ({selected.length} selected)
      </button>
      <div style={sectionStyles}>
        <h3 style={{ marginBottom: 10 }}>Created Bundles ({bundles.length})</h3>
        {bundles.length === 0 ? <p>No bundles created yet. Select 2+ products above to create your first bundle.</p> : (
          <ul style={listStyles}>
            {bundles.map((bundle, i) => (
              <li key={i} style={{ ...bundleItemStyles, padding: '16px' }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{bundle.name}</div>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  SKU: {bundle.sku} | Created: {bundle.createdAt}
                </div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  Products: {bundle.products.map(p => p.name).join(', ')}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
                  <span style={{ textDecoration: 'line-through', color: '#ef4444' }}>
                    Original: {bundle.originalPrice}
                  </span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>
                    Bundle: {bundle.bundlePrice}
                  </span>
                  <span style={{ color: '#3b82f6' }}>
                    Saves: {bundle.savings}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
