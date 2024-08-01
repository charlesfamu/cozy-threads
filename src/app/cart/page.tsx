'use client'

import EmptyShoppingCart from '@/components/EmptyShoppingCart';
import Loader from '@/components/Loader';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { ...cartContextProps } = useCart();

  if (cartContextProps.cart === null) {
    return <Loader text={'Loading Cart'} />;
  } else if (cartContextProps.itemsInCartCount > 0) {
    return <ShoppingCart {...cartContextProps} />;
  }

  return <EmptyShoppingCart />;
};

export default Cart;