import ProductList from '@/components/ProductList';
import { products } from '@/context/CartContext';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <section className="bg-cover h-96 bg-center">
        <div className="container mx-auto h-full flex items-center justify-center text-center text-gray-800">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to Cozy Threads</h1>
            <p className="text-xl mb-6">The store to find high-quality, ethically-sourced apparel and accessories.</p>
          </div>
        </div>
      </section>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
