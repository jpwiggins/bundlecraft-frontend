import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createSubscription } from '../../services/stripeService';
import { useAuth } from '../../contexts/AuthContext';
import analytics from '../../utils/analytics';

const CheckoutForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    
    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Send payment to backend
      const result = await createSubscription({
        paymentMethodId: paymentMethod.id,
        planId: plan.id,
        customerEmail: user.email,
        customerName: user.name
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSucceeded(true);
        analytics.track('Subscription Created', {
          plan: plan.name,
          price: plan.price,
          userId: user.id
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {succeeded ? (
        <div className="success-message">
          <h3>🎉 Subscription Activated!</h3>
          <p>You now have full access to BundleCraft</p>
          <p>Plan: {plan.name} (${plan.price}/{plan.period})</p>
          <a href="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </a>
        </div>
      ) : (
        <>
          <div className="plan-summary">
            <h3>{plan.name}</h3>
            <p>${plan.price}/{plan.period}</p>
          </div>
          
          <div className="card-element-container">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={processing || !stripe}
            className="btn btn-primary"
          >
            {processing ? 'Processing...' : `Subscribe for $${plan.price}`}
          </button>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
