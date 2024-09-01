import React from 'react';
import styles from '../../styles/Cart/cart.module.css'



export const metadata = {
    title: 'Your cart',
    description: 'Your cart',
  };

const Layout = ({ children }) => {
  return (
    <>
    <main className={styles.main}>
        {children}
    </main>
    </>
       
  );
};

export default Layout;
