
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="mt-12 w-full flex flex-col items-center justify-center text-center">
      <div className="relative flex items-center justify-center h-16 w-16">
        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-pulse-fast"></span>
        <span className="relative inline-flex rounded-full h-12 w-12 bg-indigo-500"></span>
      </div>
      <h2 className="text-xl font-bold text-gray-700 mt-6">Generating your masterpiece...</h2>
      <p className="text-gray-500 mt-2">The AI is working its magic. This can take a moment.</p>
    </div>
  );
};

export default Loader;
