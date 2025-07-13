import React, { useState } from 'react';

const DashboardDemo = () => {
  const [selectedProducts, setSelectedProducts] = useState([0, 1]);
  
  const toggleProduct = (index) => {
    if (selectedProducts.includes(index)) {
      setSelectedProducts(selectedProducts.filter(i => i !== index));
    } else {
      setSelectedProducts([...selectedProducts, index]);
    }
  };

  const createBundle = () => {
    if (selectedProducts.length >= 2) {
      alert(`✅ Bundle created with ${selectedProducts.length} products!\n\nFeatures ready:\n• Auto-generated SKU\n• Smart pricing (15% discount)\n• SEO-optimized tags\n• Copy-paste Etsy listing`);
    } else {
      alert('Please select at least 2 products to create a bundle.');
    }
  };

  const products = [
    { title: 'Custom T-Shirt', price: '$19.99' },
    { title: 'Coffee Mug', price: '$12.99' },
    { title: 'Tote Bag', price: '$15.99' },
    { title: 'Phone Case', price: '$24.99' }
  ];

  return (
    <section className="dashboard-demo">
      <div className="container">
        <h2 className="section-title">Dashboard Preview</h2>
        <div className="dashboard-preview">
          <div className="dashboard-nav">
            <a href="#" className="active">Import Products</a>
            <a href="#">My Bundles</a>
            <a href="#">Generated Listings</a>
            <a href="#">Settings</a>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>📦 Your Printify Products (Sample)</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>Select 2-8 products to create a bundle</p>
          </div>
          
          <div className="product-grid">
            {products.map((product, index) => (
              <div 
                key={index}
                className={`product-card ${selectedProducts.includes(index) ? 'selected' : ''}`}
                onClick={() => toggleProduct(index)}
              >
                <div className="product-image"></div>
                <div className="product-title">{product.title}</div>
                <div className="product-price">{product.price}</div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={createBundle}
              disabled={selectedProducts.length < 2}
            >
              Create Bundle ({selectedProducts.length} selected)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
