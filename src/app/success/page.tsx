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
  const [sessionData, setSessionData] = useState<SessionData>();
  const [timedOut, setTimedOut] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { deleteCartFromLocalStorage } = useCart();

  useEffect(() => {
    setTimeout(() => {
      setTimedOut(true);
    }, 10000);
  },[]);

  useEffect(() => {
    // clear the shoppingg cart
    if (sessionData?.status === 'complete') {
      deleteCartFromLocalStorage();
    }
  },[sessionData, deleteCartFromLocalStorage]);

  const getSessionData = useCallback(async () => {
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
      } else {
        console.error('Failed to fetch session data');
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  }, [searchParams]); 

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

  if (sessionData?.status === 'complete') {
    return <OrderSummary sessionData={sessionData} />;
  } else if (!sessionData && !timedOut) {
    return <Loader text={'Preparing Order Summary'} />;
  } else if (timedOut) {
    return <NoOrder />;
  }
}

export default Success;