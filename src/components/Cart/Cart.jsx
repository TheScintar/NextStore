import React, { useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import styles from '../../styles/Cart/cart.module.css';

const Cart = ({ cartItems, onRemove, onQuantityChange }) => {
  const [itemsInCart, setItemsInCart] = useState(cartItems);

  useEffect(() => {
    setItemsInCart(cartItems);
  }, [cartItems]);

  const total = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.productsList}>
      {itemsInCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        itemsInCart.map((item) => (
          <CartItemCard
            key={item.id}
            product={item}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
          />
        ))
      )}
      <div className={styles.total}>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
