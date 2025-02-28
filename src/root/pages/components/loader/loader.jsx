const Loader = () => {
    return (
      <div className="flex justify-center items-center mx-auto mb-10">
        <div className="relative w-16 h-16 flex justify-center items-center">
          <div className="absolute w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-12 h-12 border-4 border-transparent border-t-gray-400 rounded-full animate-spin-slow"></div>
          <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  