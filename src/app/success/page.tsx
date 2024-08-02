'use client'

import Loader from '@/components/Loader';
import NoOrder from '@/components/NoOrder';
import OrderSummary from '@/components/OrderSummary';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface SessionData {
  amountTotal: number | null;
  currency: string | null;
  customerEmail: string | null | undefined;
  customerName: string | null;
  lineItems: any;
  status: string | null;
}

const Success = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();

  const fetchSessionData = useCallback(async () => {
    const sessionId = searchParams?.get('session_id');
    if (!sessionId) return;

    try {
      const response = await fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: SessionData = await response.json();
        setSessionData(data);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch session data');
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
      setLoading(false);
    }
  }, [searchParams]); 

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  useEffect(() => {
    // clear the shopping cart
    if (sessionData?.status === 'complete' && cart.length) {
      clearCart();
    }
  },[sessionData, clearCart, cart]);

  if (loading) {
    return <Loader text='Preparing Order Summary' />
  }

  if (sessionData?.status === 'complete') {
    return <OrderSummary sessionData={sessionData} />;
  }
  
  return <NoOrder />;
}

export default Success;