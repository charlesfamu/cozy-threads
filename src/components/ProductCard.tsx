'use client'

import { Product, useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (cart?.length) {
      const productInCart = cart.find((item) => item.id === product.id);
      setAddedToCart(!!productInCart);
    }
  }, [cart, product]);

  return (
    <div className="flex flex-col items-center justify-between p-6 border bg-white max-w-96">
      <div>
        <Image 
          alt={product.title}
          height={180}
          src={product.image}
          width={180}
        />
      </div>
      <div className="w-full">
        <h3 className="font-semibold text-gray-800 mt-1 mb-2">{product.title}</h3>
        <div className="text-gray-600 mb-2">{product.category}</div>
        <div className="flex items-baseline justify-between">
          <p className="font-bold text-orange-700">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="bg-stone-400 text-gray-800 py-2 px-4 hover:bg-stone-500"
          >
            {addedToCart ? `Add Again` : `Add to Cart`}
          </button>
        </div>
      </div>
    </div>
  )
};

export default ProductCard;