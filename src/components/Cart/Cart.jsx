import React, { useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import styles from '../../styles/Cart/cart.module.css';

const Cart = ({ cartItems = [], onRemove }) => {
  const [itemsInCart, setItemsInCart] = useState(() => {
    // Проверяем, что initialCartItems существует и является массивом
    return cartItems.map(item => {
      // Загружаем количество товара из localStorage или устанавливаем на 1 по умолчанию
      const savedQuantity = localStorage.getItem(`cartItem-${item.id}-quantity`);
      return { ...item, quantity: savedQuantity ? parseInt(savedQuantity, 10) : 1 };
    });
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Пересчет общей суммы
    const newTotal = itemsInCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [itemsInCart]);

  const handleQuantityChange = (productId, newQuantity) => {
    setItemsInCart((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

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
            onQuantityChange={handleQuantityChange}
          />
          
        ))
        
      )

      }
      
      <div className={styles.total}>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
