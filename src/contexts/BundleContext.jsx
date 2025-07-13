import React, { createContext, useState, useContext } from 'react';
import { generateEtsyExport } from '../utils/etsyFormatter';

const BundleContext = createContext();

export const BundleProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createBundle = (bundleConfig) => {
    const selectedProducts = products.filter(p => p.selected);
    
    if (selectedProducts.length < 2) {
      setError('Please select at least 2 products');
      return;
    }
    
    const newBundle = {
      ...bundleConfig,
      id: `bundle-${Date.now()}`,
      products: selectedProducts,
      etsyExport: generateEtsyExport(selectedProducts, bundleConfig),
      createdAt: new Date().toISOString()
    };
    
    setBundles([newBundle, ...bundles]);
    setProducts(products.map(p => ({ ...p, selected: false })));
  };

  const toggleProductSelection = (id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
  };

  return (
    <BundleContext.Provider
      value={{
        products,
        setProducts,
        bundles,
        loading,
        error,
        createBundle,
        toggleProductSelection
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => useContext(BundleContext);
