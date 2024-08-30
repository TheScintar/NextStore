// src/components/Cart.jsx

import React from 'react';
import CartItemCard from './CartItemCard';
import styles from '../../styles/Product/productsList.module.css';

const Cart = ({ cartItems, total, onRemove }) => {
  return (
    <div className={styles.productsList}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <CartItemCard key={item.id} product={item} onRemove={onRemove} />
        ))
      )}
      <div className={styles.total}>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
