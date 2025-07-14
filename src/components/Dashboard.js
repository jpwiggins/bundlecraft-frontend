import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import config from '../config/config';
import analytics from '../utils/analytics';
import { mockProducts } from '../assets/data/mockProducts';
import { BUNDLE_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../assets/data/constants';
import '../assets/styles/main.css';

// Using CSS classes from assets/styles/main.css

function Dashboard() {
  const { user, apiKey } = useAuth();
  const [products, setProducts] = useState(mockProducts);
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

  const generateEtsyListing = (products, bundleName, bundlePrice, originalPrice) => {
    const productNames = products.map(p => p.name).join(', ');
    const savings = (originalPrice - parseFloat(bundlePrice)).toFixed(2);
    const sku = `BDL-${Date.now()}`;
    
    return {
      title: `${bundleName} - Premium Bundle Deal | Save $${savings} | ${products.length} Items`,
      description: `🎯 EXCLUSIVE BUNDLE DEAL - Save $${savings}!

✨ What's Included:
${products.map(p => `• ${p.name} - ${p.price}`).join('\n')}

💰 Bundle Price: $${bundlePrice} (Originally $${originalPrice.toFixed(2)})
🎁 You Save: $${savings} (15% OFF!)

🚀 Why Choose This Bundle?
• Carefully curated products that work perfectly together
• Premium quality guaranteed
• Fast shipping and excellent customer service
• 95% customer satisfaction rate

📦 Bundle Details:
• ${products.length} high-quality items
• Value: $50+ guaranteed
• Perfect for gifts or personal use
• Ready to ship

🏷️ Tags: bundle deal, premium quality, value pack, gift set, printify, custom products, bulk discount, exclusive offer

⭐ Customer Reviews:
"Amazing value for money! Love the quality of all items in the bundle." - Sarah M.
"Fast shipping and exactly as described. Will buy again!" - Mike R.

🛒 Order now and save big on this exclusive bundle deal!`,
      tags: [
        'bundle deal', 'premium quality', 'value pack', 'gift set', 
        'custom products', 'bulk discount', 'exclusive offer', 'printify',
        'handmade', 'personalized', 'unique gift', 'quality items'
      ],
      price: bundlePrice,
      sku: sku,
      category: 'Craft Supplies & Tools',
      materials: products.map(p => p.name.split(' ')[0]).join(', ')
    };
  };

  const copyEtsyListing = (listing) => {
    const listingText = `TITLE:\n${listing.title}\n\nDESCRIPTION:\n${listing.description}\n\nTAGS:\n${listing.tags.join(', ')}\n\nPRICE: $${listing.price}\nSKU: ${listing.sku}\nCATEGORY: ${listing.category}\nMATERIALS: ${listing.materials}`;
    
    navigator.clipboard.writeText(listingText).then(() => {
      alert('✅ Etsy listing copied to clipboard!\n\nYou can now paste this directly into your Etsy listing form.');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = listingText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('✅ Etsy listing copied to clipboard!\n\nYou can now paste this directly into your Etsy listing form.');
    });
  };

  const createBundle = () => {
    if (selected.length >= BUNDLE_CONFIG.minProducts && selected.length <= BUNDLE_CONFIG.maxProducts) {
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
        createdAt: new Date().toLocaleDateString(),
        etsyListing: generateEtsyListing(selectedProducts, bundleName, discountedPrice, totalPrice)
      };
      
      setBundles([...bundles, newBundle]);
      setSelected([]);
      analytics.trackBundleCreated(newBundle);
      alert(`✅ Bundle "${bundleName}" created successfully!\n\n💰 Original Price: $${totalPrice.toFixed(2)}\n🎯 Bundle Price: $${discountedPrice}\n💵 Customer Saves: $${(totalPrice - parseFloat(discountedPrice)).toFixed(2)}\n📦 SKU: BDL-${Date.now()}\n\n📝 Etsy listing generated and ready to copy!`);
    } else {
      alert('Please select between 2-8 products to create a bundle.');
    }
  };

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, width: '100%' }}>
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
              {apiKey || 'Not set'}
            </span>
          </div>
        </div>
      </div>
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
      <button 
        onClick={createBundle} 
        disabled={selected.length < 2 || selected.length > 8} 
        style={{ 
          ...buttonStyles, 
          background: (selected.length >= 2 && selected.length <= 8) ? '#10b981' : '#9ca3af' 
        }}
      >
        Create Bundle ({selected.length} selected) {selected.length > 8 ? '- Max 8 items' : ''}
      </button>
      <div style={sectionStyles}>
        <h3 style={{ marginBottom: 10 }}>Created Bundles ({bundles.length})</h3>
        {bundles.length === 0 ? <p>No bundles created yet. Select 2-8 products above to create your first bundle.</p> : (
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
                <div style={{ display: 'flex', gap: 16, fontSize: 14, marginBottom: 12 }}>
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
                {bundle.etsyListing && (
                  <div style={{ marginTop: 12, padding: 12, background: '#f0f9ff', borderRadius: 6, border: '1px solid #0ea5e9' }}>
                    <div style={{ fontWeight: 600, color: '#0369a1', marginBottom: 8 }}>📝 Etsy Listing Ready</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
                      Title: {bundle.etsyListing.title.substring(0, 60)}...
                    </div>
                    <button 
                      onClick={() => copyEtsyListing(bundle.etsyListing)}
                      style={{
                        ...buttonStyles,
                        background: '#0ea5e9',
                        fontSize: 13,
                        padding: '6px 12px',
                        marginBottom: 0
                      }}
                    >
                      📋 Copy Etsy Listing
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
