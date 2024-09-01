"use client";

import React, { useState, useEffect } from 'react';
import Cart from '../../components/Cart/Cart';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';



const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCartItems(userData.cart || []);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        console.log('User is not authenticated');
        setCartItems([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = async (productId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCartItems);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          cart: updatedCartItems
        });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        cart: updatedCartItems
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <Cart cartItems={cartItems} total={total} onRemove={handleRemove} onQuantityChange={handleQuantityChange} />
    </div>
  );
};

export default CartPage;
