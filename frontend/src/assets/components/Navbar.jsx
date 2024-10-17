import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-100 to-blue-400 fixed w-full z-10 top-0 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://res.cloudinary.com/dpwcvgpt3/image/upload/v1728299251/yofdgz4gnxuitk8gzt7d.jpg" 
            alt="Logo" 
            className="h-16 w-auto mr-3 rounded-full border-4 border-white" 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
