
const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce200"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce400"></div>
      </div>
      <p className="text-lg text-gray-700 mt-4">{text}</p>
    </div>
  );
};

export default Loader;