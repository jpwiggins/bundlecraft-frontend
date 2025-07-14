import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { getPricingPlans } from '../services/stripeService';
import CheckoutForm from '../components/payment/CheckoutForm';
import LoadingSpinner from './LoadingSpinner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const SubscriptionPage = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const pricingPlans = await getPricingPlans();
        
        // Default plan structure for BundleCraft
        const bundlecraftPlans = pricingPlans.length > 0 ? pricingPlans : [
          {
            id: 'price_monthly',
            name: 'Monthly Plan',
            price: 29.99,
            period: 'month',
            features: [
              'Unlimited bundles',
              'Priority support',
              'Etsy export templates',
              'Smart pricing'
            ]
          },
          {
            id: 'price_annual',
            name: 'Annual Plan',
            price: 269.00,
            period: 'year',
            features: [
              'All monthly features',
              'Save 25%',
              'Advanced analytics',
              'Bundle templates library'
            ]
          }
        ];
        
        setPlans(bundlecraftPlans);
        setSelectedPlan(bundlecraftPlans[0]);
      } catch (err) {
        setError('Failed to load pricing plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <LoadingSpinner message="Loading plans..." />;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="subscription-page">
      <div className="container">
        <h1>Complete Your Subscription</h1>
        <p>Choose a plan to unlock BundleCraft's full potential</p>
        
        <div className="plan-selector">
          {plans.map(plan => (
            <div 
              key={plan.id}
              className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h3>{plan.name}</h3>
              <div className="price">${plan.price}<span>/{plan.period}</span></div>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {selectedPlan && (
          <div className="checkout-container">
            <Elements stripe={stripePromise}>
              <CheckoutForm plan={selectedPlan} />
            </Elements>
          </div>
        )}
        
        <div className="security-notice">
          <p>🔒 Secure payment processing by Stripe</p>
          <p>Your payment information is encrypted and never stored on our servers</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
