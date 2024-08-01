import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SessionData {
  amountTotal: number | null;
  currency: string | null;
  customerEmail: string | null | undefined;
  customerName: string | null;
  lineItems: any;
}

interface OrderSummary {
  sessionData: SessionData | undefined;
}

const OrderSummary = ({ sessionData }: OrderSummary) => {
  const [totalCurrencyAmount, setTotalCurrencyAmount] = useState<string>();

  useEffect(() => {
    if (sessionData) {
      const amount = ((sessionData.amountTotal ?? 0)/100).toFixed(2);
      const currencyAmount = new Intl.NumberFormat(undefined, { style: 'currency', currency: sessionData.currency ?? '' }).format(amount as unknown as number);
      setTotalCurrencyAmount(currencyAmount);
    }
  }, [sessionData]);

  return (
    <div className="bg-white shadow-md p-6 w-full">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">{sessionData?.customerName}, thanks for your purchase!</h1>
      <p className="text-center text-gray-600 mb-6">We will deliver your order confirmation to {sessionData?.customerEmail} shortly.</p>
      <div className="border-t border-gray-200 pt-2">
        <div className="border-gray-200">
          <div className="flex justify-between items-top mb-2">
            <div className="font-bold text-gray-700">Order Summary</div>
            <div className="w-2/3">
              {sessionData?.lineItems?.data.map((item: any) => {
                const amount = (item.price.unit_amount/100).toFixed(2);
                const currencyAmount = new Intl.NumberFormat(undefined, { style: 'currency', currency: sessionData.currency ?? '' }).format(amount as unknown as number)
                return (
                  <div key={item.id} className="flex justify-between">
                    <span className="font-light text-wrap text-gray-900">{item.description}</span>
                    <span className="font-light text-orange-800">{item.quantity} - {currencyAmount}</span>
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-700">Total Amount Paid</span>
            <span className="font-bold text-orange-800">{totalCurrencyAmount}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link href="/" className="bg-stone-400 text-gray-800 py-2 px-4 hover:bg-stone-500">Go Shop</Link>
      </div>
    </div>
  );
};

export default OrderSummary;