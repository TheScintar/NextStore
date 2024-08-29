"use client"

import React from 'react';
import styles from '../../styles/Profile/profile.module.css';

const Address = ({ shippingAddress, setShippingAddress, handleUpdateProfile }) => {
  return (
    <div className={styles.Address}>
        <h1>Your Address</h1>
        <div className={styles.AddressItem}>
        <p>Country</p>
      <input
        type="text"
        value={shippingAddress.country}
        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
        placeholder="Country"
      />
      </div>
      <div className={styles.AddressItem}>
      <p>City</p>
      <input
        type="text"
        value={shippingAddress.city}
        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
        placeholder="City"
      />
      </div>
      <div className={styles.AddressItem}>
      <p>Street</p>
      <input
        type="text"
        value={shippingAddress.street}
        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
        placeholder="Street"
      />
      </div>
      <div className={styles.AddressItem}>
      <p>Apartment</p>
      <input
        type="text"
        value={shippingAddress.apartment}
        onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
        placeholder="Apartment"
      />
      </div>
      <div className={styles.AddressItem}>
      <p>Zip code</p>
      <input
        type="text"
        value={shippingAddress.zip}
        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
        placeholder="Zip code"
      />
      </div>
      <button className={styles.ApplyButton} onClick={handleUpdateProfile}><h1>Update address</h1></button>
    </div>
  );
};

export default Address;
