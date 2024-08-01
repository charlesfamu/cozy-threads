'use client'

import { Product } from '@/context/CartContext';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
