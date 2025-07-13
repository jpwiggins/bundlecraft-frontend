import React, { createContext, useState, useContext } from 'react';
import { fetchPrintifyProducts } from '../services/printifyService';
import { generateEtsyExport } from '../utils/etsyFormatter';

const BundleContext = createContext();

export const BundleProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    if (!apiKey) {
      setError('Please enter your Printify API key');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const productsData = await fetchPrintifyProducts(apiKey);
      setProducts(productsData.map(p => ({ ...p, selected: false })));
    } catch (err) {
      setError('Failed to fetch products. Please check your API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        bundles,
        apiKey,
        loading,
        error,
        setApiKey,
        fetchProducts,
        createBundle,
        toggleProductSelection
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => useContext(BundleContext);
