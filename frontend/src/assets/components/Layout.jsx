// Layout.jsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16"> {/* Adjust this value according to your navbar height */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
