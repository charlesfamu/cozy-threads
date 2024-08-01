import Link from "next/link";
const EMPTY_CART_TEXT = `We're unable to find this order.`;

const NoOrder = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto h-full text-center text-gray-800">
        <h1 className="font-bold mb-4">{EMPTY_CART_TEXT}</h1>
        <Link 
          className="bg-stone-400 text-gray-800 py-2 px-4 hover:bg-stone-500"
          href="/">
            Go Shop
        </Link>
      </div>
    </div>
  );
};

export default NoOrder;