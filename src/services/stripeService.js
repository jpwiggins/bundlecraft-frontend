import axios from 'axios';
import config from '../config/config';

// Create subscription for BundleCraft
export const createSubscription = async ({ paymentMethodId, planId, customerEmail, customerName }) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/stripe/subscribe`, {
      paymentMethodId,
      planId,
      customerEmail,
      customerName
    });
    
    return response.data;
  } catch (error) {
    console.error('Stripe subscription error:', error);
    return {
      error: error.response?.data?.message || 'Payment failed. Please try again.'
    };
  }
};

// Get BundleCraft pricing plans
export const getPricingPlans = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/pricing/plans`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pricing plans:', error);
    return [];
  }
};
