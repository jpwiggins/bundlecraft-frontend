import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBundle } from '../contexts/BundleContext';
import ApiKeyInput from '../components/dashboard/ApiKeyInput';
import ProductList from '../components/dashboard/ProductList';
import BundleCreator from '../components/dashboard/BundleCreator';
import BundleList from '../components/dashboard/BundleList';

const DashboardPage = () => {
  const { user, apiKey: authApiKey } = useAuth();
  const { apiKey, setApiKey } = useBundle();

  // Sync API key between auth and bundle contexts
  React.useEffect(() => {
    if (authApiKey) {
      setApiKey(authApiKey);
    }
  }, [authApiKey, setApiKey]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#2563eb', marginBottom: '24px' }}>Dashboard</h2>
      
      {/* Account Information */}
      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '24px' 
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#374151' }}>Account Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
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
              borderRadius: '4px', 
              marginLeft: '8px',
              fontSize: '0.9em'
            }}>
              {apiKey ? '••••••••' + apiKey.slice(-4) : 'Not set'}
            </span>
          </div>
        </div>
      </div>
      
      <ApiKeyInput />
      <BundleCreator />
      <ProductList />
      <BundleList />
    </div>
  );
};

export default DashboardPage;
