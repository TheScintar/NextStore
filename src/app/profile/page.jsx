"use client"

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          setShippingAddress({
            street: data.shippingAddress?.street || '',
            city: data.shippingAddress?.city || '',
            state: data.shippingAddress?.state || '',
            zip: data.shippingAddress?.zip || ''
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Отписка от слушателя при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) {
      setError('Пользователь не авторизован');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { shippingAddress });
      console.log('Профиль обновлен');
    } catch (err) {
      setError('Не удалось обновить профиль');
      console.error('Ошибка при обновлении профиля:', err);
    }
  };

  if (loading) {
    return <p>Загрузка...</p>; // Пока состояние загружается, можно показать индикатор загрузки
  }

  return (
    <div className="profile">
      <h2>Профиль</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={shippingAddress.street}
        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
        placeholder="Улица"
      />
      <input
        type="text"
        value={shippingAddress.city}
        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
        placeholder="Город"
      />
      <input
        type="text"
        value={shippingAddress.state}
        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
        placeholder="Штат"
      />
      <input
        type="text"
        value={shippingAddress.zip}
        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
        placeholder="Индекс"
      />
      <button onClick={handleUpdateProfile}>Обновить профиль</button>
    </div>
  );
};

export default Profile;
