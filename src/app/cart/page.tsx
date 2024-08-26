'use client';

import React, { useState } from 'react';
import Cart from '../../components/Cart';
import { Product } from '../../types';

const CartPage: React.FC = () => {
  // Пример состояния для корзины
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Функция для удаления товара из корзины
  const handleRemove = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div>
      <h1>Cart</h1>
      <Cart cartItems={cartItems} total={total} onRemove={handleRemove} />
    </div>
  );
};

export default CartPage;