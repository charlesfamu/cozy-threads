'use client'

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const Header = () => {
  const { itemsInCartCount } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-gray-800">Cozy Threads</Link>
        </div>
        
        <ul className="flex items-center space-x-4 text-gray-800">
          <li><Link href="/">Shop</Link></li>
          <li><Link href="/cart">Cart ({itemsInCartCount})</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;