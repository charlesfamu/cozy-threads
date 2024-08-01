'use client'

import { CartContextType } from '@/context/CartContext';
import Image from 'next/image';
import CheckoutButton from './Checkout';

const ShoppingCart = ({addToCart, cart, itemsInCartCount, removeFromCart}: CartContextType) => {
  return (
    <div className="p-8">
      <div className="w-full flex justify-between mb-4">
        <div>
          <div className="text-xl font-semibold mr-4 inline-block">In your bag</div>
          <span className="text-gray-500">{itemsInCartCount} item{itemsInCartCount > 1 ? 's' : ''}</span>
        </div>
        <CheckoutButton />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-2/3">
          {cart?.map(item => (
            <div key={item.id} className="flex items-start mb-4">
              <Image
                alt={item.title}
                className="mr-4"
                height={100}
                src={item.image}
                width={50}
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="font-semibold text-orange-700">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="px-2 py-1 border border-gray-300 bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <div className="px-3 py-1 border-t border-b border-gray-300">{item.quantity}</div>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 py-1 border border-gray-300 bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;