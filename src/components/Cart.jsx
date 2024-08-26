import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${total}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
