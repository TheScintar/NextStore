"use client"

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from '../../styles/Profile/profile.module.css';
import Address from '../../components/Profile/Address';
import Security from '../../components/Profile/Security';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    country: '',
    city: '',
    street: '',
    apartment: '',
    zip: ''
  });
  const [activeComponent, setActiveComponent] = useState('Address')
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          setShippingAddress({
            country: data.shippingAddress?.country || '',
            city: data.shippingAddress?.city || '',
            street: data.shippingAddress?.street || '',
            apartment: data.shippingAddress?.apartment || '',
            zip: data.shippingAddress?.zip || ''
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) {
      setError('User not found');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { shippingAddress });
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.menuSection}>
        <button className={`${activeComponent == "Address" ? styles.active : ''}`} onClick={() => setActiveComponent("Address")}>
          Address
        </button>
        <button className={`${activeComponent == "Security" ? styles.active : ''}`} onClick={() => setActiveComponent("Security")}>
          Security
        </button>
      </div>
      <div className={styles.addressSection}>
        {activeComponent == 'Address' ? (
        <Address
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          handleUpdateProfile={handleUpdateProfile}
        />
      ) : (
        <Security
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          handleUpdateProfile={handleUpdateProfile}
        />
      )
        }
      </div>
    </div>
  );
};

export default Profile;
