'use client'

import { useCart } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = () => {
  const { cart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart
        })
      });
  
      if (response.ok) {
        const { sessionId } = await response.json();
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId });
      } else {
        const responseError = await response.json();
        console.log('Session response error', responseError);
      }
    } catch (error) {
      console.log('Major session error', error);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-stone-400 text-gray-800 py-2 px-4 hover:bg-stone-500">
      Proceed to Checkout
    </button>
  );
};

export default Checkout;