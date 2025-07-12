import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch products from Printify using the user's API key
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.printify.com/v1/shops.json', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const shopData = await response.json();
      if (!shopData || !shopData.data || shopData.data.length === 0) {
        setError('No shops found for this API key.');
        setLoading(false);
        return;
      }
      const shopId = shopData.data[0].id;
      const prodRes = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
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
      setError('Failed to fetch products. Check your API key.');
    }
    setLoading(false);
  };

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const createBundle = () => {
    if (selected.length > 0) {
      setBundles([...bundles, { skus: [...selected] }]);
      setSelected([]);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#2563eb', marginBottom: 18 }}>Dashboard</h2>
      <button onClick={fetchProducts} disabled={loading} style={buttonStyles}>
        {loading ? 'Loading...' : 'Import Products from Printify'}
      </button>
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
      <button onClick={createBundle} disabled={selected.length === 0} style={{ ...buttonStyles, background: '#10b981' }}>
        Create Bundle
      </button>
      <div style={sectionStyles}>
        <h3 style={{ marginBottom: 10 }}>Bundles</h3>
        {bundles.length === 0 ? <p>No bundles created.</p> : (
          <ul style={listStyles}>
            {bundles.map((b, i) => (
              <li key={i} style={bundleItemStyles}>SKUs: {b.skus.join(', ')}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
