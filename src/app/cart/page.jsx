"use client";

import React, { useState, useEffect } from 'react';
import Cart from '../../components/Cart/Cart';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCartItems(userData.cart || []); 
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        console.log('User is not authenticated');
      }

      setLoading(false);
    };

    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <Cart cartItems={cartItems} total={total} onRemove={handleRemove} />
    </div>
  );
};

export default CartPage;
