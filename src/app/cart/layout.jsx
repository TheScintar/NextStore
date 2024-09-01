import React from 'react';



export const metadata = {
    title: 'Your cart',
    description: 'Your cart',
  };

const Layout = ({ children }) => {
  return (
    <>
    <main>{children}</main>
    </>
       
  );
};

export default Layout;
