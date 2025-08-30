
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
        AI Product Ad <span className="text-indigo-600">Generator</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Turn your product photos into stunning, professional advertisements in seconds. Just upload, choose a style, and let AI do the magic.
      </p>
    </header>
  );
};

export default Header;
